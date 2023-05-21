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
<div class="footerContainer">
            <div class="socialIcons">
                <a href="https://www.facebook.com/CHAYANNE/?locale=es_LA" target="_blank"><i class="fa-brands fa-facebook"></i></a>
                <a href="https://www.instagram.com/leomessi/" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                <a href="https://twitter.com/SpreenDMC" target="_blank"><i class="fa-brands fa-twitter"></i></a>
                <a href="https://www.tiktok.com/@oficialgordillo?is_from_webapp=1&sender_device=pc" target="_blank"><i class="fa-brands fa-tiktok"></i></a>
                <a href="https://www.youtube.com/@ImagineDragonsVEVO" target="_blank"><i class="fa-brands fa-youtube"></i></a>
            </div>
            <div class="footerNav">
                <ul>
                    <li><a href="/index.html">Home</a></li>
                    <li><a href="/r.dulces.html">R.Dulces</a></li>
                    <li><a href="/r.saladas.html">R.Saladas</a></li>
                    <li><a href="/dato.c.html">D.Curioso</a></li>
                </ul>
            </div>
        </div>
        <div class="footerBottom">
            <p>Copyright &copy;2023; Designed by <span class="designer">LexonArg. Members</span></p>
        </div>
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
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	apellido: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	celular: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	apellido: false,
	nombre: false,
	password: false,
	correo: false,
	celular: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "celular":
			validarCampo(expresiones.celular, e.target, 'celular');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-square-xmark');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-square-xmark');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-square-xmark');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-square-xmark');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.apellido && campos.nombre && campos.password && campos.correo && campos.celular && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});
//Validación Ends