using System.ComponentModel.DataAnnotations;
using System.Security.Principal;

namespace CityService.Models
{
    public class Country
    {
        public int Id { get; set; }
        [Required]
        [MinLength(3)]
        public string Name { get; set; }
        [Required]
        [Range(1, 99999)]
        public int StateCode { get; set; }
    }
}
