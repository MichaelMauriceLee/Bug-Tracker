using System.Threading.Tasks;
/*
 * Interface object to get the user's profile data
 */
namespace Application.Profiles
{
    public interface IProfileReader
    {
         Task<Profile> ReadProfile(string username);
    }
}