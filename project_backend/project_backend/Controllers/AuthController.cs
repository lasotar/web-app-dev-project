using Microsoft.AspNetCore.Mvc;
using project_backend.Dtos;
using project_backend.Services;

namespace project_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto userLoginDto)
        {
            var user = await _authService.Login(userLoginDto);

            if (user == null)
            {
                return NotFound("Invalid credentials");
            }

            return Ok(user);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok("Logout endpoint");
        }

        [HttpPost("reset-password")]
        public IActionResult ResetPassword()
        {
            return Ok("Reset password endpoint");
        }
    }
}
