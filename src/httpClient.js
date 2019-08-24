import axios from 'axios';

export const getTodayWeather = (city) => {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=dc25b08075675611e70b307e5f9c93bd&units=metric';
    return axios.get(url).then(response => {
        return response.data;

    }).catch(() => {
        return false;
    });

};