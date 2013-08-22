interface Window {
    OnRepaintCompleted: (callback: Function) => void;
}

window.OnRepaintCompleted = (
        window.requestAnimationFrame ||
        (<any>window).webkitRequestAnimationFrame ||
        (<any>window).mozRequestAnimationFrame ||
        (<any>window).oRequestAnimationFrame ||
        (<any>window).msRequestAnimationFrame ||
        function (callback: Function) {
            (<any>window).setTimeout(callback, 0);
        }
    );