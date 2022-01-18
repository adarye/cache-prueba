cache_data = {};
paramsMapbox = {
    access_token: 'pk.eyJ1IjoiYWRhcnllIiwiYSI6ImNreWVyM3EwNjBzdzAyb3FweHVzY2prZXEifQ.ME6ildfQtTf7ldq4LGjWDg',
    limit: 5,
    language: 'en'
}
flatFirst = false;
var startTime

async function cache_store(value) {

    cache_data[value.query.map(x => x).join(' ')] = value.features;

}
async function cache_retrieve(key) {
        if(cache_data[key]){
            printRes(cache_data[key], 'From cache');
        }

}
async function slow_funcion(input) {

    try {

        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json`,
            params: paramsMapbox
        });

        const {
            data
        } = await instance.get();
        cache_store(data);
        printRes(data.features, 'From API');
    } catch (error) {
        console.log(error);
    }
}

async function memoize(slow_funcion) {
    flatFirst = false;
    let input_place = document.getElementById('input_place').value;
    if(!input_place) return;
    startTime = performance.now()
    slow_funcion(input_place);
    cache_retrieve(input_place.toLowerCase());
}


//make document inner html with for

const printRes = (value, source) => {

    if (!flatFirst) {
        document.getElementById('first').innerHTML = "";
        document.getElementById('source').innerHTML = "";
        document.getElementById('source').innerHTML = source + ' ' + '(' + (performance.now() - startTime).toFixed(2) + ' ms)';
        flatFirst = true;
        value.forEach(element => {
            document.getElementById('first').innerHTML +=
                `<li class="list-group-item">${element.place_name}</li>`
        });
    }
}

function search() {
    memoize(slow_funcion);
}
document.getElementById('input_place').addEventListener('keyup',function(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
       search();
        e.preventDefault();
        return false;
    }
});