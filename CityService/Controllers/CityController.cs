using AutoMapper;
using AutoMapper.QueryableExtensions;
using CityService.IRepository;
using CityService.Models;
using CityService.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace CityService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityRepository _cityRepository;
        private readonly IMapper _mapper;

        public CityController(ICityRepository cityRepository, IMapper mapper)
        {
            _cityRepository = cityRepository;
            _mapper = mapper;
        }
        // GET api/festivali - preuzimanje svih festivala, sortiranih po ceni karte opadajuće;

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_cityRepository.GetAll().ProjectTo<CityDTO>(_mapper.ConfigurationProvider).ToList());
        }
        //GET api/festivali/{id} - preuzimanje festivala po zadatom id-u;

        [HttpGet("{id}")]

        public IActionResult GetFestivalById(int id)
        {
            var city = _cityRepository.GetById(id);

            if (city == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<CityDTO>(city));
        }

        //POST api/festivali - dodavanje novog festivala;
        [Authorize]
        [HttpPost]
        public IActionResult Add(City city)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _cityRepository.Add(city);
            return CreatedAtAction("GetAll", new { id = city.Id }, _mapper.Map<CityDTO>(city));

        }

        // PUT api/festivali/{id     } - izmena postojećeg festivala;
        [Authorize]
        [HttpPut("{id}")]

        public IActionResult Put(int id, City city)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != city.Id)
            {
                return BadRequest();
            }
            try
            {
                _cityRepository.Update(city);
            }
            catch
            {
                return BadRequest();
            }
            return Ok(_mapper.Map<CityDTO>(city));
        }

        // DELETE api/festivali/{id} - brisanje postojećeg festivala;
        [Authorize]
        [HttpDelete("{id}")]

        public IActionResult Delete(int id)
        {
            var city = _cityRepository.GetById(id);

            if (city == null)
            {
                return BadRequest();
            }

            _cityRepository.Delete(city);
            return NoContent();
        }
        // POST /api/search pretragu gradova sa brojem stanovnika između 2 uneta broja
        [Authorize]
        [HttpPost]
        [Route("/api/search")]
        public IActionResult SearchPopulatinbetweenTwoNumber([FromBody] SearchPopulatinbetweenTwoNumberDTO filter)
        {
            var response = _cityRepository.SearchPopulatinbetweenTwoNumber(filter);

            if (response == null)
            {
                return BadRequest();
            }
            else if (!response.Any())
            {
                return NotFound();
            }
            return Ok(response.ProjectTo<CityDTO>(_mapper.ConfigurationProvider).ToList());

        }

        //GET api/festivali/trazi?cena={vrednost}
        [HttpGet("trazi/populationNumber={vrednost}")]
        
        public IActionResult SearchPopulationToNumber(int vrednost) 
        {
            var response = _cityRepository.SearchPopulationToNumber(vrednost);
            if (response == null)
            {
                return BadRequest();
            }
            else if (!response.Any())
            {
                return NotFound();
            }
            return Ok(response.ProjectTo<CityDTO>(_mapper.ConfigurationProvider).ToList());
        }

        //GET api/festivali/lokacije?mesto={vrednost}
        [HttpGet("lokacije/mesto={vrednost}")]

        public IActionResult SearchCityById(int vrednost) 
        {
            var response = _cityRepository.SearchCityById(vrednost);
            if (response==null)
            { 
                return BadRequest();
            }  
            else if (!response.Any())
            {
                return NotFound();
            }
            
            return Ok(response.ProjectTo<CityDTO>(_mapper.ConfigurationProvider).ToList());

        }

        //GET api/prosek - 

        [HttpGet("prosek")]
        public IActionResult StatisticPopulationForCountry()
        {
            try
            {
                var response = _cityRepository.StatisticPopulationForCountry();
                if (response == null)
                {
                    return BadRequest();
                }
                else if (!response.Any())
                {
                    return NotFound();
                }
                return Ok(response);
            }
            catch (System.Exception)
            {

                throw;
            }
           
          
        }




    }

}

