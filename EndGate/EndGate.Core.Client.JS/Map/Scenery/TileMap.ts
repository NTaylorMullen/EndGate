/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Graphics/Graphic2d.ts" />
/// <reference path="../../Graphics/Sprites/ImageSource.ts" />

module EndGate.Map {

    export class TileMap extends Graphics.Abstractions.Graphic2d {
        public _Resources: Graphics.Assets.ImageSource[];

        constructor(x: number, y: number, resources: Graphics.Assets.ImageSource[]) {
            super(new Vector2d(x, y));

            this._Resources = resources;
        }
    }

}