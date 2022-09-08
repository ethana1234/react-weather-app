import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null);
    
    const handleOnChange = (searchData) => {
        // Updates with entered search data
        setSearch(searchData);
        onSearchChange(searchData);
    }

    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
            geoApiOptions
        )
            .then(response => response.json())
            .then(response => {
                return {
                    // In order to display results, we need to return an options object
                    // This object contains an array of objects that include data for each result (city lat/lon)
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <AsyncPaginate
            placeholder="Search for city" // Text that's in the search box before typing
            debounceTimeout={600} // Prevents requests being sent constantly as user types in search box
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;