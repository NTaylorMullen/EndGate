/// <reference path="JSONFormat.ts" />
/// <reference path="TMX/TMXLoader.ts" />
/// <reference path="../IMapLoader.ts" />
/// <reference path="../IMapLoadedResult.ts" />
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
        public static Load(json: Object, onComplete: (result: IMapLoadedResult) => any): void;
        /**
        * Loads the provided json object then calls the onComplete function once the json has been transformed.
        * @param json The JSON data that represents the map.
        * @param onComplete The function to trigger when the json has been converted into a valid IMapLoadedResult.
        * @param format The format of the JSON object.  Defaults to the tmx format.
        */
        public static Load(json: Object, onComplete: (result: IMapLoadedResult) => any, format: JSONFormat): void;
        public static Load(json: Object, onComplete: (result: IMapLoadedResult) => any, format: JSONFormat = JSONFormat.TMX): void {
            JSONLoader._loaders[JSONFormat[format]].Load(json, onComplete);
        }
    }

}