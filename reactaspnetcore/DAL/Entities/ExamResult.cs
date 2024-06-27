using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace reactaspnetcore.DAL.Entities
{
    public class ExamResult
    {
        [Key]
        public int ExamResultId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey("Exam")]
        public int ExamId { get; set; }
        public Exam Exam { get; set; }

        public int CorrectAnswers { get; set; } // Doğru cevap sayısı
        public int WrongAnswers { get; set; } // Yanlış cevap sayısı
    }
}
