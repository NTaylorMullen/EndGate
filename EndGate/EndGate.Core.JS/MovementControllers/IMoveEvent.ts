declare module EndGate.MovementControllers {

    /**
    * Represents a move event object that is used to depict a movement, specifically a direction and whether or not the move started or stopped.
    */
    export interface IMoveEvent {
        /**
        * The movement direction.
        */
        Direction: string;
        /**
        * Whether or not the move started or stopped.
        */
        StartMoving: bool;
    }

}