/// <reference path="../TileMaps/TileMap.ts" />

declare module EndGate.Map.Loaders {

    /**
    * Defines an object that can load data and output a result asynchronously.
    */
    export interface IMapLoader {
        /**
        * Loads the provided data then calls the onComplete function once valid map data has been created.
        * @param data The base data that will be transformed into the IMapLoadedResult format.
        * @param onComplete The function to trigger when the data has been converted into a valid IMapLoadedResult.
        */
        Load(data: any, onComplete: (result: IMapLoadedResult) => any): void;
    }

}