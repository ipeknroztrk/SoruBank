using System;
namespace reactaspnetcore.Models
{
	public class RegisterDto
	{
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}

