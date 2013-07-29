declare module EndGate.Map.Loaders._.TMX {

    export interface ITMXTileset {
        firstgid: number;
        image: string;
        imageheight: number;
        imagewidth: number;
        margin: number;
        name: string;
        properties: { [property: string]: string };
        spacing: number;
        tilewidth: number;
        tileheight: number;
        tileproperties: { [tileIndex: string]: { [property: string]: string } };
    }

}