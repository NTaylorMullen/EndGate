var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            /**
            * Defines valid FontMeasurements that can be used to increase or decrease font sizes of Text2d's.
            */
            (function (FontMeasurement) {
                FontMeasurement._map = [];
                FontMeasurement._map[0] = "Ems";
                FontMeasurement.Ems = 0;
                FontMeasurement._map[1] = "Pixels";
                FontMeasurement.Pixels = 1;
                FontMeasurement._map[2] = "Points";
                FontMeasurement.Points = 2;
                FontMeasurement._map[3] = "Percent";
                FontMeasurement.Percent = 3;
            })(Assets.FontMeasurement || (Assets.FontMeasurement = {}));
            var FontMeasurement = Assets.FontMeasurement;
            ;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            (function (_) {
                var FontMeasurementHelper = (function () {
                    function FontMeasurementHelper() { }
                    FontMeasurementHelper._Initialize = function _Initialize() {
                        FontMeasurementHelper._measurements = [
                            "em", 
                            "px", 
                            "pt", 
                            "%"
                        ];
                    };
                    FontMeasurementHelper.Get = function Get(measurement) {
                        return FontMeasurementHelper._measurements[measurement];
                    };
                    return FontMeasurementHelper;
                })();
                _.FontMeasurementHelper = FontMeasurementHelper;                
                FontMeasurementHelper._Initialize();
            })(Assets._ || (Assets._ = {}));
            var _ = Assets._;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
