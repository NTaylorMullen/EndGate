/// <reference path="JSONFormat.ts" />
/// <reference path="TMX/TMXLoader.ts" />
/// <reference path="../IMapLoader.ts" />
/// <reference path="../IMapPreloadInfo.ts" />
/// <reference path="../IMapLoadedResult.ts" />
/// <reference path="../IPropertyHooks.ts" />
/// <reference path="../../TileMaps/TileMap.ts" />
/// <reference path="../../TileMaps/SquareTileMap.ts" />

module EndGate.Map.Loaders {

    /**
    * Defines a JSON loader that is used to load maps.
    */
    export class JSONLoader {
        private static _loaders: { [format: string]: IMapLoader } = {
            TMX: new _.TMX.TMXLoader()
        };

        /**
        * Loads the provided tmx formatted json object then calls the onComplete function once the json has been transformed.
        * @param json The JSON data that represents the map.
        * @param onComplete The function to trigger when the json has been converted into a valid IMapLoadedResult.
        */
        public static Load(json: Object, onComplete: (result: IMapLoadedResult) => any): IMapPreloadInfo;
        /**
        * Loads the provided json object then calls the onComplete function once the json has been transformed.
        * @param json The JSON data that represents the map.
        * @param onComplete The function to trigger when the json has been converted into a valid IMapLoadedResult.
        * @param propertyHooks Property hooks that can be used to modify tiles while they're loading.  All maps that are loaded are static square tile maps, therefore modified tiles will only be drawn once.
        */
        public static Load(json: Object, onComplete: (result: IMapLoadedResult) => any, propertyHooks: IPropertyHooks): IMapPreloadInfo;
        /**
        * Loads the provided json object then calls the onComplete function once the json has been transformed.
        * @param json The JSON data that represents the map.
        * @param onComplete The function to trigger when the json has been converted into a valid IMapLoadedResult.
        * @param propertyHooks Property hooks that can be used to modify tiles while they're loading.  All maps that are loaded are static square tile maps, therefore modified tiles will only be drawn once.
        * @param format The format of the JSON object.  Defaults to the tmx format.
        */
        public static Load(json: Object, onComplete: (result: IMapLoadedResult) => any, propertyHooks: IPropertyHooks, format: JSONFormat): IMapPreloadInfo;
        public static Load(json: Object, onComplete: (result: IMapLoadedResult) => any, propertyHooks?: IPropertyHooks, format: JSONFormat = JSONFormat.TMX): IMapPreloadInfo {
            if (!propertyHooks) {
                // Defaults
                propertyHooks = {
                    ResourceTileHooks: {},
                    ResourceSheetHooks: {},
                    LayerHooks: {}
                };
            }

            return JSONLoader._loaders[JSONFormat[format]].Load(json, propertyHooks, onComplete);
        }
    }

}