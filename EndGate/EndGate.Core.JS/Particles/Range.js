var EndGate;
(function (EndGate) {
    /// <reference path="../Interfaces/ICloneable.ts" />
    /// <reference path="../Assets/TimeSpan.ts" />
    (function (Particles) {
        /**
        * Defines a range that is used to describe a range of values.
        */
        var Range = (function () {
            function Range(min, max) {
                if (typeof max === "undefined") { max = min; }
                this.Min = min;
                this.Max = max;
            }
            /**
            * Returns an identical copy of this range.
            */
            Range.prototype.Clone = function () {
                return new Range(this.Min, this.Max);
            };

            Range.RandomNumber = /**
            * Returns a random number between range.Min and range.Max.
            * @param range The range used to bound the number value.
            */
            function (range) {
                return Math.random() * (range.Max - range.Min) + range.Min;
            };

            Range.RandomTimeSpan = /**
            * Returns a random TimeSpan between range.Min and range.Max.
            * @param range The range used to bound the TimeSpan value.
            */
            function (range) {
                return EndGate.TimeSpan.FromMilliseconds(Math.floor(Math.random() * (range.Max.Milliseconds - range.Min.Milliseconds + 1) + range.Min.Milliseconds));
            };
            return Range;
        })();
        Particles.Range = Range;
    })(EndGate.Particles || (EndGate.Particles = {}));
    var Particles = EndGate.Particles;
})(EndGate || (EndGate = {}));
