/// <reference path="IHookFunction.ts" />

declare module EndGate.Map.Loaders {

    /**
    * Defines an object that can be used to provide hooks to adjust tiles as they are built.
    */
    export interface IPropertyHooks {
        /**
        * Hooks to trigger when a resource tile with the specified property is used when loading a map.  Passes in the created tile and the property value for the hook.
        */
        ResourceTileHooks?: { [property: string]: IHookFunction };

        /**
        * Hooks to trigger when a resource sheet with the specified property is used when loading a map.  Passes in created tiles from the resource sheet and the property value for the hook.
        */
        ResourceSheetHooks?: { [property: string]: IHookFunction };

        /**
        * Hooks to trigger when a layer with the specified property is used when loading a map.  Passes in created tiles from the layer and the property value for the hook.
        */
        LayerHooks?: { [property: string]: IHookFunction };
    }

}