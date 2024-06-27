
using reactaspnetcore.Models;
using System;
namespace reactaspnetcore.DAL.Entities
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        // Diğer gerekli alanlar (ad, soyad, e-posta vb.)

        public ICollection<Exam> Exams { get; set; } // Bir öğretmenin sınavları
    }
}