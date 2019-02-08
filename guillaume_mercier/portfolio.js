/******************************************************
 * Hi there ! Thanks for inspecting my code
 * If you find something interesting *slash* disgusting
 * Please keep me informed at gui.mercier1@gmail.com :)
 * Thanks !
 ******************************************************/

let filters = [];
let projects = [];

$(document).ready(function () {

    let options = {};

    $('.sidenav').sidenav(options);

    needPopup.init();

    $.getJSON("projects.json", function (data) {
        projects = data.projects;

        computeFilters();
        displayProjects();
    });
});

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
            projectHTML = createProjectHTML(project);
            $("#projects-list").append(projectHTML);
        }
    });
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
        '<div class="col s12 m3">'
        + '<div class="card project-card hoverable" data-needpopup-show="#project-popup">'
        + '<div class="card-image">'
        + '<img src="img/' + project.imageSrc + '">'
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