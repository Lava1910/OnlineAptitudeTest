using Azure.Core;
using Microsoft.EntityFrameworkCore;
using OnlineAptitudeTestDB.Dto.Candidate;
using OnlineAptitudeTestDB.Dto.Test;
using OnlineAptitudeTestDB.Entities;
using OnlineAptitudeTestDB.Interfaces;
using OnlineAptitudeTestDB.ViewModel;
using System;
using System.Net.Mail;
using System.Net;
using System.Net.NetworkInformation;
using System.Runtime.InteropServices;
using System.Text;
using System.Numerics;

namespace OnlineAptitudeTestDB.Service
{
    public class TestService : ITestService
    {
        private readonly OnlineAptitudeTestDbContext _context;
        private readonly Random _random;
        public TestService(OnlineAptitudeTestDbContext context, Random random)
        {
            _context = context;
            _random = random;
        }

        private string GenerateRandomTestCode()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            StringBuilder randomTestCode = new StringBuilder();

            for (int i = 0; i < 8; i++)
            {
                randomTestCode.Append(chars[_random.Next(chars.Length)]);
            }

            return randomTestCode.ToString();
        }
        public async Task<List<QuestionViewModel>> CreateTest()
        {
            int[] topicIds = new int[3] { 1, 2, 3, };
            int[] difficultLevels = new int[2] { 1, 2 };
            List<QuestionViewModel> questions = new List<QuestionViewModel>();
            var test = new Test()
            {
                TimeToDo = 30 * 60,
                TimeStart = DateTime.Now
            };
            _context.Tests.Add(test);
            await _context.SaveChangesAsync();
            foreach ( int topicId in topicIds)
            {
                foreach(int difficultLevel in difficultLevels)
                {
                    var questionsRandom = await _context.Questions
                    .Include(q => q.Answers)
                    .Include(q => q.Topic)
                    .Where(q => q.TopicId == topicId)
                    .Where(q => q.DifficultyLevel == difficultLevel)
                    .ToListAsync();
                    questionsRandom = questionsRandom.OrderBy(q => _random.Next()).Take(2).ToList();
                    for (int i = 0; i < questionsRandom.Count; i++)
                    {
                        questions.Add(new QuestionViewModel
                        {
                            TestCode = test.TestCode,
                            QuestionId = questionsRandom[i].QuestionId,
                            TopicName = questionsRandom[i].Topic.TopicName,
                            ContentQuestion = questionsRandom[i].ContentQuestion,
                            ContentAnswer = questionsRandom[i].Answers.Select(answer => new AnswerViewModel
                            {
                                Title = answer.ContentAnswer,
                                Checked = false,
                                Correct = answer.CorrectAnswer
                            }).ToList(),
                            CorrectAnswer = questionsRandom[i].Answers
                                .Where(a => a.CorrectAnswer)
                                .Select(a => a.ContentAnswer)
                                .ToList()
                        });
                    }                   
                }
                var questionsRandomLv3 = await _context.Questions
                        .Include(q => q.Answers)
                        .Include(q => q.Topic)
                        .Where(q => q.TopicId == topicId)
                        .Where(q => q.DifficultyLevel == 3)
                        .ToListAsync();
                questionsRandomLv3 = questionsRandomLv3.OrderBy(q => _random.Next()).Take(1).ToList();
                questions.Add(new QuestionViewModel
                {
                    TestCode = test.TestCode,
                    QuestionId = questionsRandomLv3[0].QuestionId,
                    TopicName = questionsRandomLv3[0].Topic.TopicName,
                    ContentQuestion = questionsRandomLv3[0].ContentQuestion,
                    ContentAnswer = questionsRandomLv3[0].Answers.Select(answer => new AnswerViewModel
                    {
                        Title = answer.ContentAnswer,
                        Checked = false,
                        Correct = answer.CorrectAnswer
                    }).ToList(),
                    CorrectAnswer = questionsRandomLv3[0].Answers
                        .Where(a => a.CorrectAnswer)
                        .Select(a => a.ContentAnswer)
                        .ToList()
                });
            }
            for(int i = 1; i <= 15; i ++)
            {
                questions[i - 1].Id = i;
            }
            for (int i = 0; i < questions.Count; i++)
            {
                var testQuestion = new TestQuestion()
                {
                    TestCode = test.TestCode,
                    QuestionId = questions[i].QuestionId
                };
                _context.TestQuestions.Add(testQuestion);              
            }
            await _context.SaveChangesAsync();
            return questions;          
        }

