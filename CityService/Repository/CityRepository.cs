using CityService.IRepository;
using CityService.Models;
using CityService.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace CityService.Repository
{
    public class CityRepository : ICityRepository
    {
        private readonly AppDbContext _context;

        public CityRepository(AppDbContext context)
        {
            _context = context;
        }

        public void Add(City city)
        {
            _context.Add<City>(city);
            _context.SaveChanges();
        }

        public void Delete(City city)
        {
            _context.Remove(city);
            _context.SaveChanges();
        }

        public IQueryable<City> GetAll()
        {
            return _context.Citys;
        }

        public City GetById(int id)
        {
            return _context.Citys.Include(c=>c.Country).FirstOrDefault(p => p.Id == id);
        }

        public IQueryable<City> SearchCityById(int vrednost)
        {
            return _context.Citys.Where(c=>c.Id== vrednost);

        }

        public IQueryable<City> SearchPopulatinbetweenTwoNumber(SearchPopulatinbetweenTwoNumberDTO filter)
        {
            return _context.Citys.Where(p => p.PopulationNumber > filter.Prvi || p.PopulationNumber<filter.Drugi).OrderBy(p => p.PopulationNumber);
        }

        public IQueryable<City> SearchPopulationToNumber(int vrednost)
        {
            return _context.Citys.Where(x => x.PopulationNumber < vrednost).OrderByDescending(x => x.Name);
        }

        public List<StatisticPopulationForCountryDTO> StatisticPopulationForCountry()
        {
            return _context.Citys.GroupBy(f => f.CountryId).Select(s =>
                       new StatisticPopulationForCountryDTO()
                       {
                           CountryName = _context.Countrys.Where(m => m.Id == s.Key).Select(k => k.Name).Single(),
                           Average = (double)s.Average(x => x.PopulationNumber)
                       })
                           .OrderBy(x => x.Average).ToList();
        }

        public void Update(City city)
        {
            _context.Entry<City>(city).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
            }
            catch
            {
                throw;
            }

        }
    }
}
