$.get("header.html", function (data) {
    $("#header-container").replaceWith(data);

    var options = {};
    options.edge = "right";
    $('.sidenav').sidenav(options);
});
$('#footer-container').load('footer.html');