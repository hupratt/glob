buildDropdown = () => {
    // build from flagstrap.min.js loaded earlier
    $(".flagstrap").flagStrap();
    // for some reason the href tags don't work
    $(".dropdown-link").click(function () {
        window.location = $(this).attr("href");
    });
    $('.dropdown-menu').on('mouseleave', function (e) {
        setTimeout(() => {
            $(".dropdown-menu").toggle();
        }, 600);
    });
}

$(document).ready(function () {
    // build the language drop down list on the index page
    buildDropdown();
});