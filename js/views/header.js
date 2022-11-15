define("header", ["text!page/header.html"], function (Template) {
    
    var Header = Backbone.View.extend({

        initialize: function(options){
            this.el = options.el;

            this.isRotationEnabled = true;
            this.isInRotationAnimation = false;

            this.messagesArray = ["Prva poruka", "Druga poruka", "Treca poruka"];

            this.currentMessageIndex = 0;
            this.messagesLength = this.messagesArray.length;

            this.rotationTimeoutLength = 10;

            this.render();
            this.manageRotationTimer();
        },

        render: function(){
            var template = _.template(Template);
            var html = template({});
            this.$el.html(html);

            this.setPlayOrPause(true);
            this.setMessageCount(true);
            this.setLeftArrow();
            this.setHeaderMessage(true);
            this.setRightArrow();
        },

        setPlayOrPause: function(isColumnNotSet){
            var playOrPause = document.getElementById('playOrPause');
            if(playOrPause){
                playOrPause.innerHTML = this.isRotationEnabled ? "<i id='ppicon' class='bx bx-pause' ></i>" : "<i id='ppicon' class='bx bx-play'></i>";

                var element = document.getElementById('headerMessageContainer');
                var elementHeight = element.offsetHeight;
                var elementHeightPixels = elementHeight + "px";

                if(isColumnNotSet){
                    playOrPause.classList.add('col' + '-' + columnSize + '-' + '1');
                    
                    if(element){
                        playOrPause.style.lineHeight =  elementHeightPixels;
                    }
             
                }

                var ppicon = document.getElementById("ppicon");
                if(ppicon && element){
                    ppicon.style.height = elementHeightPixels;
                    ppicon.style.lineHeight = elementHeightPixels;
                    ppicon.style.fontSize = elementHeight * 0.75 + 'px';
                }
                
            }
        },

        setMessageCount: function(isColumnNotSet){
            var messageCount = document.getElementById('messageCount');
            if(messageCount){
                messageCount.innerHTML = (this.currentMessageIndex + 1) + " / " + this.messagesLength;
                if(isColumnNotSet){
                    messageCount.classList.add('col' + '-' + columnSize + '-' + '1');
                    var element = document.getElementById('headerMessageContainer');
                    if(element){
                        messageCount.style.lineHeight = element.offsetHeight + 'px';
                    }
                }
                
            }
        },
        
        setLeftArrow: function(){
            var leftArrow = document.getElementById("previousMessage");
            if(leftArrow){
                leftArrow.innerHTML = "<i id='laicon' class='bx bx-chevron-left'></i>";
                leftArrow.classList.add('col' + '-' + columnSize + '-' + '1');

                var element = document.getElementById('headerMessageContainer');
                var elementHeight = element.offsetHeight;
                var elementHeightPixels = elementHeight + "px";

                if(element){
                    leftArrow.style.lineHeight =  elementHeightPixels;
                }

                var laicon = document.getElementById("laicon");
                if(laicon && element){
                    laicon.style.height = elementHeightPixels;
                    laicon.style.lineHeight = elementHeightPixels;
                    laicon.style.fontSize = elementHeight * 0.75 + 'px';
                }
                
            }
        },

        setHeaderMessage: function(isHeaderMessageNotSet){
            var headerMessage = document.getElementById('headerMessage');
            if(headerMessage){
                var element = document.getElementById('headerMessageContainer');
                if(isHeaderMessageNotSet){
                    headerMessage.classList.add('col' + '-' + columnSize + '-' + '8');
                  
                    if(element){
                        headerMessage.style.lineHeight = element.offsetHeight + 'px';
                        headerMessage.style.padding = '0px';
                    }
                }
                var headerMessageText = document.getElementById("headerMessageText");
                if(headerMessageText){
                    headerMessageText.style.lineHeight = element.offsetHeight * 0.95 + 'px'
                    headerMessageText.innerHTML = this.messagesArray[this.currentMessageIndex];
                }

            }
        },

        setRightArrow: function(){
            var rightArrow = document.getElementById("nextMessage");
            if(rightArrow){
                rightArrow.innerHTML = "<i id='raicon' class='bx bx-chevron-right'></i>";
                rightArrow.classList.add('col' + '-' + columnSize + '-' + '1');

                var element = document.getElementById('headerMessageContainer');
                var elementHeight = element.offsetHeight;
                var elementHeightPixels = elementHeight + "px";

                if(element){
                    rightArrow.style.lineHeight =  elementHeightPixels;
                }

                var raicon = document.getElementById("raicon");
                if(raicon && element){
                    raicon.style.height = elementHeightPixels;
                    raicon.style.lineHeight = elementHeightPixels;
                    raicon.style.fontSize = elementHeight * 0.75 + 'px';
                }
            }

        },

        registerBusEvents: function(){

        },

        setNextMessageIndex: function(){
            this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messagesLength;
        },

        setPrevMessageIndex: function(){
            this.currentMessageIndex = ( this.messagesLength + this.currentMessageIndex - 1) % this.messagesLength;
        },

        startRotationAnimation: function(){
            if(!this.isRotationEnabled) return false;
            this.isInRotationAnimation = true;
            var element = document.getElementById('headerMessageText');
            if(element){
                var that = this;
                $( "#headerMessageText" ).animate({
                    "opacity": "0",
                  }, 1000, function() {
                    
                    that.setNextMessageIndex();
                    that.setHeaderMessage();
                    that.setMessageCount();
                    $( "#headerMessageText" ).animate({
                        "opacity": "1",
                      }, 1000, function() {
                        
                        that.isInRotationAnimation = false; 
                        that.manageRotationTimer();
                      });
                  });
            }
        },

        manualRotate: function(direction){
            if(this.isInRotationAnimation) return false;
            this.clearRotationTimeout();
            this.isInRotationAnimation = true;
            var element = document.getElementById('headerMessageText');
            if(element){
                var that = this;
                $( "#headerMessageText" ).animate({
                    "opacity": "0",
                  }, 1000, function() {
                    
                    direction == "r" ? that.setNextMessageIndex() : that.setPrevMessageIndex();
                    that.setHeaderMessage();
                    that.setMessageCount();
                    $( "#headerMessageText" ).animate({
                        "opacity": "1",
                      }, 1000, function() {
                        
                        that.isInRotationAnimation = false; 
                        that.manageRotationTimer();
                      });
                  });
            }
        },

        clearRotationTimeout: function(){
            this.clearLoader();
            if(this.rotationTimeout){
                clearTimeout(this.rotationTimeout)
            }
        },

        clearLoader: function(){

        },

        animateLoader: function(){

        },

        setRotationTimeout: function(){
            var that = this;
            this.animateLoader();
            that.rotationTimeout = setTimeout(function(){
                that.clearRotationTimeout();
                that.startRotationAnimation();
            }, that.rotationTimeoutLength * 1000);
        },

        manageRotationTimer: function(){
            this.clearRotationTimeout();
            if(this.isRotationEnabled){
                this.setRotationTimeout();
            }
        },

        events: {
            "click": "onClick"
        },

        onClick: function(e){
            e.stopPropagation();
            e.stopImmediatePropagation();

            var targetID = e.target.id;
            if(targetID == "raicon" || targetID == "nextMessage"){
                this.manualRotate("r");
            }else if(targetID == "laicon" || targetID == "previousMessage"){
                this.manualRotate("l");
            }else {
                this.toggleRotationEnable();
                this.setPlayOrPause();
                this.manageRotationTimer();
            }
            
            return false;
        },

        toggleRotationEnable: function(){
            this.isRotationEnabled = !this.isRotationEnabled;
        },

    });
    
    function createHeader(){
        var header = document.getElementById('header');
        if(header){
            header.classList.add('col' + '-' + columnSize + '-' + '12' );
            new Header({
                el: "#header"
            });
        }
    }

    return {
        create: createHeader
    };
    
});