/// <reference path="../Scripts/jquery-2.0.0.js" />
/// <reference path="codemirror.js" />

(function () {
    var fileCache = {},
        fileListTemplate = $("<li class='fileNav'><a href='#'></a></li>"),
        fileList = $("#_fileList"),
        fileContent = $("#_fileContent"),
        jsScriptHolder = $("#_scripts"),
        newFileListNav = function (name) {
            var ele = fileListTemplate.clone();

            ele.find("a").html(name);

            return ele;
        },
        editor = CodeMirror(fileContent[0], {
            lineNumbers: true,
            matchBrackets: true,
            mode: "text/typescript",
            readOnly: true,
            theme: "solarized light"
        });

    $.each($("script[typescript='true']"), function (i, ele) {
        var $ele = $(ele),
            jsSrc = $ele.attr("src"),
            tsSrc = jsSrc.substr(0, jsSrc.length - 2) + "ts",
            split = tsSrc.split('.'),
            fileName = split[split.length - 2],
            fileNav = newFileListNav(fileName + ".ts");

        // Build TS cache
        $.get(tsSrc, function (code) {
            fileCache[fileName] = code;

            // Bind click after we've received the typescript cache
            fileNav.click(function (e) {
                editor.setOption("value", fileCache[fileName]);
                $("li.fileNav").removeClass("active");
                fileNav.addClass("active");
                e.preventDefault();
                return false;
            });

            if (i === 0) {
                fileNav.click();
            }
        });        

        fileList.append(fileNav);
    });

    fileList.parent().css("left", fileContent.width() + 20);

})();