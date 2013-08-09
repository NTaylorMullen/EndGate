(window).OnRepaintCompleted = (function () {
    return (window.requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame || (window).oRequestAnimationFrame || (window).msRequestAnimationFrame || function (callback) {
        (window).setTimeout(callback, 0);
    });
})();
