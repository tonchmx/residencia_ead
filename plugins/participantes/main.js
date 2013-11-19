define(function(){
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
        ]
    }

    MM.registrarPlugin(plugin);
})