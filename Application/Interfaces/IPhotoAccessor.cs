using Application.Photos;
using Microsoft.AspNetCore.Http;
/*
 * Interface used to add and delete photos via dependency injection
 */
namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
         PhotoUploadResult AddPhoto(IFormFile file);
         string DeletePhoto(string publicId);
    }
}