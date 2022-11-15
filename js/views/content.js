define("content", ["sidebar", "home"], function (Sidebar, Home) {
    
    var Content = Backbone.View.extend({

        initialize: function(options){
            this.el = options.el;

            var sidebar = document.getElementById('sidebar');
            var home = document.getElementById('home');

            if(sidebar){
                sidebar.classList.add('col' + '-' + columnSize + '-' + '1' );
                this.sidebar = new Sidebar({
                    el: "#sidebar"
                });
            }

            if(home){
                home.classList.add('col' + '-' + columnSize + '-' + '11' );
                this.home = new Home({
                    el: "#home"
                });
            }

        }

    });
    
    function createContent(){

        var content = document.getElementById('content');
        if(content){ 
            new Content({
                el: "#content"
            });
        }
    }

    return {
        create: createContent
    };
    
});