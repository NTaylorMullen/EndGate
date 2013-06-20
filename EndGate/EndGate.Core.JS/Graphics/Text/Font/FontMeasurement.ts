module eg.Graphics.Assets {

    /**
    * Defines valid FontMeasurements that can be used to increase or decrease font sizes of Text2d's.
    */
    export enum FontMeasurement {
        Ems,
        Pixels,
        Points,
        Percent
    };    
}

module eg.Graphics.Assets._ {
    export class FontMeasurementHelper {
        public static _measurements: string[];

        public static _Initialize() {
            FontMeasurementHelper._measurements = ["em", "px", "pt", "%"];
        }

        public static Get(measurement: FontMeasurement): string {
            return FontMeasurementHelper._measurements[measurement];
        }
    }

    FontMeasurementHelper._Initialize();
}