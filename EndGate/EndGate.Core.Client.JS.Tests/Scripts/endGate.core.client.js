var EndGate;
(function (EndGate) {
    (function (Core) {
        var GameTime = (function () {
            function GameTime() {
                this._type = "GameTime";
                this.Now = new Date();
                this._start = this.Now.getTime();
            }
            GameTime.prototype.Update = function () {
                var now = new Date(), nowMs = now.getTime();
                this.Elapsed = nowMs - this.Now.getTime();
                this.Total = nowMs - this._start;
                this.Now = now;
            };
            return GameTime;
        })();
        Core.GameTime = GameTime;        
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Utilities) {
            var LooperCallback = (function () {
                function LooperCallback(fps, callback) {
                    this._type = "LooperCallback";
                    this.Fps = fps;
                    this.Callback = callback;
                    this.TimeoutID = 0;
                    this.ID = LooperCallback._ids++;
                }
                LooperCallback._ids = 0;
                return LooperCallback;
            })();
            Utilities.LooperCallback = LooperCallback;            
        })(Core.Utilities || (Core.Utilities = {}));
        var Utilities = Core.Utilities;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Utilities) {
            var Looper = (function () {
                function Looper() {
                    this._type = "Looper";
                    this._running = false;
                    this._callbacks = [];
                }
                Looper.prototype.AddCallback = function (looperCallback) {
                    this._callbacks.push(looperCallback);
                    if(this._running) {
                        this.Loop(looperCallback);
                    }
                };
                Looper.prototype.RemoveCallback = function (looperCallback) {
                    var callbackFound = false, i;
                    for(i = 0; i < this._callbacks.length; i++) {
                        if(this._callbacks[i].ID === looperCallback.ID) {
                            callbackFound = true;
                            break;
                        }
                    }
                    if(callbackFound) {
                        window.clearTimeout(looperCallback.TimeoutID);
                        this._callbacks.splice(i, 1);
                    } else {
                        throw new Error("Callback does not exist.");
                    }
                };
                Looper.prototype.Start = function () {
                    this._running = true;
                    this.Run();
                };
                Looper.prototype.Run = function () {
                    for(var i = 0; i < this._callbacks.length; i++) {
                        this.Loop(this._callbacks[i]);
                    }
                };
                Looper.prototype.Loop = function (looperCallback) {
                    var that = this, msTimer = 1000 / looperCallback.Fps;
                    looperCallback.Callback();
                    looperCallback.TimeoutID = window.setTimeout(function () {
                        that.Loop(looperCallback);
                    }, msTimer);
                };
                Looper.prototype.Dispose = function () {
                    for(var i = this._callbacks.length - 1; i >= 0; i--) {
                        this.RemoveCallback(this._callbacks[i]);
                    }
                    this._callbacks = [];
                    this._running = false;
                };
                return Looper;
            })();
            Utilities.Looper = Looper;            
        })(Core.Utilities || (Core.Utilities = {}));
        var Utilities = Core.Utilities;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        var GameConfiguration = (function () {
            function GameConfiguration(updateRateSetter) {
                this._defaultUpdateRate = 40;
                this._updateRateSetter = updateRateSetter;
                this.UpdateRate(this._defaultUpdateRate);
            }
            GameConfiguration.prototype.UpdateRate = function (updateRate) {
                if(typeof updateRate !== "undefined") {
                    this._updateRate = updateRate;
                    this._updateRateSetter(this._updateRate);
                } else {
                    return this._updateRate;
                }
            };
            return GameConfiguration;
        })();
        Core.GameConfiguration = GameConfiguration;        
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        var Game = (function () {
            function Game() {
                this._type = "Game";
                this._gameTime = new Core.GameTime();
                this.ID = Game._gameIds++;
                this.Configuration = new Core.GameConfiguration(GameRunnerInstance.Register(this));
            }
            Game._gameIds = 0;
            Game.prototype.PrepareUpdate = function () {
                this._gameTime.Update();
                this.Update(this._gameTime);
            };
            Game.prototype.Update = function (gameTime) {
            };
            Game.prototype.Dispose = function () {
                GameRunnerInstance.Unregister(this);
            };
            return Game;
        })();
        Core.Game = Game;        
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Core) {
        var GameRunner = (function () {
            function GameRunner() {
                this._type = "GameRunner";
                this._callbacks = {
                };
                this._gameLoop = null;
                this._callbackCount = 0;
            }
            GameRunner.prototype.Register = function (game) {
                var updateCallback = this.CreateAndCacheCallback(game);
                this.TryLoopStart();
                this._gameLoop.AddCallback(updateCallback);
                return this.CreateUpdateRateSetter(updateCallback);
            };
            GameRunner.prototype.Unregister = function (game) {
                var updateCallback;
                if(this._callbacks[game.ID]) {
                    updateCallback = this._callbacks[game.ID];
                    this._gameLoop.RemoveCallback(updateCallback);
                    delete this._callbacks[game.ID];
                    this._callbackCount--;
                    this.TryLoopStop();
                }
            };
            GameRunner.prototype.TryLoopStart = function () {
                if(this._callbackCount === 1) {
                    this._gameLoop = new Core.Utilities.Looper();
                    this._gameLoop.Start();
                }
            };
            GameRunner.prototype.TryLoopStop = function () {
                if(this._callbackCount === 0 && this._gameLoop != null) {
                    this._gameLoop.Dispose();
                    this._gameLoop = null;
                }
            };
            GameRunner.prototype.CreateAndCacheCallback = function (game) {
                var updateCallback = new Core.Utilities.LooperCallback(0, function () {
                    game.PrepareUpdate();
                });
                this._callbacks[game.ID] = updateCallback;
                this._callbackCount++;
                return updateCallback;
            };
            GameRunner.prototype.CreateUpdateRateSetter = function (callback) {
                return function (updateRate) {
                    callback.Fps = updateRate;
                };
            };
            return GameRunner;
        })();
        Core.GameRunner = GameRunner;        
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var GameRunnerInstance = new EndGate.Core.GameRunner();
Math.roundTo = function (val, decimals) {
    var multiplier = Math.pow(10, decimals);
    return Math.round(val * multiplier) / multiplier;
};
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Assets) {
            var Vector2d = (function () {
                function Vector2d(x, y) {
                    this._type = "Vector2d";
                    this.X = x || 0;
                    this.Y = y || 0;
                }
                Vector2d.Zero = function Zero() {
                    return new Vector2d(0, 0);
                };
                Vector2d.One = function One() {
                    return new Vector2d(1, 1);
                };
                Vector2d.prototype.ProjectOnto = function (v) {
                    return v.Multiply(this.Dot(v) / v.Dot(v));
                };
                Vector2d.prototype.RotateAround = function (point, angle, precision) {
                    if (typeof precision === "undefined") { precision = 2; }
                    var ca = Math.cos(-angle);
                    var sa = Math.sin(-angle);
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
                Vector2d.prototype.Dot = function (v1) {
                    return v1.X * this.X + v1.Y * this.Y;
                };
                Vector2d.prototype.Abs = function () {
                    return new Vector2d(Math.abs(this.X), Math.abs(this.Y));
                };
                Vector2d.prototype.Sign = function () {
                    return new Vector2d(this.X / Math.abs(this.X), this.Y / Math.abs(this.Y));
                };
                Vector2d.prototype.Distance = function (v1) {
                    return new Vector2d(Math.abs(v1.X - this.X), Math.abs(v1.Y - this.Y));
                };
                Vector2d.prototype.Add = function (val) {
                    if(val._type === "Vector2d") {
                        return new Vector2d(this.X + val.X, this.Y + val.Y);
                    } else {
                        return new Vector2d(this.X + val, this.Y + val);
                    }
                };
                Vector2d.prototype.Multiply = function (val) {
                    if(val._type === "Vector2d") {
                        return new Vector2d(this.X * val.X, this.Y * val.Y);
                    } else {
                        return new Vector2d(this.X * val, this.Y * val);
                    }
                };
                Vector2d.prototype.Subtract = function (val) {
                    if(val._type === "Vector2d") {
                        return new Vector2d(this.X - val.X, this.Y - val.Y);
                    } else {
                        return new Vector2d(this.X - val, this.Y - val);
                    }
                };
                Vector2d.prototype.SubtractFrom = function (val) {
                    if(val._type === "Vector2d") {
                        return new Vector2d(val.X - this.X, val.Y - this.Y);
                    } else {
                        return new Vector2d(val - this.X, val - this.Y);
                    }
                };
                Vector2d.prototype.Divide = function (val) {
                    if(val._type === "Vector2d") {
                        return new Vector2d(this.X / val.X, this.Y / val.Y);
                    } else {
                        return new Vector2d(this.X / val, this.Y / val);
                    }
                };
                Vector2d.prototype.DivideFrom = function (val) {
                    if(val._type === "Vector2d") {
                        return new Vector2d(val.X / this.X, val.Y / this.Y);
                    } else {
                        return new Vector2d(val / this.X, val / this.Y);
                    }
                };
                Vector2d.prototype.Negate = function () {
                    return new Vector2d(this.X * -1, this.Y * -1);
                };
                Vector2d.prototype.Equivalent = function (v) {
                    return this.X === v.X && this.Y === v.Y;
                };
                Vector2d.prototype.Clone = function () {
                    return new Vector2d(this.X, this.Y);
                };
                Vector2d.prototype.toString = function () {
                    return "(" + this.X + ", " + this.Y + ")";
                };
                return Vector2d;
            })();
            Assets.Vector2d = Vector2d;            
        })(Core.Assets || (Core.Assets = {}));
        var Assets = Core.Assets;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
Number.prototype._type = "Number";
String.prototype._type = "String";
Boolean.prototype._type = "Boolean";
Array.prototype._type = "Array";
Date.prototype._type = "Date";
Object.prototype._type = "Object";
Error.prototype._type = "Error";
