$(document).ready(()=>{
    console.log("jQuery y el document estan listos!")
    
    // Declaración de Variables
    var idCartaAbierta1;
    var srcCartaAbierta1;
    var idCartaAbierta2;
    var srcCartaAbierta2;
    let tiempo = 0;

    let tiempoInicial;
    let tiempoFinal;
    let tiempoUtilizado;
    
    // Inicializar Variables
    let cartasDestapadas = 0;
    let aciertos = 0;
    let cartaTapada = `./IMG/carta-volteada.jpg`;

    // Declarar arreglo
    let recordArray = [];

    // Cargar las cookies
    Cookies.get("records-array");

    // Mostrar los records anteriores
    if (recordArray.length > 0){
        for (let i = 0; i <= recordArray.length; i++) {
            $(`#listaHistorial`).prepend(`<li>.- Done in: ${tiempo} sec.</li>`);
        }
    }
    
    $("#iniciar-reiniciar").click(function(){

        // Reiniciamos el temporizador
        tiempo = 0;

        // Se reinicia el contador de cartas despatadas
        cartasDestapadas = 0;

        // Se reinicia el contador de aciertos
        aciertos = 0;
        $("#nroAciertos").text(aciertos);
        
        // Iniciamos el conteo del Temporizador
        tiempoInicial = (new Date()).getTime();
        let diasI = tiempoInicial/(60*1000*60*24);
        let horasI = ((diasI - Math.floor(diasI))*24);
        let minutosI = ((horasI - Math.floor(horasI))*60);
        let segundosI = (minutosI - Math.floor(minutosI))*60;
            
        $("#tiempos > h5:nth-child(2)").text(`${Math.floor(horasI)} H: ${Math.floor(minutosI)} M, ${Math.floor(segundosI)} S`);

        // Tiempos en cero
        tiempoFinal = 0;
        let diasF = tiempoFinal / (60 * 1000 * 60 * 24);
        let horasF = ((diasF - Math.floor(diasF)) * 24);
        let minutosF = ((horasF - Math.floor(horasF)) * 60);
        let segundosF = (minutosF - Math.floor(minutosF)) * 60;

        tiempoUtilizado = 0;
        let diasU = tiempoUtilizado / (60 * 1000 * 60 * 24);
        let horasU = ((diasU - Math.floor(diasU)) * 24);
        let minutosU = ((horasU - Math.floor(horasU)) * 60);
        let segundosU = (minutosU - Math.floor(minutosU)) * 60;

        // Mostrar Tiempos
        // Finalizacion
        $("#tiempos > h5:nth-child(4)").text(`${Math.floor(horasF)} H: ${Math.floor(minutosF)} M, ${Math.floor(segundosF)} S`);

        // Utilizado
        $("#tiempos > h5:nth-child(6)").text(`${Math.floor(minutosU)} M, ${Math.floor(segundosU)} S`);

        $("#tiempos > h5:nth-child(4)").fadeOut(400);
        $("#tiempos > h5:nth-child(6)").fadeOut(400);

        // Cambiar de Iniciar a reiniciar
        $("#iniciar-reiniciar").text("RESTART");

        // Introduccion de Cartas
        $(".imgCarta").slideDown(600);

        // Baraja volteada hacia abajo (sin destapar).
        $(".imgCarta").fadeOut(700);
        $(".imgCarta").attr(`src`, cartaTapada);
        $(".imgCarta").fadeIn(700);

        // Generación de números aleatorios
        let numeros = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];

        // Colocar elementos del arreglo de forma aleatoria
        numeros = numeros.sort(() => {
            return Math.random() - 0.5;
        })
        console.log(numeros);

        // Asignacion de las imagenes a las cartas
        for (let i = 0; i <= 15; i++) {
            $(`#carta-${i}`).attr({
                'title' : `./IMG/avion${numeros[i]}.jpg`,
                'alt' : `avion${numeros[i]}`
            });
            console.log(`#carta-${i} se la asignará la imagen: avion${numeros[i]}`);
        }
    })
    
    $(".imgCarta").click(function() {
        
        $(this).fadeOut(700);
        let asignarSrc = $(this).attr(`title`);
        $(this).attr(`src`, asignarSrc);
        $(this).fadeIn(700);
        
        // Contar cartas destapadas
        cartasDestapadas++;
        console.log(`Cantidad de cartas destapadas = ${cartasDestapadas}`);

        if (cartasDestapadas == 1) {

            // Agregue a la imagen una clase CSS para que se le vea un borde de color
            $("#imgRef img").removeClass("imgRef-seleccionada");
            $(this).addClass("imgRef-seleccionada");

            // Se guarda en variables el SRC e ID de la PRIMERA carta destapada
            idCartaAbierta1 = $(this).attr(`id`);
            srcCartaAbierta1 = $(this).attr(`src`);
            console.log(`El SRC de ${idCartaAbierta1} es: ${srcCartaAbierta1}`);

        } else if (cartasDestapadas == 2) {

            // Agregue a la imagen una clase CSS para que se le vea un borde de color
            $("#imgRef img").removeClass("imgRef-seleccionada");
            $(this).addClass("imgRef-seleccionada");

           // Se guarda en variables el SRC e ID de la PRIMERA carta destapada
           idCartaAbierta2 = $(this).attr(`id`);
           srcCartaAbierta2 = $(this).attr(`src`);
           console.log(`El SRC de ${idCartaAbierta2} es: ${srcCartaAbierta2}`);
        }

        if (cartasDestapadas == 2 && srcCartaAbierta1 == srcCartaAbierta2) {
            
            // Incremetar los aciertos
            aciertos++;
            console.log(`Aciertos = ${aciertos}`);
            
            // Mostrar acierto
            $("#nroAciertos").text(aciertos);
            $("#indicadorAcierto").css(`color`,`green`);
            $("#indicadorAcierto").text("SUCCESS");
            $("#indicadorAcierto").fadeIn(500).fadeOut(2500);

            // Cuando se completan los 8 aciertos
            if (aciertos == 8){
                $("#victoria").text("¡VICTORY!");
                $("#victoria").fadeIn(500).fadeOut(3500);
                
                // Cálculos del tiempo
                tiempoFinal = (new Date()).getTime();
                let diasF = tiempoFinal/(60*1000*60*24);
                let horasF = ((diasF - Math.floor(diasF))*24);
                let minutosF = ((horasF - Math.floor(horasF))*60);
                let segundosF = (minutosF - Math.floor(minutosF))*60;

                tiempoUtilizado = tiempoFinal - tiempoInicial;
                let diasU = tiempoUtilizado/(60*1000*60*24);
                let horasU = ((diasU - Math.floor(diasU))*24);
                let minutosU = ((horasU - Math.floor(horasU))*60);
                let segundosU = (minutosU - Math.floor(minutosU))*60;

                // Mostrar Tiempos
                // Finalizacion
                $("#tiempos > h5:nth-child(4)").text(`${Math.floor(horasF)} H: ${Math.floor(minutosF)} M, ${Math.floor(segundosF)} S`);
                $("#tiempos > h5:nth-child(4)").fadeIn(400);

                // Utilizado
                $("#tiempos > h5:nth-child(6)").text(`${Math.floor(minutosU)} M, ${Math.floor(segundosU)} S`);
                $("#tiempos > h5:nth-child(6)").fadeIn(400);
                
                // Mostrar en el historial de records
                let tiempoMostrar = $(`#listaHistorial`).prepend(`<li>.- Done in: ${`${Math.floor(minutosU)} M, ${Math.floor(segundosU)} S`}</li>`);
                
                clearInterval(tiempoUtilizado);
                
                recordArray.unshift(tiempoMostrar);
                Cookies.set("records-array",JSON.stringify(recordArray), {expires:7, path: ''})

                for (let i = 0; i <= recordArray.length; i++) {
                    $(`#listaHistorial`).prepend(recordArray[i]);
                }
            }
            
            // Reiniciar contador de cartas destapadas
            cartasDestapadas = 0;
            console.log(`Cantidad de cartas destapadas al ACERTAR = ${cartasDestapadas}`);
        
        }else if (cartasDestapadas == 2 && srcCartaAbierta1 != srcCartaAbierta2) {

            // Mostrar fallo
            $("#indicadorAcierto").css(`color`,`red`);
            $("#indicadorAcierto").text("YOU FAILED");
            $("#indicadorAcierto").fadeIn(500).fadeOut(2500);

            setTimeout(()=>{

                // Carta Abierta 1
                console.log(`SRC de ${idCartaAbierta1} ANTES de modificar: ${$(idCartaAbierta1).attr(`src`)}`);
                                
                if (idCartaAbierta1 == $(`#carta-0`).attr(`id`)){
                    $(`#carta-0`).attr('src', cartaTapada);
                }else if (idCartaAbierta1 == $(`#carta-1`).attr(`id`)){
                    $(`#carta-1`).attr('src', cartaTapada);
                }else if (idCartaAbierta1 == $(`#carta-2`).attr(`id`)){
                    $(`#carta-2`).attr('src', cartaTapada);
                }else if (idCartaAbierta1 == $(`#carta-3`).attr(`id`)){
                    $(`#carta-3`).attr('src', cartaTapada);
                }else if (idCartaAbierta1 == $(`#carta-4`).attr(`id`)){
                    $(`#carta-4`).attr('src', cartaTapada);
                }else if (idCartaAbierta1 == $(`#carta-5`).attr(`id`)){
                    $(`#carta-5`).attr('src', cartaTapada);
                }else if (idCartaAbierta1 == $(`#carta-6`).attr(`id`)){
                    $(`#carta-6`).attr('src', cartaTapada);
                }else if (idCartaAbierta1 == $(`#carta-7`).attr(`id`)){
                    $(`#carta-7`).attr('src', cartaTapada);
                }else if (idCartaAbierta1 == $(`#carta-8`).attr(`id`)){
                    $(`#carta-8`).attr('src', cartaTapada);
                }else if (idCartaAbierta1 == $(`#carta-9`).attr(`id`)){
                    $(`#carta-9`).attr('src', cartaTapada);
                }else if (idCartaAbierta1 == $(`#carta-10`).attr(`id`)){
                    $(`#carta-10`).attr('src', cartaTapada);
                }else if (idCartaAbierta1 == $(`#carta-11`).attr(`id`)){
                    $(`#carta-11`).attr('src', cartaTapada);
                }else if (idCartaAbierta1 == $(`#carta-12`).attr(`id`)){
                    $(`#carta-12`).attr('src', cartaTapada);
                }else if (idCartaAbierta1 == $(`#carta-13`).attr(`id`)){
                    $(`#carta-13`).attr('src', cartaTapada);
                }else if (idCartaAbierta1 == $(`#carta-14`).attr(`id`)){
                    $(`#carta-14`).attr('src', cartaTapada);
                }else if (idCartaAbierta1 == $(`#carta-15`).attr(`id`)){
                    $(`#carta-15`).attr('src', cartaTapada);
                }
                console.log(`SRC de ${idCartaAbierta1} DESPUES de modificar: ${$(idCartaAbierta1).attr(`src`)}`);

               // Carta Abierta 2
                console.log(`SRC de ${idCartaAbierta2} ANTES de modificar: ${$(idCartaAbierta2).attr(`src`)}`);
                
                if (idCartaAbierta2 == $(`#carta-0`).attr(`id`)){
                    $(`#carta-0`).attr('src', cartaTapada);
                }else if (idCartaAbierta2 == $(`#carta-1`).attr(`id`)){
                    $(`#carta-1`).attr('src', cartaTapada);
                }else if (idCartaAbierta2 == $(`#carta-2`).attr(`id`)){
                    $(`#carta-2`).attr('src', cartaTapada);
                }else if (idCartaAbierta2 == $(`#carta-3`).attr(`id`)){
                    $(`#carta-3`).attr('src', cartaTapada);
                }else if (idCartaAbierta2 == $(`#carta-4`).attr(`id`)){
                    $(`#carta-4`).attr('src', cartaTapada);
                }else if (idCartaAbierta2 == $(`#carta-5`).attr(`id`)){
                    $(`#carta-5`).attr('src', cartaTapada);
                }else if (idCartaAbierta2 == $(`#carta-6`).attr(`id`)){
                    $(`#carta-6`).attr('src', cartaTapada);
                }else if (idCartaAbierta2 == $(`#carta-7`).attr(`id`)){
                    $(`#carta-7`).attr('src', cartaTapada);
                }else if (idCartaAbierta2 == $(`#carta-8`).attr(`id`)){
                    $(`#carta-8`).attr('src', cartaTapada);
                }else if (idCartaAbierta2 == $(`#carta-9`).attr(`id`)){
                    $(`#carta-9`).attr('src', cartaTapada);
                }else if (idCartaAbierta2 == $(`#carta-10`).attr(`id`)){
                    $(`#carta-10`).attr('src', cartaTapada);
                }else if (idCartaAbierta2 == $(`#carta-11`).attr(`id`)){
                    $(`#carta-11`).attr('src', cartaTapada);
                }else if (idCartaAbierta2 == $(`#carta-12`).attr(`id`)){
                    $(`#carta-12`).attr('src', cartaTapada);
                }else if (idCartaAbierta2 == $(`#carta-13`).attr(`id`)){
                    $(`#carta-13`).attr('src', cartaTapada);
                }else if (idCartaAbierta2 == $(`#carta-14`).attr(`id`)){
                    $(`#carta-14`).attr('src', cartaTapada);
                }else if (idCartaAbierta2 == $(`#carta-15`).attr(`id`)){
                    $(`#carta-15`).attr('src', cartaTapada);
                }
                console.log(`SRC de ${idCartaAbierta2} DESPUES de modificar: ${$(idCartaAbierta2).attr(`src`)}`);
                
                // NOTA: PROFESOR, NO LOGRE UNA FORMA MAS ADECUADA / ELEGANTE DE HACER QUE LAS CARTAS SE COLOQUEN TAPADAS CUANDO EL JUGADOR NO DESTAPA 2 CARTAS IGUALES, POR FAVOR ME PUEDE INDICAR COMO SE HACE ESTO?, PASE HORAS INTENTANDO CON VARIAS COSAS Y NO LOGRE DAR CON LA RESPUESTA, MUCHAS GRACIAS DE ANTEMANO
                
                cartasDestapadas = 0;
                console.log(`Cantidad de cartas destapadas al FALLAR = ${cartasDestapadas}`);
            },2000);
        }
    })
})