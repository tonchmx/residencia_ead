var templates = [
    "root/externallib/text!root/plugins/participantes/participantes.html",
    "root/externallib/text!root/plugins/participantes/participante.html"
];

define(templates, function(participantesTpl, participanteTpl){
    var plugin = {
        settings: {
            name: "participantes",
            nameToShow: "Participantes",
            type: "course",
            menuURL: "#participantes/",
            lang: {
                component: "core"
            },
            icon: ""
        },

        storage: {
            participante: {type: "model"},
            participantes: {type: "collection", model: "participante"}
        },

        routes: [
            ["participantes/:courseId", "participantes", "mostrarParticipantes"],
            ["participante/:courseId/:userId", "participantes", "mostrarParticipante"]
        ],

        mostrarParticipantes: function(courseId){
            MM.log("Mostrando participantes");
            $.mobile.loading( 'show', {
                text: 'Cargando',
                textVisible: true,
                theme: 'b'
            });

            var data = {
                "courseid": courseId
            };

            MM.moodleWSCall('moodle_user_get_users_by_courseid', data, function(users){
                $.mobile.hidePageLoadingMsg();
                //cargamos el template
                var course = MM.db.get("courses", MM.config.current_site.id + "-" + courseId);
                var pageTitle = "Alumnos de " + course.get("fullname");
                var variables = {usuarios: users, deviceType: MM.deviceType, courseId: courseId, titulo: pageTitle};
                var output = MM.tpl.render(MM.plugins.participantes.templates.participantes.html, variables);

                //ocultamos el menu
                MM.izquierdaCentro();
                $('#panel-centro').html(output).trigger("create");
            }, null, function(m){
                MM.log("Error participantes");
                $.mobile.hidePageLoadingMsg();
            });
        },

        mostrarParticipante: function(courseId, userId){

            var data = {
                "userlist[0][userid]": userId,
                "userlist[0][courseid]": courseId
            }

            MM.log("Mostrando participante");

            MM.moodleWSCall('moodle_user_get_course_participants_by_id', data, function(users){
                //cargar los plugins de tipo usuario
                var userPlugins = [];
                for (var el in MM.plugins){
                    var plugin = MM.plugins[el];
                    if (plugin.settings.type == "user"){
                        userPlugins.push(plugin.settings);
                    }
                }

                var newUser = users.shift();



                //Cargamos el template
                var variables = {usuario: newUser}
                var output = MM.tpl.render(MM.plugins.participantes.templates.participante.html, variables);

                //ocultamos la lista de participantes
                MM.centroDerecha();
                $('#panel-der').html(output).trigger("create");
            });


        },

        templates: {
            "participante":{
                model: "participante",
                html: participanteTpl
            },
            "participantes":{
                html: participantesTpl
            }
        }
    }

    MM.registrarPlugin(plugin);
})