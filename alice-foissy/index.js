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

let projects;

promises.push(new Promise(function (resolve, reject) {
    $(document).ready(function () {
        $('.parallax').parallax();

        $.getJSON("projects.json", function (data) {
            projects = data.projects;

            projects.forEach(function (project) {
                $("#popup-container").append(createProjectPopup(project));
            });

            needPopup.init();

            manageProjects();

            resolve();
        });
    });
}));

Promise.all(promises).then(initAndDisplayContent);

function manageProjects() {
    let projectContainer = $("#projects-container");

    projectContainer.empty();

    var amountOfProjectsInSmallScreens = 2;

    projects.forEach(function (project, index) {
        if (index < 3) {
            var displayOnSmallScreen = index < amountOfProjectsInSmallScreens;
            projectContainer.append(createProjectCard(project, displayOnSmallScreen));
        }
    });
}