define("footer", ["text!page/footer.html"], function (Template) {
    
    var Footer = Backbone.View.extend({

        initialize: function(options){
            this.el = options.el;

            this.render();
            this.setContactIcon();
        },

        render: function(){
            var template = _.template(Template);
            var html = template({});
            this.$el.html(html);
        },

        setContactIcon: function(){
            var footer = document.getElementById('footer');
            if(footer){
                var footerHeight = footer.offsetHeight;
                var footerHeightPixels = footerHeight + "px";
                footer.style.lineHeight = footerHeightPixels;
                footer.style.textAlign = 'center';
                var contactIcon = document.getElementById('contactIcon');
                if(contactIcon){
                    contactIcon.style.height = footerHeightPixels;
                    contactIcon.style.lineHeight = footerHeightPixels;
                    contactIcon.style.fontSize = footerHeight * 0.75 + 'px';
                }
            }

            
        },

        events: {
            "click": "onClick"
        },

        onClick: function(e){
            e.stopPropagation();
            e.stopImmediatePropagation();

            console.log("Click on footer")
            
            return false;
        }

    });

    function createFooter(){
        var logoAndName = document.getElementById('logoAndName');
        if(logoAndName){
            logoAndName.classList.add('col' + '-' + columnSize + '-' + '3');
            logoAndName.style.textAlign = 'center';
            logoAndName.style.lineHeight = logoAndName.offsetHeight + 'px';
        }

        var footer = document.getElementById('footer');
        if(footer){
            footer.classList.add('col' + '-' + columnSize + '-' + '8' );
            new Footer({
                el: "#footer"
            });

        }
    }

    return {
        create: createFooter
    };
    
});