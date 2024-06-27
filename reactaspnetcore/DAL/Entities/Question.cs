using System;
namespace reactaspnetcore.DAL.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public int ExamId { get; set; } // Sorunun ait olduğu sınav ID'si
        public string QuestionText { get; set; } // Soru metni
        public string OptionA { get; set; } // Seçenek A
        public string OptionB { get; set; } // Seçenek B
        public string OptionC { get; set; } // Seçenek C
        public string OptionD { get; set; } // Seçenek D
        public string CorrectAnswer { get; set; } // Doğru cevap

        public Exam Exam { get; set; } // Sorunun ait olduğu sınav
    }

}

