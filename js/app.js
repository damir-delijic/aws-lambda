define("app", ["header", "content", "footer", "modal"], function (Header, Content, Footer, Modal) {
    
    function start(){

        console.log("APP START")
        createViews();

    }

    function createViews(){
        Header.create();
        Content.create();
        Footer.create();
        // Modal.create();
    }

    return {
        start: start
    }

});