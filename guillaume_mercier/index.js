/******************************************************
 * Hi there ! Thanks for inspecting my code
 * If you find something interesting *slash* disgusting
 * Please keep me informed at gui.mercier1@gmail.com :)
 * Thanks !
 ******************************************************/


$.get("header.html", function (data) {
    $("#header-container").replaceWith(data);

    var options = {};
    options.edge = "right";
    $('.sidenav').sidenav(options);
});
$('#footer-container').load('footer.html');


let projects;

$(document).ready(function () {
    $('.parallax').parallax();

    $.getJSON("projects.json", function (data) {
        projects = data.projects;

        createPopups();
        needPopup.init();

        manageProjects();
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
        '<div class="col s12 m4 ' + displayClass + '">'
        + '<div class="card project-card hoverable" data-needpopup-show="#' + project.id + '">'
        + '<div class="card-image">'
        + '<img src="img/' + project.imageSrc + '">'
        + '<div class="card-overlay" style="opacity:' + + project.opacity + '"></div>'
        + '</div>'
        + '<div class="card-content">'
        + '<span class="card-title">' + project.title + '</span>'
        + '<p>' + project.shortDescription + '</p>'
        + keywordsHTML
        + '</div>'
        + '</div>'
        + '</div>';

    var jqElement = $(htmlContent);

    // jqElement.click(function () {
    //     window.location.href = "projects/" + project.id;
    // });

    return jqElement;
}

function manageProjects() {
    let projectContainer = $("#projects-container");

    projectContainer.empty();

    var amountOfProjectsInSmallScreens = 2;

    projects.forEach(function (project, index) {
        if (index < 3) {
            var displayOnSmallScreen = index < amountOfProjectsInSmallScreens;
            projectContainer.append(createProjectDisplay(project, displayOnSmallScreen));
        }
    });
}

function createPopups() {
    projects.forEach(function (project) {

        let popupHTML = '<div id="' + project.id + '" class="needpopup">'
            + '<div class="popup-img-container hide-on-small-only">'
            + '<img src="img/' + project.imageSrc + '" />'
            + '</div>'
            + '<div class="row">'
            + '<div class="col s12"><h4>'
            + project.title
            + '</h4></div>'
            + '</div>'
            + '<div class="row">'
            + '<div class="col s12">'
            + project.shortDescription
            + '</div>'
            + '</div>'
            + '</div>';

        $("#popup-container").append(popupHTML);
    });
}