var EndGate;
(function (EndGate) {
    (function (Map) {
        var MapManager = (function () {
            function MapManager(foregroundCanvas, camera) {
                this.Scenery = new Map.SceneryHandler(foregroundCanvas, camera);
            }
            return MapManager;
        })();
        Map.MapManager = MapManager;        
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=MapManager.js.map
