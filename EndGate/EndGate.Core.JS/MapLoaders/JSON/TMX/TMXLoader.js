/// <reference path="../../IMapLoader.ts" />
/// <reference path="../../IMapLoadedResult.ts" />
/// <reference path="../../IMapPreloadInfo.ts" />
/// <reference path="ITMX.ts" />
/// <reference path="OrthogonalLoader.ts" />
var EndGate;
(function (EndGate) {
    (function (MapLoaders) {
        (function (_) {
            (function (TMX) {
                var TMXLoader = (function () {
                    function TMXLoader() {
                        this._orientationLoaders = {
                            orthogonal: new EndGate.MapLoaders._.TMX.OrthogonalLoader()
                        };
                    }
                    TMXLoader.prototype.Load = function (data, propertyHooks, onComplete) {
                        if (!this._orientationLoaders[data.orientation]) {
                            throw new Error("Invalid orientation.  The orientation '" + data.orientation + "' is not supported.");
                        }

                        return this._orientationLoaders[data.orientation].Load(data, propertyHooks, onComplete);
                    };
                    return TMXLoader;
                })();
                TMX.TMXLoader = TMXLoader;
            })(_.TMX || (_.TMX = {}));
            var TMX = _.TMX;
        })(MapLoaders._ || (MapLoaders._ = {}));
        var _ = MapLoaders._;
    })(EndGate.MapLoaders || (EndGate.MapLoaders = {}));
    var MapLoaders = EndGate.MapLoaders;
})(EndGate || (EndGate = {}));
