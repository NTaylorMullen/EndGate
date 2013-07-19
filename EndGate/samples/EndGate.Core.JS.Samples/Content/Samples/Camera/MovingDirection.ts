// Wrap in module to keep code out of global scope
module Camera {

    export class MovingDirection {
        public Up: boolean = false;
        public Right: boolean = false;
        public Down: boolean = false;
        public Left: boolean = false;
        public ZoomingIn: boolean = false;
        public ZoomingOut: boolean = false;
    }

}