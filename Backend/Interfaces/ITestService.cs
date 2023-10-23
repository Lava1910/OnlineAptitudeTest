using OnlineAptitudeTestDB.Dto.Test;
using OnlineAptitudeTestDB.ViewModel;

namespace OnlineAptitudeTestDB.Interfaces
{
    public interface ITestService
    {
        Task<List<QuestionViewModel>> CreateTest();

        Task<List<string>> CorrectAnswer(int questionId);

        bool SavePoint(int userId, int totalScore, int testCode);

        bool SaveCandidateAnswer(CandidateAnswerRequest request);
    }
}
