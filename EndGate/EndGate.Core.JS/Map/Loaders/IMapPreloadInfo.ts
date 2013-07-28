/// <reference path="../../Utilities/EventHandler1.ts" />

declare module EndGate.Map.Loaders {

    /**
    * Defines an object that contains some immediately available information about the map that is about to be loaded.
    */
    export interface IMapPreloadInfo {
        /**
        * The total number of layers the map contains.
        */
        LayerCount: number;

        /**
        * The total number of tile resource sheets that are used to represent the map.
        */
        ResourceSheetCount: number;

        /**
        * The total number of tiles within the map (empty or not).
        */
        TileCount: number;

        /**
        * Gets an event that is triggered when the percent loaded value has changed, first argument is the percent loaded (0-1).  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        OnPercentLoaded: EventHandler1<number>;
    }

}