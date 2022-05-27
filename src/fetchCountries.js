export default function fetchCountries(name) {
    const url = 'https://restcountries.com/v3.1/name/';
    const filterResponse = '?fields=name,capital,population,flags,languages';

    return fetch(`${url}${name}${filterResponse}`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }

            throw new Error(response.status);
    });
};