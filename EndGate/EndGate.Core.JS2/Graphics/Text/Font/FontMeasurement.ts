module EndGate.Graphics.Assets {

    export enum FontMeasurement {
        Ems,
        Pixels,
        Points,
        Percent
    };

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