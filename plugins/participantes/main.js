var templates = [
    "root/externallib/text!root/plugins/participantes/participantes.html"
];

define(templates, function(participantesTpl){
    var plugin = {
        settings: {
            name: "participantes",
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
                $('#panel-izq').css('display', 'none');
                $('#panel-centro').css('display', 'block');
                $('#panel-centro').html(output).trigger("create");
            }, null, function(m){
                MM.log("Error participantes");
                $.mobile.hidePageLoadingMsg();
            });
        },

        mostrarParticipante: function(){
            MM.log("Mostrando participante");
        },

        templates: {
            "participantes":{
                html: participantesTpl
            }
        }
    }

    MM.registrarPlugin(plugin);
})