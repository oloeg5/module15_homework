// Task 1

const btn = document.querySelector('.button1');
const svg1 = document.querySelector('.svg1');

btn.addEventListener('click', () => {
  svg1.classList.toggle('svg2');
});

// Task 2

const btn2 = document.querySelector('.button2');

btn2.addEventListener("click", () => {
  alert(`Width of your screen = ${window.screen.width} px, and height = ${window.screen.height} px`)
})

// Task 3

const wsUri = 'wss://echo-ws-service.herokuapp.com';

const send = document.querySelector('.send');
const geolocation = document.querySelector('.geolocation');
const output = document.querySelector('.output');
const state = document.querySelector('.state');
const input = document.querySelector('.input');

let websocket;

function pageLoaded() {
  websocket = new WebSocket(wsUri);
  websocket.onopen = () => {
    state.innerHTML = 'Connected';
  };
  websocket.onerror = () => {
    state.innerHTML = 'Connection failed'
    state.classList = "error"; 
  };
  websocket.onmessage = (event) => {
    writeToScreen(event.data, true);
  }
}

function writeToScreen(message, isRecived) {
  let messageHTML = `<div class= "${isRecived? "answer": "message"}">${message}</div>`;
  output.innerHTML += messageHTML; 
}

send.addEventListener('click', () => {
  if(!input.value){
    input.classList.add('input-error');
    return} ;
  if(input.value.trim() === ""){
    input.classList.add('input-error');
    input.value = "";
    return;
  } else {
    input.classList.remove('input-error');
    websocket.send(input.value);
    writeToScreen(input.value, false);
    input.value = "";
  };
})

let mapLink;

const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Your location';
}

geolocation.addEventListener('click', () => {
  mapLink = document.createElement('a');
  mapLink.target = 'blank';
  mapLink.classList.add('answer');
  mapLink.innerHTML = 'Your location';
  output.appendChild(mapLink);
  
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

document.addEventListener("DOMContentLoaded", pageLoaded);