import React, { useState, useEffect } from 'react';
import { Search, Globe2, Loader2 } from 'lucide-react';
import CountryCard from './components/CountryCard';
import SearchBar from './components/SearchBar';
import RegionFilter from './components/RegionFilter';
import { Country } from './types';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllCountries();
  }, []);

  const fetchAllCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch countries');
      setLoading(false);
    }
  };

  const searchCountries = async (name: string) => {
    setSearchTerm(name);
    if (!name) {
      setFilteredCountries(selectedRegion 
        ? countries.filter(country => country.region === selectedRegion)
        : countries
      );
      return;
    }

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      if (response.ok) {
        const data = await response.json();
        setFilteredCountries(selectedRegion 
          ? data.filter((country: Country) => country.region === selectedRegion)
          : data
        );
      } else {
        setFilteredCountries([]);
      }
    } catch (err) {
      setError('Failed to search countries');
    }
  };

  const filterByRegion = async (region: string) => {
    setSelectedRegion(region);
    if (!region) {
      setFilteredCountries(searchTerm 
        ? countries.filter(country => 
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : countries
      );
      return;
    }

    try {
      const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      const data = await response.json();
      setFilteredCountries(searchTerm
        ? data.filter((country: Country) => 
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : data
      );
    } catch (err) {
      setError('Failed to filter countries');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            <Globe2 className="w-8 h-8" />
            <h1>Countries Explorer</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchBar searchTerm={searchTerm} onSearch={searchCountries} />
          <RegionFilter selectedRegion={selectedRegion} onRegionChange={filterByRegion} />
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <CountryCard key={country.cca3} country={country} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-lg">
                No countries found
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;