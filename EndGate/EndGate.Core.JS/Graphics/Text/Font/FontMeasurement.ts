module EndGate.Graphics.Assets {

    /**
    * Defines valid FontMeasurements that can be used to increase or decrease font sizes of Text2d's.
    */
    export enum FontMeasurement {
        Ems,
        Pixels,
        Points,
        Percent
    };

    export class _FontMeasurementHelper {
        public static _measurements: string[];

        public static _Initialize() {
            _FontMeasurementHelper._measurements = ["em", "px", "pt", "%"];
        }

        public static Get(measurement: FontMeasurement): string {
            return _FontMeasurementHelper._measurements[measurement];
        }
    }

    _FontMeasurementHelper._Initialize();
}