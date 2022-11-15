define("main", ["globals"], function (Globals) {
    
    Globals.initialize();

    require(["app"], function(App){
        App.start();
    })
});