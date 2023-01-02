import React from 'react';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input';

function SelectCountry({ selectedCountry, setSelectedCountry, labels }) {
  return (
    <select
      value={selectedCountry}
      onChange={(event) => setSelectedCountry(event.target.value || undefined)}
    >
      <option value="">{labels.ZZ}</option>
      {getCountries().map((country) => (
        <option key={country} value={country}>
          {labels[country]}
          {' '}
          +
          {getCountryCallingCode(country)}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
