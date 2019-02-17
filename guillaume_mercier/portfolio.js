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

let filters = [];
let projects = [];

$(document).ready(function () {

    $.getJSON("projects.json", function (data) {
        projects = data.projects;

        createPopups();
        needPopup.init();

        computeFilters();
        displayProjects();
    });
});

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

// Creates a list of tags from the retrieved projects
function computeFilters() {
    projects.forEach(function (project) {
        project.tags.forEach(function (tag) {
            // We check if the tag is already in the list
            if (getFilter(tag) === undefined) {
                filters.push({ name: tag, active: false });
            }
        });
    });

    let filtersHTML = '<ul class="filters">';

    filters.forEach(function (filter) {
        filtersHTML += '<li><a href="#" class="filter" data-value="' + filter.name + '">#' + filter.name + '</a></li>';
    });

    filtersHTML += "</ul>";

    $("#filter-container").append(filtersHTML);

    // On click we toggle the filter
    $(".filter").click(function () {
        let tag = $(this).data("value");

        toggleFilterModel(tag);
        toggleFilterView(tag);

        displayProjects();
    });
}

// Displays the projects according to the set filters
function displayProjects() {

    let amountOfDisplayedProjects = 0;

    $("#projects-list").empty();

    let projectHTML;
    let displayByTheWay = allFiltersAreSelected();

    projects.forEach(function (project) {

        let display = false;

        // If no selectedFilters, we show all the projects
        if (displayByTheWay) {
            display = true;
        }
        else {

            project.tags.forEach(function (tag) {
                if (getFilter(tag).active) {
                    display = true;
                }
            });
        }

        if (display) {
            amountOfDisplayedProjects++;
            projectHTML = createProjectHTML(project);
            $("#projects-list").append(projectHTML);
        }
    });

    $(".projects_amount").html("(" + amountOfDisplayedProjects + ")");
}

// Creates the project HTML code
function createProjectHTML(project) {

    let tagsHTML = '';

    if (project.tags != undefined) {
        tagsHTML = '<ul class="tags">';
        project.tags.forEach(function (tag) {
            tagsHTML += '<li><a href="#" class="tag">#' + tag + '</a></li>';
        });

        tagsHTML += "</ul>"
    }

    let htmlContent =
        '<div class="col s12 m4">'
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

function getFilter(tag) {
    let focusedFilter;

    filters.forEach(function (filter) {
        if (filter.name === tag) focusedFilter = filter;
    });

    return focusedFilter;
}

// Changes the model to toggle the filter
function toggleFilterModel(tag) {
    let focusedFilter = getFilter(tag);

    focusedFilter.active = !focusedFilter.active;
}

function toggleFilterView(filter) {
    $("a[data-value='" + filter + "']").toggleClass("filter-selected");
}

// If all filters are false, we display all the projects
function allFiltersAreSelected() {
    let areAllSelected = true;

    filters.forEach(function (filter) {
        if (filter.active === true) areAllSelected = false;
    });

    return areAllSelected;
}