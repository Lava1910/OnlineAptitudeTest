using Microsoft.EntityFrameworkCore;
using OnlineAptitudeTestDB.Dto.Candidate;
using OnlineAptitudeTestDB.Entities;
using OnlineAptitudeTestDB.Interfaces;
using OnlineAptitudeTestDB.ViewModel;
using System.Net;
using System.Net.Mail;
using System.Security.Principal;
using System.Text;

namespace OnlineAptitudeTestDB.Service
{
    public class ManageCandidateService : IManageCandidateService
    {
        private readonly OnlineAptitudeTestDbContext _context;
        private readonly Random _random;
        public ManageCandidateService(OnlineAptitudeTestDbContext context)
        {
            _context = context;
            _random = new Random();
        }

        public async Task<int> Create(CandidateCreateRequest request)
        {
            string randomPassword = GenerateRandomPassword();
            var hashed = BCrypt.Net.BCrypt.HashPassword(randomPassword);
            var candidate = new Candidate()
            {
                Username = request.Email,
                Password = hashed,
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                Gender = request.Gender,
                Birthday = request.Birthday,
                EducationDetails = request.EducationDetails,
                WorkExperience = request.WorkExperience,
                Role = "Candidate",
                Status = 3,
                DisabledUntil = DateTime.UtcNow.AddDays(10)
        };
            _context.Candidates.Add(candidate);
            await _context.SaveChangesAsync();
            SendEmail(candidate.Name, randomPassword, candidate.Email);
            return candidate.CandidateId;
        }
        // note
        private static void SendEmail(string username, string password, string email)
        {           
            string senderEmail = "webstercompany1234@gmail.com"; // Địa chỉ email của bạn
            string senderPassword = "ecsjuwqkxnjqjffg"; // Mật khẩu email của bạn
            string recipientEmail = email; // Địa chỉ email của người nhận
            string subject = "Congratulations on Advancing to the Next Stage!";
            //string body = $"Tài khoản: {username}\nMật khẩu: {password}";
            string body = @"
            Dear [Username],

            We are pleased to inform you that your application has successfully advanced to the next stage of our selection process. Your qualifications and experience have impressed us, and we would like to invite you to take an aptitude test as the next step.

            Here are the details of the test:

            - Test Type: Multiple choice
            - Test Deadline: 17/09/2023 (Please complete the test by this date)
            - Username: [Email]
            - Password: [Password]

            Please use the provided username and password to access the test. You will have until 17/09/2023 to complete the test. Make sure to review the instructions and complete the test to the best of your abilities.

            If you have any questions or encounter any issues during the test, please do not hesitate to reach out to our support team at support@webster.com .

            We wish you the best of luck with the test, and we look forward to reviewing your results.

            Sincerely,

            Human resouces department
            HR Manager";

            body = body.Replace("[Username]", username);
            body = body.Replace("[Password]", password);
            body = body.Replace("[Email]", email);

            var client = new SmtpClient("smtp.gmail.com") // Thay thế bằng thông tin SMTP của nhà cung cấp email
            {
                Port = 587,
                Credentials = new NetworkCredential(senderEmail, senderPassword),
                EnableSsl = true,
            };

            client.Send(senderEmail, recipientEmail, subject, body);
        }

        private string GenerateRandomPassword()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            StringBuilder randomUserName = new StringBuilder();

            for (int i = 0; i < 8; i++)
            {
                randomUserName.Append(chars[_random.Next(chars.Length)]);
            }

            return randomUserName.ToString();
        }
        public async Task<List<ListCandidateViewModel>> GetAll()
        {
            return await _context.Candidates
                .Select(rs => new ListCandidateViewModel
                {
                    CandidateId = rs.CandidateId,
                    Name = rs.Name,
                    Email = rs.Email,
                    Phone = rs.Phone,
                    Gender = rs.Gender,
                    Birthday = rs.Birthday.ToString("dd-MM-yyyy"),
                    EducationDetails = rs.EducationDetails,
                    WorkExperience = rs.WorkExperience,
                    Username = rs.Username,
                    ScoreFinal = rs.ScoreFinal,
                    StatusId = rs.Status,
                    DisabledUntil = rs.DisabledUntil
                }).ToListAsync();
        }

        public async Task<int> Update(CandidateUpdateRequest request)
        {
            var candidate = new Candidate
            {
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                Gender = request.Gender,
                Birthday = request.Birthday,
                EducationDetails = request.EducationDetails,
                WorkExperience = request.WorkExperience,
                Role = "Candidate"
            };
            _context.Candidates.Update(candidate);
            return await _context.SaveChangesAsync(); 
        }

        public bool ActiveUser(int candidateId)
        {
            var candidate = _context.Candidates.Find(candidateId);

            if (candidate == null)
            {
                return false;
            }

            candidate.DisabledUntil = DateTime.UtcNow.AddDays(10);
            _context.SaveChanges();
            return true;
        }

        public async Task<List<ShowCandidateTest>> GetCandidateTestDetail(int candidateId)
        {
            return await _context.Candidates
                .Where(c => c.CandidateId == candidateId)
                .Include(c => c.TestCodeNavigation)
                .ThenInclude(test => test.TestQuestions)
                .ThenInclude(testQuestion => testQuestion.Question)
                .SelectMany(c => c.TestCodeNavigation.TestQuestions)
                .Select(testQuestion => new ShowCandidateTest
                {
                    ContentQuestion = testQuestion.Question.ContentQuestion,
                    ContentAnswer = testQuestion.Question.Answers
                        .Select(a => a.ContentAnswer)
                        .ToList(),
                    CorrectAnswer = testQuestion.Question.Answers
                        .Where(a => a.CorrectAnswer)
                        .Select(a => a.ContentAnswer)
                        .ToList(),
                    CandidateAnswer = _context.CandidateAnswers
                        .Where(candidateAnswer =>
                                candidateAnswer.QuestionId == testQuestion.Question.QuestionId &&
                                candidateAnswer.TestCode == testQuestion.TestCode)
                        .Select(candidateAnswer => candidateAnswer.ContentCandidateAnswer)
                        .ToList()
                }).ToListAsync();


        }
    }
}
