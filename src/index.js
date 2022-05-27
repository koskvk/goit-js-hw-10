import fetchCountries from './fetchCountries';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    queryInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.queryInput.addEventListener('input', debounce(onQueryInputChange, DEBOUNCE_DELAY));

function onQueryInputChange() {
    const query = refs.queryInput.value.trim();

    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';

    if (query) {
        fetchCountries(query)
            .then(dataProcessing)
            .catch(eror => {
                Notify.failure('Oops, there is no country with that name');
                console.log(eror);
            })
    }
}

function dataProcessing(data) {
    if (data.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name.');
    };

    markup(data);
}

function markup(data) {
    const markupCountryList = data.map(({ flags: { svg }, name: { official } }) => {
        return `<li><img class = 'country-flag' src='${svg}' alt='${official}' width = '35'>${official}</li>`
    })
    .join('');
    
    if (data.length === 1) {
        const fildLanguage = Object.values(data[0].languages);
        const markupCountryInfo = `
        <ul class = 'list'>
            <li><spam class = 'country-info-fieldname'>Capital</spam>: ${data[0].capital}</li>
            <li><spam class = 'country-info-fieldname'>Population</spam>: ${data[0].population}</li>
            <li><spam class = 'country-info-fieldname'>Languages</spam>: ${fildLanguage}</li>
        </ul>
        `;

        refs.countryInfo.insertAdjacentHTML('afterbegin', markupCountryInfo);
    };

    return refs.countryList.insertAdjacentHTML('afterbegin', markupCountryList);
}



