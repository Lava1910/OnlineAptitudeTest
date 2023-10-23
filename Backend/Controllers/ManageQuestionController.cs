﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineAptitudeTestDB.Dto.Question;
using OnlineAptitudeTestDB.Interfaces;
using OnlineAptitudeTestDB.ViewModel;

namespace OnlineAptitudeTestDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class ManageQuestionController : ControllerBase
    {
        private readonly IManageQuestionService _manageQuestionService;
        public ManageQuestionController(IManageQuestionService questionService)
        {
            _manageQuestionService = questionService;
        }

        [HttpGet("getAll")]
        public async Task<List<ListQuestionViewModel>> GetAll()
        {
            var questions = await _manageQuestionService.GetAll();
            return questions;
        }     

        [HttpGet("searching")]
        public async Task<List<ListQuestionViewModel>> Searching([FromQuery]SearchQuestionForm request)
        {
            var questions = await _manageQuestionService.Searching(request);
            return questions;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(QuestionCreateRequest request)
        {
            var questionId = await _manageQuestionService.Create(request);
            if (questionId == 0)
            {
                return BadRequest("An error occurred while creating the question.");
            }
            return Ok("Question created successfully.");
        }

        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            var result = _manageQuestionService.Delete(id);
            if(result)
            {
                return Ok();
            }
            else
            {
                return NoContent();
            }
        }        
    }
}
