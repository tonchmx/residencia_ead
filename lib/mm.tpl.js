MM.tpl = {
    render: function(text, data, settings) {
        var page = location.href.split("#")
        page = (page[1])? page[1] : "index.html";
        MM.log('Rendering template ' + page, 'Tpl');
        return _.template(text, data, settings);
    }
};