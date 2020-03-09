/*
 * Interface used to get the current user via dependency injection
 */
namespace Application.Interfaces
{
    public interface IUserAccessor
    {
         string GetCurrentUsername();
    }
}