const main = document.getElementById('main');
const agregarUsuario = document.getElementById('agregar-usuario');
const duplicarDinero = document.getElementById('doblar');
const mostrarMillonarios = document.getElementById('mostrar-millonarios');
const ordenar = document.getElementById('ordenar');
const calcularTotal = document.getElementById('calcular-total');

getRandomUser();
getRandomUser();
getRandomUser();
let data = [];

//LocalStorage 
let persona = [{
    nombre: prompt('Cual es tu nombre?'),
    apellido: prompt('Cual es tu apellido'),
    edad: prompt('Cuantos años tenes?')
    
}];
localStorage.setItem('usuario',JSON.stringify(persona));
const usuario = JSON.parse(localStorage.getItem('usuario'));

usuario.forEach( element => {
    let elements = document.getElementById('elements');
    let div = document.createElement('div');
    div.innerHTML = `<strong>${element.nombre}</strong> esta <span>conectado</span>`;
    elements.appendChild(div);
});


// api para un randomizador de usuarios y dinero

async function getRandomUser() {
    const res = await fetch ('https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];

    const newUser = {
        name:  `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };

    addData(newUser);
}
//doblar dinero
function duplicar() {
    data = data.map((user) => {
        return {...user,money: user.money * 2};
    });

    updateDOM();

}

//ordenar
function ordenarrico(){
    data.sort((a,b) => b.money - a.money);
    updateDOM();
}
// calcular total
function total() {
    const total = data.reduce((acc, user) => (acc += user.money), 0);

    const element = document.createElement('div');
    element.innerHTML = `<h3>Total: <strong>${formatMoney(total)}</strong></h3>`;
    main.appendChild(element);


}

//mostrar solo millonarios 

function mostrarmillonarios() {
    data = data.filter((user) => 
        user.money > 1000000
    );
    updateDOM();
}

//agregar un nuevo objeto a la array
function addData(obj) {
    data.push(obj);

    updateDOM();
}

//updatear el dom

function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Persona</strong>Dinero</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('persona');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })


}

// funcion para redifinir los numeros para que se vea como dinero solucion encontrada en stackoverflow
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67
  }



//botones
agregarUsuario.addEventListener('click',getRandomUser);
duplicarDinero.addEventListener('click',duplicar);
mostrarMillonarios.addEventListener('click',mostrarmillonarios);
ordenar.addEventListener('click',ordenarrico);
calcularTotal.addEventListener('click',total);