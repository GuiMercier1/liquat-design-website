/******************************************************
 * Hi there ! Thanks for inspecting my code
 * If you find something interesting *slash* disgusting
 * Please keep me informed at alice.foissy@gmail.com :)
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

let projects = [];

promises.push(new Promise(function (resolve, reject) {
    $(document).ready(function () {

        $.getJSON("projects.json", function (data) {
            projects = data.projects;

            projects.forEach(function (project) {
                $("#popup-container").append(createProjectPopup(project));
            });

            needPopup.init();

            displayProjects();

            resolve();
        });
    });
}));

Promise.all(promises).then(initAndDisplayContent);

function displayProjects() {
    $("#projects-list").empty();

    projects.forEach(function (project) {
        $("#projects-list").append(createProjectCard(project, true));
    });
}