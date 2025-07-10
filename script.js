let indexPregunta = 0;
const preguntas = [
  {
    pregunta: "¿En qué fecha nos vimos por primera vez en persona?",
    respuestas: ["24 de noviembre del 2024", "24/11/2024", "cumpleaños de tu amigo"]
  },
  {
    pregunta: "¿Cuál es nuestro plato de comida favorito?",
    respuestas: ["pollo a la brasa", "pollo"]
  },
  {
    pregunta: "¿Dónde fue nuestro primer beso?",
    respuestas: ["en mi cuarto", "cuarto", "en el cuarto", "en la cama", "cama"]
  },
  {
    pregunta: "¿Qué lugar siempre decimos que queremos visitar juntos?",
    respuestas: ["el valle", "el campo", "egipto", "europa", "francia", "japon", "australia", "suecia"]
  },
  {
    pregunta: "Nombra un apodo que te puse aparte de los comunes que te digo",
    respuestas: ["papita con huevo", "tamalito", "huevito de codorniz", "chicharroncito"]
  }
];

let cartaAbierta = false;

function abrirCarta() {
  const carta = document.querySelector('.letter');
  const secciones = document.querySelectorAll('.acciones, .seccion');
  const sonido = document.getElementById("audioOpen");

  if (!cartaAbierta) {
    carta.style.display = 'block';
    carta.style.animation = 'aparecer 0.5s ease-out forwards';
    secciones.forEach(s => s.style.display = 'none');
    lanzarConfeti();

    // ✅ Intenta reproducir
    sonido.currentTime = 0;
    sonido.play().catch(e => {
      console.log("No se pudo reproducir el sonido de apertura:", e);
    });

    cartaAbierta = true;
  }
}

function cerrarCarta(event) {
  event.stopPropagation();
  const carta = document.querySelector('.letter');
  const secciones = document.querySelectorAll('.acciones, .seccion');
  const sonido = document.getElementById("audioClose");

  carta.style.animation = 'desaparecer 0.4s ease-in forwards';
  sonido.play();

  setTimeout(() => {
    carta.style.display = 'none';
    secciones.forEach(s => s.style.display = '');
    cartaAbierta = false;
  }, 400);
}

function mostrarGaleria() {
  ocultarSecciones();
  document.getElementById('galeria').style.display = 'block';
}

function mostrarMusica() {
  ocultarSecciones();
  document.getElementById('musica').style.display = 'block';
}

function reproducirMusica() {
  const selector = document.getElementById("selectorMusica");
  const player = document.getElementById("audioPlayer");
  const contenedor = document.getElementById("reproductor");
  const frase = document.getElementById("fraseCancion");

  const seleccion = selector.value;

  const canciones = {
    waiting: {
      src: "assets/Waiting for a Girl like You.mp3",
      texto: "Lo que sentía antes de conocerte… como si te hubiera estado esperando toda mi vida."
    },
    love: {
      src: "assets/I Want to Know What Love Is (2017 Remaster).mp3",
      texto: "Todo eso que no sabía del amor, lo estoy entendiendo contigo."
    },
    vienna: {
      src: "assets/Billy Joel - Vienna (Audio) (Official Audio).mp3",
      texto: "Para que sepas que no tenemos que correr, vamos a nuestro ritmo, juntitos."
    },
    iris: {
      src: "assets/Iris.mp3",
      texto: "Porque contigo no tengo que fingir nada… así tal cual soy, tú me haces sentir bien."
    },
    creep: {
      src: "assets/Radiohead - Creep.mp3",
      texto: "A veces no me siento suficiente… pero aun así me eliges, y eso lo cambia todo."
    },
    melancholy: {
      src: "assets/On Melancholy Hill.mp3",
      texto: "Mi refugio favorito es donde estás tú, incluso en los malos días."
    },
    apocalypse: {
      src: "assets/Apocalypse - Cigarettes After Sex.mp3",
      texto: "La tranquilidad que siento cuando te abrazo fuerte, como si nada más importara."
    },
    yellow: {
      src: "assets/Coldplay - Yellow (Official Video).mp3",
      texto: "Porque para mí, tú haces que todo brille."
    },
    sweet: {
      src: "assets/Sweet Dreams, TN.mp3",
      texto: "Aunque estés lejos, igual pienso en ti antes de dormir... eres mi primer y último mensaje del día, siempre."
    },
    magia: {
      src:"assets/La Magia - Little Jesus.mp3",
      texto: "Contigo todo es más chévere… como si tuvieras una magia que hace que todo mejore sin darte cuenta."
    },
    joke: {
      src: "assets/I Started A Joke.mp3",
      texto: "A veces me cuesta decir lo que siento sin arruinarlo, pero contigo aprendí que no tengo que ser perfecto para que me quieras."
    },
    sabor: {
      src: "assets/Sabor a Mí.mp3",
      texto: "Porque aunque pase el tiempo, sé que algo de mí siempre se va a quedar contigo y viceversa mi amor."
    }
  };

  if (canciones[seleccion]) {
    player.src = canciones[seleccion].src;
    frase.innerText = canciones[seleccion].texto;
    contenedor.style.display = "block";
    player.play();
  } else {
    frase.innerText = "";
    contenedor.style.display = "none";
    player.pause();
  }
}

function mostrarTrivia() {
  ocultarSecciones();
  document.getElementById('trivia').style.display = 'block';
  document.getElementById('pregunta').innerText = preguntas[indexPregunta].pregunta;
}

function verificar() {
  const r = document.getElementById('respuesta').value.trim().toLowerCase();
  const { respuestas } = preguntas[indexPregunta];
  const resultado = document.getElementById('resultado');

  if (respuestas.includes(r)) {
    resultado.innerText = "Si te acuerdas mi pichón ❤️";
    indexPregunta++;
    if (indexPregunta < preguntas.length) {
      document.getElementById('pregunta').innerText = preguntas[indexPregunta].pregunta;
      document.getElementById('respuesta').value = '';
    } else {
      resultado.innerText += " Respondiste todo bien corazón. Ahora ya tu sabe 😏";
    }
  } else {
    resultado.innerText = "Mmm... inténtalo de nuevo sonsita 😅";
  }
}

function mostrarChat() {
  ocultarSecciones();
  document.getElementById('chat').style.display = 'block';
}

function ocultarSecciones() {
  document.querySelectorAll('.seccion').forEach(el => el.style.display = 'none');
}

let indexImagen = 0;

function moverCarrusel(direccion) {
  const track = document.querySelector('.carousel-track');
  const imagenes = track.querySelectorAll('img');
  const total = imagenes.length;

  indexImagen += direccion;

  if (indexImagen < 0) indexImagen = total - 1;
  if (indexImagen >= total) indexImagen = 0;

  const ancho = track.clientWidth;
  const desplazamiento = -indexImagen * ancho;
  track.style.transform = `translateX(${desplazamiento}px)`;
}

function crearCorazonesFlotantes() {
  const contenedor = document.querySelector('.floating-hearts');
  setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = '💖';

    // Posición y tamaño aleatorios
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';

    contenedor.appendChild(heart);

    // Eliminar el corazón cuando termina la animación
    setTimeout(() => {
      heart.remove();
    }, 10000);
  }, 300); // Crea un corazón cada 300ms
}

// Ejecutar al cargar la página
crearCorazonesFlotantes();
