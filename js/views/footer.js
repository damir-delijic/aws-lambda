define("footer", [], function () {
    
    var Footer = Backbone.View.extend({

        initialize: function(options){
            this.el = options.el;
        },

    });

    function createFooter(){

        var footer = document.getElementById('footer');
        if(footer){
            footer.classList.add('col' + '-' + columnSize + '-' + '12' );
            new Footer({
                el: "#footer"
            });

        }
    }

    return {
        create: createFooter
    };
    
});