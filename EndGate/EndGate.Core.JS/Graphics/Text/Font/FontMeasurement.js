var eg;
(function (eg) {
    (function (Graphics) {
        (function (Assets) {
            /**
            * Defines valid FontMeasurements that can be used to increase or decrease font sizes of Text2d's.
            */
            (function (FontMeasurement) {
                FontMeasurement[FontMeasurement["Ems"] = 0] = "Ems";
                FontMeasurement[FontMeasurement["Pixels"] = 1] = "Pixels";
                FontMeasurement[FontMeasurement["Points"] = 2] = "Points";

                FontMeasurement[FontMeasurement["Percent"] = 3] = "Percent";
            })(Assets.FontMeasurement || (Assets.FontMeasurement = {}));
            var FontMeasurement = Assets.FontMeasurement;
            ;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(eg.Graphics || (eg.Graphics = {}));
    var Graphics = eg.Graphics;
})(eg || (eg = {}));

var eg;
(function (eg) {
    (function (Graphics) {
        (function (Assets) {
            (function (_) {
                var FontMeasurementHelper = (function () {
                    function FontMeasurementHelper() {
                    }
                    FontMeasurementHelper._Initialize = function () {
                        FontMeasurementHelper._measurements = ["em", "px", "pt", "%"];
                    };

                    FontMeasurementHelper.Get = function (measurement) {
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
    })(eg.Graphics || (eg.Graphics = {}));
    var Graphics = eg.Graphics;
})(eg || (eg = {}));
