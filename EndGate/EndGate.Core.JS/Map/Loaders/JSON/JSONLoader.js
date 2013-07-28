var EndGate;
(function (EndGate) {
    (function (Map) {
        /// <reference path="JSONFormat.ts" />
        /// <reference path="TMX/TMXLoader.ts" />
        /// <reference path="../IMapLoader.ts" />
        /// <reference path="../IMapPreloadInfo.ts" />
        /// <reference path="../IMapLoadedResult.ts" />
        /// <reference path="../../TileMaps/TileMap.ts" />
        /// <reference path="../../TileMaps/SquareTileMap.ts" />
        (function (Loaders) {
            /**
            * Defines a JSON loader that is used to load maps.
            */
            var JSONLoader = (function () {
                function JSONLoader() {
                }
                JSONLoader.Load = function (json, onComplete, format) {
                    if (typeof format === "undefined") { format = Loaders.JSONFormat.TMX; }
                    return JSONLoader._loaders[Loaders.JSONFormat[format]].Load(json, onComplete);
                };
                JSONLoader._loaders = {
                    TMX: new Loaders._.TMX.TMXLoader()
                };
                return JSONLoader;
            })();
            Loaders.JSONLoader = JSONLoader;
        })(Map.Loaders || (Map.Loaders = {}));
        var Loaders = Map.Loaders;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
