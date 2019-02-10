/******************************************************
 * Hi there ! Thanks for inspecting my code
 * If you find something interesting *slash* disgusting
 * Please keep me informed at gui.mercier1@gmail.com :)
 * Thanks !
 ******************************************************/

let projects;

$(document).ready(function () {

    let options = {};

    $('.sidenav').sidenav(options);
    $('.parallax').parallax();
    $('.scrollspy').scrollSpy();

    $.getJSON("projects.json", function (data) {
        projects = data.projects;

        manageUXProjects();
    });

});

/********************************
 * UX PROJECTS DISPLAY MANAGEMENT
 ********************************/

function createProjectDisplay(project, displayOnSmallScreen) {

    let keywordsHTML = '';

    if (project.keywords != undefined) {
        keywordsHTML = '<ul class="tags">';
        project.keywords.forEach(function (keyword) {
            keywordsHTML += '<li><a href="#" class="tag">#' + keyword + '</a></li>';
        });

        keywordsHTML += "</ul>"
    }

    let displayClass = displayOnSmallScreen ? "" : "hide-on-small-only";

    let htmlContent =
        '<div class="col s12 m3 ' + displayClass + '">'
        + '<div class="card project-card hoverable">'
        + '<div class="card-image">'
        + '<img src="img/' + project.imageSrc + '">'
        + '</div>'
        + '<div class="card-content">'
        + '<span class="card-title">' + project.title + '</span>'
        + '<p>' + project.shortDescription + '</p>'
        + keywordsHTML
        + '</div>'
        + '</div>'
        + '</div>';

    var jqElement = $(htmlContent);

    jqElement.click(function () {
        window.location.href = "projects/" + project.id;
    });

    return jqElement;
}

function manageUXProjects() {
    let projectContainer = $("#projects-container");

    projectContainer.empty();

    var amountOfProjectsInSmallScreens = 2;

    projects.forEach(function (project, index) {
        if (index < 4) {
            var displayOnSmallScreen = index < amountOfProjectsInSmallScreens;
            projectContainer.append(createProjectDisplay(project, displayOnSmallScreen));
        }
    });
}