//Funcionalidad general del proyecto


//Importo todo de UI, que sera como nuestro objeto que contendra todos los elementos del HTML declarados en la interface
import * as UI from './interfaz.js';
//Importamos la clase API
import { API } from './api.js';

//Asignamos a nuestros div la funcionalidad del método de buscar, y estará a la escucha por el evento submit
UI.formularioBuscar.addEventListener('submit', (e) => {
    //Preveemos errores
    e.preventDefault();

    //Importamos los div de interfaces, para estar esperando a que el usuario complete los campos, y poder obtener la info
    //La ventaja de, exportar de esta forma los div, es que cuando el método se eejecute las variables tendran los datos que ingreso el usuario
    const artista = document.querySelector('#artista').value,
        cansion = document.querySelector('#cancion').value;
    //Validamos que los campos no puedan enviarse vacios
    if (artista === '' || cansion === '') {
        //Si el usuario enviar campos vacios muestra mensaje de error
        UI.divMensajes.innerHTML = 'Campos obligatorios';
        UI.divMensajes.classList.add('error');
        setTimeout(() => {
            UI.divMensajes.innerHTML = '';
            UI.divMensajes.classList.remove('error');
        }, 2000);
    } else {
        //Si los datos son correctos realiza la consulta a la API
        //Como ya importamos la clase API, podemos realizar una instancia, siguendo la estructura del constructor
        const api = new API(artista, cansion);
        //Aplicamos la funcionalidad del metodo de consulta api a nuetro nuevo obejeto
        api.consultarAPI()
            //Ahora debemos aplicar un promise
            .then(data => {
                //Imprimimos el resultado en el HTML, validando antes, si la cansion fue encontrada o no
                //lyrics, es parte de los parametros definidos en la estructura de la API, y nos retorna la letra de la canción
                if (data.respuesta.lyrics) {
                     //Si la cancion es encontrada
                        const letra = data.respuesta.lyrics;
                        UI.divResultado.textContent= letra
                        UI.divResultado.classList.add('rest');

                } else {
                    //Si la cancion no fue encontrada
                    UI.divMensajes.innerHTML = 'La canción no fue encontrada, prueba con otros datos';
                    UI.divMensajes.classList.add('error');
                    setTimeout(() => {
                        UI.divMensajes.innerHTML = '';
                        UI.divMensajes.classList.remove('error');
                        //Cuando finalize el tiempo, limpia los campos
                        UI.formularioBuscar.reset();
                    }, 2000);
                }

            
            });
    }

});