define("globals", ["libraryManager"], function (LibraryManager) {
    
    function initializeGlobalLibraries(){
        Object.keys(LibraryManager).forEach(function(key){
            window.key = LibraryManager[key];
        });
    }

    function initializeGlobalVariables(){
        window.bus =  _.extend({}, Backbone.Events);
        if(window.screen.width < 768) window.columnSize = 'xs';
        else if(window.screen.width <= 992) window.columnSize = 'sm';
        else if(window.screen.width <= 1200) window.columnSize = 'md';
        else window.columnSize = 'md';
        
    };


    function initalizeGlobals(){
        initializeGlobalLibraries();
        initializeGlobalVariables();
    }

    return {
        initialize: initalizeGlobals
    }

});