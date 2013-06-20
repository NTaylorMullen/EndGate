module eg.MovementControllers.Assets {

    /**
    * Defines a direction management object that represents directional state.
    */
    export class LinearDirections {
        /**
        * Indicates whether the object is moving left.
        */
        public Left: bool;
        /**
        * Indicates whether the object is moving right.
        */
        public Right: bool;
        /**
        * Indicates whether the object is moving up.
        */
        public Up: bool;
        /**
        * Indicates whether the object is moving down.
        */
        public Down: bool;

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