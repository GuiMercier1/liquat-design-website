/******************************************************
 * Hi there ! Thanks for inspecting my code
 * If you find something interesting *slash* disgusting
 * Please keep me informed at gui.mercier1@gmail.com :)
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

let filters = [];
let projects = [];

promises.push(new Promise(function (resolve, reject) {
    $(document).ready(function () {

        $.getJSON("projects.json", function (data) {
            projects = data.projects;

            projects.forEach(function (project) {
                $("#popup-container").append(createProjectPopup(project));
            });

            needPopup.init();

            computeFilters();
            displayProjects();

            resolve();
        });
    });
}));

Promise.all(promises).then(initAndDisplayContent);

// Creates a list of tags from the retrieved projects
function computeFilters() {

    //TODO THERE IS A BUG WHEN YOU REFRESH THE PAGE, FILTERS ARE NOT SET ANYMORE
    //TODO NEED TO TRANSLATE THE FILTERS AND TAGS AND SOME PROJECT STUFF AS WELL

    let uriFilters = getQueryVariable().filter;
    if (!Array.isArray(uriFilters)) uriFilters = [uriFilters];
    let presetFilters = uriFilters.map(decodeURI);

    projects.forEach(function (project) {
        project.tags.forEach(function (tag) {
            // We check if the tag is already in the list
            if (getFilter(tag) === undefined) {
                let isActive = presetFilters.indexOf(tag) >= 0 ? true : false;
                filters.push({ name: tag, active: isActive });
            }
        });
    });

    let filtersHTML = '<ul class="filters">';

    let activeClass;
    filters.forEach(function (filter) {
        activeClass = filter.active ? " filter-selected" : "";
        filtersHTML += '<li><a href="#" class="filter' + activeClass + '" data-value="' + filter.name + '">#' + filter.name + '</a></li>';
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
            $("#projects-list").append(createProjectCard(project, true));
        }
    });

    $(".projects_amount").html("(" + amountOfDisplayedProjects + ")");
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