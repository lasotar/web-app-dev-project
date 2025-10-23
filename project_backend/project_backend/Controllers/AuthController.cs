using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
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
            var tokens = await _authService.Login(userLoginDto);

            if (tokens == null)
            {
                return Unauthorized("Invalid credentials");
            }

            SetTokenCookies(tokens);

            return Ok(new { message = "Login successful" });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refresh-token"];
            if (refreshToken == null)
            {
                return Unauthorized("Refresh token not found.");
            }

            var tokens = await _authService.RefreshToken(refreshToken);
            if (tokens == null)
            {
                return Unauthorized("Invalid refresh token.");
            }

            SetTokenCookies(tokens);

            return Ok(new { message = "Token refreshed" });
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies["refresh-token"];
            if (refreshToken != null)
            {
                await _authService.Logout(refreshToken);
            }
            
            Response.Cookies.Delete("access-token");
            Response.Cookies.Delete("refresh-token");

            return Ok(new { message = "Logout successful" });
        }
        
        [HttpGet]
        
        private void SetTokenCookies(TokenDto tokens)
        {
            Response.Cookies.Append("access-token", tokens.AccessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(15)
            });

            Response.Cookies.Append("refresh-token", tokens.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(7)
            });
        }

        [HttpPost("reset-password")]
        [Authorize]
        public IActionResult ResetPassword()
        {
            return Ok("Reset password endpoint");
        }

        [HttpGet("role")]
        [Authorize]
        public IActionResult GetRole()
        {
            var role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

            if (role == null)
            { 
                return Unauthorized("Role not found in token.");
            }

            return Ok(new { role });
        }
        
    }
}
