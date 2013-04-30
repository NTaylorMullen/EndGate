var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
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
            Assets.FontMeasurementHelper = FontMeasurementHelper;            
            FontMeasurementHelper._Initialize();
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=FontMeasurement.js.map
