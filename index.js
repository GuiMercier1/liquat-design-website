/******************************************************
 * Hi there ! Thanks for inspecting my code
 * If you find something interesting *slash* disgusting
 * Please keep me informed at gui.mercier1@gmail.com :)
 * Thanks !
 ******************************************************/
"use strict";

let promises = [];

promises.push(new Promise(function (resolve, reject) {
    $.get("header.html", function (data) {
        console.log("Got Header");
        // Helper fonction
        manageHeader(data).then(resolve);
    });
}));

promises.push(new Promise(function (resolve, reject) {
    $.get("footer.html", function (data) {
        $("#footer-container").append(data);

        resolve();
    });
}));

/**********************
 * HEADER MANAGEMENT
 *********************/

function manageHeader(data) {

    return new Promise(function (resolve, reject) {

        $("#header-container").replaceWith(data);

        var options = {};
        options.edge = "right";
        $('.sidenav').sidenav(options);

        // We bind the lang switch button to the lib function
        $(".lang-switch-button").click(function (event) {
            event.preventDefault();

            let newLanguage = translator.lang == "en" ? "fr" : "en";

            translator.setLanguageRun(newLanguage);

            // We also update the URL in case of refresh
            updateLangInURL(newLanguage);
        });

        setTimeout(resolve);
    });
}