var EndGate;
(function (EndGate) {
    /// <reference path="JSONFormat.ts" />
    /// <reference path="TMX/TMXLoader.ts" />
    /// <reference path="../IMapLoader.ts" />
    /// <reference path="../IMapPreloadInfo.ts" />
    /// <reference path="../IMapLoadedResult.ts" />
    /// <reference path="../IPropertyHooks.ts" />
    (function (MapLoaders) {
        /**
        * Defines a JSON loader that is used to load maps.
        */
        var JSONLoader = (function () {
            function JSONLoader() {
            }
            JSONLoader.Load = function (json, onComplete, propertyHooks, format) {
                if (typeof format === "undefined") { format = MapLoaders.JSONFormat.TMX; }
                if (!propertyHooks) {
                    // Defaults
                    propertyHooks = {
                        ResourceTileHooks: {},
                        ResourceSheetHooks: {},
                        LayerHooks: {}
                    };
                }

                return JSONLoader._loaders[MapLoaders.JSONFormat[format]].Load(json, propertyHooks, onComplete);
            };
            JSONLoader._loaders = {
                TMX: new MapLoaders._.TMX.TMXLoader()
            };
            return JSONLoader;
        })();
        MapLoaders.JSONLoader = JSONLoader;
    })(EndGate.MapLoaders || (EndGate.MapLoaders = {}));
    var MapLoaders = EndGate.MapLoaders;
})(EndGate || (EndGate = {}));
