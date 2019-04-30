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
        manageHeader(data);
        resolve();
    });
}))

promises.push(new Promise(function (resolve, reject) {
    $.get("footer.html", function (data) {
        $("#footer-container").append(data);

        resolve();
    });
}));

//TODO TRANSLATE THE TITLES
Promise.all(promises).then(initAndDisplayContent);