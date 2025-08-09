import {Country, State, City} from 'country-state-city';
import fs from 'fs';

const allCountries =  Country.getAllCountries();
const allStates =  State.getAllStates();
const allCities = City.getAllCities();


const all = [
    ...allCountries.map(cnt => cnt.name),
    ...allStates.map(st => st.name),
    ...allCities.map(ct => ct.name)
]

const names = [... new Set(all)]

names.sort();

const places = {}

names.forEach(
  (name) => {
    const key = name[0].toUpperCase()
    if (!(key in places)){
      places[key] = []
      }
      places[key].push(name)
    }
)


// Save the object to a JSON file
fs.writeFileSync('./src/data/places.json', JSON.stringify(places, null, 2), 'utf-8');

console.log("JSON file saved successfully");


console.log(places)

console.log(typeof(places));
