/// <reference path="../../Graphics/Sprites/ImageSource.ts" />
/// <reference path="../../Graphics/Sprites/Sprite2d.ts" />

module eg.Map {

    /**
    * Defines a SquareTile that is used by the SquareTileMap.  Represents one tile within the tile map.
    */
    export class SquareTile extends Graphics.Sprite2d {
        /**
        * Creates a new instance of the SquareTile object.
        * @param image The image that is within the tile.
        * @param width The width of the tile.
        * @param height The height of the tile.
        */
        constructor(image: Graphics.Assets.ImageSource, width: number, height: number) {
            super(0, 0, image, width, height); // Set position to 0 because the tile gets updated when it gets added to the tile map
        }
    }

}