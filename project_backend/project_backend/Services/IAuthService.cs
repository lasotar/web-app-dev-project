using project_backend.Models;
using project_backend.Dtos;

namespace project_backend.Services
{
    public interface IAuthService
    {
        Task<User> Login(UserLoginDto userLoginDto);
    }
}
