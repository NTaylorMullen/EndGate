(<any >window).readyForRender = (function () {
    return window.requestAnimationFrame ||
    (<any>window).webkitRequestAnimationFrame ||
    (<any>window).mozRequestAnimationFrame ||
    (<any>window).oRequestAnimationFrame ||
    (<any>window).msRequestAnimationFrame;
})();