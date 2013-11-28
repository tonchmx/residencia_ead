var templates = [
    "root/externallib/text!root/plugins/contenidos/contenidos.html"
];


define(templates, function (contenidosTpl) {
    var plugin = {
        settings: {
            name: "contenidos",
            nameToShow: "Contenidos",
            type: "course",
            menuURL: "#curso/contenidos/",
            lang: {
                component: "core"
            },
            icon: ""
        },

        storage: {
            contenido: {type: "model"},
            contenidos: {type: "collection", model: "contenido"}
        },
        routes: [
            ["cursos/contenidos:courseid", "curso_contenidos", "verCursoContenidos"]
        ],


        verCursoContenidos: function(courseId){

        },

        templates: {
            "contenidos": {
                html: contenidosTpl
            }
        }
    }

    MM.registrarPlugin(plugin);

});