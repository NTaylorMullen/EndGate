/// <reference path="../Interfaces/ITyped.ts" />
/// <reference path="../Interfaces/ICloneable.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines a time interval.
    */
    var TimeSpan = (function () {
        function TimeSpan(milliseconds, seconds, minutes) {
            if (typeof seconds === "undefined") { seconds = 0; }
            if (typeof minutes === "undefined") { minutes = 0; }
            this._type = "TimeSpan";
            this.Milliseconds = milliseconds + seconds * TimeSpan._secondsMultiplier + minutes * TimeSpan._minutesMultiplier;
        }
        Object.defineProperty(TimeSpan.prototype, "Milliseconds", {
            /**
            * Gets or sets the number of milliseconds the TimeSpan represents.
            */
            get: function () {
                return this._milliseconds;
            },
            set: function (val) {
                this._milliseconds = val;
                this._seconds = val / TimeSpan._secondsMultiplier;
                this._minutes = val / TimeSpan._minutesMultiplier;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TimeSpan.prototype, "Seconds", {
            /**
            * Gets or sets the number of seconds the TimeSpan represents.
            */
            get: function () {
                return this._seconds;
            },
            set: function (val) {
                this._seconds = val;
                this._milliseconds = val * TimeSpan._secondsMultiplier;
                this._minutes = this._milliseconds / TimeSpan._minutesMultiplier;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TimeSpan.prototype, "Minutes", {
            /**
            * Gets or sets the number of minutes the TimeSpan represents.
            */
            get: function () {
                return this._minutes;
            },
            set: function (val) {
                this._minutes = val;
                this._seconds = val * 60;
                this._milliseconds = this._seconds * TimeSpan._secondsMultiplier;
            },
            enumerable: true,
            configurable: true
        });

        TimeSpan.prototype.Add = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds + val.Milliseconds);
            } else {
                return new TimeSpan(this.Milliseconds + val);
            }
        };

        TimeSpan.prototype.Multiply = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds * val.Milliseconds);
            } else {
                return new TimeSpan(this.Milliseconds * val);
            }
        };

        TimeSpan.prototype.Subtract = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds - val.Milliseconds);
            } else {
                return new TimeSpan(this.Milliseconds - val);
            }
        };

        TimeSpan.prototype.SubtractFrom = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(val.Milliseconds - this.Milliseconds);
            } else {
                return new TimeSpan(val - this.Milliseconds);
            }
        };

        TimeSpan.prototype.Divide = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(this.Milliseconds / val.Milliseconds);
            } else {
                return new TimeSpan(this.Milliseconds / val);
            }
        };

        TimeSpan.prototype.DivideFrom = function (val) {
            if (val._type === "TimeSpan") {
                return new TimeSpan(val.Milliseconds / this.Milliseconds);
            } else {
                return new TimeSpan(val / this.Milliseconds);
            }
        };

        /**
        * Determines whether this TimeSpan represents the same amount of time as the provided TimeSpan.
        * @param timeSpan The TimeSpan to compare the current TimeSpan to.
        */
        TimeSpan.prototype.Equivalent = function (timeSpan) {
            return this.Milliseconds === timeSpan.Milliseconds;
        };

        /**
        * Returns a TimeSpan that represents the same time interval.
        */
        TimeSpan.prototype.Clone = function () {
            return new TimeSpan(this.Milliseconds);
        };

        /**
        * Overridden toString method to display TimeSpan in the ms:s:m format.
        */
        TimeSpan.prototype.toString = function () {
            return this.Milliseconds + ":" + this.Seconds + ":" + this.Minutes;
        };

        /**
        * Returns a TimeSpan that represents the specified number of milliseconds.
        * @param val Number of milliseconds.
        */
        TimeSpan.FromMilliseconds = function (val) {
            return new TimeSpan(val);
        };

        /**
        * Returns a TimeSpan that represents the specified number of seconds.
        * @param val Number of seconds.
        */
        TimeSpan.FromSeconds = function (val) {
            return new TimeSpan(0, val);
        };

        /**
        * Returns a TimeSpan that represents the specified number of minutes.
        * @param val Number of minutes.
        */
        TimeSpan.FromMinutes = function (val) {
            return new TimeSpan(0, 0, val);
        };

        /**
        * Returns a TimeSpan that represents the time between the two dates.
        * @param from The from date.
        * @param to The to date.
        */
        TimeSpan.DateSpan = function (from, to) {
            return new TimeSpan(to.getTime() - from.getTime());
        };

        Object.defineProperty(TimeSpan, "Zero", {
            /**
            * Gets a TimeSpan that represents a 0 millisecond time interval.
            */
            get: function () {
                return new TimeSpan(0);
            },
            enumerable: true,
            configurable: true
        });
        TimeSpan._secondsMultiplier = 1000;
        TimeSpan._minutesMultiplier = TimeSpan._secondsMultiplier * 60;
        return TimeSpan;
    })();
    EndGate.TimeSpan = TimeSpan;
})(EndGate || (EndGate = {}));
