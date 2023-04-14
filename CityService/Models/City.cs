using System.ComponentModel.DataAnnotations;

namespace CityService.Models
{
    public class City
    {
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        public string Name { get; set; }
        [Required]
        [Range(1, 99999)]
        public int Zip { get; set; }
        [Required]
        [Range(1,999999999)]
        public int PopulationNumber { get; set; }
        [Required]
        public int CountryId { get; set; }
        public Country Country { get; set; }
    }
}
