/// <reference path="IMapPreloadInfo.ts" />
/// <reference path="IPropertyHooks.ts" />

declare module EndGate.MapLoaders {

    /**
    * Defines an object that can load data and output a result asynchronously.
    */
    export interface IMapLoader {
        /**
        * Loads the provided data then calls the onComplete function once valid map data has been created.
        * @param data The base data that will be transformed into the IMapLoadedResult format.
        * @param propertyHooks Property hooks that can be used to modify tiles while they're loading.
        * @param onComplete The function to trigger when the data has been converted into a valid IMapLoadedResult.
        */
        Load(data: any, propertyHooks: IPropertyHooks, onComplete: (result: IMapLoadedResult) => any): IMapPreloadInfo;
    }

}