cache_data = {};
paramsMapbox = {
    access_token: 'pk.eyJ1IjoiYWRhcnllIiwiYSI6ImNreWVyM3EwNjBzdzAyb3FweHVzY2prZXEifQ.ME6ildfQtTf7ldq4LGjWDg',
    limit: 5,
    language: 'es'
}



async function cache_store(value) {
    cache_data[value.query[0]] = value.features;
}
async function cache_retrieve(key) {
    return cache_data[key];
}
async function slow_funcion(input) {
    try {
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json`,
            timeout: 1000,
            params: paramsMapbox
        });

        const {data} = await instance.get();
       cache_store(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function memoize() {
    let input_place = document.getElementById('input_place').value;
    const res =  slow_funcion(input_place);
    const result =  cache_retrieve(input_place);
    
 if(res){
    console.log(res);
 }
 if(result){
    console.log(result);
 }



}