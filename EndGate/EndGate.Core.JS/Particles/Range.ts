/// <reference path="../Interfaces/ICloneable.ts" />
/// <reference path="../Assets/TimeSpan.ts" />

module EndGate.Particles {

    /**
    * Defines a range that is used to describe a range of values.
    */
    export class Range<T> implements ICloneable {
        /**
        * Gets or sets the minimum value of the range.
        */
        public Min: T;
        /**
        * Gets or sets the maximum value of the range.
        */
        public Max: T;

        /**
        * Creates a new instance of the Range object.
        * @param value The min and max value of the range.
        */
        constructor(value: T);
        /**
        * Creates a new instance of the Range object.
        * @param min The initial min value of the range.
        * @param max The initial max value of the range.
        */
        constructor(min: T, max: T);
        constructor(min: T, max: T = min) {
            this.Min = min;
            this.Max = max;
        }

        /**
        * Returns an identical copy of this range.
        */
        public Clone(): Range<T> {
            return new Range<T>(this.Min, this.Max);
        }

        /**
        * Returns a random number between range.Min and range.Max.
        * @param range The range used to bound the number value.
        */
        public static RandomNumber(range: Range<number>): number {
            return Math.random() * (range.Max - range.Min) + range.Min;
        }

        /**
        * Returns a random TimeSpan between range.Min and range.Max.
        * @param range The range used to bound the TimeSpan value.
        */
        public static RandomTimeSpan(range: Range<TimeSpan>): TimeSpan {
            return TimeSpan.FromMilliseconds(Math.floor(Math.random() * (range.Max.Milliseconds - range.Min.Milliseconds + 1) + range.Min.Milliseconds));
        }
    }

}