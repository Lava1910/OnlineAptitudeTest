using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineAptitudeTestDB.Dto.Test;
using OnlineAptitudeTestDB.Entities;
using OnlineAptitudeTestDB.Interfaces;
using OnlineAptitudeTestDB.Service;
using OnlineAptitudeTestDB.ViewModel;

namespace OnlineAptitudeTestDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ITestService _testService;
        private readonly IManageCandidateService _manageCandidateService;
        public TestController(ITestService testService, IManageCandidateService manageCandidateService)
        {
            _testService = testService;
            _manageCandidateService = manageCandidateService;
        }

        [HttpGet("get-questions")]
        public async Task<List<QuestionViewModel>> GetQuestions()
        {
            var questions = await _testService.CreateTest();
            return questions;
        }

        [HttpPost("savePoint")]
        public IActionResult SavePoint(int userId, int totalScore, int testCode)
        {
            var result = _testService.SavePoint(userId, totalScore, testCode);
            if(!result)
            {
                return NoContent();
            } else
            {
                return Ok();
            }
            
        }

        [HttpPost("saveCandidateAnswer")]
        public IActionResult SaveCandidateAnswer(CandidateAnswerRequest request)
        {
            var result = _testService.SaveCandidateAnswer(request);
            if(!result)
            {
                return NoContent();
            } else
            {
                return Ok();
            }
        }

        [HttpGet("getCandidateTest")]
        public async Task<List<ShowCandidateTest>> GetCandidateTest(int candidateId)
        {
            var candidateTest = await _manageCandidateService.GetCandidateTestDetail(candidateId);
            return candidateTest;
        }
    }
}
