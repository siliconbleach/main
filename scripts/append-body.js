(function ($) {
    $(document).ready(function () {
        const appDiv = document.createElement("div");
        appDiv.id = "app";

        $(document.body).append(appDiv);

        console.log("I have done something");
    });
})(jQuery);