using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace project_backend.Models
{
    [Table("users")]
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        [JsonIgnore]
        public required string PasswordHash { get; set; }
        [JsonIgnore]
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}
