using CityService.IRepository;
using CityService.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace CityService.Repository
{
    public class CountryRepository : ICountryRepository
    {
        private readonly AppDbContext _context;

        public CountryRepository(AppDbContext context)
        {
            _context = context;
        }

        public void Add(Country country)
        {
            _context.Add<Country>(country);
            _context.SaveChanges();
        }

        public void Delete(Country country)
        {
            _context.Remove(country);
            _context.SaveChanges();
        }

        public IEnumerable<Country> GetAll()
        {
            return _context.Countrys;
        }

        public Country GetById(int id)
        {
            return _context.Countrys.FirstOrDefault(p => p.Id == id);
        }

        public void Update(Country country)
        {
            _context.Entry<Country>(country).State = EntityState.Modified;
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
