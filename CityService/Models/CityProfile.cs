using AutoMapper;
using CityService.Models.DTO;

namespace CityService.Models
{
    public class CityProfile:Profile
    {
        public CityProfile()
        {
            CreateMap<City, CityDTO>();
        }
    }
}
