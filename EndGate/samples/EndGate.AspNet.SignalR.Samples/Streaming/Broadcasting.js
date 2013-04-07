(function ($, window) {
    var streamingHub = $.connection.streamingHub,
        timeHolder = $("#timeHolder");

    streamingHub.client.update = function (time) {
        timeHolder.append("<p>" + time + "</p>");
    };

    $.connection.hub.start();
})($, window)
