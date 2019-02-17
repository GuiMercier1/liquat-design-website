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

        projects.forEach(function(project){
            $("#popup-container").append(createProjectPopup(project));
        });
        
        needPopup.init();

        manageProjects();
    });

});

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