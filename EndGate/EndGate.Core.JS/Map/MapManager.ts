/// <reference path="../Rendering/Camera/Camera2d.ts" />
/// <reference path="Scenery/SceneryHandler.ts" />
/// <reference path="../Rendering/Scene2d.ts" />

module EndGate.Map {

    /**
    * Defines a map manager that is used to manage Scenery.  Will eventually be expanded to handle obstacles.
    */
    export class MapManager {
        /**
        * Used to draw larger images that are used to depict backgrounds or other scenery.
        */
        public Scenery: SceneryHandler;

        /**
        * Creates a new instance of the MapManager object.
        * @param scene The Scene2d that is used to draw smaller objects within the game (the foreground scene).
        */
        constructor(scene: Rendering.Scene2d) {
            this.Scenery = new SceneryHandler(scene);
        }
    }

}