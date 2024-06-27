using reactaspnetcore.Models;
using System;
namespace reactaspnetcore.DAL.Entities
{
    public class Exam
    {
        public int Id { get; set; }
        public string ExamCode { get; set; } // Sınav kodu
        public string ExamName { get; set; } // Sınav adı
        public string Description { get; set; } // Açıklama
        public string GradingCriteria { get; set; } // Puanlama kriterleri
        public string TimingInfo { get; set; } // Zamanlama bilgileri

        public int TeacherId { get; set; } // Sınavı oluşturan öğretmenin ID'si
        public User Teacher { get; set; } // Sınavı oluşturan öğretmen

        public ICollection<Question> Questions { get; set; } // Sınavın soruları
        public ICollection<ExamResult> ExamResults { get; set; }
    }
}