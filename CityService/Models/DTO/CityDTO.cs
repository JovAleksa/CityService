using System.ComponentModel.DataAnnotations;

namespace CityService.Models.DTO
{
    public class CityDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }
      
        public int Zip { get; set; }
       
        public int PopulationNumber { get; set; }
       
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public int CountryStateCode { get; set; }
    }
}
