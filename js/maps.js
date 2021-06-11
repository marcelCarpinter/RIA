const holidayURL = `https://calendarific.com/api/v2/holidays?&api_key=7218e49ce27d5a9c0f3748f1eb07dacf39c17579`;
const token = "pk.eyJ1Ijoicm9taW5hdmVyYSIsImEiOiJja3AydTR1OTIxMHBsMm5vNHRtMHFkMGU4In0.NKItVT5gX4a78AboYQ_Ngg";
const banderas = document.getElementById('banderas');
//FILTRO POR AÑO
const fecha = new Date();
var anio = fecha.getFullYear();
var gl_type = '';
var gl_countryCode = '';
var gl_filterType = '';
let table;

const listCountryInfo = 
data => {
    let elementos = ''          
        data.forEach(item => {
        elementos += `
        <div class="row">
           <div class="col-sm-12 contenido">
                 <div class="card-content">
                    <div class="row">
                        <div class="col-sm-12">
                            <h5>Datos del País:</h5>
                        </div>
                        <div class="col-sm-12">
                            <img src="${item.flag}" alt="" class="img-fluid" title="${item.name}">
                            <h6>País:</h6>
                            <p>${item.name}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <h6>Capital:</h6>
                            <p>${item.capital}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <h6>Población: </h6>
                            <p>${item.population}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <h6>Región: </h6>
                            <p>${item.region}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <h6>Sub Región: </h6>
                            <p>${item.subregion}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <h6>Área: </h6>
                            <p>${item.area}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <h6>Código:</h6>
                            <p>${item.alpha2Code}</p>
                        </div>                              
                    </div>
                </div>
           </div>
        </div>
        `
    });
    banderas.innerHTML = elementos
      
}

function actualizarAnio(){
    anio = document.getElementById('sanio').value;
    console.log(anio);
    if(gl_countryCode == ''){
        return false;
    }
    getHolidays();
}

function filterType(){
    if(gl_countryCode == ''){
        return false;
    }
    gl_filterType = document.getElementById('holidayType').value;
    getHolidays();
}


function listHolidays(list){
    let html = '';
    //Carga los datos en tabla  
    console.log(list);
    let holidaysList = [];
    if(list.holidays && list.holidays.length){
       for(let l of list.holidays){
            let datetime = l.date.datetime;
            html+= '<tr>' + 
            '<td>'+datetime.day+'/'+datetime.month+'/'+datetime.year+'</td>'+
            '<td>'+l.name+'</td>'+
            '<td>'+l.description+'</td>'+
            '<td>'+l.type+'</td>'+
            '</tr>';   
            holidaysList.push({
                name: l.name, 
                description: l.description,
                type: l.type,
                date: datetime.day+'/'+datetime.month+'/'+datetime.year
            })         
        } 
    }
    if ( jQuery.fn.dataTable.isDataTable( '#tabla' ) ) {
        //table = jQuery('#tabla').DataTable();
        table.destroy();
    }
    console.log(holidaysList);
    table = jQuery('#tabla').DataTable( {
        "responsive": true,
        data: holidaysList,
        columns: [
            {data: 'date'},
            {data: 'name'},
            {data: 'description'},
            {data: 'type'}
        ],
        "pagingType": "simple_numbers",
        "language": {
            "lengthMenu": "Mostrando _MENU_ filas por página",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando _PAGE_ de _PAGES_ páginas",
            "infoEmpty": "No hay datos disponibles",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "search": "Buscar",
            "paginate": {
                "first":      "Primera",
                "last":       "Última",
                "next":       "Sig.",
                "previous":   "Ant."
            },
        }
     });
    //jQuery("#tabla tbody").html(html);
    //PAGINACION
    //document.getElementById('holidays').innerHTML = html;
    /*if ( jQuery.fn.dataTable.isDataTable( '#tabla' ) ) {
        //table = jQuery('#tabla').DataTable();
        console.log('Tabla', table);
    }
    else {
        table = jQuery('#tabla').DataTable( {
             "pagingType": "simple_numbers",
            "language": {
                "lengthMenu": "Mostrando _MENU_ filas por página",
                "zeroRecords": "No se encontraron datos",
                "info": "Mostrando _PAGE_ de _PAGES_ páginas",
                "infoEmpty": "No hay datos disponibles",
                "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                "search": "Buscar",
                "paginate": {
                    "first":      "Primera",
                    "last":       "Última",
                    "next":       "Sig.",
                    "previous":   "Ant."
                },
            }
         });
    }*/
}

function getCountryData(){

    let countryInfoURL = 'https://restcountries.eu/rest/v2/alpha?codes='+gl_countryCode;
    fetch(countryInfoURL)
    .then(response => response.json())
    .then(json => listCountryInfo(json));

}

/*function filterHolidaysByType(value=''){
    let params = 'type='+value;
    let url = holidayURL+`&country=${gl_countryCode}&year=${anio}`;
    if(value != ''){
        url += '&'+params;
    } 
    fetch(url)
    .then(response => response.json())
    .then(json => listHolidays(json.response));
}*/

function getHolidays(){
    let url = holidayURL+`&country=${gl_countryCode}&year=${anio}`;
    if(gl_filterType != ''){
        let params = 'type='+gl_filterType;
        url += '&'+params;
    } 
    fetch(url)
    .then(response => response.json())
    .then(json => listHolidays(json.response));
}

function getData(e){
    let countryURL = 
    `http://www.mapquestapi.com/geocoding/v1/reverse?key=fRxfU0rJDSkWBgeJjt6GKkAV4avF8zD5&location=${e.lngLat.lat},${e.lngLat.lng}
    &includeRoadMetadata=true&includeNearestIntersection=true`;    
        
    fetch(countryURL)
    .then(response => response.json())
    .then(info => {
        console.log(info);
        gl_countryCode = info.results[0].locations[0].adminArea1;
        getCountryData();
        getHolidays();
        jQuery('.container-holidays').removeClass('hidden');
        jQuery('html, body').animate({
            scrollTop: (jQuery("#banderas").offset().top -2)
        }, 2000);
    });
}

document.addEventListener("DOMContentLoaded", e => {
        mapboxgl.accessToken = token;
        
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            "zoom": 2,
            minZoom: 2,
            maxZoom: 2
        });

        map.on('load', function () {
            var width = 64; // The image will be 64 pixels square
            var bytesPerPixel = 4; // Each pixel is represented by 4 bytes: red, green, blue, and alpha.
            var data = new Uint8Array(width * width * bytesPerPixel);
             
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < width; y++) {
                    var offset = (y * width + x) * bytesPerPixel;
                    data[offset + 0] = (y / width) * 255; // red
                    data[offset + 1] = (x / width) * 255; // green
                    data[offset + 2] = 128; // blue
                    data[offset + 3] = 255; // alpha
                }
            }
     
        map.addSource('point', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                        {
                        'type': 'Feature',
                        'geometry': {
                        'type': 'Point',
                        'coordinates': [0, 0]
                        }
                    }
                ]
            }
        });

        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'point',
            'layout': {
                'icon-image': 'gradient'
            }
        });


        });

    //Funcionalidades extras
    //Buscador
    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    }));

    // disable map zoom when using scroll
    map.scrollZoom.disable();
    //Control de navegacion
    map.addControl(new mapboxgl.NavigationControl());
    //Pantalla completa
    map.addControl(new mapboxgl.FullscreenControl());
    //Geolocalizacion
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));

    map.on('click', function (e) {
        getData(e, true);
    });
})