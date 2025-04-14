import React from 'react';
import { MapPin, Users, Globe } from 'lucide-react';
import { Country } from '../types';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={country.flags.svg} 
        alt={`Flag of ${country.name.common}`}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{country.name.common}</h2>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Capital: {country.capital?.[0] || 'N/A'}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span>Population: {country.population.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Globe className="w-4 h-4" />
            <span>Region: {country.region}</span>
          </div>
          
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Languages:</strong> {languages}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;