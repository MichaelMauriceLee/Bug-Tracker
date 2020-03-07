using Domain;
/*
 * Interface used to create JWT tokens via dependency injection
 */
namespace Application.Interfaces
{
    public interface IJwtGenerator
    {
         string CreateToken(AppUser user);
    }
}