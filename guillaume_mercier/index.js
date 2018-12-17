/******************************************************
 * Hi there ! Thanks for inspecting my code
 * If you find something interesting *slash* disgusting
 * Please keep me informed at gui.mercier1@gmail.com :)
 * Thanks !
 ******************************************************/

$(document).ready(function () {

    let options = {};

    $('.sidenav').sidenav(options);
    $('.parallax').parallax();
    $('.scrollspy').scrollSpy();

    manageTitleSlider();
    manageUXProjects();
});

/********************************
 * UX PROJECTS DISPLAY MANAGEMENT
 ********************************/

const uxProjects = [
    {
        title: "first project",
        imageSrc: "project1.jpg",
        shortDescription: "This is a description",
        id: "ouioui"
    },
    {
        title: "first project",
        imageSrc: "project1.jpg",
        shortDescription: "This is a description",
        id: "ouioui"
    },
    {
        title: "first project",
        imageSrc: "project1.jpg",
        shortDescription: "This is a description",
        id: "ouioui"
    },
    {
        title: "first project",
        imageSrc: "project1.jpg",
        shortDescription: "This is a description",
        id: "ouioui"
    },
    {
        title: "first project",
        imageSrc: "project1.jpg",
        shortDescription: "This is a description",
        id: "ouioui"
    },
    {
        title: "first project",
        imageSrc: "project1.jpg",
        shortDescription: "This is a description",
        id: "ouioui"
    },
    {
        title: "first project",
        imageSrc: "project1.jpg",
        shortDescription: "This is a description",
        id: "ouioui"
    },
    {
        title: "first project",
        imageSrc: "project1.jpg",
        shortDescription: "This is a description",
        id: "ouioui"
    },
];

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

    uxProjects.forEach(function (project, index) {
        var displayOnSmallScreen = index >= amountOfProjectsInSmallScreens;

        projectContainer.append(createProjectDisplay(project, displayOnSmallScreen));
    });
}

/**
* Found at http://tobiasahlin.com/moving-letters/#14
*/
function manageTitleSlider() {

    // Wrap every letter in a span
    $('.ml14 .letters').each(function () {
        $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    var animation = anime.timeline(
        {
            loop: true
        })
        .add({
            targets: '.ml14 .line',
            scaleX: [0, 1],
            opacity: [0.5, 1],
            easing: "easeInOutExpo",
            duration: 600
        }).add({
            targets: '.ml14 .letter',
            opacity: [0, 1],
            translateX: [40, 0],
            translateZ: 0,
            scaleX: [0.3, 1],
            easing: "easeOutExpo",
            duration: 400,
            offset: '-=600',
            delay: function (el, i) {
                return 150 + 25 * i;
            }
        }).add({
            targets: '.ml14',
            opacity: 0,
            duration: 600,
            easing: "easeOutExpo",
            delay: 600
        });

    console.log(animation);

    // We only display one header
    let index = 0;
    const amountOfHeaders = 5;
    displaySelector();
    var intervalID = setInterval(displaySelector, animation.duration);

    function displaySelector() {

        $(".ml14").hide();

        $(".head-text" + index).show();

        // If it is the last, we stop the animation when the text is fully displayed
        if (index == (amountOfHeaders - 1)) {
            setTimeout(function () {
                animation.pause();
            }, 2300);
            clearInterval(intervalID);
        }
        else {
            index++;
        }
    }
}