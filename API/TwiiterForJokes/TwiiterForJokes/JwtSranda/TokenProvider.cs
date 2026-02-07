using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TwiiterForJokes.Entitys;
using JwtClaimNames = System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames;

namespace TwiiterForJokes.JwtSranda
{
    public sealed class TokenProvider(IConfiguration configuration)
    {

        public string Create(Usr user)
        {
            string secretKey = configuration["Jwt:Secret"]!;
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity([
                    new Claim(JwtClaimNames.Sub, user.UsrId.ToString()),
                    new Claim(JwtClaimNames.Sub, user.UserName.ToString())
                    
                ]),

                Expires = DateTime.UtcNow.AddMinutes(configuration.GetValue<int>("Jwt:MinuteExpiration")),
                SigningCredentials = credentials,
                Issuer = configuration["Jwt:Issuer"],
                Audience = configuration["Jwt:Audience"]
            };

            var handler = new JsonWebTokenHandler();
            string token = handler.CreateToken(tokenDescriptor);

            return token;
        }

    }
}
