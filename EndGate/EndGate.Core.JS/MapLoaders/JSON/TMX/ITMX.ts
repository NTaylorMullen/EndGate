/// <reference path="ITMXLayer.ts" />
/// <reference path="ITMXTileset.ts" />

declare module EndGate.MapLoaders._.TMX {

    export interface ITMX {
        version: number;
        width: number;
        height: number;
        tilewidth: number;
        tileheight: number;
        orientation: string;
        properties: any;
        layers: Array<ITMXLayer>;
        tilesets: Array<ITMXTileset>;
    }

}