        private bool CheckAnswersMatch(List<string> correctAnswer, List<string> candidateAnswer)
        {
            return correctAnswer.SequenceEqual(candidateAnswer);
        }

        public async Task<List<string>> CorrectAnswer(int questionId)
        {
            var correctAnswers = await _context.Answers
                .Where(a => a.QuestionId == questionId)
                .Where(a => a.CorrectAnswer)
                .Select(a => a.ContentAnswer)
                .ToListAsync();
            return correctAnswers;
        }

        public bool SavePoint(int userId, int totalScore, int testCode)
        {
            var user = _context.Candidates.Find(userId);
            if (user != null)
            {
                user.ScoreFinal = totalScore;
                user.Status = (totalScore >= 40) ? 2 : 1;
                user.TestCode = testCode;
                _context.Candidates.Update(user);
                _context.SaveChangesAsync();
                if(totalScore >= 40)
                {
                    SendEmailSuccess(user.Name,user.ScoreFinal,user.Email, user.Phone);
                } else
                {
                    SendEmailFail(user.Name, user.ScoreFinal, user.Email);
                }
                return true;
            }
            else
                return false;
        }

        private static void SendEmailSuccess(string username, int? score, string email,string? phone)
        {
            string senderEmail = "webstercompany1234@gmail.com"; // Địa chỉ email của bạn
            string senderPassword = "ecsjuwqkxnjqjffg"; // Mật khẩu email của bạn
            string recipientEmail = email; // Địa chỉ email của người nhận
            string subject = "Congratulations on Advancing to the Next Stage!";
            //string body = $"Tài khoản: {username}\nMật khẩu: {password}";
            string body = @"
            Dear [Username],

            Congratulations on successfully completing the test! We appreciate your effort and dedication throughout the assessment.

            Here are your test results:

            - Test Type: Multiple choice
            - Your Score: [ScoreTotal] out of 100.

            We will be in touch with you shortly to discuss your performance in more detail. Our team will contact you via the phone number you provided during the application process.

            If you have any questions or would like to discuss your results further, please feel free to reach out to us at [Phone] or [Email].

            Thank you for your participation, and we look forward to speaking with you soon!

            Best regards,

            Human resouces department
            HR Manager";

            body = body.Replace("[Username]", username);
            body = body.Replace("[ScoreTotal]", score.ToString());
            body = body.Replace("[Email]", email);
            body = body.Replace("[Phone]", phone);

            var client = new SmtpClient("smtp.gmail.com") // Thay thế bằng thông tin SMTP của nhà cung cấp email
            {
                Port = 587,
                Credentials = new NetworkCredential(senderEmail, senderPassword),
                EnableSsl = true,
            };

            client.Send(senderEmail, recipientEmail, subject, body);
        }

        private static void SendEmailFail(string username, int? score, string email)
        {
            string senderEmail = "webstercompany1234@gmail.com"; // Địa chỉ email của bạn
            string senderPassword = "ecsjuwqkxnjqjffg"; // Mật khẩu email của bạn
            string recipientEmail = email; // Địa chỉ email của người nhận
            string subject = "Notification of test results!";
            string body = @"
            Dear [Username],

            Thank you for successfully completing the test! We appreciate your effort and dedication throughout the assessment.

            Here are your test results:

            - Test Type: Multiple choice
            - Your Score: [ScoreTotal] out of 100.

            We're sorry you didn't pass our test! Looking forward to cooperating with you next time!!!

            Best regards,

            Human resouces department
            HR Manager";

            body = body.Replace("[Username]", username);
            body = body.Replace("[ScoreTotal]", score.ToString());
            body = body.Replace("[Email]", email);

            var client = new SmtpClient("smtp.gmail.com") // Thay thế bằng thông tin SMTP của nhà cung cấp email
            {
                Port = 587,
                Credentials = new NetworkCredential(senderEmail, senderPassword),
                EnableSsl = true,
            };

            client.Send(senderEmail, recipientEmail, subject, body);
        }

        public bool SaveCandidateAnswer(CandidateAnswerRequest request)
        {
            var candidateAnswer = new CandidateAnswer
            {
                TestCode = request.TestCode,
                QuestionId = request.QuestionId,
                ContentCandidateAnswer = request.ContentAnswers
            };
            _context.CandidateAnswers.Add(candidateAnswer);
            _context.SaveChanges();
            return true;
        }
    }
}

