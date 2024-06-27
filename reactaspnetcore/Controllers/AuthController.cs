using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using reactaspnetcore.DAL.Context;
using reactaspnetcore.Models;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using reactaspnetcore.DAL.Entities;

namespace reactaspnetcore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly ExamDbContext _context;
        private readonly ILogger<AuthController> _logger;

        public AuthController(ExamDbContext context, ILogger<AuthController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest(new { message = "Geçersiz veri" });
                }

                _logger.LogInformation("Gelen kullanıcı adı: {Username}, Şifre: {Password}", model.Username, model.Password);

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username && u.Password == model.Password && u.Role=="Öğretmen");

                if (user != null)
                {
                    return Ok(new { message = "Giriş başarılı" });
                }
                else
                {
                    return Unauthorized(new { message = "Yetkiniz yok." });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Giriş sırasında bir hata oluştu");
                return StatusCode(500, "Sunucu hatası: " + ex.Message);
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest(new { message = "Geçersiz veri" });
                }

                var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username);

                if (existingUser != null)
                {
                    return BadRequest(new { message = "Kullanıcı adı zaten mevcut" });
                }

                var user = new User
                {
                    Username = model.Username,
                    Name = model.Name,
                    Surname = model.Surname,
                    Password = model.Password,
                    Role = model.Role,
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Kayıt başarılı" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Kayıt sırasında bir hata oluştu");
                return StatusCode(500, "Sunucu hatası: " + ex.Message);
            }
        }
    }
}
