var EndGate;
(function (EndGate) {
    (function (Map) {
        (function (Loaders) {
            (function (_) {
                /// <reference path="../../IMapLoader.ts" />
                /// <reference path="../../IMapLoadedResult.ts" />
                /// <reference path="../../../TileMaps/TileMap.ts" />
                /// <reference path="ITMX.ts" />
                /// <reference path="OrthogonalLoader.ts" />
                (function (TMX) {
                    var TMXLoader = (function () {
                        function TMXLoader() {
                            this._orientationLoaders = {
                                orthogonal: new TMX.OrthogonalLoader()
                            };
                        }
                        TMXLoader.prototype.Load = function (data, onComplete) {
                            if (!this._orientationLoaders[data.orientation]) {
                                throw new Error("Invalid orientation.  The orientation '" + data.orientation + "' is not supported.");
                            }

                            this._orientationLoaders[data.orientation].Load(data, onComplete);
                        };
                        return TMXLoader;
                    })();
                    TMX.TMXLoader = TMXLoader;
                })(_.TMX || (_.TMX = {}));
                var TMX = _.TMX;
            })(Loaders._ || (Loaders._ = {}));
            var _ = Loaders._;
        })(Map.Loaders || (Map.Loaders = {}));
        var Loaders = Map.Loaders;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
