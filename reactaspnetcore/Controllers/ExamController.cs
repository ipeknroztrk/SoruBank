using reactaspnetcore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using reactaspnetcore.DAL.Entities;
using reactaspnetcore.DAL.Context;

namespace reactaspnetcore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : ControllerBase
    {
        private readonly ExamDbContext _context;

        public ExamController(ExamDbContext context)
        {
            _context = context;
        }

        // GET: api/Exam
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exam>>> GetExams()
        {
            return await _context.Exams.ToListAsync();
        }

        // GET: api/Exam/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Exam>> GetExam(int id)
        {
            var exam = await _context.Exams.FindAsync(id);

            if (exam == null)
            {
                return NotFound();
            }

            return exam;
        }

        // POST api/Exam/AddExamWithQuestions
        [HttpPost("AddExamWithQuestions")]
        public async Task<IActionResult> AddExamWithQuestions([FromBody] ExamDto teacherExamDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var exam = new Exam
                {
                    ExamCode = teacherExamDTO.ExamCode,
                    ExamName = teacherExamDTO.ExamName,
                    Description = teacherExamDTO.Description,
                    GradingCriteria = teacherExamDTO.GradingCriteria,
                    TimingInfo = teacherExamDTO.TimingInfo,
                    TeacherId = teacherExamDTO.TeacherId,
                    Questions = new List<Question>()
                };

                foreach (var questionDTO in teacherExamDTO.Questions)
                {
                    var question = new Question
                    {
                        QuestionText = questionDTO.QuestionText,
                        OptionA = questionDTO.OptionA,
                        OptionB = questionDTO.OptionB,
                        OptionC = questionDTO.OptionC,
                        OptionD = questionDTO.OptionD,
                        CorrectAnswer = questionDTO.CorrectAnswer
                    };

                    exam.Questions.Add(question);
                }

                _context.Exams.Add(exam);
                await _context.SaveChangesAsync();

                return Ok("Exam and questions added successfully.");
            }
            catch (Exception ex)
            {
                // Hata ayıklama amacıyla hatayı günlüğe yaz
                Console.WriteLine($"Hata: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        // GET: api/Exam/5/questions
        [HttpGet("{id}/questions")]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestionsForExam(int id)
        {
            var questions = await _context.Questions.Where(q => q.ExamId == id).ToListAsync();

            if (questions == null || questions.Count == 0)
            {
                return NotFound("No questions found for this exam.");
            }

            return questions;
        }
        // DELETE: api/Exam/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExam(int id)
        {
            var exam = await _context.Exams.FindAsync(id);
            if (exam == null)
            {
                return NotFound();
            }

            _context.Exams.Remove(exam);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/Exam/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExam(int id, [FromBody] Exam updatedExam)
        {
            if (id != updatedExam.Id)
            {
                return BadRequest("Exam ID mismatch");
            }

            var existingExam = await _context.Exams.Include(e => e.Questions).FirstOrDefaultAsync(e => e.Id == id);
            if (existingExam == null)
            {
                return NotFound();
            }

            existingExam.ExamCode = updatedExam.ExamCode;
            existingExam.ExamName = updatedExam.ExamName;
            existingExam.Description = updatedExam.Description;
            existingExam.GradingCriteria = updatedExam.GradingCriteria;
            existingExam.TimingInfo = updatedExam.TimingInfo;

            // Update questions
            existingExam.Questions.Clear();
            foreach (var question in updatedExam.Questions)
            {
                existingExam.Questions.Add(new Question
                {
                    QuestionText = question.QuestionText,
                    OptionA = question.OptionA,
                    OptionB = question.OptionB,
                    OptionC = question.OptionC,
                    OptionD = question.OptionD,
                    CorrectAnswer = question.CorrectAnswer
                });
            }

            _context.Entry(existingExam).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool ExamExists(int id)
        {
            return _context.Exams.Any(e => e.Id == id);
        }
    }

}

  


