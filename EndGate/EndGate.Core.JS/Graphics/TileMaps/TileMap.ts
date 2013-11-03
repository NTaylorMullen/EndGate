/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Graphics/Graphic2d.ts" />
/// <reference path="../../Graphics/ImageSource.ts" />

module EndGate.Graphics {

    /**
    * Defines an abstract class TileMap that takes an array of resources to be mapped to tiles.
    */
    export class TileMap extends Graphics.Graphic2d {
        public _Resources: Graphics.ImageSource[];

        /**
        * Creates a new instance of the TileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        */
        constructor(x: number, y: number, resources: Graphics.ImageSource[]) {
            super(new PIXI.DisplayObjectContainer(), new Vector2d(x, y));

            this._Resources = resources;
        }

        /**
        * Scale is not implemented.
        */
        public Scale(scale: number): void {
            throw new Error("Scale is not implemented for TileMaps.");
        }
    }

}