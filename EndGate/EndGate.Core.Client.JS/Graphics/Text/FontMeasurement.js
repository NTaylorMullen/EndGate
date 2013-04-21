var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            (function (Text) {
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
                })(Text.FontMeasurement || (Text.FontMeasurement = {}));
                var FontMeasurement = Text.FontMeasurement;
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
                Text.FontMeasurementHelper = FontMeasurementHelper;                
                FontMeasurementHelper._Initialize();
            })(Graphics.Text || (Graphics.Text = {}));
            var Text = Graphics.Text;
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=FontMeasurement.js.map
