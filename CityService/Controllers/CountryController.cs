using CityService.IRepository;
using CityService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CityService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly ICountryRepository _countryRepository;
        public CountryController(ICountryRepository countryRepository)
        {
            _countryRepository = countryRepository;
        }

        // GET api/mesta - preuzimanje svih mesta;



        [HttpGet]

        public IActionResult Get()
        {
            return Ok(_countryRepository.GetAll());
        }

        //GET api/mesta/{id} - preuzimanje mesta po zadatom id-u;


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var place = _countryRepository.GetById(id);
            if (place == null)
            {
                return NotFound();
            }
            return Ok(place);
        }

       


       
        [HttpPost]

        public IActionResult Add(Country country)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _countryRepository.Add(country);
            return CreatedAtAction("Get", new { id = country.Id }, country);
        }

    }
}
