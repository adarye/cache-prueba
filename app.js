
cache_data = {};
paramsMapbox = {
    access_token: 'pk.eyJ1IjoiYWRhcnllIiwiYSI6ImNreWVyM3EwNjBzdzAyb3FweHVzY2prZXEifQ.ME6ildfQtTf7ldq4LGjWDg',
    limit: 5,
    language: 'es'
}
input_place = document.getElementById('input_place').value;


async function cache_store(value) {
    cache_data[query[0]].features = value.features;
}
async function cache_retrieve(key) {
    return function (...args) {
        if (cache_data[args]) {
            return cache_data[args];
        }
        let result = func.apply(this, args);
        cache_data[args] = result;
        return result;
    }
}
async function slow_funcion(input) {
    try {
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json`,
            timeout: 1000,
            params: paramsMapbox
        });

        const resp = await instance.get();
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

 async function memoize() {
     console.log(input_place);
 await slow_funcion(input_place);
    // let cache = await cache_retrieve(input_place);
    // console.log(cache)
    
}
