using System;
namespace reactaspnetcore.Models
{
	public class ExamDto
	{
        public string ExamCode { get; set; }
        public string ExamName { get; set; }
        public string Description { get; set; }
        public string GradingCriteria { get; set; }
        public string TimingInfo { get; set; }
        public int TeacherId { get; set; } // Öğretmen kimliği eklendi
        public List<QuestionDto> Questions { get; set; }
    }
}

