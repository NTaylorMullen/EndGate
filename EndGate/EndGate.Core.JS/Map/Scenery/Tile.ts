/// <reference path="../../Graphics/Sprites/ImageSource.ts" />
/// <reference path="../../Graphics/Sprites/Sprite2d.ts" />

module EndGate.Map {

    export class Tile extends Graphics.Sprite2d {
        constructor(image: Graphics.Assets.ImageSource, width: number, height: number) {
            super(0, 0, image, width, height); // Set position to 0 because the tile gets updated when it gets added to the tile map

        }
    }

}