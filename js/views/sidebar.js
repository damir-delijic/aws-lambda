define("sidebar", [], function () {
    
    var sidebar = Backbone.View.extend({

        initialize: function(options){
            this.el = options.el;
        }

    });

    return sidebar;
    
});