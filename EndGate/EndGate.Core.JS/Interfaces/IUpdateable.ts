/// <reference path="../GameTime.ts" />

declare module EndGate {

    /**
    * Represents an object that can be updated.
    */
    export interface IUpdateable {
        /**
        * Updates the object.
        * @param gameTime The current game time object.
        */
        Update(gameTime: EndGate.GameTime): void;
    }

}