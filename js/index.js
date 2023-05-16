//Index Starts
let miHeader = `
<input type="checkbox" name="" id="toggler">
<label for="toggler" class="fas fa-bars"></label>

<a href="#" class="logo">LexonArg<span>.</span></a>

<nav class="nav">
    <a href="/index.html">Home</a>
    <a href="/r.dulces.html">Recetas Dulces</a>
    <a href="/r.saladas.html">Recetas Saladas</a>
    <a href="/dato.c.html">Datos Curiosos</a>

</nav>

<div class="icons">
    <a href="#" class="fas fa-star"></a>
    <a href="#" class="fas fa-star"></a>
    <a href="#" class="fas fa-star"></a>
</div>
`
document.querySelector("header").innerHTML = miHeader;

let miFooter = `
Copyright ©2023; Created By LexonArg. Members
`

document.querySelector("footer").innerHTML = miFooter;
//Index Ends

//Rest API Starts
let lon;
let lat;
let temperature = document.querySelector(".temp")
let summary = document.querySelector(".summary")
let loc = document.querySelector(".location")
let icon = document.querySelector(".icon")
const kelvin = 273.15






window.addEventListener("load", () => {


    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition((position) => {

            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            //ID API
            const api_id = "eb0327b3ea2a8aa6bd42a49e84badf54";

            const url_base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + `lon=${lon}&appid=${api_id}`;

            fetch(url_base)
                .then((response) => {
                    console.log("RESPUESTA JSON");
                    return response.json();
                })

                .then((data) => {
                    console.log("ESTA ES LA DATA")
                    console.log(data);

                    temperature.textContent =
                        Math.floor(data.main.temp - kelvin) + "ºC";
                    summary.textContent = data.weather[0].description;
                    loc.textContent = data.name + "," + " " + data.sys.country;
                });

        });


    }


});
//Rest API Ends

//Validación Starts




//Validación Ends