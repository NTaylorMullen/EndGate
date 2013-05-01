module EndGate.MovementControllers.Assets {

    export class LinearDirections {
        public Left: bool;
        public Right: bool;
        public Up: bool;
        public Down: bool;

        constructor() {
            this.Left = false;
            this.Right = false;
            this.Up = false;
            this.Down = false;
        }
    }

}