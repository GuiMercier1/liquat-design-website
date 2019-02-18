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

Promise.all(promises).then(hideSpinner);