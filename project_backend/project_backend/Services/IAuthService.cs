using project_backend.Dtos;

namespace project_backend.Services
{
    public interface IAuthService
    {
        Task<TokenDto> Login(UserLoginDto userLoginDto);
        Task<TokenDto> RefreshToken(string refreshToken);
        Task<bool> Logout(string refreshToken);
    }
}
