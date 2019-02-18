/******************************************************
 * Hi there ! Thanks for inspecting my code
 * If you find something interesting *slash* disgusting
 * Please keep me informed at gui.mercier1@gmail.com :)
 * Thanks !
 ******************************************************/

let promises = [];

promises.push(new Promise(function (resolve, reject) {
    $.get("header.html", function (data) {
        $("#header-container").replaceWith(data);

        var options = {};
        options.edge = "right";
        $('.sidenav').sidenav(options);

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

Promise.all(promises).then(hideSpinner);

// Creates a list of tags from the retrieved projects
function computeFilters() {

    
    let uriFilters = getQueryVariable().filter;
    if(!Array.isArray(uriFilters)) uriFilters = [uriFilters];
    presetFilters = uriFilters.map(decodeURI);
    console.log(presetFilters);

    projects.forEach(function (project) {
        project.tags.forEach(function (tag) {
            // We check if the tag is already in the list
            if (getFilter(tag) === undefined) {
                let isActive = presetFilters.indexOf(tag) >= 0 ? true : false;
                console.log("Is active : ", isActive);
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

function getQueryVariable() {

        // get query string from window
        var queryString = window.location.search.slice(1);
      
        // we'll store the parameters here
        var obj = {};
      
        // if query string exists
        if (queryString) {
      
          // stuff after # is not part of query string, so get rid of it
          queryString = queryString.split('#')[0];
      
          // split our query string into its component parts
          var arr = queryString.split('&');
      
          for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');
      
            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
      
            // (optional) keep case consistent
            // paramName = paramName.toLowerCase();
            // if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
      
            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {
      
              // create key if it doesn't exist
              var key = paramName.replace(/\[(\d+)?\]/, '');
              if (!obj[key]) obj[key] = [];
      
              // if it's an indexed array e.g. colors[2]
              if (paramName.match(/\[\d+\]$/)) {
                // get the index value and add the entry at the appropriate position
                var index = /\[(\d+)\]/.exec(paramName)[1];
                obj[key][index] = paramValue;
              } else {
                // otherwise add the value to the end of the array
                obj[key].push(paramValue);
              }
            } else {
              // we're dealing with a string
              if (!obj[paramName]) {
                // if it doesn't exist, create property
                obj[paramName] = paramValue;
              } else if (obj[paramName] && typeof obj[paramName] === 'string'){
                // if property does exist and it's a string, convert it to an array
                obj[paramName] = [obj[paramName]];
                obj[paramName].push(paramValue);
              } else {
                // otherwise add the property
                obj[paramName].push(paramValue);
              }
            }
          }
        }
      
        return obj;
}