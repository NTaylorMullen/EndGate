interface Window {
    OnRepaintCompleted: () => void;
}

(<any>window).OnRepaintCompleted = () => {
    return (
        window.requestAnimationFrame ||
        (<any>window).webkitRequestAnimationFrame ||
        (<any>window).mozRequestAnimationFrame ||
        (<any>window).oRequestAnimationFrame ||
        (<any>window).msRequestAnimationFrame ||
        function (callback) {
            (<any>window).setTimeout(callback, 0);
        }
    );
} ();