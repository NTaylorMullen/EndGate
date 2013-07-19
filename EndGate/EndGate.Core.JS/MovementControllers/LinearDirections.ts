module EndGate.MovementControllers.Assets {

    /**
    * Defines a direction management object that represents directional state.
    */
    export class LinearDirections {
        /**
        * Indicates whether the object is moving left.
        */
        public Left: boolean;
        /**
        * Indicates whether the object is moving right.
        */
        public Right: boolean;
        /**
        * Indicates whether the object is moving up.
        */
        public Up: boolean;
        /**
        * Indicates whether the object is moving down.
        */
        public Down: boolean;

        /**
        * Creates a new instance of the LinearDirection object with all directions= indicators initially set to false.
        */
        constructor() {
            this.Left = false;
            this.Right = false;
            this.Up = false;
            this.Down = false;
        }
    }

}