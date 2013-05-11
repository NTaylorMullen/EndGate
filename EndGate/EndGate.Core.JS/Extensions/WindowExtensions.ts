interface Window {
    OnRepaintCompleted(callback: Function): void;
}

window.OnRepaintCompleted = () => {
    return (
        window.requestAnimationFrame ||
        (<any>window).webkitRequestAnimationFrame ||
        (<any>window).mozRequestAnimationFrame ||
        (<any>window).oRequestAnimationFrame ||
        (<any>window).msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 0);
        }
    );
} ();