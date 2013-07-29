/// <reference path="../TileMaps/ITileDetails.ts" />

declare module EndGate.Map.Loaders {

    /**
    * Defines an IHookFunction that represents a function that can be used to hook into map loading tiles.
    */
    export interface IHookFunction {
        (details: ITileDetails, propertyValue: string): any;
    }

}