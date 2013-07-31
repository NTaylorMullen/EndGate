var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    var TimeSpan = (function () {
        function TimeSpan(milliseconds, seconds, minutes) {
            if (typeof seconds === "undefined") { seconds = 0; }
            if (typeof minutes === "undefined") { minutes = 0; }
            this._type = "TimeSpan";
            this.Milliseconds = milliseconds + seconds * TimeSpan._secondsMultiplier + minutes * TimeSpan._minutesMultiplier;
        }
        Object.defineProperty(TimeSpan.prototype, "Milliseconds", {
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

        TimeSpan.prototype.Equivalent = function (timeSpan) {
            return this.Milliseconds === timeSpan.Milliseconds;
        };

        TimeSpan.prototype.Clone = function () {
            return new TimeSpan(this.Milliseconds);
        };

        TimeSpan.prototype.toString = function () {
            return this.Milliseconds + ":" + this.Seconds + ":" + this.Minutes;
        };

        TimeSpan.FromMilliseconds = function (val) {
            return new TimeSpan(val);
        };

        TimeSpan.FromSeconds = function (val) {
            return new TimeSpan(0, val);
        };

        TimeSpan.FromMinutes = function (val) {
            return new TimeSpan(0, 0, val);
        };

        TimeSpan.DateSpan = function (from, to) {
            return new TimeSpan(to.getTime() - from.getTime());
        };

        Object.defineProperty(TimeSpan, "Zero", {
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

var EndGate;
(function (EndGate) {
    var GameTime = (function () {
        function GameTime() {
            this._type = "GameTime";
            this._start = this._lastUpdate = new Date();

            this.Update();
        }
        Object.defineProperty(GameTime.prototype, "Elapsed", {
            get: function () {
                return this._elapsed;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GameTime.prototype, "Now", {
            get: function () {
                return this._lastUpdate;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GameTime.prototype, "Total", {
            get: function () {
                return EndGate.TimeSpan.DateSpan(this._start, new Date());
            },
            enumerable: true,
            configurable: true
        });

        GameTime.prototype.Update = function () {
            var now = new Date();

            this._elapsed = new EndGate.TimeSpan(now.getTime() - this._lastUpdate.getTime());
            this._lastUpdate = now;
        };
        return GameTime;
    })();
    EndGate.GameTime = GameTime;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    var Size2d = (function () {
        function Size2d(first, second) {
            this._type = "Size2d";
            this.Width = first || 0;
            this.Height = typeof second !== "undefined" ? second : this.Width;
        }
        Object.defineProperty(Size2d, "Zero", {
            get: function () {
                return new Size2d(0, 0);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Size2d, "One", {
            get: function () {
                return new Size2d(1, 1);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Size2d.prototype, "Radius", {
            get: function () {
                return .5 * Math.sqrt(this.Width * this.Width + this.Height * this.Height);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Size2d.prototype, "HalfWidth", {
            get: function () {
                return this.Width / 2;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Size2d.prototype, "HalfHeight", {
            get: function () {
                return this.Height / 2;
            },
            enumerable: true,
            configurable: true
        });

        Size2d.prototype.Apply = function (action) {
            this.Width = action(this.Width);
            this.Height = action(this.Height);
        };

        Size2d.prototype.Trigger = function (action) {
            action(this.Width);
            action(this.Height);
        };

        Size2d.prototype.Add = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(this.Width + val.Width, this.Height + val.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(this.Width + val.X, this.Height + val.Y);
            } else {
                return new Size2d(this.Width + val, this.Height + val);
            }
        };

        Size2d.prototype.Multiply = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(this.Width * val.Width, this.Height * val.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(this.Width * val.X, this.Height * val.Y);
            } else {
                return new Size2d(this.Width * val, this.Height * val);
            }
        };

        Size2d.prototype.Subtract = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(this.Width - val.Width, this.Height - val.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(this.Width - val.X, this.Height - val.Y);
            } else {
                return new Size2d(this.Width - val, this.Height - val);
            }
        };

        Size2d.prototype.SubtractFrom = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(val.Width - this.Width, val.Height - this.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(val.X - this.Width, val.Y - this.Height);
            } else {
                return new Size2d(val - this.Width, val - this.Height);
            }
        };

        Size2d.prototype.Divide = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(this.Width / val.Width, this.Height / val.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(this.Width / val.X, this.Height / val.Y);
            } else {
                return new Size2d(this.Width / val, this.Height / val);
            }
        };

        Size2d.prototype.DivideFrom = function (val) {
            if (val._type === "Size2d") {
                return new Size2d(val.Width / this.Width, val.Height / this.Height);
            } else if (val._type === "Vector2d") {
                return new Size2d(val.X / this.Width, val.Y / this.Height);
            } else {
                return new Size2d(val / this.Width, val / this.Height);
            }
        };

        Size2d.prototype.Negate = function () {
            return new Size2d(this.Width * -1, this.Height * -1);
        };

        Size2d.prototype.Equivalent = function (size) {
            return this.Width === size.Width && this.Height === size.Height;
        };

        Size2d.prototype.Clone = function () {
            return new Size2d(this.Width, this.Height);
        };

        Size2d.prototype.toString = function () {
            return "(" + this.Width + ", " + this.Height + ")";
        };
        return Size2d;
    })();
    EndGate.Size2d = Size2d;
})(EndGate || (EndGate = {}));

Math.roundTo = function (val, decimals) {
    var multiplier = Math.pow(10, decimals);

    return Math.round(val * multiplier) / multiplier;
};

(Math).twoPI = Math.PI * 2;

var EndGate;
(function (EndGate) {
    var Vector2d = (function () {
        function Vector2d(x, y) {
            this._type = "Vector2d";
            this.X = x || 0;
            this.Y = y || 0;
        }
        Object.defineProperty(Vector2d, "Zero", {
            get: function () {
                return new Vector2d(0, 0);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Vector2d, "One", {
            get: function () {
                return new Vector2d(1, 1);
            },
            enumerable: true,
            configurable: true
        });

        Vector2d.prototype.Reflect = function (normal) {
            var normalUnit = normal.Unit(), num = this.Dot(normalUnit) * 2;

            return new Vector2d(this.X - num * normalUnit.X, this.Y - num * normalUnit.Y);
        };

        Vector2d.prototype.ProjectOnto = function (vector) {
            return vector.Multiply(this.Dot(vector) / vector.Dot(vector));
        };

        Vector2d.prototype.RotateAround = function (point, angle, precision) {
            if (typeof precision === "undefined") { precision = 2; }
            var ca = Math.cos(angle);
            var sa = Math.sin(angle);

            return new Vector2d(Math.roundTo(ca * (this.X - point.X) - sa * (this.Y - point.Y) + point.X, precision), Math.roundTo(sa * (this.X - point.X) + ca * (this.Y - point.Y) + point.Y, precision));
        };

        Vector2d.prototype.Apply = function (action) {
            this.X = action(this.X);
            this.Y = action(this.Y);
        };

        Vector2d.prototype.Trigger = function (action) {
            action(this.X);
            action(this.Y);
        };

        Vector2d.prototype.Normalized = function () {
            var magnitude = this.Magnitude();
            return new Vector2d(this.X / magnitude, this.Y / magnitude);
        };

        Vector2d.prototype.Magnitude = function () {
            return Math.sqrt(this.X * this.X + this.Y * this.Y);
        };

        Vector2d.prototype.Length = function () {
            return this.Magnitude();
        };

        Vector2d.prototype.Dot = function (vector) {
            return vector.X * this.X + vector.Y * this.Y;
        };

        Vector2d.prototype.Abs = function () {
            return new Vector2d(Math.abs(this.X), Math.abs(this.Y));
        };

        Vector2d.prototype.Sign = function () {
            return new Vector2d(this.X / Math.abs(this.X), this.Y / Math.abs(this.Y));
        };

        Vector2d.prototype.Unit = function () {
            var magnitude = this.Magnitude();

            return new Vector2d(this.X / magnitude, this.Y / magnitude);
        };

        Vector2d.prototype.Distance = function (vector) {
            return new Vector2d(Math.abs(vector.X - this.X), Math.abs(vector.Y - this.Y));
        };

        Vector2d.prototype.Add = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X + val.X, this.Y + val.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(this.X + val.Width, this.Y + val.Height);
            } else {
                return new Vector2d(this.X + val, this.Y + val);
            }
        };

        Vector2d.prototype.Multiply = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X * val.X, this.Y * val.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(this.X * val.Width, this.Y * val.Height);
            } else {
                return new Vector2d(this.X * val, this.Y * val);
            }
        };

        Vector2d.prototype.Subtract = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X - val.X, this.Y - val.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(this.X - val.Width, this.Y - val.Height);
            } else {
                return new Vector2d(this.X - val, this.Y - val);
            }
        };

        Vector2d.prototype.SubtractFrom = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(val.X - this.X, val.Y - this.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(val.Width - this.X, val.Height = this.Y);
            } else {
                return new Vector2d(val - this.X, val - this.Y);
            }
        };

        Vector2d.prototype.Divide = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(this.X / val.X, this.Y / val.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(this.X / val.Width, this.Y / val.Height);
            } else {
                return new Vector2d(this.X / val, this.Y / val);
            }
        };

        Vector2d.prototype.DivideFrom = function (val) {
            if (val._type === "Vector2d") {
                return new Vector2d(val.X / this.X, val.Y / this.Y);
            } else if (val._type === "Size2d") {
                return new Vector2d(val.Width / this.X, val.Height / this.Y);
            } else {
                return new Vector2d(val / this.X, val / this.Y);
            }
        };

        Vector2d.prototype.IsZero = function () {
            return this.X === 0 && this.Y === 0;
        };

        Vector2d.prototype.Negate = function () {
            return new Vector2d(this.X * -1, this.Y * -1);
        };

        Vector2d.prototype.Equivalent = function (vector) {
            return this.X === vector.X && this.Y === vector.Y;
        };

        Vector2d.prototype.Clone = function () {
            return new Vector2d(this.X, this.Y);
        };

        Vector2d.prototype.toString = function () {
            return "(" + this.X + ", " + this.Y + ")";
        };
        return Vector2d;
    })();
    EndGate.Vector2d = Vector2d;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Bounds) {
        var Bounds2d = (function () {
            function Bounds2d(position, rotation) {
                this._boundsType = "Bounds2d";
                this.Position = position;
                this.Rotation = rotation || 0;
            }
            Bounds2d.prototype.Scale = function (x, y) {
                throw new Error("This method is abstract!");
            };

            Bounds2d.prototype.ContainsPoint = function (point) {
                throw new Error("This method is abstract!");
            };

            Bounds2d.prototype.ContainsCircle = function (circle) {
                throw new Error("This method is abstract!");
            };

            Bounds2d.prototype.ContainsRectangle = function (rectangle) {
                throw new Error("This method is abstract!");
            };

            Bounds2d.prototype.Contains = function (obj) {
                if (obj._boundsType === "BoundingCircle") {
                    return this.ContainsCircle(obj);
                } else if (obj._boundsType === "BoundingRectangle") {
                    return this.ContainsRectangle(obj);
                } else if (obj._type === "Vector2d") {
                    return this.ContainsPoint(obj);
                } else {
                    throw new Error("Cannot try and check contains with an unidentifiable object, must be a Vector2d, BoundingCircle or BoundingRectangle.");
                }
            };

            Bounds2d.prototype.Intersects = function (obj) {
                if (obj._boundsType === "BoundingCircle") {
                    return this.IntersectsCircle(obj);
                } else if (obj._boundsType === "BoundingRectangle") {
                    return this.IntersectsRectangle(obj);
                } else {
                    throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle.");
                }
            };

            Bounds2d.prototype.IntersectsCircle = function (circle) {
                throw new Error("This method is abstract!");
            };

            Bounds2d.prototype.IntersectsRectangle = function (rectangle) {
                throw new Error("This method is abstract!");
            };
            return Bounds2d;
        })();
        Bounds.Bounds2d = Bounds2d;
    })(EndGate.Bounds || (EndGate.Bounds = {}));
    var Bounds = EndGate.Bounds;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (_) {
        (function (Loopers) {
            var LooperCallback = (function () {
                function LooperCallback(callback) {
                    this._type = "LooperCallback";
                    this.Callback = callback;
                    this.ID = LooperCallback._ids++;
                }
                LooperCallback._ids = 0;
                return LooperCallback;
            })();
            Loopers.LooperCallback = LooperCallback;
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (_) {
        (function (Loopers) {
            var TimedCallback = (function (_super) {
                __extends(TimedCallback, _super);
                function TimedCallback(fps, callback) {
                    _super.call(this, callback);
                    this._type = "TimedCallback";

                    this.Fps = fps;
                    this.TimeoutID = 0;
                    this.Active = false;
                }
                return TimedCallback;
            })(Loopers.LooperCallback);
            Loopers.TimedCallback = TimedCallback;
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (_) {
        (function (Loopers) {
            var Looper = (function () {
                function Looper() {
                    this._type = "Looper";
                    this._running = false;
                    this._callbacks = [];
                }
                Looper.prototype.AddCallback = function (timedCallback) {
                    var _this = this;
                    this._callbacks.push(timedCallback);
                    timedCallback.Active = true;

                    if (this._running) {
                        window.setTimeout(function () {
                            _this.Loop(timedCallback);
                        }, 0);
                    }
                };

                Looper.prototype.RemoveCallback = function (timedCallback) {
                    for (var i = 0; i < this._callbacks.length; i++) {
                        if (this._callbacks[i].ID === timedCallback.ID) {
                            window.clearTimeout(timedCallback.TimeoutID);
                            timedCallback.Active = false;
                            this._callbacks.splice(i, 1);
                            return;
                        }
                    }
                };

                Looper.prototype.Start = function () {
                    this._running = true;

                    this.Run();
                };

                Looper.prototype.Run = function () {
                    var _this = this;
                    for (var i = 0; i < this._callbacks.length; i++) {
                        window.setTimeout((function (index) {
                            return function () {
                                _this.Loop(_this._callbacks[index]);
                            };
                        })(i), 0);
                    }
                };

                Looper.prototype.Loop = function (timedCallback) {
                    var that = this, msTimer = 1000 / timedCallback.Fps;

                    timedCallback.Callback();

                    if (timedCallback.Active) {
                        timedCallback.TimeoutID = window.setTimeout(function () {
                            that.Loop(timedCallback);
                        }, msTimer);
                    }
                };

                Looper.prototype.Dispose = function () {
                    for (var i = this._callbacks.length - 1; i >= 0; i--) {
                        this.RemoveCallback(this._callbacks[i]);
                    }

                    this._callbacks = [];
                    this._running = false;
                };
                return Looper;
            })();
            Loopers.Looper = Looper;
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

window.OnRepaintCompleted = (function () {
    return (window.requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame || (window).oRequestAnimationFrame || (window).msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 0);
    });
})();

var EndGate;
(function (EndGate) {
    (function (_) {
        (function (Loopers) {
            var RepaintLooper = (function () {
                function RepaintLooper() {
                    this._type = "RepaintLooper";
                    this._running = false;
                    this._callbacksModified = false;
                    this._callbacks = [];
                }
                RepaintLooper.prototype.Start = function () {
                    this._running = true;
                    this.Run();
                };

                RepaintLooper.prototype.Run = function () {
                    var _this = this;
                    if (this._running) {
                        this._callbacksModified = false;

                        for (var i = 0; i < this._callbacks.length; i++) {
                            this._callbacks[i].Callback();

                            if (this._callbacksModified) {
                                break;
                            }
                        }

                        window.OnRepaintCompleted(function () {
                            _this.Run();
                        });
                    }
                };

                RepaintLooper.prototype.AddCallback = function (looperCallback) {
                    this._callbacksModified = true;

                    this._callbacks.push(looperCallback);
                };

                RepaintLooper.prototype.RemoveCallback = function (looperCallback) {
                    for (var i = 0; i < this._callbacks.length; i++) {
                        if (this._callbacks[i].ID === looperCallback.ID) {
                            this._callbacksModified = true;
                            this._callbacks.splice(i, 1);
                            return;
                        }
                    }
                };

                RepaintLooper.prototype.Dispose = function () {
                    this._callbacksModified = true;
                    this._callbacks = [];
                    this._running = false;
                };
                return RepaintLooper;
            })();
            Loopers.RepaintLooper = RepaintLooper;
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (_) {
        var GameRunner = (function () {
            function GameRunner() {
                this._type = "GameRunner";
                this._updateCallbacks = {};
                this._drawCallbacks = {};
                this._updateLoop = null;
                this._drawLoop = null;
                this._callbackCount = 0;
            }
            GameRunner.prototype.Register = function (game) {
                var updateCallback = this.CreateAndCacheUpdateCallback(game);
                var drawCallback = this.CreateAndCacheDrawCallback(game);

                this._callbackCount++;

                this.TryLoopStart();

                this._updateLoop.AddCallback(updateCallback);
                this._drawLoop.AddCallback(drawCallback);

                return this.CreateUpdateRateSetter(updateCallback);
            };

            GameRunner.prototype.Unregister = function (game) {
                var updateCallback, drawCallback;

                if (this._updateCallbacks[game._ID]) {
                    updateCallback = this._updateCallbacks[game._ID];
                    drawCallback = this._drawCallbacks[game._ID];

                    this._updateLoop.RemoveCallback(updateCallback);
                    this._drawLoop.RemoveCallback(drawCallback);
                    delete this._updateCallbacks[game._ID];
                    delete this._drawCallbacks[game._ID];

                    this._callbackCount--;

                    this.TryLoopStop();
                }
            };

            GameRunner.prototype.TryLoopStart = function () {
                if (this._callbackCount === 1) {
                    this._updateLoop = new _.Loopers.Looper();
                    this._updateLoop.Start();
                    this._drawLoop = new _.Loopers.RepaintLooper();
                    this._drawLoop.Start();
                }
            };

            GameRunner.prototype.TryLoopStop = function () {
                if (this._callbackCount === 0 && this._updateLoop != null) {
                    this._updateLoop.Dispose();
                    this._updateLoop = null;
                    this._drawLoop.Dispose();
                    this._drawLoop = null;
                }
            };

            GameRunner.prototype.CreateAndCacheUpdateCallback = function (game) {
                var updateCallback = new _.Loopers.TimedCallback(0, function () {
                    game._PrepareUpdate();
                });

                this._updateCallbacks[game._ID] = updateCallback;

                return updateCallback;
            };

            GameRunner.prototype.CreateAndCacheDrawCallback = function (game) {
                var drawCallback = new _.Loopers.LooperCallback(function () {
                    game._PrepareDraw();
                });

                this._drawCallbacks[game._ID] = drawCallback;

                return drawCallback;
            };

            GameRunner.prototype.CreateUpdateRateSetter = function (callback) {
                return function (updateRate) {
                    callback.Fps = updateRate;
                };
            };
            return GameRunner;
        })();
        _.GameRunner = GameRunner;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

var GameRunnerInstance = new EndGate._.GameRunner();

var EndGate;
(function (EndGate) {
    var EventHandler = (function () {
        function EventHandler() {
            this._type = "Event";
            this._actions = [];
        }
        EventHandler.prototype.Bind = function (action) {
            this._actions.push(action);
        };

        EventHandler.prototype.BindFor = function (action, triggerCount) {
            var that = this, triggers = 0;

            this._actions.push(function () {
                if (++triggers >= triggerCount) {
                    that.Unbind(action);
                }

                action.apply(this, arguments);
            });
        };

        EventHandler.prototype.Unbind = function (action) {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    return;
                }
            }
        };

        EventHandler.prototype.HasBindings = function () {
            return this._actions.length > 0;
        };

        EventHandler.prototype.Trigger = function () {
            var actions;

            if (this.HasBindings()) {
                actions = this._actions.slice(0);

                for (var i = 0; i < actions.length; i++) {
                    actions[i]();
                }
            }
        };
        return EventHandler;
    })();
    EndGate.EventHandler = EventHandler;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Collision) {
        var CollisionConfiguration = (function () {
            function CollisionConfiguration(initialQuadTreeSize) {
                this._initialQuadTreeSize = initialQuadTreeSize;
                this._minQuadTreeNodeSize = CollisionConfiguration._DefaultMinQuadTreeNodeSize;
                this._OnChange = new EndGate.EventHandler();
            }
            Object.defineProperty(CollisionConfiguration.prototype, "MinQuadTreeNodeSize", {
                get: function () {
                    return this._minQuadTreeNodeSize.Clone();
                },
                set: function (newSize) {
                    if (newSize.Width !== newSize.Height) {
                        throw new Error("MinQuadTreeNodeSize must be a square.  Width and height must be identical.");
                    }

                    this._minQuadTreeNodeSize = newSize;
                    this._OnChange.Trigger();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CollisionConfiguration.prototype, "InitialQuadTreeSize", {
                get: function () {
                    return this._initialQuadTreeSize;
                },
                set: function (newSize) {
                    if (newSize.Width !== newSize.Height) {
                        throw new Error("InitialQuadTreeSize must be a square.  Width and height must be identical.");
                    } else if (newSize.Width % this._minQuadTreeNodeSize.Width !== 0) {
                        throw new Error("InitialQuadTreeSize must be divisible by the MinQuadTreeNodeSize.");
                    }

                    this._initialQuadTreeSize = newSize;
                    this._OnChange.Trigger();
                },
                enumerable: true,
                configurable: true
            });
            CollisionConfiguration._DefaultMinQuadTreeNodeSize = new EndGate.Size2d(32);
            return CollisionConfiguration;
        })();
        Collision.CollisionConfiguration = CollisionConfiguration;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    var GameConfiguration = (function () {
        function GameConfiguration(updateRateSetter, initialQuadTreeSize) {
            this._defaultUpdateRate = 40;
            this.DrawOnlyAfterUpdate = true;

            this._updateRateSetter = updateRateSetter;
            this._updateRate = this._defaultUpdateRate;
            this._collisionConfiguration = new EndGate.Collision.CollisionConfiguration(initialQuadTreeSize);
        }
        Object.defineProperty(GameConfiguration.prototype, "UpdateRate", {
            get: function () {
                return this._updateRate;
            },
            set: function (updateRate) {
                this._updateRate = updateRate;
                this._updateRateSetter(this._updateRate);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GameConfiguration.prototype, "CollisionConfiguration", {
            get: function () {
                return this._collisionConfiguration;
            },
            enumerable: true,
            configurable: true
        });
        return GameConfiguration;
    })();
    EndGate.GameConfiguration = GameConfiguration;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (_) {
        var MinMax = (function () {
            function MinMax(min, max) {
                this.Min = min;
                this.Max = max;
            }
            return MinMax;
        })();
        _.MinMax = MinMax;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (_) {
        var Vector2dHelpers = (function () {
            function Vector2dHelpers() {
            }
            Vector2dHelpers.GetMinMaxProjections = function (axis, vertices) {
                var min = vertices[0].ProjectOnto(axis).Dot(axis);
                var max = min;

                for (var i = 1; i < vertices.length; i++) {
                    var vertex = vertices[i];
                    var value = vertex.ProjectOnto(axis).Dot(axis);

                    if (value < min) {
                        min = value;
                    } else if (value > max) {
                        max = value;
                    }
                }

                return new _.MinMax(min, max);
            };
            return Vector2dHelpers;
        })();
        _.Vector2dHelpers = Vector2dHelpers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Bounds) {
        var BoundingCircle = (function (_super) {
            __extends(BoundingCircle, _super);
            function BoundingCircle(position, radius) {
                _super.call(this, position);
                this._type = "BoundingCircle";
                this._boundsType = "BoundingCircle";

                this.Radius = radius;
            }
            BoundingCircle.prototype.Scale = function (scale) {
                this.Radius *= scale;
            };

            BoundingCircle.prototype.Area = function () {
                return Math.PI * this.Radius * this.Radius;
            };

            BoundingCircle.prototype.Circumference = function () {
                return 2 * Math.PI * this.Radius;
            };

            BoundingCircle.prototype.IntersectsCircle = function (circle) {
                return this.Position.Distance(circle.Position).Length() < this.Radius + circle.Radius;
            };

            BoundingCircle.prototype.IntersectsRectangle = function (rectangle) {
                var translated = (rectangle.Rotation === 0) ? this.Position : this.Position.RotateAround(rectangle.Position, -rectangle.Rotation);

                var circleDistance = translated.Distance(rectangle.Position);

                if (circleDistance.X > (rectangle.Size.HalfWidth + this.Radius)) {
                    return false;
                }
                if (circleDistance.Y > (rectangle.Size.HalfHeight + this.Radius)) {
                    return false;
                }

                if (circleDistance.X <= (rectangle.Size.HalfWidth)) {
                    return true;
                }
                if (circleDistance.Y <= (rectangle.Size.HalfHeight)) {
                    return true;
                }

                var cornerDistance_sq = Math.pow(circleDistance.X - rectangle.Size.HalfWidth, 2) + Math.pow(circleDistance.Y - rectangle.Size.HalfHeight, 2);

                return (cornerDistance_sq <= (this.Radius * this.Radius));
            };

            BoundingCircle.prototype.ContainsPoint = function (point) {
                return this.Position.Distance(point).Magnitude() < this.Radius;
            };

            BoundingCircle.prototype.ContainsCircle = function (circle) {
                return circle.Position.Distance(this.Position).Length() + circle.Radius <= this.Radius;
            };

            BoundingCircle.prototype.ContainsRectangle = function (rectangle) {
                var corners = rectangle.Corners();

                for (var i = 0; i < corners.length; i++) {
                    if (!this.ContainsPoint(corners[i])) {
                        return false;
                    }
                }

                return true;
            };
            return BoundingCircle;
        })(Bounds.Bounds2d);
        Bounds.BoundingCircle = BoundingCircle;
    })(EndGate.Bounds || (EndGate.Bounds = {}));
    var Bounds = EndGate.Bounds;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Bounds) {
        var BoundingRectangle = (function (_super) {
            __extends(BoundingRectangle, _super);
            function BoundingRectangle(position, size) {
                _super.call(this, position);
                this._type = "BoundingRectangle";
                this._boundsType = "BoundingRectangle";
                this.Size = size;
            }
            BoundingRectangle.prototype.Scale = function (x, y) {
                this.Size.Width *= x;
                this.Size.Height *= y;
            };

            Object.defineProperty(BoundingRectangle.prototype, "TopLeft", {
                get: function () {
                    if (this.Rotation === 0) {
                        return new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight);
                    }

                    return new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BoundingRectangle.prototype, "TopRight", {
                get: function () {
                    if (this.Rotation === 0) {
                        return new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight);
                    }

                    return new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BoundingRectangle.prototype, "BotLeft", {
                get: function () {
                    if (this.Rotation === 0) {
                        return new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight);
                    }

                    return new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BoundingRectangle.prototype, "BotRight", {
                get: function () {
                    if (this.Rotation === 0) {
                        return new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight);
                    }

                    return new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
                },
                enumerable: true,
                configurable: true
            });

            BoundingRectangle.prototype.Corners = function () {
                return [this.TopLeft, this.TopRight, this.BotLeft, this.BotRight];
            };

            BoundingRectangle.prototype.IntersectsCircle = function (circle) {
                return circle.IntersectsRectangle(this);
            };

            BoundingRectangle.prototype.IntersectsRectangle = function (rectangle) {
                if (this.Rotation === 0 && rectangle.Rotation === 0) {
                    var myTopLeft = this.TopLeft, myBotRight = this.BotRight, theirTopLeft = rectangle.TopLeft, theirBotRight = rectangle.BotRight;

                    return theirTopLeft.X <= myBotRight.X && theirBotRight.X >= myTopLeft.X && theirTopLeft.Y <= myBotRight.Y && theirBotRight.Y >= myTopLeft.Y;
                } else if (rectangle.Position.Distance(this.Position).Magnitude() <= rectangle.Size.Radius + this.Size.Radius) {
                    var axisList = [this.TopRight.Subtract(this.TopLeft), this.TopRight.Subtract(this.BotRight), rectangle.TopLeft.Subtract(rectangle.BotLeft), rectangle.TopLeft.Subtract(rectangle.TopRight)];
                    var myVertices = this.Corners();
                    var theirVertices = rectangle.Corners();

                    for (var i = 0; i < axisList.length; i++) {
                        var axi = axisList[i];
                        var myProjections = EndGate._.Vector2dHelpers.GetMinMaxProjections(axi, myVertices);
                        var theirProjections = EndGate._.Vector2dHelpers.GetMinMaxProjections(axi, theirVertices);

                        if (theirProjections.Max < myProjections.Min || myProjections.Max < theirProjections.Min) {
                            return false;
                        }
                    }

                    return true;
                }

                return false;
            };

            BoundingRectangle.prototype.ContainsPoint = function (point) {
                var savedRotation = this.Rotation;

                if (this.Rotation !== 0) {
                    this.Rotation = 0;
                    point = point.RotateAround(this.Position, -savedRotation);
                }

                var myTopLeft = this.TopLeft, myBotRight = this.BotRight;

                this.Rotation = savedRotation;

                return point.X <= myBotRight.X && point.X >= myTopLeft.X && point.Y <= myBotRight.Y && point.Y >= myTopLeft.Y;
            };

            BoundingRectangle.prototype.ContainsCircle = function (circle) {
                return this.ContainsPoint(new EndGate.Vector2d(circle.Position.X - circle.Radius, circle.Position.Y)) && this.ContainsPoint(new EndGate.Vector2d(circle.Position.X, circle.Position.Y - circle.Radius)) && this.ContainsPoint(new EndGate.Vector2d(circle.Position.X + circle.Radius, circle.Position.Y)) && this.ContainsPoint(new EndGate.Vector2d(circle.Position.X, circle.Position.Y + circle.Radius));
            };

            BoundingRectangle.prototype.ContainsRectangle = function (rectangle) {
                var corners = rectangle.Corners();

                for (var i = 0; i < corners.length; i++) {
                    if (!this.ContainsPoint(corners[i])) {
                        return false;
                    }
                }

                return true;
            };
            return BoundingRectangle;
        })(Bounds.Bounds2d);
        Bounds.BoundingRectangle = BoundingRectangle;
    })(EndGate.Bounds || (EndGate.Bounds = {}));
    var Bounds = EndGate.Bounds;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    var EventHandler1 = (function () {
        function EventHandler1() {
            this._type = "Event";
            this._actions = [];
        }
        EventHandler1.prototype.Bind = function (action) {
            this._actions.push(action);
        };

        EventHandler1.prototype.BindFor = function (action, triggerCount) {
            var that = this, triggers = 0;

            this._actions.push(function () {
                if (++triggers >= triggerCount) {
                    that.Unbind(action);
                }

                action.apply(this, arguments);
            });
        };

        EventHandler1.prototype.Unbind = function (action) {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    return;
                }
            }
        };

        EventHandler1.prototype.HasBindings = function () {
            return this._actions.length > 0;
        };

        EventHandler1.prototype.Trigger = function (val) {
            var actions;

            if (this.HasBindings()) {
                actions = this._actions.slice(0);

                for (var i = 0; i < actions.length; i++) {
                    actions[i](val);
                }
            }
        };
        return EventHandler1;
    })();
    EndGate.EventHandler1 = EventHandler1;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Collision) {
        (function (Assets) {
            var CollisionData = (function () {
                function CollisionData(w) {
                    this.With = w;
                }
                return CollisionData;
            })();
            Assets.CollisionData = CollisionData;
        })(Collision.Assets || (Collision.Assets = {}));
        var Assets = Collision.Assets;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Collision) {
        var Collidable = (function () {
            function Collidable(bounds) {
                this._type = "Collidable";
                this._disposed = false;
                this.Bounds = bounds;
                this._id = Collidable._collidableIDs++;

                this._onCollision = new EndGate.EventHandler1();
                this._onDisposed = new EndGate.EventHandler1();
            }
            Object.defineProperty(Collidable.prototype, "OnCollision", {
                get: function () {
                    return this._onCollision;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Collidable.prototype, "OnDisposed", {
                get: function () {
                    return this._onDisposed;
                },
                enumerable: true,
                configurable: true
            });

            Collidable.prototype.IsCollidingWith = function (other) {
                return this.Bounds.Intersects(other.Bounds);
            };

            Collidable.prototype.Collided = function (data) {
                this.OnCollision.Trigger(data);
            };

            Collidable.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;
                    this.OnDisposed.Trigger(this);
                } else {
                    throw new Error("Cannot dispose collidable more than once.");
                }
            };
            Collidable._collidableIDs = 0;
            return Collidable;
        })();
        Collision.Collidable = Collidable;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Collision) {
        (function (Assets) {
            (function (_) {
                var QuadTreeNode = (function (_super) {
                    __extends(QuadTreeNode, _super);
                    function QuadTreeNode(position, size, minNodeSize, parent) {
                        _super.call(this, new EndGate.Bounds.BoundingRectangle(position, size));
                        this._minNodeSize = minNodeSize;
                        this._children = new Array();
                        this.Contents = new Array();
                        this.Parent = parent;
                        this._partitioned = false;
                    }
                    Object.defineProperty(QuadTreeNode.prototype, "Children", {
                        get: function () {
                            return this._children;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(QuadTreeNode.prototype, "TopLeftChild", {
                        get: function () {
                            return this._children[0];
                        },
                        set: function (newChild) {
                            this._children[0] = newChild;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(QuadTreeNode.prototype, "TopRightChild", {
                        get: function () {
                            return this._children[1];
                        },
                        set: function (newChild) {
                            this._children[1] = newChild;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(QuadTreeNode.prototype, "BotLeftChild", {
                        get: function () {
                            return this._children[2];
                        },
                        set: function (newChild) {
                            this._children[2] = newChild;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(QuadTreeNode.prototype, "BotRightChild", {
                        get: function () {
                            return this._children[3];
                        },
                        set: function (newChild) {
                            this._children[3] = newChild;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    QuadTreeNode.prototype.IsPartitioned = function () {
                        return this._partitioned;
                    };

                    QuadTreeNode.prototype.Partition = function () {
                        var partitionedSize = new EndGate.Size2d(Math.round((this.Bounds).Size.Width * .5)), boundsPosition = this.Bounds.Position;

                        this._partitioned = true;

                        if (partitionedSize.Width < this._minNodeSize.Width) {
                            return;
                        }

                        this._children.push(new QuadTreeNode(boundsPosition.Subtract(partitionedSize.Multiply(.5)), partitionedSize, this._minNodeSize, this));
                        this._children.push(new QuadTreeNode(new EndGate.Vector2d(boundsPosition.X + partitionedSize.Width / 2, boundsPosition.Y - partitionedSize.Height / 2), partitionedSize, this._minNodeSize, this));
                        this._children.push(new QuadTreeNode(new EndGate.Vector2d(boundsPosition.X - partitionedSize.Width / 2, boundsPosition.Y + partitionedSize.Height / 2), partitionedSize, this._minNodeSize, this));
                        this._children.push(new QuadTreeNode(boundsPosition.Add(partitionedSize.Multiply(.5)), partitionedSize, this._minNodeSize, this));
                    };

                    QuadTreeNode.prototype.Insert = function (obj) {
                        if (!this._partitioned) {
                            this.Partition();
                        }

                        for (var i = 0; i < this._children.length; i++) {
                            if (this._children[i].Bounds.Contains(obj.Bounds)) {
                                return this._children[i].Insert(obj);
                            }
                        }

                        this.Contents.push(obj);

                        return this;
                    };

                    QuadTreeNode.prototype.ReverseInsert = function (obj) {
                        if (!this.Bounds.Contains(obj.Bounds)) {
                            if (this.Parent != null) {
                                return this.Parent.ReverseInsert(obj);
                            }
                        }

                        return this.Insert(obj);
                    };

                    QuadTreeNode.prototype.Query = function (queryArea) {
                        var results = new Array(), child;

                        for (var i = 0; i < this.Contents.length; i++) {
                            if (queryArea.Intersects(this.Contents[i].Bounds)) {
                                results.push(this.Contents[i]);
                            }
                        }

                        for (var i = 0; i < this._children.length; i++) {
                            child = this._children[i];

                            if (child.Bounds.Contains(queryArea)) {
                                results = results.concat(child.Query(queryArea));
                                break;
                            }

                            if (queryArea.Contains(child.Bounds)) {
                                results = results.concat(child.GetSubTreeContents());
                                continue;
                            }

                            if (child.Bounds.Intersects(queryArea)) {
                                results = results.concat(child.Query(queryArea));
                            }
                        }

                        return results;
                    };

                    QuadTreeNode.prototype.Remove = function (obj) {
                        var index = this.Contents.indexOf(obj);

                        if (index >= 0) {
                            this.Contents.splice(index, 1);
                        }
                    };

                    QuadTreeNode.prototype.GetSubTreeContents = function () {
                        var results = new Array();

                        for (var i = 0; i < this._children.length; i++) {
                            results = results.concat(this._children[i].GetSubTreeContents());
                        }

                        results = results.concat(this.Contents);

                        return results;
                    };
                    return QuadTreeNode;
                })(Collision.Collidable);
                _.QuadTreeNode = QuadTreeNode;
            })(Assets._ || (Assets._ = {}));
            var _ = Assets._;
        })(Collision.Assets || (Collision.Assets = {}));
        var Assets = Collision.Assets;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Collision) {
        (function (Assets) {
            (function (_) {
                var QuadTree = (function () {
                    function QuadTree(configuration) {
                        this._disposed = false;
                        this._minNodeSize = configuration.MinQuadTreeNodeSize;
                        this._collidableMap = {};
                        this._updateableCollidableMap = {};

                        this._root = new _.QuadTreeNode(new EndGate.Vector2d(configuration.InitialQuadTreeSize.HalfWidth, configuration.InitialQuadTreeSize.HalfHeight), configuration.InitialQuadTreeSize, configuration.MinQuadTreeNodeSize, null);
                    }
                    QuadTree.prototype.Insert = function (obj, staticPosition) {
                        if (typeof staticPosition === "undefined") { staticPosition = false; }
                        if (!this._root.Bounds.Contains(obj.Bounds)) {
                            this.Expand(obj);
                        }

                        this._collidableMap[obj._id] = {
                            Node: this._root.Insert(obj),
                            Collidable: obj,
                            StaticPosition: staticPosition
                        };

                        if (!staticPosition) {
                            this._updateableCollidableMap[obj._id] = this._collidableMap[obj._id];
                        }
                    };

                    QuadTree.prototype.Remove = function (obj) {
                        var node = this._collidableMap[obj._id].Node;

                        delete this._collidableMap[obj._id];
                        delete this._updateableCollidableMap[obj._id];

                        node.Remove(obj);
                    };

                    QuadTree.prototype.CollisionCandidates = function (obj) {
                        var node = this._collidableMap[obj._id].Node, results = node.GetSubTreeContents();

                        while (node.Parent !== null) {
                            results = results.concat(node.Parent.Contents);

                            node = node.Parent;
                        }

                        return results;
                    };

                    QuadTree.prototype.Query = function (queryArea) {
                        return this._root.Query(queryArea);
                    };

                    QuadTree.prototype.Expand = function (cause) {
                        var rootBounds = (this._root.Bounds), topLeftDistance = rootBounds.TopLeft.Distance(cause.Bounds.Position).Length(), topRightDistance = rootBounds.TopRight.Distance(cause.Bounds.Position).Length(), botLeftDistance = rootBounds.BotLeft.Distance(cause.Bounds.Position).Length(), botRightDistance = rootBounds.BotRight.Distance(cause.Bounds.Position).Length(), closestCornerDistance = Math.min(topLeftDistance, topRightDistance, botLeftDistance, botRightDistance), newSize = rootBounds.Size.Multiply(2), newRoot;

                        if (closestCornerDistance === topLeftDistance) {
                            newRoot = new _.QuadTreeNode(rootBounds.TopLeft, newSize, this._minNodeSize, null);
                            newRoot.Partition();
                            newRoot.BotRightChild = this._root;
                        } else if (closestCornerDistance === topRightDistance) {
                            newRoot = new _.QuadTreeNode(rootBounds.TopRight, newSize, this._minNodeSize, null);
                            newRoot.Partition();
                            newRoot.BotLeftChild = this._root;
                        } else if (closestCornerDistance === botLeftDistance) {
                            newRoot = new _.QuadTreeNode(rootBounds.BotLeft, newSize, this._minNodeSize, null);
                            newRoot.Partition();
                            newRoot.TopRightChild = this._root;
                        } else if (closestCornerDistance === botRightDistance) {
                            newRoot = new _.QuadTreeNode(rootBounds.BotRight, newSize, this._minNodeSize, null);
                            newRoot.Partition();
                            newRoot.TopLeftChild = this._root;
                        }

                        this._root.Parent = newRoot;
                        this._root = newRoot;
                    };

                    QuadTree.prototype.Update = function (gameTime) {
                        var node, lookup, collidable, newNode;

                        for (var id in this._updateableCollidableMap) {
                            lookup = this._updateableCollidableMap[id];
                            node = lookup.Node;
                            collidable = lookup.Collidable;

                            node.Remove(collidable);

                            if (!this._root.Bounds.Contains(collidable.Bounds)) {
                                this.Expand(collidable);
                                newNode = this._root.Insert(collidable);
                            } else {
                                if (!node.Bounds.Contains(collidable.Bounds) && node.Parent != null) {
                                    newNode = node.Parent.ReverseInsert(collidable);
                                } else {
                                    newNode = node.Insert(collidable);
                                }
                            }

                            this._updateableCollidableMap[id].Node = newNode;
                        }
                    };

                    QuadTree.prototype.Dispose = function () {
                        if (!this._disposed) {
                            this._disposed = true;
                        } else {
                            throw new Error("Cannot dispose collidable more than once.");
                        }
                    };
                    return QuadTree;
                })();
                _.QuadTree = QuadTree;
            })(Assets._ || (Assets._ = {}));
            var _ = Assets._;
        })(Collision.Assets || (Collision.Assets = {}));
        var Assets = Collision.Assets;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    var EventHandler2 = (function () {
        function EventHandler2() {
            this._type = "Event";
            this._actions = [];
        }
        EventHandler2.prototype.Bind = function (action) {
            this._actions.push(action);
        };

        EventHandler2.prototype.BindFor = function (action, triggerCount) {
            var that = this, triggers = 0;

            this._actions.push(function () {
                if (++triggers >= triggerCount) {
                    that.Unbind(action);
                }

                action.apply(this, arguments);
            });
        };

        EventHandler2.prototype.Unbind = function (action) {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    return;
                }
            }
        };

        EventHandler2.prototype.HasBindings = function () {
            return this._actions.length > 0;
        };

        EventHandler2.prototype.Trigger = function (val1, val2) {
            var actions;

            if (this.HasBindings()) {
                actions = this._actions.slice(0);

                for (var i = 0; i < actions.length; i++) {
                    actions[i](val1, val2);
                }
            }
        };
        return EventHandler2;
    })();
    EndGate.EventHandler2 = EventHandler2;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Collision) {
        var CollisionManager = (function () {
            function CollisionManager(configuration) {
                this._type = "CollisionManager";
                this._collidables = [];
                this._nonStaticCollidables = [];
                this._quadTree = new Collision.Assets._.QuadTree(configuration);
                this._enabled = false;
                this._onCollision = new EndGate.EventHandler2();
            }
            Object.defineProperty(CollisionManager.prototype, "OnCollision", {
                get: function () {
                    return this._onCollision;
                },
                enumerable: true,
                configurable: true
            });

            CollisionManager.prototype.Monitor = function (obj, staticPosition) {
                if (typeof staticPosition === "undefined") { staticPosition = false; }
                var _this = this;
                var mapping = {
                    Collidable: obj,
                    Unmonitor: function (collidable) {
                        _this.Unmonitor(collidable);
                    }
                };

                this._enabled = true;

                obj.OnDisposed.Bind(mapping.Unmonitor);

                this._collidables.push(mapping);

                if (!staticPosition) {
                    this._nonStaticCollidables.push(obj);
                }

                this._quadTree.Insert(obj);
            };

            CollisionManager.prototype.Unmonitor = function (obj) {
                var index;

                for (var i = 0; i < this._collidables.length; i++) {
                    if (this._collidables[i].Collidable._id === obj._id) {
                        this._collidables[i].Collidable.OnDisposed.Unbind(this._collidables[i].Unmonitor);
                        this._collidables.splice(i, 1);
                        break;
                    }
                }

                index = this._nonStaticCollidables.indexOf(obj);

                if (index >= 0) {
                    this._nonStaticCollidables.splice(index, 1);
                }

                this._quadTree.Remove(obj);
            };

            CollisionManager.prototype.Update = function (gameTime) {
                var collidable, hash, candidates, cacheMap = {}, colliding = new Array();

                if (this._enabled) {
                    this._quadTree.Update(gameTime);

                    for (var i = 0; i < this._nonStaticCollidables.length; i++) {
                        collidable = this._nonStaticCollidables[i];
                        candidates = this._quadTree.CollisionCandidates(collidable);

                        for (var j = 0; j < candidates.length; j++) {
                            if (collidable._id !== candidates[j]._id && collidable.IsCollidingWith(candidates[j])) {
                                colliding.push([collidable, candidates[j]]);
                            }
                        }
                    }

                    for (var i = 0; i < colliding.length; i++) {
                        hash = this.HashIds(colliding[i][0], colliding[i][1]);

                        if (!cacheMap[hash]) {
                            cacheMap[hash] = true;

                            colliding[i][0].Collided(new Collision.Assets.CollisionData(colliding[i][1]));
                            colliding[i][1].Collided(new Collision.Assets.CollisionData(colliding[i][0]));

                            this.OnCollision.Trigger(colliding[i][0], colliding[i][1]);
                        }
                    }
                }
            };

            CollisionManager.prototype.HashIds = function (c1, c2) {
                return Math.min(c1._id, c2._id).toString() + Math.max(c2._id, c1._id).toString();
            };
            return CollisionManager;
        })();
        Collision.CollisionManager = CollisionManager;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            (function (_) {
                var Graphic2dState = (function () {
                    function Graphic2dState() {
                        this._cachedState = {};
                    }
                    Object.defineProperty(Graphic2dState.prototype, "StrokeStyle", {
                        get: function () {
                            return this._cachedState["strokeStyle"];
                        },
                        set: function (value) {
                            this._cachedState["strokeStyle"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "FillStyle", {
                        get: function () {
                            return this._cachedState["fillStyle"];
                        },
                        set: function (value) {
                            this._cachedState["fillStyle"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "GlobalAlpha", {
                        get: function () {
                            return this._cachedState["globalAlpha"];
                        },
                        set: function (value) {
                            this._cachedState["globalAlpha"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "LineWidth", {
                        get: function () {
                            return this._cachedState["lineWidth"];
                        },
                        set: function (value) {
                            this._cachedState["lineWidth"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "LineCap", {
                        get: function () {
                            return this._cachedState["lineCap"];
                        },
                        set: function (value) {
                            this._cachedState["lineCap"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "LineJoin", {
                        get: function () {
                            return this._cachedState["lineJoin"];
                        },
                        set: function (value) {
                            this._cachedState["lineJoin"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "MiterLimit", {
                        get: function () {
                            return this._cachedState["miterLimit"];
                        },
                        set: function (value) {
                            this._cachedState["miterLimit"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "ShadowOffsetX", {
                        get: function () {
                            return this._cachedState["shadowOffsetX"];
                        },
                        set: function (value) {
                            this._cachedState["shadowOffsetX"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "ShadowOffsetY", {
                        get: function () {
                            return this._cachedState["shadowOffsetY"];
                        },
                        set: function (value) {
                            this._cachedState["shadowOffsetY"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "ShadowBlur", {
                        get: function () {
                            return this._cachedState["shadowBlur"];
                        },
                        set: function (value) {
                            this._cachedState["shadowBlur"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "ShadowColor", {
                        get: function () {
                            return this._cachedState["shadowColor"];
                        },
                        set: function (value) {
                            this._cachedState["shadowColor"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "GlobalCompositeOperation", {
                        get: function () {
                            return this._cachedState["globalCompositeOperation"];
                        },
                        set: function (value) {
                            this._cachedState["globalCompositeOperation"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "Font", {
                        get: function () {
                            return this._cachedState["font"];
                        },
                        set: function (value) {
                            this._cachedState["font"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "TextAlign", {
                        get: function () {
                            return this._cachedState["textAlign"];
                        },
                        set: function (value) {
                            this._cachedState["textAlign"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "TextBaseline", {
                        get: function () {
                            return this._cachedState["textBaseline"];
                        },
                        set: function (value) {
                            this._cachedState["textBaseline"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Graphic2dState.prototype.SetContextState = function (context) {
                        for (var key in this._cachedState) {
                            context[key] = this._cachedState[key];
                        }
                    };
                    return Graphic2dState;
                })();
                _.Graphic2dState = Graphic2dState;
            })(Assets._ || (Assets._ = {}));
            var _ = Assets._;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Graphic2d = (function () {
            function Graphic2d(position) {
                this._type = "Graphic2d";
                this.Position = position;
                this.Rotation = 0;
                this.ZIndex = 0;
                this.Visible = true;
                this._State = new Graphics.Assets._.Graphic2dState();
                this._children = [];
                this._disposed = false;
                this._onDisposed = new EndGate.EventHandler1();
            }
            Object.defineProperty(Graphic2d.prototype, "OnDisposed", {
                get: function () {
                    return this._onDisposed;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Graphic2d.prototype, "Opacity", {
                get: function () {
                    return this._State.GlobalAlpha;
                },
                set: function (alpha) {
                    this._State.GlobalAlpha = alpha;
                },
                enumerable: true,
                configurable: true
            });

            Graphic2d.prototype.AddChild = function (graphic) {
                this._children.push(graphic);
                this._children.sort(Graphic2d._zindexSort);
            };

            Graphic2d.prototype.RemoveChild = function (graphic) {
                var index = this._children.indexOf(graphic);

                if (index >= 0) {
                    this._children.splice(index, 1);
                    return true;
                }

                return false;
            };

            Graphic2d.prototype.Children = function () {
                return this._children;
            };

            Graphic2d.prototype._StartDraw = function (context) {
                context.save();
                this._State.SetContextState(context);

                context.translate(this.Position.X, this.Position.Y);

                if (this.Rotation !== 0) {
                    context.rotate(this.Rotation);
                }
            };

            Graphic2d.prototype._EndDraw = function (context) {
                for (var i = 0; i < this._children.length; i++) {
                    if (this._children[i].Visible) {
                        this._children[i].Draw(context);
                    }
                }

                context.restore();
            };

            Graphic2d.prototype.Draw = function (context) {
                throw new Error("The Draw method is abstract on Graphic2d and should not be called.");
            };

            Graphic2d.prototype.GetDrawBounds = function () {
                throw new Error("GetDrawBounds is abstract, it must be implemented.");
            };

            Graphic2d.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;

                    for (var i = 0; i < this._children.length; i++) {
                        this._children[i].Dispose();
                    }

                    this.OnDisposed.Trigger(this);
                } else {
                    throw new Error("Cannot dispose graphic more than once.");
                }
            };
            Graphic2d._zindexSort = function (a, b) {
                return a.ZIndex - b.ZIndex;
            };
            return Graphic2d;
        })();
        Graphics.Graphic2d = Graphic2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Rendering) {
        var Camera2d = (function (_super) {
            __extends(Camera2d, _super);
            function Camera2d(position, size) {
                _super.call(this, position, size);
                this._type = "Camera2d";

                this.Distance = Camera2d.DefaultDistance;
            }
            Camera2d.prototype.ToCameraRelative = function (position) {
                var scaledTopLeft = this.Position.Subtract(this.Size.Multiply(this._GetDistanceScale() * .5));
                return scaledTopLeft.Add(position.Multiply(this._GetDistanceScale()));
            };

            Camera2d.prototype._GetInverseDistanceScale = function () {
                return Camera2d.DefaultDistance / this.Distance;
            };

            Camera2d.prototype._GetDistanceScale = function () {
                return this.Distance / Camera2d.DefaultDistance;
            };
            Camera2d.DefaultDistance = 1000;
            return Camera2d;
        })(EndGate.Bounds.BoundingRectangle);
        Rendering.Camera2d = Camera2d;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Rendering) {
        var Renderer2d = (function () {
            function Renderer2d(renderOnto) {
                this._visibleCanvas = renderOnto;
                this._visibleContext = renderOnto.getContext("2d");

                this._BufferCanvas = document.createElement("canvas");
                this._BufferContext = this._BufferCanvas.getContext("2d");
                this._onRendererSizeChange = new EndGate.EventHandler1();
                this.UpdateBufferSize();

                this._disposed = false;
            }
            Object.defineProperty(Renderer2d.prototype, "OnRendererSizeChange", {
                get: function () {
                    return this._onRendererSizeChange;
                },
                enumerable: true,
                configurable: true
            });

            Renderer2d.prototype.Render = function (renderables) {
                if (this._BufferCanvas.width !== this._visibleCanvas.width || this._BufferCanvas.height !== this._visibleCanvas.height) {
                    this.UpdateBufferSize();
                }

                this._visibleContext.clearRect(0, 0, this._visibleCanvas.width, this._visibleCanvas.height);
                this._visibleContext.drawImage(this._BufferCanvas, 0, 0);

                this._ClearBuffer();

                renderables.sort(Renderer2d._zindexSort);

                for (var i = 0; i < renderables.length; i++) {
                    renderables[i].Draw(this._BufferContext);
                }

                return this._BufferContext;
            };

            Renderer2d.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;

                    this._visibleCanvas.parentNode.removeChild(this._visibleCanvas);
                }
            };

            Renderer2d.prototype._ClearBuffer = function () {
                this._BufferContext.clearRect(0, 0, this._BufferCanvas.width, this._BufferCanvas.height);
            };

            Renderer2d.prototype.UpdateBufferSize = function () {
                this._BufferCanvas.width = this._visibleCanvas.width;
                this._BufferCanvas.height = this._visibleCanvas.height;
                this.OnRendererSizeChange.Trigger(new EndGate.Size2d(this._visibleCanvas.width, this._visibleCanvas.height));
            };
            Renderer2d._zindexSort = function (a, b) {
                return a.ZIndex - b.ZIndex;
            };
            return Renderer2d;
        })();
        Rendering.Renderer2d = Renderer2d;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Rendering) {
        (function (_) {
            var Camera2dCanvasContextBuilder = (function () {
                function Camera2dCanvasContextBuilder(camera) {
                    this._camera = camera;
                    this._canvasCenter = this._camera.Position.Clone();
                    this._translated = false;
                    this._translationState = [];
                    this._translationState.push(this._translated);
                }
                Camera2dCanvasContextBuilder.prototype.Build = function (context) {
                    var that = this, savedCreateRadialGradient = context.createRadialGradient, savedTranslate = context.translate, savedSave = context.save, savedRestore = context.restore, savedDrawImage1 = this.BuildPositionReplacer(context.drawImage, 1), savedDrawImage2 = this.BuildPositionReplacer(context.drawImage, 5);

                    (context).unModifiedClearRect = context.clearRect;

                    context.arc = this.BuildPositionReplacer(context.arc);
                    context.arcTo = this.BuildPositionReplacer(context.arcTo, 0, 4);
                    context.bezierCurveTo = this.BuildPositionReplacer(context.bezierCurveTo, 0, 6);
                    context.clearRect = this.BuildPositionReplacer(context.clearRect);
                    context.createLinearGradient = this.BuildPositionReplacer(context.createLinearGradient, 0, 4);
                    context.createRadialGradient = function () {
                        var scale = that._camera._GetDistanceScale();
                        arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                        arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                        arguments[3] += -that._camera.Position.X + that._canvasCenter.X * scale;
                        arguments[4] += -that._camera.Position.Y + that._canvasCenter.Y * scale;

                        return savedCreateRadialGradient.apply(this, arguments);
                    };
                    context.drawImage = function () {
                        if (arguments.length <= 5) {
                            savedDrawImage1.apply(this, arguments);
                        } else {
                            savedDrawImage2.apply(this, arguments);
                        }
                    };
                    context.fillRect = this.BuildPositionReplacer(context.fillRect);
                    context.fillText = this.BuildPositionReplacer(context.fillText, 1);
                    context.getImageData = this.BuildPositionReplacer(context.getImageData);
                    context.isPointInPath = this.BuildPositionReplacer(context.isPointInPath);
                    context.lineTo = this.BuildPositionReplacer(context.lineTo);
                    context.moveTo = this.BuildPositionReplacer(context.moveTo);
                    context.putImageData = this.BuildPositionReplacer(context.putImageData, 1);
                    context.quadraticCurveTo = this.BuildPositionReplacer(context.quadraticCurveTo, 0, 4);
                    context.rect = this.BuildPositionReplacer(context.rect);
                    context.strokeRect = this.BuildPositionReplacer(context.strokeRect);
                    context.strokeText = this.BuildPositionReplacer(context.strokeText, 1);

                    context.save = function () {
                        that._translationState.push(that._translated);

                        savedSave.call(this);
                    };

                    context.restore = function () {
                        that._translated = that._translationState.pop();

                        savedRestore.call(this);
                    };

                    context.translate = function () {
                        var scale;

                        if (!that._translated) {
                            scale = that._camera._GetDistanceScale();

                            arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                            arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                        }

                        that._translated = true;

                        savedTranslate.apply(this, arguments);
                    };

                    return context;
                };

                Camera2dCanvasContextBuilder.prototype._UpdateCanvasCenter = function (newSize) {
                    this._canvasCenter.X = newSize.Width / 2;
                    this._canvasCenter.Y = newSize.Height / 2;
                };

                Camera2dCanvasContextBuilder.prototype.BuildPositionReplacer = function (replacee, positionArgOffset, argCount) {
                    if (typeof positionArgOffset === "undefined") { positionArgOffset = 0; }
                    if (typeof argCount === "undefined") { argCount = 2; }
                    var that = this, axiList = ["X", "Y"];

                    return function () {
                        var scale, axi;

                        if (!that._translated) {
                            scale = that._camera._GetDistanceScale();
                            for (var i = 0; i < argCount; i++) {
                                axi = axiList[i % 2];
                                arguments[positionArgOffset + i] += -that._camera.Position[axi] + that._canvasCenter[axi] * scale;
                            }
                        }

                        return replacee.apply(this, arguments);
                    };
                };
                return Camera2dCanvasContextBuilder;
            })();
            _.Camera2dCanvasContextBuilder = Camera2dCanvasContextBuilder;
        })(Rendering._ || (Rendering._ = {}));
        var _ = Rendering._;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Rendering) {
        var Camera2dRenderer = (function (_super) {
            __extends(Camera2dRenderer, _super);
            function Camera2dRenderer(renderOnto, camera) {
                _super.call(this, renderOnto);

                this._camera = camera;
                this._contextBuilder = new Rendering._.Camera2dCanvasContextBuilder(this._camera);

                this.OnRendererSizeChange.Bind(this._contextBuilder._UpdateCanvasCenter);
                this._contextBuilder._UpdateCanvasCenter(new EndGate.Size2d(renderOnto.width, renderOnto.height));
                this._BufferContext = this._contextBuilder.Build(this._BufferContext);
            }
            Camera2dRenderer.prototype.Render = function (renderables) {
                var context, inverseScale = this._camera._GetInverseDistanceScale();

                this._BufferContext.save();
                this._BufferContext.scale(inverseScale, inverseScale);

                context = _super.prototype.Render.call(this, this.GetOnScreenRenderables(renderables));

                this._BufferContext.restore();

                return context;
            };

            Camera2dRenderer.prototype._ClearBuffer = function () {
                var cameraScale = this._camera._GetDistanceScale();
                (this._BufferContext).unModifiedClearRect(0, 0, this._BufferCanvas.width * cameraScale, this._BufferCanvas.height * cameraScale);
            };

            Camera2dRenderer.prototype.GetOnScreenRenderables = function (allRenderables) {
                var onscreen = [], scale = this._camera._GetDistanceScale(), unscale = 1 / scale;

                this._camera.Scale(scale, scale);

                for (var i = 0; i < allRenderables.length; i++) {
                    if (allRenderables[i].Visible && this._camera.Intersects(allRenderables[i].GetDrawBounds())) {
                        onscreen.push(allRenderables[i]);
                    }
                }

                this._camera.Scale(unscale, unscale);

                return onscreen;
            };
            return Camera2dRenderer;
        })(Rendering.Renderer2d);
        Rendering.Camera2dRenderer = Camera2dRenderer;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Rendering) {
        var Scene2d = (function () {
            function Scene2d(onDraw, drawArea) {
                if (typeof onDraw === "undefined") { onDraw = function (_) {
                }; }
                this._actors = [];

                if (typeof drawArea === "undefined") {
                    drawArea = this.CreateDefaultDrawArea();
                }

                this._onDraw = onDraw;

                this.ApplyStyles(drawArea);

                this._drawArea = drawArea;
                this._camera = new Rendering.Camera2d(new EndGate.Vector2d(this._drawArea.width / 2, this._drawArea.height / 2), new EndGate.Size2d(this._drawArea.width, this._drawArea.height));
                this._renderer = new Rendering.Camera2dRenderer(this._drawArea, this._camera);
                this._disposed = false;
            }
            Object.defineProperty(Scene2d.prototype, "DrawArea", {
                get: function () {
                    return this._drawArea;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Scene2d.prototype, "Camera", {
                get: function () {
                    return this._camera;
                },
                enumerable: true,
                configurable: true
            });

            Scene2d.prototype.Add = function (actor) {
                var _this = this;
                actor.OnDisposed.Bind(function (graphic) {
                    _this.Remove(graphic);
                });

                this._actors.push(actor);
            };

            Scene2d.prototype.Remove = function (actor) {
                for (var i = 0; i < this._actors.length; i++) {
                    if (this._actors[i] === actor) {
                        this._actors.splice(i, 1);
                        return;
                    }
                }
            };

            Scene2d.prototype.Draw = function () {
                this._onDraw(this._renderer.Render(this._actors));
            };

            Scene2d.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;
                    this._actors = [];
                    this._renderer.Dispose();
                } else {
                    throw new Error("Scene2d cannot be disposed more than once");
                }
            };

            Scene2d.prototype.ApplyStyles = function (drawArea) {
                drawArea.style.position = "absolute";
                drawArea.style.zIndex = "2";
                drawArea.parentElement.style.position = "relative";
            };

            Scene2d.prototype.CreateDefaultDrawArea = function () {
                var drawArea = document.createElement("canvas"), body = document.getElementsByTagName('body')[0];

                drawArea.width = window.innerWidth;
                drawArea.height = window.innerHeight;

                body.appendChild(drawArea);
                body.style.margin = "0px";
                body.style.padding = "0px";

                return drawArea;
            };
            return Scene2d;
        })();
        Rendering.Scene2d = Scene2d;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Input) {
        (function (_) {
            var MouseButton = (function () {
                function MouseButton() {
                }
                MouseButton.Left = "Left";
                MouseButton.Middle = "Middle";
                MouseButton.Right = "Right";
                return MouseButton;
            })();
            _.MouseButton = MouseButton;
        })(Input._ || (Input._ = {}));
        var _ = Input._;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Input) {
        var MouseHandler = (function () {
            function MouseHandler(target) {
                var _this = this;
                this._target = target;

                this._onClick = new EndGate.EventHandler1();
                this._onDoubleClick = new EndGate.EventHandler1();
                this._onDown = new EndGate.EventHandler1();
                this._onUp = new EndGate.EventHandler1();
                this._onMove = new EndGate.EventHandler1();
                this._onScroll = new EndGate.EventHandler1();

                this._leftIsDown = false;
                this._middleIsDown = false;
                this._rightIsDown = false;

                this.Wire();

                this.OnDown.Bind(function (e) {
                    _this._isDown = true;
                    _this[e.Button + "IsDown"] = true;
                });

                this.OnUp.Bind(function (e) {
                    _this._isDown = false;
                    _this[e.Button + "IsDown"] = false;
                });
            }
            Object.defineProperty(MouseHandler.prototype, "LeftIsDown", {
                get: function () {
                    return this._leftIsDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "MiddleIsDown", {
                get: function () {
                    return this._middleIsDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "RightIsDown", {
                get: function () {
                    return this._rightIsDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "IsDown", {
                get: function () {
                    return this._isDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnClick", {
                get: function () {
                    return this._onClick;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnDoubleClick", {
                get: function () {
                    return this._onDoubleClick;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnDown", {
                get: function () {
                    return this._onDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnUp", {
                get: function () {
                    return this._onUp;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnMove", {
                get: function () {
                    return this._onMove;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnScroll", {
                get: function () {
                    return this._onScroll;
                },
                enumerable: true,
                configurable: true
            });

            MouseHandler.prototype.Wire = function () {
                var _this = this;
                this._target.addEventListener("click", this._target.oncontextmenu = this.BuildEvent(this._onClick, this.BuildMouseClickEvent), false);
                this._target.addEventListener("dblclick", this.BuildEvent(this._onDoubleClick, this.BuildMouseClickEvent), false);
                this._target.addEventListener("mousedown", this.BuildEvent(this._onDown, this.BuildMouseClickEvent), false);
                this._target.addEventListener("mouseup", this.BuildEvent(this._onUp, this.BuildMouseClickEvent), false);
                this._target.addEventListener("mousemove", this.BuildEvent(this._onMove, this.BuildMouseEvent), false);

                if ((/MSIE/i.test(navigator.userAgent))) {
                    this._target.addEventListener("wheel", this.BuildEvent(this._onScroll, function (e) {
                        e.wheelDeltaX = -e.deltaX;
                        e.wheelDeltaY = -e.deltaY;
                        return _this.BuildMouseScrollEvent(e);
                    }), false);
                } else if ((/Firefox/i.test(navigator.userAgent))) {
                    this._target.addEventListener("DOMMouseScroll", this.BuildEvent(this._onScroll, function (e) {
                        e.wheelDeltaX = e.axis === 1 ? -e.detail : 0;
                        e.wheelDeltaY = e.axis === 2 ? -e.detail : 0;
                        return _this.BuildMouseScrollEvent(e);
                    }), false);
                } else {
                    this._target.addEventListener("mousewheel", this.BuildEvent(this._onScroll, this.BuildMouseScrollEvent), false);
                }
            };

            MouseHandler.prototype.BuildEvent = function (eventHandler, mouseEventBuilder, returnValue) {
                if (typeof returnValue === "undefined") { returnValue = false; }
                var _this = this;
                return function (e) {
                    if (eventHandler.HasBindings()) {
                        eventHandler.Trigger(mouseEventBuilder.call(_this, e));
                        e.preventDefault();
                    }

                    return returnValue;
                };
            };

            MouseHandler.prototype.BuildMouseScrollEvent = function (event) {
                return {
                    Position: this.GetMousePosition(event),
                    Direction: this.GetMouseScrollDierction(event)
                };
            };

            MouseHandler.prototype.BuildMouseEvent = function (event) {
                return {
                    Position: this.GetMousePosition(event)
                };
            };

            MouseHandler.prototype.BuildMouseClickEvent = function (event) {
                return {
                    Position: this.GetMousePosition(event),
                    Button: this.GetMouseButton(event)
                };
            };

            MouseHandler.prototype.GetMousePosition = function (event) {
                return new EndGate.Vector2d(event.offsetX ? (event.offsetX) : event.pageX - this._target.offsetLeft, event.offsetY ? (event.offsetY) : event.pageY - this._target.offsetTop);
            };

            MouseHandler.prototype.GetMouseButton = function (event) {
                if (event.which) {
                    return MouseHandler.MouseButtonArray[event.which];
                }

                return Input._.MouseButton.Right;
            };

            MouseHandler.prototype.GetMouseScrollDierction = function (event) {
                return new EndGate.Vector2d(-Math.max(-1, Math.min(1, event.wheelDeltaX)), -Math.max(-1, Math.min(1, event.wheelDeltaY)));
            };
            MouseHandler.MouseButtonArray = [null, Input._.MouseButton.Left, Input._.MouseButton.Middle, Input._.MouseButton.Right];
            return MouseHandler;
        })();
        Input.MouseHandler = MouseHandler;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (_) {
        (function (Utilities) {
            var NoopTripInvoker = (function () {
                function NoopTripInvoker(action, tripped) {
                    if (typeof tripped === "undefined") { tripped = false; }
                    this._invoker = NoopTripInvoker._noop;
                    this._action = action;

                    if (tripped) {
                        this.Trip();
                    }
                }
                NoopTripInvoker.prototype.Invoke = function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    this._invoker.apply(this, args);
                };

                NoopTripInvoker.prototype.InvokeOnce = function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    this._invoker.apply(this, args);
                    this.Reset();
                };

                NoopTripInvoker.prototype.Trip = function () {
                    this._invoker = this._action;
                };

                NoopTripInvoker.prototype.Reset = function () {
                    this._invoker = NoopTripInvoker._noop;
                };
                NoopTripInvoker._noop = function () {
                };
                return NoopTripInvoker;
            })();
            Utilities.NoopTripInvoker = NoopTripInvoker;
        })(_.Utilities || (_.Utilities = {}));
        var Utilities = _.Utilities;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Input) {
        (function (Assets) {
            var KeyboardModifiers = (function () {
                function KeyboardModifiers(ctrl, alt, shift) {
                    this.Ctrl = ctrl;
                    this.Alt = alt;
                    this.Shift = shift;
                }
                KeyboardModifiers.prototype.Equivalent = function (modifier) {
                    return this.Ctrl === modifier.Ctrl && this.Alt === modifier.Alt && this.Shift === modifier.Shift;
                };

                KeyboardModifiers.BuildFromCommandString = function (keyCommand) {
                    var ctrl = (keyCommand.toLowerCase().indexOf("ctrl+") >= 0) ? true : false, alt = (keyCommand.toLowerCase().indexOf("alt+") >= 0) ? true : false, shift = (keyCommand.toLowerCase().indexOf("shift+") >= 0) ? true : false;

                    return new KeyboardModifiers(ctrl, alt, shift);
                };
                return KeyboardModifiers;
            })();
            Assets.KeyboardModifiers = KeyboardModifiers;
        })(Input.Assets || (Input.Assets = {}));
        var Assets = Input.Assets;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Input) {
        var shiftValues = {
            "~": "`",
            "!": "1",
            "@": "2",
            "#": "3",
            "$": "4",
            "%": "5",
            "^": "6",
            "&": "7",
            "*": "8",
            "(": "9",
            ")": "0",
            "_": "-",
            "+": "=",
            ":": ";",
            "\"": "'",
            "<": ",",
            ">": ".",
            "?": "/",
            "|": "\\"
        }, specialKeys = {
            "27": "esc",
            "27": "escape",
            "9": "tab",
            "32": "space",
            "13": "return",
            "13": "enter",
            "8": "backspace",
            "45": "insert",
            "36": "home",
            "46": "delete",
            "35": "end",
            "37": "left",
            "38": "up",
            "39": "right",
            "40": "down",
            "112": "f1",
            "113": "f2",
            "114": "f3",
            "115": "f4",
            "116": "f5",
            "117": "f6",
            "118": "f7",
            "119": "f8",
            "120": "f9",
            "121": "f10",
            "122": "f11",
            "123": "f12"
        };

        var KeyboardCommandEvent = (function () {
            function KeyboardCommandEvent(keyEvent) {
                var code, character;

                this.Modifiers = new Input.Assets.KeyboardModifiers(keyEvent.ctrlKey, keyEvent.altKey, keyEvent.shiftKey);

                if (keyEvent.keyCode) {
                    code = keyEvent.keyCode;
                } else if (keyEvent.which) {
                    code = keyEvent.which;
                }

                if (!((character = String.fromCharCode(keyEvent.keyCode)) === keyEvent.key)) {
                    if (!(character = specialKeys[code])) {
                        character = String.fromCharCode(code).toLowerCase();

                        if (this.Modifiers.Shift && shiftValues[character]) {
                            character = shiftValues[character];
                        }
                    }
                }

                this.Key = character;
            }
            KeyboardCommandEvent.prototype.Matches = function (command) {
                return this.Key.toLowerCase() === command.Key.toLowerCase() && command.Modifiers.Equivalent(this.Modifiers);
            };
            return KeyboardCommandEvent;
        })();
        Input.KeyboardCommandEvent = KeyboardCommandEvent;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Input) {
        (function (_) {
            var KeyboardCommandHelper = (function () {
                function KeyboardCommandHelper() {
                }
                KeyboardCommandHelper.ParseKey = function (command) {
                    var arr = command.split("+");

                    if (arr.length > 1) {
                        return arr[arr.length - 1];
                    }

                    return arr[0];
                };
                return KeyboardCommandHelper;
            })();
            _.KeyboardCommandHelper = KeyboardCommandHelper;
        })(Input._ || (Input._ = {}));
        var _ = Input._;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Input) {
        (function (Assets) {
            var KeyboardCommand = (function () {
                function KeyboardCommand(command, action) {
                    var _this = this;
                    this.Action = action;
                    this.Modifiers = Input.Assets.KeyboardModifiers.BuildFromCommandString(command);
                    this.Key = Input._.KeyboardCommandHelper.ParseKey(command);

                    this._onDisposed = new EndGate.EventHandler();
                    this._onDisposeInvoker = new EndGate._.Utilities.NoopTripInvoker(function () {
                        _this._onDisposed.Trigger();
                    }, true);
                }
                Object.defineProperty(KeyboardCommand.prototype, "OnDispose", {
                    get: function () {
                        return this._onDisposed;
                    },
                    enumerable: true,
                    configurable: true
                });

                KeyboardCommand.prototype.Dispose = function () {
                    this._onDisposeInvoker.InvokeOnce();
                };
                return KeyboardCommand;
            })();
            Assets.KeyboardCommand = KeyboardCommand;
        })(Input.Assets || (Input.Assets = {}));
        var Assets = Input.Assets;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Input) {
        var KeyboardHandler = (function () {
            function KeyboardHandler() {
                this._onPressCommands = ({});
                this._onDownCommands = ({});
                this._onUpCommands = ({});

                this._onKeyPress = new EndGate.EventHandler1();
                this._onKeyDown = new EndGate.EventHandler1();
                this._onKeyUp = new EndGate.EventHandler1();

                this.Wire();
            }
            Object.defineProperty(KeyboardHandler.prototype, "OnKeyPress", {
                get: function () {
                    return this._onKeyPress;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyboardHandler.prototype, "OnKeyDown", {
                get: function () {
                    return this._onKeyDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyboardHandler.prototype, "OnKeyUp", {
                get: function () {
                    return this._onKeyUp;
                },
                enumerable: true,
                configurable: true
            });

            KeyboardHandler.prototype.OnCommandPress = function (keyCommand, action) {
                return this.UpdateCache(keyCommand, action, this._onPressCommands);
            };

            KeyboardHandler.prototype.OnCommandDown = function (keyCommand, action) {
                return this.UpdateCache(keyCommand, action, this._onDownCommands);
            };

            KeyboardHandler.prototype.OnCommandUp = function (keyCommand, action) {
                return this.UpdateCache(keyCommand, action, this._onUpCommands);
            };

            KeyboardHandler.prototype.UpdateCache = function (keyCommand, action, store) {
                var command = new Input.Assets.KeyboardCommand(keyCommand, action), commandId = KeyboardHandler._keyboardCommandIds++;

                command.OnDispose.Bind(function () {
                    delete store[commandId];
                });

                store[commandId] = command;

                return command;
            };

            KeyboardHandler.prototype.Wire = function () {
                document.addEventListener("keypress", this.BuildKeyEvent(this._onPressCommands, this.OnKeyPress), false);

                document.addEventListener("keydown", this.BuildKeyEvent(this._onDownCommands, this.OnKeyDown), false);

                document.addEventListener("keyup", this.BuildKeyEvent(this._onUpCommands, this.OnKeyUp), false);
            };

            KeyboardHandler.prototype.FocusingTextArea = function (ke) {
                var element;

                if (ke.target) {
                    element = ke.target;
                } else if (ke.srcElement) {
                    element = ke.srcElement;
                }

                if (element.nodeType === 3) {
                    element = element.parentNode;
                }

                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    return true;
                }

                return false;
            };

            KeyboardHandler.prototype.BuildKeyEvent = function (store, eventHandler) {
                var _this = this;
                return function (ke) {
                    var keyboardCommandEvent, propogate = true;

                    if (_this.FocusingTextArea(ke)) {
                        return;
                    }

                    keyboardCommandEvent = new Input.KeyboardCommandEvent(ke);

                    eventHandler.Trigger(keyboardCommandEvent);

                    for (var keyboardCommandId in store) {
                        if (keyboardCommandEvent.Matches(store[keyboardCommandId])) {
                            store[keyboardCommandId].Action();
                            ke.preventDefault();
                            propogate = false;
                        }
                    }

                    return propogate;
                };
            };
            KeyboardHandler._keyboardCommandIds = 0;
            return KeyboardHandler;
        })();
        Input.KeyboardHandler = KeyboardHandler;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Input) {
        var InputManager = (function () {
            function InputManager(target) {
                this.Mouse = new Input.MouseHandler(target);
                this.Keyboard = new Input.KeyboardHandler();
            }
            return InputManager;
        })();
        Input.InputManager = InputManager;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Sound) {
        var AudioSettings = (function () {
            function AudioSettings(repeat, volume, autoplay, preload) {
                if (typeof repeat === "undefined") { repeat = false; }
                if (typeof volume === "undefined") { volume = 100; }
                if (typeof autoplay === "undefined") { autoplay = false; }
                if (typeof preload === "undefined") { preload = "auto"; }
                this.Repeat = repeat;
                this.Volume = volume;
                this.AutoPlay = autoplay;
                this.Preload = preload;
            }
            AudioSettings.prototype.Clone = function () {
                return new AudioSettings(this.Repeat, this.Volume, this.AutoPlay, this.Preload);
            };
            AudioSettings.Default = new AudioSettings();
            return AudioSettings;
        })();
        Sound.AudioSettings = AudioSettings;
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Sound) {
        var supportedAudioTypes = {
            mp3: 'audio/mpeg',
            ogg: 'audio/ogg',
            wav: 'audio/wav',
            aac: 'audio/aac',
            m4a: 'audio/x-m4a'
        };

        var AudioClip = (function () {
            function AudioClip(source, settings) {
                if (typeof settings === "undefined") { settings = Sound.AudioSettings.Default; }
                this._settings = settings.Clone();
                this._audio = document.createElement("audio");
                this.SetAudioSource(source);
                this.ApplySettings();

                this._onComplete = new EndGate.EventHandler1();
            }
            Object.defineProperty(AudioClip.prototype, "OnComplete", {
                get: function () {
                    return this._onComplete;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(AudioClip.prototype, "Volume", {
                get: function () {
                    return this._settings.Volume;
                },
                set: function (percent) {
                    this._settings.Volume = percent;
                    this._audio.volume = Math.max(Math.min(percent / 100, 1), 0);
                },
                enumerable: true,
                configurable: true
            });

            AudioClip.prototype.IsPlaying = function () {
                return !this._audio.paused;
            };

            AudioClip.prototype.IsComplete = function () {
                return this._audio.ended;
            };

            AudioClip.prototype.Play = function () {
                var _this = this;
                if (this._audio.readyState === 0) {
                    this._audio.addEventListener("canplay", function () {
                        _this._audio.play();
                    }, true);
                } else {
                    this._audio.play();
                }
            };

            AudioClip.prototype.Pause = function () {
                this._audio.pause();
            };

            AudioClip.prototype.Seek = function (time) {
                var _this = this;
                if (this._audio.readyState === 0) {
                    this._audio.addEventListener("canplay", function () {
                        _this._audio.currentTime = time;
                    }, true);
                } else {
                    this._audio.currentTime = time;
                }
            };

            AudioClip.prototype.Stop = function () {
                this.Seek(0);
                this._audio.pause();
            };

            AudioClip.prototype.SetAudioSource = function (source) {
                var sourceHolder, sourceType;

                if (!(source instanceof Array)) {
                    source = [source];
                }

                for (var i = 0; i < source.length; i++) {
                    sourceHolder = document.createElement("source");
                    sourceHolder.src = source[i];

                    sourceType = supportedAudioTypes[source[i].split('.').pop()];

                    if (typeof sourceType !== "undefined") {
                        sourceHolder.type = sourceType;
                    }

                    this._audio.appendChild(sourceHolder);
                }
            };

            AudioClip.prototype.ApplySettings = function () {
                var _this = this;
                this._audio.loop = this._settings.Repeat;
                this._audio.autoplay = this._settings.AutoPlay;
                this._audio.preload = this._settings.Preload;
                this.Volume = this._settings.Volume;

                this._audio.addEventListener("ended", function (e) {
                    _this.OnComplete.Trigger(e);
                }, true);
            };
            return AudioClip;
        })();
        Sound.AudioClip = AudioClip;
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Sound) {
        var AudioPlayer = (function () {
            function AudioPlayer(source) {
                this._source = source;
            }
            AudioPlayer.prototype.Play = function (settings) {
                if (typeof settings === "undefined") { settings = Sound.AudioSettings.Default; }
                var clip = new Sound.AudioClip(this._source, settings);

                clip.Play();

                return clip;
            };
            return AudioPlayer;
        })();
        Sound.AudioPlayer = AudioPlayer;
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Sound) {
        var AudioManager = (function () {
            function AudioManager() {
                this._audioPlayers = {};
            }
            AudioManager.prototype.Load = function (name, src) {
                this._audioPlayers[name] = new Sound.AudioPlayer(src);

                return this._audioPlayers[name];
            };

            AudioManager.prototype.Unload = function (name) {
                var player = this._audioPlayers[name];

                delete this._audioPlayers[name];

                return player;
            };

            AudioManager.prototype.Play = function (name, settings) {
                if (typeof settings === "undefined") { settings = Sound.AudioSettings.Default; }
                return this._audioPlayers[name].Play(settings);
            };

            AudioManager.prototype.GetAudioPlayer = function (name) {
                return this._audioPlayers[name];
            };
            return AudioManager;
        })();
        Sound.AudioManager = AudioManager;
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Map) {
        var SceneryHandler = (function () {
            function SceneryHandler(scene) {
                this._camera = scene.Camera;
                this._layers = [];
                this._sceneryCanvas = this.BuildSceneryCanvas(scene.DrawArea);
                this._renderer = new EndGate.Rendering.Camera2dRenderer(this._sceneryCanvas, this._camera);
                this._disposed = false;
            }
            SceneryHandler.prototype.AddLayer = function (layer) {
                this._layers.push(layer);
            };

            SceneryHandler.prototype.RemoveLayer = function (layer) {
                this._layers.splice(this._layers.indexOf(layer), 1);
            };

            SceneryHandler.prototype.Draw = function () {
                this._layers.sort(EndGate.Graphics.Graphic2d._zindexSort);

                this._renderer.Render(this._layers);
            };

            SceneryHandler.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;
                    this._layers = [];
                    this._renderer.Dispose();
                } else {
                    throw new Error("Scene2d cannot be disposed more than once");
                }
            };

            SceneryHandler.prototype.BuildSceneryCanvas = function (foreground) {
                var sceneryCanvas = document.createElement("canvas"), baseElement = foreground;

                sceneryCanvas.width = foreground.width;
                sceneryCanvas.height = foreground.height;
                sceneryCanvas.style.position = "absolute";
                sceneryCanvas.style.zIndex = "1";

                foreground.parentElement.insertBefore(sceneryCanvas, foreground);

                return sceneryCanvas;
            };
            return SceneryHandler;
        })();
        Map.SceneryHandler = SceneryHandler;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Map) {
        var MapManager = (function () {
            function MapManager(scene) {
                this.Scenery = new Map.SceneryHandler(scene);
            }
            MapManager.prototype.Dispose = function () {
                this.Scenery.Dispose();
            };
            return MapManager;
        })();
        Map.MapManager = MapManager;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    var Game = (function () {
        function Game(gameCanvas) {
            var _this = this;
            this._type = "Game";
            var initialQuadTreeSize, defaultMinQuadTreeSize = EndGate.Collision.CollisionConfiguration._DefaultMinQuadTreeNodeSize;

            this._updateRequired = true;
            this._gameTime = new EndGate.GameTime();
            this._ID = Game._gameIds++;

            this.Scene = new EndGate.Rendering.Scene2d(function (context) {
                _this.Draw(context);
            }, gameCanvas);

            this.Input = new EndGate.Input.InputManager(this.Scene.DrawArea);
            this.Audio = new EndGate.Sound.AudioManager();

            initialQuadTreeSize = this.Scene.Camera.Size;

            if (initialQuadTreeSize.Width % defaultMinQuadTreeSize.Width !== 0) {
                initialQuadTreeSize = new EndGate.Size2d(initialQuadTreeSize.Width % defaultMinQuadTreeSize.Width + initialQuadTreeSize.Width);
            }

            this.Configuration = new EndGate.GameConfiguration(GameRunnerInstance.Register(this), initialQuadTreeSize);
            this.CollisionManager = new EndGate.Collision.CollisionManager(this.Configuration.CollisionConfiguration);
            this.Map = new EndGate.Map.MapManager(this.Scene);

            this.Configuration.CollisionConfiguration._OnChange.Bind(function () {
                _this.CollisionManager = new EndGate.Collision.CollisionManager(_this.Configuration.CollisionConfiguration);
            });
        }
        Game.prototype._PrepareUpdate = function () {
            this._gameTime.Update();

            this.Update(this._gameTime);
            this.CollisionManager.Update(this._gameTime);
            this._updateRequired = false;
        };

        Game.prototype.Update = function (gameTime) {
        };

        Game.prototype._PrepareDraw = function () {
            if (this.Configuration.DrawOnlyAfterUpdate && this._updateRequired) {
                return;
            }

            this.Map.Scenery.Draw();
            this.Scene.Draw();
            this._updateRequired = true;
        };

        Game.prototype.Draw = function (context) {
        };

        Game.prototype.Dispose = function () {
            this.Scene.Dispose();
            this.Map.Dispose();
            GameRunnerInstance.Unregister(this);
        };
        Game._gameIds = 0;
        return Game;
    })();
    EndGate.Game = Game;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (MovementControllers) {
        (function (Assets) {
            var LinearDirections = (function () {
                function LinearDirections() {
                    this.Left = false;
                    this.Right = false;
                    this.Up = false;
                    this.Down = false;
                }
                return LinearDirections;
            })();
            Assets.LinearDirections = LinearDirections;
        })(MovementControllers.Assets || (MovementControllers.Assets = {}));
        var Assets = MovementControllers.Assets;
    })(EndGate.MovementControllers || (EndGate.MovementControllers = {}));
    var MovementControllers = EndGate.MovementControllers;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (MovementControllers) {
        var MovementController = (function () {
            function MovementController(moveables) {
                this.Position = moveables.length > 0 ? moveables[0].Position : EndGate.Vector2d.Zero;
                this.Velocity = EndGate.Vector2d.Zero;
                this.Rotation = 0;
                this._frozen = false;

                this._moveables = moveables;
            }
            MovementController.prototype.Freeze = function () {
                this._frozen = true;
            };

            MovementController.prototype.Thaw = function () {
                this._frozen = false;
            };

            MovementController.prototype.IsMoving = function () {
                return !this._frozen && !this.Velocity.IsZero();
            };

            MovementController.prototype.Update = function (gameTime) {
                for (var i = 0; i < this._moveables.length; i++) {
                    this._moveables[i].Position = this.Position;
                    this._moveables[i].Rotation = this.Rotation;
                }
            };
            return MovementController;
        })();
        MovementControllers.MovementController = MovementController;
    })(EndGate.MovementControllers || (EndGate.MovementControllers = {}));
    var MovementControllers = EndGate.MovementControllers;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (MovementControllers) {
        var LinearMovementController = (function (_super) {
            __extends(LinearMovementController, _super);
            function LinearMovementController(movables, moveSpeed, rotateWithMovements, multiDirectional) {
                if (typeof rotateWithMovements === "undefined") { rotateWithMovements = true; }
                if (typeof multiDirectional === "undefined") { multiDirectional = true; }
                var _this = this;
                _super.call(this, movables);

                this._moveSpeed = moveSpeed;
                this._moving = new MovementControllers.Assets.LinearDirections();
                this.OnMove = new EndGate.EventHandler1();
                this._rotationUpdater = new EndGate._.Utilities.NoopTripInvoker(function () {
                    _this.UpdateRotation();
                }, rotateWithMovements);

                if (multiDirectional) {
                    this._velocityUpdater = this.UpdateVelocityWithMultiDirection;
                } else {
                    this._velocityUpdater = this.UpdateVelocityNoMultiDirection;
                }
            }
            LinearMovementController.prototype.IsMovingInDirection = function (direction) {
                return this._moving[direction] || false;
            };

            LinearMovementController.prototype.StartMoving = function (direction) {
                this.Move(direction, true);
            };

            LinearMovementController.prototype.StopMoving = function (direction) {
                this.Move(direction, false);
            };

            LinearMovementController.prototype.MoveSpeed = function (speed) {
                if (typeof speed !== "undefined") {
                    this._moveSpeed = speed;
                    this._velocityUpdater();
                }

                return this._moveSpeed;
            };

            LinearMovementController.prototype.Update = function (gameTime) {
                if (!this._frozen) {
                    this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.Elapsed.Seconds));

                    _super.prototype.Update.call(this, gameTime);
                }
            };

            LinearMovementController.prototype.Move = function (direction, startMoving) {
                if (typeof this._moving[direction] !== "undefined") {
                    this._moving[direction] = startMoving;
                    this._velocityUpdater();
                    this._rotationUpdater.Invoke();
                    this.OnMove.Trigger({
                        Direction: direction,
                        StartMoving: startMoving
                    });
                } else {
                    throw new Error(direction + " is an unknown direction.");
                }
            };

            LinearMovementController.prototype.UpdateVelocityNoMultiDirection = function () {
                var velocity = EndGate.Vector2d.Zero;

                if (velocity.IsZero()) {
                    if (this._moving.Up) {
                        velocity.Y -= this._moveSpeed;
                    }
                    if (this._moving.Down) {
                        velocity.Y += this._moveSpeed;
                    }

                    if (velocity.Y === 0) {
                        if (this._moving.Left) {
                            velocity.X -= this._moveSpeed;
                        }
                        if (this._moving.Right) {
                            velocity.X += this._moveSpeed;
                        }
                    }
                }

                this.Velocity = velocity;
            };

            LinearMovementController.prototype.UpdateVelocityWithMultiDirection = function () {
                var velocity = EndGate.Vector2d.Zero;

                if (this._moving.Up) {
                    velocity.Y -= this._moveSpeed;
                }
                if (this._moving.Down) {
                    velocity.Y += this._moveSpeed;
                }
                if (this._moving.Left) {
                    velocity.X -= this._moveSpeed;
                }
                if (this._moving.Right) {
                    velocity.X += this._moveSpeed;
                }

                this.Velocity = velocity;
            };

            LinearMovementController.prototype.UpdateRotation = function () {
                if (!this.Velocity.IsZero()) {
                    this.Rotation = Math.atan2(this.Velocity.Y, this.Velocity.X);
                }
            };
            return LinearMovementController;
        })(MovementControllers.MovementController);
        MovementControllers.LinearMovementController = LinearMovementController;
    })(EndGate.MovementControllers || (EndGate.MovementControllers = {}));
    var MovementControllers = EndGate.MovementControllers;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (InputControllers) {
        var DirectionalInputController = (function () {
            function DirectionalInputController(keyboard, onMove, upKeys, rightKeys, downKeys, leftKeys) {
                if (typeof upKeys === "undefined") { upKeys = ["w", "Up"]; }
                if (typeof rightKeys === "undefined") { rightKeys = ["d", "Right"]; }
                if (typeof downKeys === "undefined") { downKeys = ["s", "Down"]; }
                if (typeof leftKeys === "undefined") { leftKeys = ["a", "Left"]; }
                this._keyboard = keyboard;
                this._onMove = onMove;
                this._directions = new EndGate.MovementControllers.Assets.LinearDirections();

                this.BindKeys(upKeys, "OnCommandDown", "Up", true);
                this.BindKeys(rightKeys, "OnCommandDown", "Right", true);
                this.BindKeys(downKeys, "OnCommandDown", "Down", true);
                this.BindKeys(leftKeys, "OnCommandDown", "Left", true);
                this.BindKeys(upKeys, "OnCommandUp", "Up", false);
                this.BindKeys(rightKeys, "OnCommandUp", "Right", false);
                this.BindKeys(downKeys, "OnCommandUp", "Down", false);
                this.BindKeys(leftKeys, "OnCommandUp", "Left", false);
            }
            DirectionalInputController.prototype.BindKeys = function (keyList, bindingAction, direction, startMoving) {
                var _this = this;
                for (var i = 0; i < keyList.length; i++) {
                    this._keyboard[bindingAction](keyList[i], function () {
                        if (_this._directions[direction] != startMoving) {
                            _this._directions[direction] = startMoving;
                            _this._onMove(direction, startMoving);
                        }
                    });
                }
            };
            return DirectionalInputController;
        })();
        InputControllers.DirectionalInputController = DirectionalInputController;
    })(EndGate.InputControllers || (EndGate.InputControllers = {}));
    var InputControllers = EndGate.InputControllers;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            (function (FontFamily) {
                FontFamily[FontFamily["Antiqua"] = 0] = "Antiqua";
                FontFamily[FontFamily["Arial"] = 1] = "Arial";
                FontFamily[FontFamily["Avqest"] = 2] = "Avqest";
                FontFamily[FontFamily["Blackletter"] = 3] = "Blackletter";
                FontFamily[FontFamily["Calibri"] = 4] = "Calibri";
                FontFamily[FontFamily["ComicSans"] = 5] = "ComicSans";
                FontFamily[FontFamily["Courier"] = 6] = "Courier";
                FontFamily[FontFamily["Decorative"] = 7] = "Decorative";
                FontFamily[FontFamily["Fraktur"] = 8] = "Fraktur";
                FontFamily[FontFamily["Frosty"] = 9] = "Frosty";
                FontFamily[FontFamily["Garamond"] = 10] = "Garamond";
                FontFamily[FontFamily["Georgia"] = 11] = "Georgia";
                FontFamily[FontFamily["Helvetica"] = 12] = "Helvetica";
                FontFamily[FontFamily["Impact"] = 13] = "Impact";
                FontFamily[FontFamily["Minion"] = 14] = "Minion";
                FontFamily[FontFamily["Modern"] = 15] = "Modern";
                FontFamily[FontFamily["Monospace"] = 16] = "Monospace";
                FontFamily[FontFamily["Palatino"] = 17] = "Palatino";
                FontFamily[FontFamily["Roman"] = 18] = "Roman";
                FontFamily[FontFamily["Script"] = 19] = "Script";
                FontFamily[FontFamily["Swiss"] = 20] = "Swiss";
                FontFamily[FontFamily["TimesNewRoman"] = 21] = "TimesNewRoman";

                FontFamily[FontFamily["Verdana"] = 22] = "Verdana";
            })(Assets.FontFamily || (Assets.FontFamily = {}));
            var FontFamily = Assets.FontFamily;
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
            (function (FontVariant) {
                FontVariant[FontVariant["Normal"] = 0] = "Normal";

                FontVariant[FontVariant["SmallCaps"] = 1] = "SmallCaps";
            })(Assets.FontVariant || (Assets.FontVariant = {}));
            var FontVariant = Assets.FontVariant;
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
            (function (FontStyle) {
                FontStyle[FontStyle["Normal"] = 0] = "Normal";
                FontStyle[FontStyle["Italic"] = 1] = "Italic";

                FontStyle[FontStyle["Oblique"] = 2] = "Oblique";
            })(Assets.FontStyle || (Assets.FontStyle = {}));
            var FontStyle = Assets.FontStyle;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            var FontSettings = (function () {
                function FontSettings() {
                    this._cachedState = {
                        fontSize: "10px",
                        fontFamily: Assets.FontFamily.TimesNewRoman,
                        fontVariant: Assets.FontVariant.Normal,
                        fontWeight: "",
                        fontStyle: Assets.FontStyle.Normal
                    };

                    this._refreshCache = true;
                    this._BuildFont();
                }
                Object.defineProperty(FontSettings.prototype, "FontSize", {
                    get: function () {
                        return this._cachedState["fontSize"];
                    },
                    set: function (size) {
                        this._refreshCache = true;
                        this._cachedState["fontSize"] = size;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FontSettings.prototype, "FontFamily", {
                    get: function () {
                        return this._cachedState["fontFamily"];
                    },
                    set: function (family) {
                        this._refreshCache = true;
                        this._cachedState["fontFamily"] = family;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FontSettings.prototype, "FontVariant", {
                    get: function () {
                        return this._cachedState["fontVariant"];
                    },
                    set: function (variant) {
                        this._refreshCache = true;
                        this._cachedState["fontVariant"] = variant;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FontSettings.prototype, "FontWeight", {
                    get: function () {
                        return this._cachedState["fontWeight"];
                    },
                    set: function (weight) {
                        this._refreshCache = true;
                        this._cachedState["fontWeight"] = weight;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FontSettings.prototype, "FontStyle", {
                    get: function () {
                        return this._cachedState["fontStyle"];
                    },
                    set: function (style) {
                        this._refreshCache = true;
                        this._cachedState["fontStyle"] = style;
                    },
                    enumerable: true,
                    configurable: true
                });

                FontSettings.prototype._BuildFont = function () {
                    var font;

                    if (this._refreshCache) {
                        font = this._cachedState["fontWeight"] + " " + Assets.FontStyle[this._cachedState["fontStyle"]].replace("Normal", "") + " " + Assets.FontVariant[this._cachedState["fontVariant"]].replace("Normal", "") + " " + this._cachedState["fontSize"];

                        if (this._cachedState["fontFamily"] !== undefined) {
                            font += " " + Assets.FontFamily[this._cachedState["fontFamily"]];
                        }

                        this._cachedFont = font.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                        this._refreshCache = false;
                    }

                    return this._cachedFont;
                };
                return FontSettings;
            })();
            Assets.FontSettings = FontSettings;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Text2d = (function (_super) {
            __extends(Text2d, _super);
            function Text2d(x, y, text, color) {
                if (typeof color === "undefined") { color = "black"; }
                var _this = this;
                _super.call(this, new EndGate.Vector2d(x, y));
                this._type = "Text2d";

                this._text = text;
                this._stroker = new EndGate._.Utilities.NoopTripInvoker(function (context) {
                    context.strokeText(_this._text, 0, 0);
                });

                this._drawBounds = new EndGate.Bounds.BoundingRectangle(this.Position, EndGate.Size2d.One);
                this._recalculateBoundsSize = true;

                this._fontSettings = new Graphics.Assets.FontSettings();
                this.Align = "center";
                this.Baseline = "middle";
                this.Color = color;
            }
            Object.defineProperty(Text2d.prototype, "Align", {
                get: function () {
                    return this._State.TextAlign;
                },
                set: function (alignment) {
                    this._State.TextAlign = alignment;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "Baseline", {
                get: function () {
                    return this._State.TextBaseline;
                },
                set: function (baseline) {
                    this._State.TextBaseline = baseline;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "Color", {
                get: function () {
                    return this._State.FillStyle;
                },
                set: function (color) {
                    this._State.FillStyle = color;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "ShadowColor", {
                get: function () {
                    return this._State.ShadowColor;
                },
                set: function (color) {
                    this._State.ShadowColor = color;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "ShadowX", {
                get: function () {
                    return this._State.ShadowOffsetX;
                },
                set: function (x) {
                    this._State.ShadowOffsetX = x;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "ShadowY", {
                get: function () {
                    return this._State.ShadowOffsetY;
                },
                set: function (y) {
                    this._State.ShadowOffsetY = y;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "ShadowBlur", {
                get: function () {
                    return this._State.ShadowBlur;
                },
                set: function (blur) {
                    this._State.ShadowBlur = blur;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "FontSettings", {
                get: function () {
                    this._recalculateBoundsSize = true;

                    return this._fontSettings;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "BorderThickness", {
                get: function () {
                    return this._State.LineWidth;
                },
                set: function (thickness) {
                    if (thickness === 0) {
                        this._stroker.Reset();
                    } else {
                        this._stroker.Trip();
                    }

                    this._State.LineWidth = thickness;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "BorderColor", {
                get: function () {
                    return this._State.StrokeStyle;
                },
                set: function (color) {
                    this._stroker.Trip();
                    this._State.StrokeStyle = color;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "Text", {
                get: function () {
                    return this._text;
                },
                set: function (text) {
                    this._recalculateBoundsSize = true;
                    this._text = text;
                },
                enumerable: true,
                configurable: true
            });

            Text2d.prototype.Shadow = function (x, y, color, blur) {
                this.ShadowX = x;
                this.ShadowY = y;
                this.ShadowColor = color;
                this.ShadowBlur = blur;
            };

            Text2d.prototype.Border = function (thickness, color) {
                this.BorderThickness = thickness;
                this.BorderColor = color;
            };

            Text2d.prototype.Draw = function (context) {
                var textSize;

                this._State.Font = this._fontSettings._BuildFont();

                _super.prototype._StartDraw.call(this, context);

                context.fillText(this._text, 0, 0);
                this._stroker.Invoke(context);

                if (this._recalculateBoundsSize) {
                    this._recalculateBoundsSize = false;
                    textSize = context.measureText(this._text);
                    this._drawBounds.Size.Width = textSize.width;
                    this._drawBounds.Size.Height = parseInt(this._fontSettings.FontSize) * 1.5;
                }

                _super.prototype._EndDraw.call(this, context);
            };

            Text2d.prototype.GetDrawBounds = function () {
                this._drawBounds.Rotation = this.Rotation;
                this._drawBounds.Position = this.Position;

                return this._drawBounds;
            };
            return Text2d;
        })(Graphics.Graphic2d);
        Graphics.Text2d = Text2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var ImageSource = (function () {
            function ImageSource(imageLocation, width, height, clipX, clipY, clipWidth, clipHeight) {
                if (typeof clipX === "undefined") { clipX = 0; }
                if (typeof clipY === "undefined") { clipY = 0; }
                if (typeof clipWidth === "undefined") { clipWidth = width; }
                if (typeof clipHeight === "undefined") { clipHeight = height; }
                var _this = this;
                var setSize = typeof width !== "undefined";

                this._loaded = false;
                this._onLoaded = new EndGate.EventHandler1();
                this.Source = new Image();

                this.Source.onload = function () {
                    _this._loaded = true;

                    if (!setSize) {
                        _this._size = new EndGate.Size2d(_this.Source.width, _this.Source.height);
                        _this.ClipLocation = EndGate.Vector2d.Zero;
                        _this.ClipSize = _this._size.Clone();
                    }

                    _this._onLoaded.Trigger(_this);
                };

                this.Source.src = imageLocation;
                this._imageLocation = imageLocation;

                if (setSize) {
                    this._size = new EndGate.Size2d(width, height);
                    this.ClipLocation = new EndGate.Vector2d(clipX, clipY);
                    this.ClipSize = new EndGate.Size2d(clipWidth, clipHeight);
                }
            }
            Object.defineProperty(ImageSource.prototype, "OnLoaded", {
                get: function () {
                    return this._onLoaded;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ImageSource.prototype, "Size", {
                get: function () {
                    return this._size.Clone();
                },
                enumerable: true,
                configurable: true
            });

            ImageSource.prototype.Loaded = function () {
                return this._loaded;
            };

            ImageSource.prototype.Extract = function (clipX, clipY, clipWidth, clipHeight) {
                return new ImageSource(this._imageLocation, this._size.Width, this._size.Height, clipX, clipY, clipWidth, clipHeight);
            };
            return ImageSource;
        })();
        Graphics.ImageSource = ImageSource;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Sprite2d = (function (_super) {
            __extends(Sprite2d, _super);
            function Sprite2d(x, y, image, width, height) {
                if (typeof width === "undefined") { width = image.ClipSize.Width; }
                if (typeof height === "undefined") { height = image.ClipSize.Height; }
                _super.call(this, new EndGate.Vector2d(x, y));
                this._type = "Sprite2d";

                this.Image = image;
                this.Size = new EndGate.Size2d(width, height);
            }
            Sprite2d.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);

                context.drawImage(this.Image.Source, this.Image.ClipLocation.X, this.Image.ClipLocation.Y, this.Image.ClipSize.Width, this.Image.ClipSize.Height, -this.Size.HalfWidth, -this.Size.HalfHeight, this.Size.Width, this.Size.Height);

                _super.prototype._EndDraw.call(this, context);
            };

            Sprite2d.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, this.Size);

                bounds.Rotation = this.Rotation;

                return bounds;
            };
            return Sprite2d;
        })(Graphics.Graphic2d);
        Graphics.Sprite2d = Sprite2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var SpriteAnimation = (function () {
            function SpriteAnimation(imageSource, fps, frameSize, frameCount, startOffset) {
                if (typeof startOffset === "undefined") { startOffset = EndGate.Vector2d.Zero; }
                var _this = this;
                this._imageSource = imageSource;
                this._frameSize = frameSize;
                this._frameCount = frameCount;
                this._startOffset = startOffset;
                this._playing = false;
                this._repeating = false;
                this._currentFrame = 0;
                this._lastStepAt = 0;

                this._onComplete = new EndGate.EventHandler();

                this.Fps = fps;

                if (imageSource.Loaded()) {
                    this._framesPerRow = Math.min(Math.floor((imageSource.ClipSize.Width - startOffset.X) / frameSize.Width), frameCount);
                } else {
                    imageSource.OnLoaded.BindFor(function (image) {
                        _this._framesPerRow = Math.min(Math.floor((imageSource.ClipSize.Width - startOffset.X) / frameSize.Width), frameCount);
                    }, 1);

                    this._framesPerRow = 1;
                }
            }
            Object.defineProperty(SpriteAnimation.prototype, "OnComplete", {
                get: function () {
                    return this._onComplete;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SpriteAnimation.prototype, "Fps", {
                get: function () {
                    return this._fps;
                },
                set: function (newFps) {
                    this._fps = newFps;
                    this._stepEvery = 1000 / this._fps;
                },
                enumerable: true,
                configurable: true
            });

            SpriteAnimation.prototype.IsPlaying = function () {
                return this._playing;
            };

            SpriteAnimation.prototype.CanPlay = function () {
                return this._imageSource.Loaded();
            };

            SpriteAnimation.prototype.Play = function (repeat) {
                if (typeof repeat === "undefined") { repeat = false; }
                if (!this._imageSource.Loaded()) {
                    throw new Error("Image source not loaded yet.");
                }

                this._lastStepAt = new Date().getTime();
                this._repeating = repeat;
                this._playing = true;
                this.UpdateImageSource();
            };

            SpriteAnimation.prototype.Pause = function () {
                this._playing = false;
            };

            SpriteAnimation.prototype.Step = function (count) {
                if (typeof count === "undefined") { count = 1; }
                this._currentFrame += count;

                if (this._currentFrame >= this._frameCount) {
                    if (this._repeating) {
                        this._currentFrame %= this._frameCount;
                    } else {
                        this._currentFrame = this._frameCount - 1;
                        this.OnComplete.Trigger();
                        this.Stop(false);
                    }
                }

                if (count !== 0) {
                    this.UpdateImageSource();
                }
            };

            SpriteAnimation.prototype.Stop = function (resetFrame) {
                if (typeof resetFrame === "undefined") { resetFrame = true; }
                this._playing = false;
                if (resetFrame) {
                    this.Reset();
                }
            };

            SpriteAnimation.prototype.Reset = function () {
                this._currentFrame = 0;
                this.UpdateImageSource();
            };

            SpriteAnimation.prototype.Update = function (gameTime) {
                var timeSinceStep = gameTime.Now.getTime() - this._lastStepAt, stepCount = 0;

                if (this._playing) {
                    stepCount = Math.floor(timeSinceStep / this._stepEvery);
                    if (stepCount !== 0) {
                        this._lastStepAt = gameTime.Now.getTime();
                        this.Step(stepCount);
                    }
                }
            };

            SpriteAnimation.prototype.UpdateImageSource = function () {
                var row = this.GetFrameRow(), column = this.GetFrameColumn();

                this._imageSource.ClipLocation.X = this._startOffset.X + column * this._frameSize.Width;
                this._imageSource.ClipLocation.Y = this._startOffset.Y + row * this._frameSize.Height;
                this._imageSource.ClipSize = this._frameSize;
            };

            SpriteAnimation.prototype.GetFrameRow = function () {
                return Math.floor(this._currentFrame / this._framesPerRow);
            };

            SpriteAnimation.prototype.GetFrameColumn = function () {
                return Math.ceil(this._currentFrame % this._framesPerRow);
            };
            return SpriteAnimation;
        })();
        Graphics.SpriteAnimation = SpriteAnimation;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Shape = (function (_super) {
            __extends(Shape, _super);
            function Shape(position, color) {
                _super.call(this, position);
                this._type = "Shape";

                this._fill = false;
                this._stroke = false;

                if (typeof color !== "undefined") {
                    this.Color = color;
                }
            }
            Object.defineProperty(Shape.prototype, "Color", {
                get: function () {
                    return this._State.FillStyle;
                },
                set: function (color) {
                    this._fill = true;
                    this._State.FillStyle = color;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "BorderThickness", {
                get: function () {
                    return this._State.LineWidth;
                },
                set: function (thickness) {
                    this._State.LineWidth = thickness;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "BorderColor", {
                get: function () {
                    return this._State.StrokeStyle;
                },
                set: function (color) {
                    this._stroke = true;
                    this._State.StrokeStyle = color;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "ShadowColor", {
                get: function () {
                    return this._State.ShadowColor;
                },
                set: function (color) {
                    this._fill = true;
                    this._State.ShadowColor = color;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "ShadowX", {
                get: function () {
                    return this._State.ShadowOffsetX;
                },
                set: function (x) {
                    this._State.ShadowOffsetX = x;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "ShadowY", {
                get: function () {
                    return this._State.ShadowOffsetY;
                },
                set: function (y) {
                    this._State.ShadowOffsetY = y;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "ShadowBlur", {
                get: function () {
                    return this._State.ShadowBlur;
                },
                set: function (blur) {
                    this._State.ShadowBlur = blur;
                },
                enumerable: true,
                configurable: true
            });

            Shape.prototype.Border = function (thickness, color) {
                this.BorderThickness = thickness;
                this.BorderColor = color;
            };

            Shape.prototype.Shadow = function (x, y, color, blur) {
                this.ShadowX = x;
                this.ShadowY = y;
                this.ShadowColor = color;
                this.ShadowBlur = blur;
            };

            Shape.prototype._StartDraw = function (context) {
                _super.prototype._StartDraw.call(this, context);
                context.beginPath();
            };

            Shape.prototype._EndDraw = function (context) {
                if (this._fill) {
                    context.fill();
                }

                if (this._stroke) {
                    context.stroke();
                } else {
                    context.closePath();
                }

                _super.prototype._EndDraw.call(this, context);
            };

            Shape.prototype._BuildPath = function (context) {
            };

            Shape.prototype.Draw = function (context) {
                this._StartDraw(context);
                this._BuildPath(context);
                this._EndDraw(context);
            };
            return Shape;
        })(Graphics.Graphic2d);
        Graphics.Shape = Shape;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Circle = (function (_super) {
            __extends(Circle, _super);
            function Circle(x, y, radius, color) {
                _super.call(this, new EndGate.Vector2d(x, y), color);
                this._type = "Circle";

                this.Radius = radius;
            }
            Circle.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingCircle(this.Position, this.Radius);

                bounds.Rotation = this.Rotation;

                return bounds;
            };

            Circle.prototype._BuildPath = function (context) {
                context.arc(0, 0, this.Radius, 0, (Math).twoPI);
            };
            return Circle;
        })(Graphics.Shape);
        Graphics.Circle = Circle;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Rectangle = (function (_super) {
            __extends(Rectangle, _super);
            function Rectangle(x, y, width, height, color) {
                _super.call(this, new EndGate.Vector2d(x, y), color);
                this._type = "Rectangle";

                this.Size = new EndGate.Size2d(width, height);
            }
            Rectangle.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, this.Size);

                bounds.Rotation = this.Rotation;

                return bounds;
            };

            Rectangle.prototype._BuildPath = function (context) {
                context.rect(-this.Size.HalfWidth, -this.Size.HalfHeight, this.Size.Width, this.Size.Height);
            };
            return Rectangle;
        })(Graphics.Shape);
        Graphics.Rectangle = Rectangle;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Line2d = (function (_super) {
            __extends(Line2d, _super);
            function Line2d(fromX, fromY, toX, toY, lineWidth, color) {
                if (typeof lineWidth === "undefined") { lineWidth = 1; }
                _super.call(this, EndGate.Vector2d.Zero);
                this._type = "Line2d";

                this._from = new EndGate.Vector2d(fromX, fromY);
                this._to = new EndGate.Vector2d(toX, toY);
                this.LineWidth = lineWidth;
                this.UpdatePosition();

                if (typeof color !== "undefined") {
                    this.Color = color;
                }
            }
            Object.defineProperty(Line2d.prototype, "From", {
                get: function () {
                    return this._from;
                },
                set: function (newPosition) {
                    this._from = newPosition;
                    this.UpdatePosition();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "To", {
                get: function () {
                    return this._to;
                },
                set: function (newPosition) {
                    this._to = newPosition;
                    this.UpdatePosition();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "Color", {
                get: function () {
                    return this._State.StrokeStyle;
                },
                set: function (color) {
                    this._State.StrokeStyle = color;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "LineWidth", {
                get: function () {
                    return this._State.LineWidth;
                },
                set: function (width) {
                    this._State.LineWidth = width;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "LineCap", {
                get: function () {
                    return this._State.LineCap;
                },
                set: function (cap) {
                    this._State.LineCap = cap;
                },
                enumerable: true,
                configurable: true
            });

            Line2d.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);

                if (!this._cachedPosition.Equivalent(this.Position)) {
                    this.RefreshCache();
                }

                context.beginPath();
                context.moveTo(this._from.X - this.Position.X, this._from.Y - this.Position.Y);
                context.lineTo(this._to.X - this.Position.X, this._to.Y - this.Position.Y);
                context.stroke();

                _super.prototype._EndDraw.call(this, context);
            };

            Line2d.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, new EndGate.Size2d(this._boundsWidth, this.LineWidth));

                bounds.Rotation = Math.atan2(this._difference.Y, this._difference.X) + this.Rotation;

                return bounds;
            };

            Line2d.prototype.UpdatePosition = function () {
                this.Position = ((this._from.Add(this._to)).Divide(2));
                this._difference = this._to.Subtract(this._from);
                this._boundsWidth = this._from.Distance(this._to).Length();
                this._cachedPosition = this.Position.Clone();
            };

            Line2d.prototype.RefreshCache = function () {
                var difference = this.Position.Subtract(this._cachedPosition);
                this._from.X += difference.X;
                this._from.Y += difference.Y;
                this._to.X += difference.X;
                this._to.Y += difference.Y;
                this._cachedPosition = this.Position.Clone();
            };
            return Line2d;
        })(Graphics.Graphic2d);
        Graphics.Line2d = Line2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Grid = (function (_super) {
            __extends(Grid, _super);
            function Grid(x, y, rows, columns, tileWidth, tileHeight, drawGridLines, gridLineColor) {
                if (typeof drawGridLines === "undefined") { drawGridLines = false; }
                if (typeof gridLineColor === "undefined") { gridLineColor = "gray"; }
                _super.call(this, new EndGate.Vector2d(x, y));
                this._type = "Grid";

                this._size = new EndGate.Size2d(tileWidth * columns, tileHeight * rows);
                this._tileSize = new EndGate.Size2d(tileWidth, tileHeight);
                this._grid = [];
                this._rows = rows;
                this._columns = columns;
                this._gridLines = [];
                this.GridLineColor = gridLineColor;
                this.DrawGridLines = drawGridLines;

                for (var i = 0; i < this._rows; i++) {
                    this._grid[i] = [];

                    for (var j = 0; j < this._columns; j++) {
                        this._grid[i].push(null);
                    }
                }
            }
            Object.defineProperty(Grid.prototype, "DrawGridLines", {
                get: function () {
                    return this._drawGridLines;
                },
                set: function (shouldDraw) {
                    if (shouldDraw && this._gridLines.length === 0) {
                        this.BuildGridLines();
                    }

                    this._drawGridLines = shouldDraw;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Grid.prototype, "GridLineColor", {
                get: function () {
                    return this._gridLineColor;
                },
                set: function (color) {
                    this._gridLineColor = color;

                    for (var i = 0; i < this._gridLines.length; i++) {
                        this._gridLines[i].Color = color;
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Grid.prototype, "Size", {
                get: function () {
                    return this._size.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Grid.prototype, "TileSize", {
                get: function () {
                    return this._tileSize.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Grid.prototype, "Rows", {
                get: function () {
                    return this._rows;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Grid.prototype, "Columns", {
                get: function () {
                    return this._columns;
                },
                enumerable: true,
                configurable: true
            });

            Grid.prototype.Fill = function (row, column, graphic) {
                if (!graphic || !this.ValidRow(row) || !this.ValidColumn(column)) {
                    return;
                }

                graphic.Position = this.GetInsideGridPosition(row, column);

                this._grid[row][column] = graphic;
                this.AddChild(graphic);
            };

            Grid.prototype.FillRow = function (row, graphicList, columnOffset) {
                if (typeof columnOffset === "undefined") { columnOffset = 0; }
                var graphic;

                for (var i = 0; i < graphicList.length; i++) {
                    graphic = graphicList[i];
                    graphic.Position = this.GetInsideGridPosition(row, i + columnOffset);

                    this._grid[row][i + columnOffset] = graphic;
                    this.AddChild(graphic);
                }
            };

            Grid.prototype.FillColumn = function (column, graphicList, rowOffset) {
                if (typeof rowOffset === "undefined") { rowOffset = 0; }
                var graphic;

                for (var i = 0; i < graphicList.length; i++) {
                    graphic = graphicList[i];
                    graphic.Position = this.GetInsideGridPosition(i + rowOffset, column);

                    this._grid[i + rowOffset][column] = graphic;
                    this.AddChild(graphic);
                }
            };

            Grid.prototype.FillSpace = function (row, column, graphicList) {
                var graphic;

                for (var i = 0; i < graphicList.length; i++) {
                    for (var j = 0; j < graphicList[i].length; j++) {
                        graphic = graphicList[i][j];
                        if (graphic) {
                            graphic.Position = this.GetInsideGridPosition(i + row, j + column);

                            this._grid[i + row][j + column] = graphic;
                            this.AddChild(graphic);
                        }
                    }
                }
            };

            Grid.prototype.Get = function (row, column) {
                if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                    return null;
                }

                return this._grid[row][column];
            };

            Grid.prototype.GetRow = function (row, columnOffset) {
                if (typeof columnOffset === "undefined") { columnOffset = 0; }
                var rowList = [];

                for (var i = columnOffset; i < this._columns; i++) {
                    rowList.push(this._grid[row][i]);
                }

                return rowList;
            };

            Grid.prototype.GetColumn = function (column, rowOffset) {
                if (typeof rowOffset === "undefined") { rowOffset = 0; }
                var columnList = [];

                for (var i = rowOffset; i < this._rows; i++) {
                    columnList.push(this._grid[i][column]);
                }

                return columnList;
            };

            Grid.prototype.GetSpace = function (rowStart, columnStart, rowEnd, columnEnd) {
                var space = [], rowIncrementor = (rowEnd >= rowStart) ? 1 : -1, columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;

                for (var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                    if (i >= this._rows) {
                        break;
                    }

                    for (var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                        if (j >= this._columns) {
                            break;
                        }

                        space.push(this._grid[i][j]);
                    }
                }

                return space;
            };

            Grid.prototype.Clear = function (row, column) {
                if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                    return null;
                }

                var val = this._grid[row][column];

                this._grid[row][column] = null;
                this.RemoveChild(val);

                return val;
            };

            Grid.prototype.ClearRow = function (row, columnOffset) {
                if (typeof columnOffset === "undefined") { columnOffset = 0; }
                var vals = [];

                for (var i = 0; i < this._columns; i++) {
                    vals.push(this._grid[row][i]);
                    this.RemoveChild(this._grid[row][i]);
                    this._grid[row][i] = null;
                }

                return vals;
            };

            Grid.prototype.ClearColumn = function (column, rowOffset) {
                if (typeof rowOffset === "undefined") { rowOffset = 0; }
                var vals = [];

                for (var i = 0; i < this._rows; i++) {
                    vals.push(this._grid[i][column]);
                    this.RemoveChild(this._grid[i][column]);
                    this._grid[i][column] = null;
                }

                return vals;
            };

            Grid.prototype.ClearSpace = function (rowStart, columnStart, rowEnd, columnEnd) {
                var space = [], rowIncrementor = (rowEnd >= rowStart) ? 1 : -1, columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;

                for (var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                    if (i > this._rows) {
                        break;
                    }

                    for (var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                        if (j > this._columns) {
                            break;
                        }

                        space.push(this._grid[i][j]);
                        this.RemoveChild(this._grid[i][j]);
                        this._grid[i][j] = null;
                    }
                }

                return space;
            };

            Grid.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);

                context.save();
                _super.prototype._EndDraw.call(this, context);

                if (this.DrawGridLines) {
                    for (var i = 0; i < this._gridLines.length; i++) {
                        this._gridLines[i].Draw(context);
                    }
                }
                context.restore();
            };

            Grid.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, this._size);

                bounds.Rotation = this.Rotation;

                return bounds;
            };

            Grid.prototype.ConvertToRow = function (y) {
                return Math.floor((y - (this.Position.Y - this._size.HalfHeight)) / this._tileSize.Height);
            };

            Grid.prototype.ConvertToColumn = function (x) {
                return Math.floor((x - (this.Position.X - this._size.HalfWidth)) / this._tileSize.Width);
            };

            Grid.prototype.BuildGridLines = function () {
                var halfSize = this._size.Multiply(.5), topLeft = new EndGate.Vector2d(-halfSize.Width, -halfSize.Height), bottomRight = new EndGate.Vector2d(halfSize.Width, halfSize.Height);

                for (var i = 0; i < this._rows; i++) {
                    this._gridLines.push(new Graphics.Line2d(topLeft.X, topLeft.Y + i * this._tileSize.Height, bottomRight.X, topLeft.Y + i * this._tileSize.Height, 1, this._gridLineColor));

                    if (i === 0) {
                        for (var j = 0; j < this._columns; j++) {
                            this._gridLines.push(new Graphics.Line2d(topLeft.X + j * this._tileSize.Width, topLeft.Y, topLeft.X + j * this._tileSize.Width, bottomRight.Y, 1, this._gridLineColor));
                        }
                    }
                }

                this._gridLines.push(new Graphics.Line2d(topLeft.X, bottomRight.Y, bottomRight.X, bottomRight.Y, 1));
                this._gridLines.push(new Graphics.Line2d(bottomRight.X, topLeft.Y, bottomRight.X, bottomRight.Y, 1));
            };

            Grid.prototype.GetInsideGridPosition = function (row, column) {
                return new EndGate.Vector2d(column * this._tileSize.Width - this._size.HalfWidth + this._tileSize.HalfWidth, row * this._tileSize.Height - this._size.HalfHeight + this._tileSize.HalfHeight);
            };

            Grid.prototype.ValidRow = function (row) {
                return row >= 0 && row < this._rows;
            };

            Grid.prototype.ValidColumn = function (column) {
                return column >= 0 && column < this._columns;
            };
            return Grid;
        })(Graphics.Graphic2d);
        Graphics.Grid = Grid;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    var Matrix2x2 = (function () {
        function Matrix2x2(topLeft, topRight, botLeft, botRight) {
            if (typeof topLeft === "undefined") { topLeft = 0; }
            if (typeof topRight === "undefined") { topRight = 0; }
            if (typeof botLeft === "undefined") { botLeft = 0; }
            if (typeof botRight === "undefined") { botRight = 0; }
            this._type = "Matrix2x2";
            this.Values = [
                [topLeft, topRight],
                [botLeft, botRight]
            ];
        }
        Object.defineProperty(Matrix2x2, "Zero", {
            get: function () {
                return new Matrix2x2();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Matrix2x2, "Identity", {
            get: function () {
                return new Matrix2x2(1, 0, 0, 1);
            },
            enumerable: true,
            configurable: true
        });

        Matrix2x2.prototype.Apply = function (action) {
            this.Values[0][0] = action(this.Values[0][0]);
            this.Values[0][1] = action(this.Values[0][1]);
            this.Values[1][0] = action(this.Values[1][0]);
            this.Values[1][1] = action(this.Values[1][1]);
        };

        Matrix2x2.prototype.Trigger = function (action) {
            action(this.Values[0][0]);
            action(this.Values[0][1]);
            action(this.Values[1][0]);
            action(this.Values[1][1]);
        };

        Matrix2x2.prototype.Add = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] + val.Values[0][0], this.Values[0][1] + val.Values[0][1], this.Values[1][0] + val.Values[1][0], this.Values[1][1] + val.Values[1][1]);
            } else {
                return new Matrix2x2(this.Values[0][0] + val, this.Values[0][1] + val, this.Values[1][0] + val, this.Values[1][1] + val);
            }
        };

        Matrix2x2.prototype.Multiply = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] * val.Values[0][0] + this.Values[0][1] * val.Values[1][0], this.Values[0][0] * val.Values[0][1] + this.Values[0][1] * val.Values[1][1], this.Values[1][0] * val.Values[0][0] + this.Values[1][1] * val.Values[1][0], this.Values[1][0] * val.Values[0][1] + this.Values[1][1] * val.Values[1][1]);
            } else {
                return new Matrix2x2(this.Values[0][0] * val, this.Values[0][1] * val, this.Values[1][0] * val, this.Values[1][1] * val);
            }
        };

        Matrix2x2.prototype.Subtract = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] - val.Values[0][0], this.Values[0][1] - val.Values[0][1], this.Values[1][0] - val.Values[1][0], this.Values[1][1] - val.Values[1][1]);
            } else {
                return new Matrix2x2(this.Values[0][0] - val, this.Values[0][1] - val, this.Values[1][0] - val, this.Values[1][1] - val);
            }
        };

        Matrix2x2.prototype.SubtractFrom = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(val.Values[0][0] - this.Values[0][0], val.Values[0][1] - this.Values[0][1], val.Values[1][0] - this.Values[1][0], val.Values[1][1] - this.Values[1][1]);
            } else {
                return new Matrix2x2(val - this.Values[0][0], val - this.Values[0][1], val - this.Values[1][0], val - this.Values[1][1]);
            }
        };

        Matrix2x2.prototype.Divide = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(this.Values[0][0] / val.Values[0][0], this.Values[0][1] / val.Values[0][1], this.Values[1][0] / val.Values[1][0], this.Values[1][1] / val.Values[1][1]);
            } else {
                return new Matrix2x2(this.Values[0][0] / val, this.Values[0][1] / val, this.Values[1][0] / val, this.Values[1][1] / val);
            }
        };

        Matrix2x2.prototype.DivideFrom = function (val) {
            if (val._type === "Matrix2x2") {
                return new Matrix2x2(val.Values[0][0] / this.Values[0][0], val.Values[0][1] / this.Values[0][1], val.Values[1][0] / this.Values[1][0], val.Values[1][1] / this.Values[1][1]);
            } else {
                return new Matrix2x2(val / this.Values[0][0], val / this.Values[0][1], val / this.Values[1][0], val / this.Values[1][1]);
            }
        };

        Matrix2x2.prototype.Transform = function (vector) {
            return new EndGate.Vector2d(this.Values[0][0] * vector.X + this.Values[0][1] * vector.Y, this.Values[1][0] * vector.X + this.Values[1][1] * vector.Y);
        };

        Matrix2x2.prototype.Transpose = function () {
            return new Matrix2x2(this.Values[0][0], this.Values[1][0], this.Values[0][1], this.Values[1][1]);
        };

        Matrix2x2.prototype.Determinant = function () {
            return this.Values[0][0] * this.Values[1][1] - this.Values[0][1] * this.Values[1][0];
        };

        Matrix2x2.prototype.Inverse = function () {
            return new Matrix2x2(this.Values[1][1], -this.Values[0][1], -this.Values[1][0], this.Values[0][0]).Multiply(1 / this.Determinant());
        };

        Matrix2x2.prototype.Clone = function () {
            return new Matrix2x2(this.Values[0][0], this.Values[0][1], this.Values[1][0], this.Values[1][1]);
        };

        Matrix2x2.prototype.Equivalent = function (matrix) {
            return this.Values[0][0] === matrix.Values[0][0] && this.Values[0][1] === matrix.Values[0][1] && this.Values[1][0] === matrix.Values[1][0] && this.Values[1][1] === matrix.Values[1][1];
        };

        Matrix2x2.prototype.toString = function () {
            return this.Values[0].toString() + " " + this.Values[1].toString();
        };

        Matrix2x2.Scale = function (vector) {
            return new Matrix2x2(vector.X, 0, 0, vector.Y);
        };
        return Matrix2x2;
    })();
    EndGate.Matrix2x2 = Matrix2x2;
})(EndGate || (EndGate = {}));

function asyncLoop(action, count, onComplete) {
    ((function loop(index) {
        if (index < count) {
            action(function () {
                loop(index + 1);
            }, index);
        } else if (onComplete) {
            onComplete();
        }
    })(0));
}

var EndGate;
(function (EndGate) {
    (function (Map) {
        var TileMap = (function (_super) {
            __extends(TileMap, _super);
            function TileMap(x, y, resources) {
                _super.call(this, new EndGate.Vector2d(x, y));

                this._Resources = resources;
            }
            return TileMap;
        })(EndGate.Graphics.Graphic2d);
        Map.TileMap = TileMap;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Map) {
        var SquareTile = (function (_super) {
            __extends(SquareTile, _super);
            function SquareTile(image, width, height) {
                _super.call(this, 0, 0, image, width, height);
            }
            return SquareTile;
        })(EndGate.Graphics.Sprite2d);
        Map.SquareTile = SquareTile;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Map) {
        var SquareTileMap = (function (_super) {
            __extends(SquareTileMap, _super);
            function SquareTileMap(x, y, tileWidth, tileHeight, resources, mappings, staticMap, drawGridLines) {
                if (typeof staticMap === "undefined") { staticMap = true; }
                if (typeof drawGridLines === "undefined") { drawGridLines = false; }
                var _this = this;
                _super.call(this, x, y, resources);

                this._grid = new EndGate.Graphics.Grid(0, 0, mappings.length, mappings[0].length, tileWidth, tileHeight, drawGridLines);
                this._staticMap = staticMap;
                this._onTileLoad = new EndGate.EventHandler2();
                this._onLoaded = new EndGate.EventHandler();
                this._loaded = false;
                this._tilesBuilt = 0;
                this._totalTiles = this._grid.Rows * this._grid.Columns;
                this.TileLoadDelay = EndGate.TimeSpan.Zero;
                this.RowLoadDelay = EndGate.TimeSpan.Zero;

                if (this._staticMap) {
                    this.BuildCache();
                }

                setTimeout(function () {
                    _this.FillGridWith(mappings, function () {
                        _this._loaded = true;
                        _this._onLoaded.Trigger();
                    });
                }, 0);
            }
            Object.defineProperty(SquareTileMap.prototype, "OnTileLoad", {
                get: function () {
                    return this._onTileLoad;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SquareTileMap.prototype, "OnLoaded", {
                get: function () {
                    return this._onLoaded;
                },
                enumerable: true,
                configurable: true
            });

            SquareTileMap.ExtractTiles = function (imageSource, tileWidth, tileHeight) {
                var resources = [], framesPerRow = Math.floor(imageSource.ClipSize.Width / tileWidth), rows = Math.floor(imageSource.ClipSize.Height / tileHeight);

                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < framesPerRow; j++) {
                        resources.push(imageSource.Extract(j * tileWidth, i * tileHeight, tileWidth, tileHeight));
                    }
                }

                return resources;
            };

            SquareTileMap.prototype.IsLoaded = function () {
                return this._loaded;
            };

            SquareTileMap.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);

                if (!this._staticMap) {
                    this._grid.Draw(context);
                } else {
                    context.drawImage(this._mapCache, -this._mapCache.width / 2, -this._mapCache.height / 2);
                }

                _super.prototype._EndDraw.call(this, context);
            };

            SquareTileMap.prototype.GetDrawBounds = function () {
                var bounds = this._grid.GetDrawBounds();

                bounds.Position = this.Position;

                return bounds;
            };

            SquareTileMap.prototype.BuildCache = function () {
                var size = this._grid.Size, originalPosition = this._grid.Position;

                this._mapCache = document.createElement("canvas");
                this._mapCache.width = size.Width;
                this._mapCache.height = size.Height;
                this._mapCacheContext = this._mapCache.getContext("2d");
                this._mapCacheContext.translate(size.HalfWidth, size.HalfHeight);
            };

            SquareTileMap.prototype.CacheTile = function (tile) {
                tile.Draw(this._mapCacheContext);
            };

            SquareTileMap.prototype.FillGridWith = function (mappings, onComplete) {
                var _this = this;
                asyncLoop(function (next, rowsComplete) {
                    _this.AsyncBuildGridRow(rowsComplete, mappings, function () {
                        next();
                    });
                }, mappings.length, function () {
                    onComplete();
                });
            };

            SquareTileMap.prototype.AsyncBuildGridTile = function (row, column, resourceIndex, onComplete) {
                var _this = this;
                var action = function () {
                    var tile, tileGraphic = _this._Resources[resourceIndex];

                    tile = new Map.SquareTile(tileGraphic, _this._grid.TileSize.Width, _this._grid.TileSize.Height);

                    _this._grid.Fill(row, column, tile);

                    _this.OnTileLoad.Trigger({
                        Tile: tile,
                        Row: row,
                        Column: column,
                        ResourceIndex: resourceIndex,
                        Parent: _this
                    }, _this._tilesBuilt / _this._totalTiles);

                    if (_this._staticMap) {
                        _this.CacheTile(tile);
                    }

                    onComplete(tile);
                };

                if (this.TileLoadDelay.Milliseconds > 0) {
                    setTimeout(action, this.TileLoadDelay.Milliseconds);
                } else {
                    action();
                }
            };

            SquareTileMap.prototype.AsyncBuildGridRow = function (rowIndex, mappings, onComplete) {
                var _this = this;
                setTimeout(function () {
                    asyncLoop(function (next, tilesLoaded) {
                        _this._tilesBuilt++;

                        if (mappings[rowIndex][tilesLoaded] >= 0) {
                            _this.AsyncBuildGridTile(rowIndex, tilesLoaded, mappings[rowIndex][tilesLoaded], function (tile) {
                                next();
                            });
                        } else {
                            next();
                        }
                    }, mappings[rowIndex].length, function () {
                        onComplete();
                    });
                }, this.RowLoadDelay.Milliseconds);
            };
            return SquareTileMap;
        })(Map.TileMap);
        Map.SquareTileMap = SquareTileMap;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));

var eg = EndGate;

Number.prototype.Clone = function () {
    return this;
};

var EndGate;
(function (EndGate) {
    (function (Map) {
        (function (Loaders) {
            (function (JSONFormat) {
                JSONFormat[JSONFormat["TMX"] = 0] = "TMX";
            })(Loaders.JSONFormat || (Loaders.JSONFormat = {}));
            var JSONFormat = Loaders.JSONFormat;
        })(Map.Loaders || (Map.Loaders = {}));
        var Loaders = Map.Loaders;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Map) {
        (function (Loaders) {
            (function (_) {
                (function (TMX) {
                    var OrthogonalLoader = (function () {
                        function OrthogonalLoader() {
                        }
                        OrthogonalLoader.prototype.Load = function (data, propertyHooks, onComplete) {
                            var _this = this;
                            var percent = 0, tileCount = 0, onPartialLoad = new EndGate.EventHandler1();

                            this.LoadTilesetSources(data.tilesets, function (tileset) {
                                percent += (1 / data.tilesets.length) * OrthogonalLoader._imagePercentMax;

                                onPartialLoad.Trigger(percent);
                            }, function (tilesetSources) {
                                var resources = _this.ExtractTilesetTiles(data.tilesets, tilesetSources, propertyHooks), mappings, layers = new Array(), layerPercentValue = (1 - OrthogonalLoader._imagePercentMax) / data.layers.length;

                                percent = OrthogonalLoader._imagePercentMax;

                                asyncLoop(function (next, i) {
                                    if (data.layers[i].type !== "tilelayer") {
                                        throw new Error("Invalid layer type.  The layer type '" + data.layers[i].type + "' is not supported.");
                                    }

                                    _this.AsyncBuildLayer(data, i, propertyHooks, resources, function (details, percentLoaded) {
                                        onPartialLoad.Trigger(percent + percentLoaded * layerPercentValue);
                                    }, function (layer) {
                                        percent += layerPercentValue;

                                        onPartialLoad.Trigger(percent);

                                        layers.push(layer);

                                        next();
                                    });
                                }, data.layers.length, function () {
                                    onComplete({
                                        Layers: layers
                                    });
                                });
                            });

                            for (var i = 0; i < data.layers.length; i++) {
                                tileCount += data.layers[i].data.length;
                            }

                            return {
                                TileCount: tileCount,
                                LayerCount: data.layers.length,
                                ResourceSheetCount: data.tilesets.length,
                                OnPercentLoaded: onPartialLoad
                            };
                        };

                        OrthogonalLoader.prototype.LoadTilesetSources = function (tilesets, onTilesetLoad, onComplete) {
                            var tilesetSources = {}, loadedCount = 0, onLoaded = function (source) {
                                onTilesetLoad(source);

                                if (++loadedCount === tilesets.length) {
                                    onComplete(tilesetSources);
                                }
                            };

                            for (var i = 0; i < tilesets.length; i++) {
                                tilesetSources[tilesets[i].name] = new EndGate.Graphics.ImageSource(tilesets[i].image, tilesets[i].imagewidth, tilesets[i].imageheight);
                                tilesetSources[tilesets[i].name].OnLoaded.Bind(onLoaded);
                            }
                        };

                        OrthogonalLoader.prototype.ExtractTilesetTiles = function (tilesets, tilesetSources, propertyHooks) {
                            var tilesetTiles = new Array(), resourceHooks = new Array(), sources, index;

                            tilesets.sort(function (a, b) {
                                return a.firstgid - b.firstgid;
                            });

                            for (var i = 0; i < tilesets.length; i++) {
                                sources = Map.SquareTileMap.ExtractTiles(tilesetSources[tilesets[i].name], tilesets[i].tilewidth, tilesets[i].tileheight);

                                for (var property in tilesets[i].properties) {
                                    if (typeof propertyHooks.ResourceSheetHooks[property] !== "undefined") {
                                        for (var j = tilesets[i].firstgid - 1; j < tilesets[i].firstgid - 1 + sources.length; j++) {
                                            if (typeof resourceHooks[j] === "undefined") {
                                                resourceHooks[j] = new Array();
                                            }

                                            resourceHooks[j].push(this.BuildHookerFunction(tilesets[i].properties[property], propertyHooks.ResourceSheetHooks[property]));
                                        }
                                    }
                                }

                                for (var tileIndex in tilesets[i].tileproperties) {
                                    for (var property in tilesets[i].tileproperties[tileIndex])
                                        if (typeof propertyHooks.ResourceTileHooks[property] !== "undefined") {
                                            index = parseInt(tileIndex) + tilesets[i].firstgid - 1;

                                            if (typeof resourceHooks[index] === "undefined") {
                                                resourceHooks[index] = new Array();
                                            }

                                            resourceHooks[index].push(this.BuildHookerFunction(tilesets[i].tileproperties[tileIndex][property], propertyHooks.ResourceTileHooks[property]));
                                        }
                                }

                                tilesetTiles = tilesetTiles.concat(sources);
                            }

                            return {
                                Resources: tilesetTiles,
                                ResourceHooks: resourceHooks
                            };
                        };

                        OrthogonalLoader.prototype.AsyncBuildLayer = function (tmxData, layerIndex, propertyHooks, resources, onTileLoad, onComplete) {
                            var _this = this;
                            setTimeout(function () {
                                var tmxLayer = tmxData.layers[layerIndex], mappings = _this.NormalizeLayerData(tmxLayer.data, tmxData.width), layer = new Map.SquareTileMap(tmxLayer.x, tmxLayer.y, tmxData.tilewidth, tmxData.tileheight, resources.Resources, mappings), layerHooks = new Array();

                                for (var property in tmxLayer.properties) {
                                    if (typeof propertyHooks.LayerHooks[property] !== "undefined") {
                                        layerHooks.push(_this.BuildHookerFunction(tmxLayer.properties[property], propertyHooks.LayerHooks[property]));
                                    }
                                }

                                layer.ZIndex = layerIndex;
                                layer.Visible = tmxLayer.visible;
                                layer.Opacity = tmxLayer.opacity;

                                layer.RowLoadDelay = EndGate.TimeSpan.FromMilliseconds(5);

                                layer.OnTileLoad.Bind(function (details, percentComplete) {
                                    if (resources.ResourceHooks[details.ResourceIndex]) {
                                        for (var i = 0; i < resources.ResourceHooks[details.ResourceIndex].length; i++) {
                                            resources.ResourceHooks[details.ResourceIndex][i](details);
                                        }
                                    }

                                    for (var i = 0; i < layerHooks.length; i++) {
                                        layerHooks[i](details);
                                    }

                                    onTileLoad(details, percentComplete);
                                });

                                layer.OnLoaded.Bind(function () {
                                    onComplete(layer);
                                });
                            }, 0);
                        };

                        OrthogonalLoader.prototype.BuildHookerFunction = function (propertyValue, fn) {
                            return function (details) {
                                return fn(details, propertyValue);
                            };
                        };

                        OrthogonalLoader.prototype.NormalizeLayerData = function (data, columns) {
                            var normalized = new Array(), index;

                            for (var i = 0; i < data.length; i++) {
                                index = Math.floor(i / columns);

                                if (!(normalized[index] instanceof Array)) {
                                    normalized[index] = new Array();
                                }

                                normalized[index].push(data[i] - 1);
                            }

                            return normalized;
                        };
                        OrthogonalLoader._imagePercentMax = .2;
                        return OrthogonalLoader;
                    })();
                    TMX.OrthogonalLoader = OrthogonalLoader;
                })(_.TMX || (_.TMX = {}));
                var TMX = _.TMX;
            })(Loaders._ || (Loaders._ = {}));
            var _ = Loaders._;
        })(Map.Loaders || (Map.Loaders = {}));
        var Loaders = Map.Loaders;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Map) {
        (function (Loaders) {
            (function (_) {
                (function (TMX) {
                    var TMXLoader = (function () {
                        function TMXLoader() {
                            this._orientationLoaders = {
                                orthogonal: new TMX.OrthogonalLoader()
                            };
                        }
                        TMXLoader.prototype.Load = function (data, propertyHooks, onComplete) {
                            if (!this._orientationLoaders[data.orientation]) {
                                throw new Error("Invalid orientation.  The orientation '" + data.orientation + "' is not supported.");
                            }

                            return this._orientationLoaders[data.orientation].Load(data, propertyHooks, onComplete);
                        };
                        return TMXLoader;
                    })();
                    TMX.TMXLoader = TMXLoader;
                })(_.TMX || (_.TMX = {}));
                var TMX = _.TMX;
            })(Loaders._ || (Loaders._ = {}));
            var _ = Loaders._;
        })(Map.Loaders || (Map.Loaders = {}));
        var Loaders = Map.Loaders;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Map) {
        (function (Loaders) {
            var JSONLoader = (function () {
                function JSONLoader() {
                }
                JSONLoader.Load = function (json, onComplete, propertyHooks, format) {
                    if (typeof format === "undefined") { format = Loaders.JSONFormat.TMX; }
                    if (!propertyHooks) {
                        propertyHooks = {
                            ResourceTileHooks: {},
                            ResourceSheetHooks: {},
                            LayerHooks: {}
                        };
                    }

                    return JSONLoader._loaders[Loaders.JSONFormat[format]].Load(json, propertyHooks, onComplete);
                };
                JSONLoader._loaders = {
                    TMX: new Loaders._.TMX.TMXLoader()
                };
                return JSONLoader;
            })();
            Loaders.JSONLoader = JSONLoader;
        })(Map.Loaders || (Map.Loaders = {}));
        var Loaders = Map.Loaders;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        var Tween = (function () {
            function Tween(from, to, duration, tweeningFunction) {
                this._from = from.Clone();
                this._to = to.Clone();
                this._current = this._from.Clone();
                this._duration = duration;
                this._elapsed = EndGate.TimeSpan.Zero;
                this._playing = false;
                this._onChange = new EndGate.EventHandler1();
                this._onComplete = new EndGate.EventHandler1();
                this._tweeningFunction = tweeningFunction;
            }
            Object.defineProperty(Tween.prototype, "OnChange", {
                get: function () {
                    return this._onChange;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "OnComplete", {
                get: function () {
                    return this._onComplete;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "From", {
                get: function () {
                    return this._from;
                },
                set: function (from) {
                    this._from = from;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "To", {
                get: function () {
                    return this._to;
                },
                set: function (to) {
                    this._to = to;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "Current", {
                get: function () {
                    return this._current;
                },
                set: function (current) {
                    this._current = current;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "Duration", {
                get: function () {
                    return this._duration;
                },
                set: function (duration) {
                    this._duration = duration;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "Elapsed", {
                get: function () {
                    return this._elapsed.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "TweeningFunction", {
                get: function () {
                    return this._tweeningFunction;
                },
                set: function (fn) {
                    this._tweeningFunction = fn;
                },
                enumerable: true,
                configurable: true
            });

            Tween.prototype.IsPlaying = function () {
                return this._playing;
            };

            Tween.prototype.Play = function () {
                this._playing = true;
            };

            Tween.prototype.Pause = function () {
                this._playing = false;
            };

            Tween.prototype.Reset = function () {
                this._elapsed.Milliseconds = 0;
                this._current = this._from.Clone();
            };

            Tween.prototype.Stop = function () {
                this._playing = false;
                this.Reset();
            };

            Tween.prototype.Restart = function () {
                this.Reset();
                this.Play();
            };

            Tween.prototype.Reverse = function () {
                this._elapsed = EndGate.TimeSpan.Zero;
                this._to = this._from;
                this._from = this.Current.Clone();
            };

            Tween.prototype.Update = function (gameTime) {
                if (!this._playing || (this._elapsed.Equivalent(this._duration))) {
                    return;
                }

                this._elapsed = this._elapsed.Add(gameTime.Elapsed);

                if (this._elapsed.Milliseconds >= this._duration.Milliseconds) {
                    this._elapsed = this._duration.Clone();

                    this._current = this._to.Clone();
                    this._playing = false;

                    this._onChange.Trigger(this._current.Clone());
                    this._onComplete.Trigger(this);
                } else {
                    this._UpdateTween();
                    this._onChange.Trigger(this._current.Clone());
                }
            };

            Tween.prototype._UpdateTween = function () {
            };
            return Tween;
        })();
        Tweening.Tween = Tween;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        var NumberTween = (function (_super) {
            __extends(NumberTween, _super);
            function NumberTween(from, to, duration, tweeningFunction) {
                _super.call(this, from, to, duration, tweeningFunction);
            }
            NumberTween.prototype._UpdateTween = function () {
                this.Current = this.TweeningFunction(this.From, this.To, this.Elapsed, this.Duration);
            };
            return NumberTween;
        })(Tweening.Tween);
        Tweening.NumberTween = NumberTween;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        var Size2dTween = (function (_super) {
            __extends(Size2dTween, _super);
            function Size2dTween(from, to, duration, tweeningFunction) {
                _super.call(this, from, to, duration, tweeningFunction);
            }
            Size2dTween.prototype._UpdateTween = function () {
                this.Current = new EndGate.Size2d(this.TweeningFunction(this.From.Width, this.To.Width, this.Elapsed, this.Duration), this.TweeningFunction(this.From.Height, this.To.Height, this.Elapsed, this.Duration));
            };
            return Size2dTween;
        })(Tweening.Tween);
        Tweening.Size2dTween = Size2dTween;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        var Vector2dTween = (function (_super) {
            __extends(Vector2dTween, _super);
            function Vector2dTween(from, to, duration, tweeningFunction) {
                _super.call(this, from, to, duration, tweeningFunction);
            }
            Vector2dTween.prototype._UpdateTween = function () {
                this.Current = new EndGate.Vector2d(this.TweeningFunction(this.From.X, this.To.X, this.Elapsed, this.Duration), this.TweeningFunction(this.From.Y, this.To.Y, this.Elapsed, this.Duration));
            };
            return Vector2dTween;
        })(Tweening.Tween);
        Tweening.Vector2dTween = Vector2dTween;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Back = (function () {
                function Back() {
                }
                Object.defineProperty(Back, "EaseIn", {
                    get: function () {
                        return Back._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Back, "EaseOut", {
                    get: function () {
                        return Back._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Back, "EaseInOut", {
                    get: function () {
                        return Back._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Back._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * ((1.70158 + 1) * elapsedMilliseconds - 1.70158) + from;
                };
                Back._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * ((1.70158 + 1) * elapsedMilliseconds + 1.70158) + 1) + from;
                };
                Back._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, constant = 1.70158;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * (elapsedMilliseconds * elapsedMilliseconds * (((constant *= (1.525)) + 1) * elapsedMilliseconds - constant)) + from;
                    }
                    return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * (((constant *= (1.525)) + 1) * elapsedMilliseconds + constant) + 2) + from;
                };
                return Back;
            })();
            Functions.Back = Back;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Bounce = (function () {
                function Bounce() {
                }
                Object.defineProperty(Bounce, "EaseIn", {
                    get: function () {
                        return Bounce._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Bounce, "EaseOut", {
                    get: function () {
                        return Bounce._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Bounce, "EaseInOut", {
                    get: function () {
                        return Bounce._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Bounce._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from;

                    return change - Bounce.EaseOut(0, change, duration.Subtract(elapsed), duration) + from;
                };
                Bounce._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds) < (1 / 2.75)) {
                        return change * (7.5625 * elapsedMilliseconds * elapsedMilliseconds) + from;
                    } else if (elapsedMilliseconds < (2 / 2.75)) {
                        return change * (7.5625 * (elapsedMilliseconds -= (1.5 / 2.75)) * elapsedMilliseconds + .75) + from;
                    } else if (elapsedMilliseconds < (2.5 / 2.75)) {
                        return change * (7.5625 * (elapsedMilliseconds -= (2.25 / 2.75)) * elapsedMilliseconds + .9375) + from;
                    } else {
                        return change * (7.5625 * (elapsedMilliseconds -= (2.625 / 2.75)) * elapsedMilliseconds + .984375) + from;
                    }
                };
                Bounce._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from;

                    if (elapsed.Milliseconds < duration.Milliseconds / 2) {
                        return Bounce.EaseIn(0, change, elapsed.Multiply(2), duration) * 0.5 + from;
                    } else {
                        return Bounce.EaseOut(0, change, elapsed.Multiply(2).Subtract(duration), duration) * .5 + change * 0.5 + from;
                    }
                };
                return Bounce;
            })();
            Functions.Bounce = Bounce;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Circular = (function () {
                function Circular() {
                }
                Object.defineProperty(Circular, "EaseIn", {
                    get: function () {
                        return Circular._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Circular, "EaseOut", {
                    get: function () {
                        return Circular._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Circular, "EaseInOut", {
                    get: function () {
                        return Circular._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Circular._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change * (Math.sqrt(1 - (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds) - 1) + from;
                };
                Circular._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * Math.sqrt(1 - (elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds) + from;
                };
                Circular._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return -change / 2 * (Math.sqrt(1 - elapsedMilliseconds * elapsedMilliseconds) - 1) + from;
                    }
                    return change / 2 * (Math.sqrt(1 - (elapsedMilliseconds -= 2) * elapsedMilliseconds) + 1) + from;
                };
                return Circular;
            })();
            Functions.Circular = Circular;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Cubic = (function () {
                function Cubic() {
                }
                Object.defineProperty(Cubic, "EaseIn", {
                    get: function () {
                        return Cubic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Cubic, "EaseOut", {
                    get: function () {
                        return Cubic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Cubic, "EaseInOut", {
                    get: function () {
                        return Cubic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Cubic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds + from;
                };
                Cubic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds + 1) + from;
                };
                Cubic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                    }
                    return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds + 2) + from;
                };
                return Cubic;
            })();
            Functions.Cubic = Cubic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Elastic = (function () {
                function Elastic() {
                }
                Object.defineProperty(Elastic, "EaseIn", {
                    get: function () {
                        return Elastic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Elastic, "EaseOut", {
                    get: function () {
                        return Elastic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Elastic, "EaseInOut", {
                    get: function () {
                        return Elastic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Elastic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, timePartial, timePartialQuarter;

                    if (elapsedMilliseconds === 0) {
                        return from;
                    }
                    if ((elapsedMilliseconds /= duration.Milliseconds) === 1) {
                        return from + change;
                    }

                    timePartial = duration.Milliseconds * .3;
                    timePartialQuarter = timePartial / 4;

                    return -(change * Math.pow(2, 10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial)) + from;
                };
                Elastic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, timePartial, timePartialQuarter;

                    if (elapsedMilliseconds === 0) {
                        return from;
                    }

                    if ((elapsedMilliseconds /= duration.Milliseconds) === 1) {
                        return from + change;
                    }

                    timePartial = duration.Milliseconds * .3;
                    timePartialQuarter = timePartial / 4;

                    return (change * Math.pow(2, -10 * elapsedMilliseconds) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial) + change + from);
                };
                Elastic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, timePartial, timePartialQuarter;

                    if (elapsedMilliseconds === 0) {
                        return from;
                    }

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) === 2) {
                        return from + change;
                    }

                    timePartial = duration.Milliseconds * (.3 * 1.5);
                    timePartialQuarter = timePartial / 4;

                    if (elapsedMilliseconds < 1) {
                        return -.5 * (change * Math.pow(2, 10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial)) + from;
                    }
                    return (change * Math.pow(2, -10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial) * .5 + change + from);
                };
                return Elastic;
            })();
            Functions.Elastic = Elastic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Exponential = (function () {
                function Exponential() {
                }
                Object.defineProperty(Exponential, "EaseIn", {
                    get: function () {
                        return Exponential._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Exponential, "EaseOut", {
                    get: function () {
                        return Exponential._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Exponential, "EaseInOut", {
                    get: function () {
                        return Exponential._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Exponential._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return (elapsedMilliseconds == 0) ? from : change * Math.pow(2, 10 * (elapsedMilliseconds / duration.Milliseconds - 1)) + from;
                };
                Exponential._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return (elapsedMilliseconds == duration.Milliseconds) ? from + change : change * (-Math.pow(2, -10 * elapsedMilliseconds / duration.Milliseconds) + 1) + from;
                };
                Exponential._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if (elapsedMilliseconds == 0) {
                        return from;
                    }
                    if (elapsedMilliseconds == duration.Milliseconds) {
                        return from + change;
                    }
                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * Math.pow(2, 10 * (elapsedMilliseconds - 1)) + from;
                    }
                    return change / 2 * (-Math.pow(2, -10 * --elapsedMilliseconds) + 2) + from;
                };
                return Exponential;
            })();
            Functions.Exponential = Exponential;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Linear = (function () {
                function Linear() {
                }
                Object.defineProperty(Linear, "EaseNone", {
                    get: function () {
                        return Linear._easeNone;
                    },
                    enumerable: true,
                    configurable: true
                });
                Linear._easeNone = function (from, to, elapsed, duration) {
                    var change = to - from;

                    return change * elapsed.Milliseconds / duration.Milliseconds + from;
                };
                return Linear;
            })();
            Functions.Linear = Linear;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Quadratic = (function () {
                function Quadratic() {
                }
                Object.defineProperty(Quadratic, "EaseIn", {
                    get: function () {
                        return Quadratic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quadratic, "EaseOut", {
                    get: function () {
                        return Quadratic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quadratic, "EaseInOut", {
                    get: function () {
                        return Quadratic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Quadratic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds + from;
                };
                Quadratic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change * (elapsedMilliseconds /= duration.Milliseconds) * (elapsedMilliseconds - 2) + from;
                };
                Quadratic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * elapsedMilliseconds * elapsedMilliseconds + from;
                    }

                    return -change / 2 * ((--elapsedMilliseconds) * (elapsedMilliseconds - 2) - 1) + from;
                };
                return Quadratic;
            })();
            Functions.Quadratic = Quadratic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Quartic = (function () {
                function Quartic() {
                }
                Object.defineProperty(Quartic, "EaseIn", {
                    get: function () {
                        return Quartic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quartic, "EaseOut", {
                    get: function () {
                        return Quartic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quartic, "EaseInOut", {
                    get: function () {
                        return Quartic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Quartic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                };
                Quartic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds - 1) + from;
                };
                Quartic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                    }
                    return -change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds - 2) + from;
                };
                return Quartic;
            })();
            Functions.Quartic = Quartic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Quintic = (function () {
                function Quintic() {
                }
                Object.defineProperty(Quintic, "EaseIn", {
                    get: function () {
                        return Quintic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quintic, "EaseOut", {
                    get: function () {
                        return Quintic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quintic, "EaseInOut", {
                    get: function () {
                        return Quintic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Quintic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                };
                Quintic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + 1) + from;
                };
                Quintic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                    }
                    return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + 2) + from;
                };
                return Quintic;
            })();
            Functions.Quintic = Quintic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            var Sinusoidal = (function () {
                function Sinusoidal() {
                }
                Object.defineProperty(Sinusoidal, "EaseIn", {
                    get: function () {
                        return Sinusoidal._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Sinusoidal, "EaseOut", {
                    get: function () {
                        return Sinusoidal._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Sinusoidal, "EaseInOut", {
                    get: function () {
                        return Sinusoidal._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Sinusoidal._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change * Math.cos(elapsedMilliseconds / duration.Milliseconds * (Math.PI / 2)) + change + from;
                };
                Sinusoidal._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * Math.sin(elapsedMilliseconds / duration.Milliseconds * (Math.PI / 2)) + from;
                };
                Sinusoidal._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change / 2 * (Math.cos(Math.PI * elapsedMilliseconds / duration.Milliseconds) - 1) + from;
                };
                return Sinusoidal;
            })();
            Functions.Sinusoidal = Sinusoidal;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));

var EndGate;
(function (EndGate) {
    var EventHandler3 = (function () {
        function EventHandler3() {
            this._type = "Event";
            this._actions = [];
        }
        EventHandler3.prototype.Bind = function (action) {
            this._actions.push(action);
        };

        EventHandler3.prototype.BindFor = function (action, triggerCount) {
            var that = this, triggers = 0;

            this._actions.push(function () {
                if (++triggers >= triggerCount) {
                    that.Unbind(action);
                }

                action.apply(this, arguments);
            });
        };

        EventHandler3.prototype.Unbind = function (action) {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    return;
                }
            }
        };

        EventHandler3.prototype.HasBindings = function () {
            return this._actions.length > 0;
        };

        EventHandler3.prototype.Trigger = function (val1, val2, val3) {
            var actions;

            if (this.HasBindings()) {
                actions = this._actions.slice(0);

                for (var i = 0; i < actions.length; i++) {
                    actions[i](val1, val2, val3);
                }
            }
        };
        return EventHandler3;
    })();
    EndGate.EventHandler3 = EventHandler3;
})(EndGate || (EndGate = {}));
