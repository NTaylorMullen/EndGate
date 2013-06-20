/// <reference path="../GameTime.ts" />

declare module eg {

    /**
    * Represents an object that can be updated.
    */
    export interface IUpdateable {
        /**
        * Updates the object.
        * @param gameTime The current game time object.
        */
        Update(gameTime: eg.GameTime): void;
    }

}