/// <reference path="../Interfaces/ITyped.ts" />
/// <reference path="../Interfaces/ICloneable.ts" />

module EndGate {

    /**
    * Defines a time interval.
    */
    export class TimeSpan implements _.ITyped, ICloneable {
        public _type: string = "TimeSpan";

        private static _secondsMultiplier: number = 1000;
        private static _minutesMultiplier: number = TimeSpan._secondsMultiplier * 60;

        private _milliseconds: number;
        private _seconds: number;
        private _minutes: number;

        /**
        * Creates a new instance of TimeSpan based on the provided milliseconds.
        * @param milliseconds Number of milliseconds.
        */
        constructor(milliseconds: number);
        /**
        * Creates a new instance of TimeSpan based on the provided milliseconds, seconds and minutes.
        * @param milliseconds Number of milliseconds.
        * @param seconds Number of seconds.
        */
        constructor(milliseconds: number, seconds: number);
        /**
        * Creates a new instance of TimeSpan based on the provided milliseconds, seconds and minutes.
        * @param milliseconds Number of milliseconds.
        * @param seconds Number of seconds.
        * @param minutes Number of minutes.
        */
        constructor(milliseconds: number, seconds: number, minutes: number);
        constructor(milliseconds: number, seconds: number = 0, minutes: number = 0) {
            this.Milliseconds = milliseconds + seconds * TimeSpan._secondsMultiplier + minutes * TimeSpan._minutesMultiplier;
        }

        /**
        * Gets or sets the number of milliseconds the TimeSpan represents.
        */
        public get Milliseconds(): number {
            return this._milliseconds;
        }
        public set Milliseconds(val: number) {
            this._milliseconds = val;
            this._seconds = val / TimeSpan._secondsMultiplier;
            this._minutes = val / TimeSpan._minutesMultiplier;
        }

        /**
        * Gets or sets the number of seconds the TimeSpan represents.
        */
        public get Seconds(): number {
            return this._seconds;
        }
        public set Seconds(val: number) {
            this._seconds = val;
            this._milliseconds = val * TimeSpan._secondsMultiplier;
            this._minutes = this._milliseconds / TimeSpan._minutesMultiplier;
        }

        /**
        * Gets or sets the number of minutes the TimeSpan represents.
        */
        public get Minutes(): number {
            return this._minutes;
        }
        public set Minutes(val: number) {
            this._minutes = val;
            this._seconds = val * 60;
            this._milliseconds = this._seconds * TimeSpan._secondsMultiplier;
        }

        /**
        * Returns a TimeSpan that represents the addition of the current TimeSpan's milliseconds to the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to add.
        */
        public Add(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the addition of the current TimeSpan's milliseconds to the provided milliseconds.
        * @param val The number of milliseconds to add.
        */
        public Add(val: number): TimeSpan;
        public Add(val: any): TimeSpan {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds + val.Milliseconds);
            }
            else {
                return new TimeSpan(this.Milliseconds + val);
            }
        }

        /**
        * Returns a TimeSpan that represents the multiplication of the current TimeSpan's milliseconds by the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to multiply.
        */
        public Multiply(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the multiplication of the current TimeSpan's milliseconds by the provided milliseconds.
        * @param val The number of milliseconds to multiply.
        */
        public Multiply(val: number): TimeSpan;
        public Multiply(val: any): TimeSpan {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds * val.Milliseconds);
            }
            else {
                return new TimeSpan(this.Milliseconds * val);
            }
        }

        /**
        * Returns a TimeSpan that represents the subtraction of the current TimeSpan's milliseconds by the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to subtract by.
        */
        public Subtract(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the subtraction of the current TimeSpan's milliseconds by the provided milliseconds.
        * @param val The number of milliseconds to subtract by.
        */
        public Subtract(val: number): TimeSpan;
        public Subtract(val: any): TimeSpan {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds - val.Milliseconds);
            }
            else {
                return new TimeSpan(this.Milliseconds - val);
            }
        }

        /**
        * Returns a TimeSpan that represents the subtraction of the current TimeSpan's milliseconds from the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to subtract from.
        */
        public SubtractFrom(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the subtraction of the current TimeSpan's milliseconds from the provided milliseconds.
        * @param val The number of milliseconds to subtract from.
        */
        public SubtractFrom(val: number): TimeSpan;
        public SubtractFrom(val: any): TimeSpan {
            if (val._type === "TimeSpan") {
                return new TimeSpan(val.Milliseconds - this.Milliseconds);
            }
            else {
                return new TimeSpan(val - this.Milliseconds);
            }
        }

        /**
        * Returns a TimeSpan that represents the division of the current TimeSpan's milliseconds by the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to divide by.
        */
        public Divide(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the division of the current TimeSpan's milliseconds by the provided milliseconds.
        * @param val The number of milliseconds to divide by.
        */
        public Divide(val: number): TimeSpan;
        public Divide(val: any): TimeSpan {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds / val.Milliseconds);
            }
            else {
                return new TimeSpan(this.Milliseconds / val);
            }
        }

        /**
        * Returns a TimeSpan that represents the division of the current TimeSpan's milliseconds from the provided TimeSpan's milliseconds.
        * @param val The TimeSpan to divide from.
        */
        public DivideFrom(val: TimeSpan): TimeSpan;
        /**
        * Returns a TimeSpan that represents the division of the current TimeSpan's milliseconds from the provided milliseconds.
        * @param val The number of milliseconds to divide from.
        */
        public DivideFrom(val: number): TimeSpan;
        public DivideFrom(val: any): TimeSpan {
            if (val._type === "TimeSpan") {
                return new TimeSpan(val.Milliseconds / this.Milliseconds);
            }
            else {
                return new TimeSpan(val / this.Milliseconds);
            }
        }

        /**
        * Determines whether this TimeSpan represents the same amount of time as the provided TimeSpan.
        * @param timeSpan The TimeSpan to compare the current TimeSpan to.
        */
        public Equivalent(timeSpan: TimeSpan): boolean {
            return this.Milliseconds === timeSpan.Milliseconds;
        }

        /**
        * Returns a TimeSpan that represents the same time interval.
        */
        public Clone(): TimeSpan {
            return new TimeSpan(this.Milliseconds);
        }

        /**
        * Overridden toString method to display TimeSpan in the ms:s:m format.
        */
        public toString(): string {
            return this.Milliseconds + ":" + this.Seconds + ":" + this.Minutes;
        }

        /**
        * Returns a TimeSpan that represents the specified number of milliseconds.
        * @param val Number of milliseconds.
        */
        public static FromMilliseconds(val: number): TimeSpan {
            return new TimeSpan(val);
        }

        /**
        * Returns a TimeSpan that represents the specified number of seconds.
        * @param val Number of seconds.
        */
        public static FromSeconds(val: number): TimeSpan {
            return new TimeSpan(0, val);
        }

        /**
        * Returns a TimeSpan that represents the specified number of minutes.
        * @param val Number of minutes.
        */
        public static FromMinutes(val: number): TimeSpan {
            return new TimeSpan(0, 0, val);
        }        

        /**
        * Returns a TimeSpan that represents the time between the two dates.
        * @param from The from date.
        * @param to The to date.
        */
        public static DateSpan(from: Date, to: Date): TimeSpan {
            return new TimeSpan(to.getTime() - from.getTime());
        }


        /**
        * Gets a TimeSpan that represents a 0 millisecond time interval.
        */
        public static get Zero(): TimeSpan {
            return new TimeSpan(0);
        }
    }

}