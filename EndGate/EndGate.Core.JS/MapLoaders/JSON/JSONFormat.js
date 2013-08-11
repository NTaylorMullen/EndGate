var EndGate;
(function (EndGate) {
    (function (MapLoaders) {
        /**
        * Defines supported JSON formats for map loading.
        */
        (function (JSONFormat) {
            JSONFormat[JSONFormat["TMX"] = 0] = "TMX";
        })(MapLoaders.JSONFormat || (MapLoaders.JSONFormat = {}));
        var JSONFormat = MapLoaders.JSONFormat;
    })(EndGate.MapLoaders || (EndGate.MapLoaders = {}));
    var MapLoaders = EndGate.MapLoaders;
})(EndGate || (EndGate = {}));
