var EndGate;
(function (EndGate) {
    (function (Map) {
        (function (Loaders) {
            /**
            * Defines supported JSON formats for map loading.
            */
            (function (JSONFormat) {
                JSONFormat[JSONFormat["TMX"] = 0] = "TMX";
            })(Loaders.JSONFormat || (Loaders.JSONFormat = {}));
            var JSONFormat = Loaders.JSONFormat;
        })(Map.Loaders || (Map.Loaders = {}));
        var Loaders = Map.Loaders;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
