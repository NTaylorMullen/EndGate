var EndGate;
(function (EndGate) {
    /// <reference path="../Rendering/Camera/Camera2d.ts" />
    /// <reference path="Scenery/SceneryHandler.ts" />
    /// <reference path="../Rendering/Scene2d.ts" />
    (function (Map) {
        /**
        * Defines a map manager that is used to manage Scenery.  Will eventually be expanded to handle obstacles.
        */
        var MapManager = (function () {
            /**
            * Creates a new instance of the MapManager object.
            * @param scene The Scene2d that is used to draw smaller objects within the game (the foreground scene).
            */
            function MapManager(scene) {
                this.Scenery = new Map.SceneryHandler(scene);
            }
            return MapManager;
        })();
        Map.MapManager = MapManager;        
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
