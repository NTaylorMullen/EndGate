/// <reference path="../TileMaps/TileMap.ts" />

declare module EndGate.Map.Loaders {

    /**
    * Defines an object that contains all the information needed to create a scenic map.
    */
    export interface IMapLoadedResult {
        /**
        * Gets or sets the layers that will represent the scenery of the game.  Each layer should be added to the scenery in order to draw the layers.
        */
        Layers: Array<TileMap>;
    }

}