import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
    const { data } =  await axios.get((url), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': '262cc5d0bemsha3558ad895ee863p1c6530jsnecf2c7d41f94'
        }
    });

    return data;
}
