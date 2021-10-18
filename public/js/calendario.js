document.addEventListener('DOMContentLoaded', function() {

    let formulario = document.querySelector("form");

    var calendarEl = document.getElementById('calendario');

    var calendar = new FullCalendar.Calendar(calendarEl, {

        initialView: 'dayGridMonth',
        locale: "pt-br",

        headerToolbar: {
            left: 'prev,next,today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listWeek',


        },
        events: "http://localhost/calendario/public/evento/mostrar",

        dateClick: function(info) {
            formulario.reset();
            formulario.start.value = info.dateStr;
            formulario.end.value = info.dateStr;
            $("#evento").modal("show");
        },
        eventClick: function(info) {

            var evento = info.event;
            id = info.event.id;
            //console.log(evento);
            axios.post("http://localhost/calendario/public/evento/editar/" + info.event.id).then(
                (resposta) => {

                    formulario.id.value = resposta.data.id;
                    formulario.title.value = resposta.data.title;

                    formulario.descricao.value = resposta.data.descricao;

                    formulario.start.value = resposta.data.start;
                    console.log(formulario.start.value);
                    formulario.end.value = resposta.data.end;

                    $("#evento").modal("show");


                }
            ).catch(
                error => {
                    if (error.response) {

                        console.log(error.response.data);
                    }

                }
            )



        }


    });


    calendar.render();


    document.getElementById("btnSalvar").addEventListener("click", function() {


        enviarDados("http://localhost/calendario/public/evento/adicionar");

    });

    document.getElementById("btnDeletar").addEventListener("click", function() {


        enviarDados("http://localhost/calendario/public/evento/remover/" + formulario.id.value);


    });

    document.getElementById("btnAlterar").addEventListener("click", function() {

        enviarDados("http://localhost/calendario/public/evento/atualizar/" + formulario.id.value);


    });



    function enviarDados(url) {

        const dados = new FormData(formulario);
        axios.post(url, dados)
            .then(
                (resposta) => {
                    calendar.refetchEvents();
                    $("#evento").modal("hide");

                }
            ).catch(
                error => {
                    if (error.response) {
                        console.log(error.response.data);
                    }

                }
            )

    }
});
