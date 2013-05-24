// Wrap in module to keep code out of global scope
module Camera {

    export class MovingDirection {
        public Up: bool = false;
        public Right: bool = false;
        public Down: bool = false;
        public Left: bool = false;
        public ZoomingIn: bool = false;
        public ZoomingOut: bool = false;
    }

}