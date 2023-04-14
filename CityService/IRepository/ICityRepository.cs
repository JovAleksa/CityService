using CityService.Models;
using CityService.Models.DTO;
using System.Collections.Generic;
using System.Linq;

namespace CityService.IRepository
{
    public interface ICityRepository
    {
        IQueryable<City> GetAll();
        City GetById(int id);
        void Add(City city);
        void Update(City city);
        void Delete(City city);
        IQueryable<City> SearchPopulatinbetweenTwoNumber(SearchPopulatinbetweenTwoNumberDTO filter);
        IQueryable<City> SearchPopulationToNumber(int vrednost);
        IQueryable<City> SearchCityById(int vrednost);
        List<StatisticPopulationForCountryDTO> StatisticPopulationForCountry();

    }
}
