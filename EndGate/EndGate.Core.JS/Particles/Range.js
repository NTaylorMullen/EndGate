/// <reference path="../Interfaces/ICloneable.ts" />
/// <reference path="../Assets/TimeSpan.ts" />
var EndGate;
(function (EndGate) {
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

            /**
            * Returns a random number between range.Min and range.Max.
            * @param range The range used to bound the number value.
            */
            Range.RandomNumber = function (range) {
                return Math.random() * (range.Max - range.Min) + range.Min;
            };

            /**
            * Returns a random TimeSpan between range.Min and range.Max.
            * @param range The range used to bound the TimeSpan value.
            */
            Range.RandomTimeSpan = function (range) {
                return EndGate.TimeSpan.FromMilliseconds(Math.floor(Math.random() * (range.Max.Milliseconds - range.Min.Milliseconds + 1) + range.Min.Milliseconds));
            };
            return Range;
        })();
        Particles.Range = Range;
    })(EndGate.Particles || (EndGate.Particles = {}));
    var Particles = EndGate.Particles;
})(EndGate || (EndGate = {}));
