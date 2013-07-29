/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Graphics/Sprites/Sprite2d.ts" />
/// <reference path="TileMap.ts" />

declare module EndGate.Map {

    /**
    * Defines an object that is used to fully describe a loaded tile.
    */
    export interface ITileDetails {
        /**
        * The Tile that will be on the map.
        */
        Tile: Graphics.Sprite2d;

        /**
        * The resource index that was used to build the tile.
        */
        ResourceIndex: number;

        /**
        * The row that the tile occupies.
        */
        Row: number;

        /**
        * The column that the tile occupies.
        */
        Column: number;

        /**
        * The TileMap that contains the Tile.  This can be used to determine the absolute position of the Tile by adding the Parent and Tile's position.
        */
        Parent: TileMap;
    }

}