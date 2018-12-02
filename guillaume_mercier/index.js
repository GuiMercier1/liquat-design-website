/******************************************************
 * Hi there ! Thanks for inspecting my code
 * If you find something interesting *slash* disgusting
 * Please keep me informed at gui.mercier1@gmail.com :)
 * Thanks !
 ******************************************************/

$(document).ready(function () {

    let options = {};

    console.log($('.sidenav').sidenav(options));

    manageUXProjects();
    manageOtherProjects();
});

/********************************
 * UX PROJECTS DISPLAY MANAGEMENT
 ********************************/

const uxProjects = [
    {
        title: "first project",
        imageSrc: "project1.jpg",
        shortDescription: "This is a description",
        id:"ouioui"
    },
    {
        title: "first project",
        imageSrc: "project1.jpg",
        shortDescription: "This is a description",
        id:"ouioui"
    },
    {
        title: "first project",
        imageSrc: "project1.jpg",
        shortDescription: "This is a description",
        id:"ouioui"
    },
    {
        title: "first project",
        imageSrc: "project1.jpg",
        shortDescription: "This is a description",
        id:"ouioui"
    },
];

function createProjectDisplay(project) {

    let keywordsHTML = '';

    if (project.keywords != undefined) {
        keywordsHTML = '<ul class="tags">';
        project.keywords.forEach(function (keyword) {
            keywordsHTML += '<li><a href="#" class="tag">#' + keyword + '</a></li>';
        });

        keywordsHTML += "</ul>"
    }


    let htmlContent =
        '<div class="col s12 m3">'
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

    jqElement.click(function(){
        window.location.href = "projects/" + project.id;
    });

    return jqElement;
}

function manageUXProjects() {
    let projectContainer = $("#projects-container");

    projectContainer.empty();

    uxProjects.forEach(function (project) {
        projectContainer.append(createProjectDisplay(project));
    });
}

/************************************
 * OTHER PROJECTS DISPLAY MANAGEMENT
 ***********************************/

const otherProjects = [
    {
        title: "first project",
        imageSrc: "project1.jpg",
        shortDescription: "This is a description",
        keywords: ["Coucou1", "Coucou2", "Coucou3"],
        id:"ouioui"
    },
    {
        title: "first project",
        imageSrc: "project1.jpg",
        shortDescription: "This is a description",
        keywords: ["Coucou1", "Coucou3"],
        id:"ouioui"
    },
    {
        title: "first project",
        imageSrc: "project1.jpg",
        shortDescription: "This is a description",
        keywords: ["Coucou1", "Coucou2", "Coucou3"],
        id:"ouioui"
    },
    {
        title: "first project",
        imageSrc: "project1.jpg",
        shortDescription: "This is a description",
        keywords: ["Coucou1", "Coucou2", "Coucou3"],
        id:"ouioui"
    },
];

function manageOtherProjects() {
    let projectContainer = $("#ux-projects-container");

    projectContainer.empty();

    otherProjects.forEach(function (project) {
        projectContainer.append(createProjectDisplay(project));
    });
}

// Add a smooth move to the anchored sections from the nav bar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});