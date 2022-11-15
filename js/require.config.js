require.config({
    waitSeconds: 50,
    shim: {
      underscore: {
        exports: "_"
      },
      Backbone: {
        deps: [
          "underscore",
          "jquery"
        ],
        exports: "Backbone"
      }
    },
    paths: {
      jquery: "libs/jquery-min",
      underscore: "libs/underscore-min",
      Backbone: "libs/backbone-min",
      text: "libs/text",
      json: "libs/json",

      libraryManager: "libraryManager",

      main: "main",
      globals: "globals",
      app: "app",

      sidebar: "views/sidebar",
      content: "views/content",
      footer: "views/footer",
      header: "views/header",
      home: "views/home",
      modal: "views/modal"
      
    }
  });