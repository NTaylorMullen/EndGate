declare module EndGate.Map.Loaders._.TMX {

    export interface ITMXLayer {
        name: string;
        data: Array<number>;        
        opacity: number;
        type: string;
        visible: boolean;
        width: number;
        height: number;
        x: number;
        y: number;
        properties: { [property: string]: string };
    }

}