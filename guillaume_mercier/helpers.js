"use strict";

function createProjectCard(project, displayOnSmallScreen) {
    let tagsHTML = '';

    if (project.tags != undefined) {
        tagsHTML = '<ul class="tags">';
        project.tags.forEach(function (tag) {
            tagsHTML += '<li><a href="#" class="tag">#' + tag + '</a></li>';
        });

        tagsHTML += "</ul>"
    }

    let displayClass = displayOnSmallScreen ? "" : "hide-on-small-only";

    let htmlContent =
        '<div class="col s12 m4 project-card-col ' + displayClass + '">'
        + '<div class="card project-card hoverable" data-needpopup-show="#' + project.id + '">'
        + '<div class="card-image">'
        + '<img src="img/' + project.imageSrc + '">'
        + '<div class="card-overlay" style="opacity:' + + project.opacity + '"></div>'
        + '</div>'
        + '<div class="card-content">'
        + '<span class="card-title">' + project.title + '</span>'
        + '<p>' + project.shortDescription + '</p>'
        + tagsHTML
        + '</div>'
        + '</div>'
        + '</div>';

    return htmlContent;
}

function createProjectPopup(project) {

    let tasksHTML = "<ul class='tasks-list'>";

    project.tasks.forEach(function (task) {
        tasksHTML += "<li>> " + task + "</li>";
    });

    tasksHTML += "</ul>";

    let htmlContent = '<div id="' + project.id + '" class="needpopup">'
        + '<div class="row popup-header">'
        + '<div class="col s12">'
        + '<h5>'
        + project.title
        + '</h5>'
        + '</div>'
        + '</div>'
        // + '<div class="popup-img-container hide-on-small-only">'
        // + '<img src="img/' + project.imageSrc + '" />'
        // + '</div>'
        + '<div class="row">'
        + '<div class="col s12">'
        + project.shortDescription
        + '</div>'
        + '</div>'
        + '<div class="row">'
        + '<div class="col s12">'
        + project.longDescription
        + '</div>'
        + '</div>'
        + '<div class="row">'
        + '<div class="col s6">'
        + "<span class='popup-title'>Client : </span>" + project.customer
        + '</div>'
        + '<div class="col s6">'
        + "<span class='popup-title'>Entreprise : </span>" + project.company
        + '</div>'
        + '</div>'
        + '<div class="row">'
        + '<div class="col s12 popup-title">Challenges : </div>'
        + '<div class="col s12">' + tasksHTML + '</div>'
        + '</div>'
        + '</div>';

    return htmlContent;
}

function hideSpinner() {
    $(".page-content").show();
    setTimeout(function () {
        $(".spinner").fadeOut(600);
    }, 500);
}