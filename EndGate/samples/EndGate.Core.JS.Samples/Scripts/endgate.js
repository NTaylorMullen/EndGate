var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    var GameTime = (function () {
        function GameTime() {
            this._type = "GameTime";
            this.Now = new Date();
            this._start = this.Now.getTime();
        }
        GameTime.prototype.Update = function () {
            var now = new Date(), nowMs = now.getTime();
            this.Elapsed = nowMs - this.Now.getTime();
            this.ElapsedSecond = this.Elapsed / 1000;
            this.Total = nowMs - this._start;
            this.Now = now;
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
        Size2d.Zero = function Zero() {
            return new Size2d(0, 0);
        };
        Size2d.One = function One() {
            return new Size2d(1, 1);
        };
        Size2d.prototype.Radius = function () {
            return .5 * Math.sqrt(this.Width * this.Width + this.Height * this.Height);
        };
        Size2d.prototype.HalfWidth = function () {
            return this.Width / 2;
        };
        Size2d.prototype.HalfHeight = function () {
            return this.Height / 2;
        };
        Size2d.prototype.Apply = function (action) {
            this.Width = action(this.Width);
            this.Height = action(this.Height);
        };
        Size2d.prototype.Trigger = function (action) {
            action(this.Width);
            action(this.Height);
        };
        Size2d.prototype.Add = function (val) {
            if(val._type === "Size2d") {
                return new Size2d(this.Width + val.Width, this.Height + val.Height);
            } else if(val._type === "Vector2d") {
                return new Size2d(this.Width + val.X, this.Height + val.Y);
            } else {
                return new Size2d(this.Width + val, this.Height + val);
            }
        };
        Size2d.prototype.Multiply = function (val) {
            if(val._type === "Size2d") {
                return new Size2d(this.Width * val.Width, this.Height * val.Height);
            } else if(val._type === "Vector2d") {
                return new Size2d(this.Width * val.X, this.Height * val.Y);
            } else {
                return new Size2d(this.Width * val, this.Height * val);
            }
        };
        Size2d.prototype.Subtract = function (val) {
            if(val._type === "Size2d") {
                return new Size2d(this.Width - val.Width, this.Height - val.Height);
            } else if(val._type === "Vector2d") {
                return new Size2d(this.Width - val.X, this.Height - val.Y);
            } else {
                return new Size2d(this.Width - val, this.Height - val);
            }
        };
        Size2d.prototype.SubtractFrom = function (val) {
            if(val._type === "Size2d") {
                return new Size2d(val.Width - this.Width, val.Height - this.Height);
            } else if(val._type === "Vector2d") {
                return new Size2d(val.X - this.Width, val.Y - this.Height);
            } else {
                return new Size2d(val - this.Width, val - this.Height);
            }
        };
        Size2d.prototype.Divide = function (val) {
            if(val._type === "Size2d") {
                return new Size2d(this.Width / val.Width, this.Height / val.Height);
            } else if(val._type === "Vector2d") {
                return new Size2d(this.Width / val.X, this.Height / val.Y);
            } else {
                return new Size2d(this.Width / val, this.Height / val);
            }
        };
        Size2d.prototype.DivideFrom = function (val) {
            if(val._type === "Size2d") {
                return new Size2d(val.Width / this.Width, val.Height / this.Height);
            } else if(val._type === "Vector2d") {
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
        Vector2d.Zero = function Zero() {
            return new Vector2d(0, 0);
        };
        Vector2d.One = function One() {
            return new Vector2d(1, 1);
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
        Vector2d.prototype.Distance = function (vector) {
            return new Vector2d(Math.abs(vector.X - this.X), Math.abs(vector.Y - this.Y));
        };
        Vector2d.prototype.Add = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(this.X + val.X, this.Y + val.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(this.X + val.Width, this.Y + val.Height);
            } else {
                return new Vector2d(this.X + val, this.Y + val);
            }
        };
        Vector2d.prototype.Multiply = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(this.X * val.X, this.Y * val.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(this.X * val.Width, this.Y * val.Height);
            } else {
                return new Vector2d(this.X * val, this.Y * val);
            }
        };
        Vector2d.prototype.Subtract = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(this.X - val.X, this.Y - val.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(this.X - val.Width, this.Y - val.Height);
            } else {
                return new Vector2d(this.X - val, this.Y - val);
            }
        };
        Vector2d.prototype.SubtractFrom = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(val.X - this.X, val.Y - this.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(val.Width - this.X, val.Height = this.Y);
            } else {
                return new Vector2d(val - this.X, val - this.Y);
            }
        };
        Vector2d.prototype.Divide = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(this.X / val.X, this.Y / val.Y);
            } else if(val._type === "Size2d") {
                return new Vector2d(this.X / val.Width, this.Y / val.Height);
            } else {
                return new Vector2d(this.X / val, this.Y / val);
            }
        };
        Vector2d.prototype.DivideFrom = function (val) {
            if(val._type === "Vector2d") {
                return new Vector2d(val.X / this.X, val.Y / this.Y);
            } else if(val._type === "Size2d") {
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
        (function (Abstractions) {
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
                Bounds2d.prototype.Intersects = function (obj) {
                    if(obj._boundsType === "BoundingCircle") {
                        return this.IntersectsCircle(obj);
                    } else if(obj._boundsType === "BoundingRectangle") {
                        return this.IntersectsRectangle(obj);
                    } else {
                        throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle");
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
            Abstractions.Bounds2d = Bounds2d;            
        })(Bounds.Abstractions || (Bounds.Abstractions = {}));
        var Abstractions = Bounds.Abstractions;
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
                    if(this._running) {
                        window.setTimeout(function () {
                            _this.Loop(timedCallback);
                        }, 0);
                    }
                };
                Looper.prototype.RemoveCallback = function (timedCallback) {
                    for(var i = 0; i < this._callbacks.length; i++) {
                        if(this._callbacks[i].ID === timedCallback.ID) {
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
                    for(var i = 0; i < this._callbacks.length; i++) {
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
                    if(timedCallback.Active) {
                        timedCallback.TimeoutID = window.setTimeout(function () {
                            that.Loop(timedCallback);
                        }, msTimer);
                    }
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
                    if(this._running) {
                        this._callbacksModified = false;
                        for(var i = 0; i < this._callbacks.length; i++) {
                            this._callbacks[i].Callback();
                            if(this._callbacksModified) {
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
                    for(var i = 0; i < this._callbacks.length; i++) {
                        if(this._callbacks[i].ID === looperCallback.ID) {
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
                this._updateCallbacks = {
                };
                this._drawCallbacks = {
                };
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
                if(this._updateCallbacks[game.ID]) {
                    updateCallback = this._updateCallbacks[game.ID];
                    drawCallback = this._drawCallbacks[game.ID];
                    this._updateLoop.RemoveCallback(updateCallback);
                    this._drawLoop.RemoveCallback(drawCallback);
                    delete this._updateCallbacks[game.ID];
                    delete this._drawCallbacks[game.ID];
                    this._callbackCount--;
                    this.TryLoopStop();
                }
            };
            GameRunner.prototype.TryLoopStart = function () {
                if(this._callbackCount === 1) {
                    this._updateLoop = new _.Loopers.Looper();
                    this._updateLoop.Start();
                    this._drawLoop = new _.Loopers.RepaintLooper();
                    this._drawLoop.Start();
                }
            };
            GameRunner.prototype.TryLoopStop = function () {
                if(this._callbackCount === 0 && this._updateLoop != null) {
                    this._updateLoop.Dispose();
                    this._updateLoop = null;
                    this._drawLoop.Dispose();
                    this._drawLoop = null;
                }
            };
            GameRunner.prototype.CreateAndCacheUpdateCallback = function (game) {
                var updateCallback = new _.Loopers.TimedCallback(0, function () {
                    game.PrepareUpdate();
                });
                this._updateCallbacks[game.ID] = updateCallback;
                return updateCallback;
            };
            GameRunner.prototype.CreateAndCacheDrawCallback = function (game) {
                var drawCallback = new _.Loopers.LooperCallback(function () {
                    game.PrepareDraw();
                });
                this._drawCallbacks[game.ID] = drawCallback;
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
    EndGate.GameConfiguration = GameConfiguration;    
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    var EventHandler = (function () {
        function EventHandler() {
            this._type = "Event";
            this._actions = [];
            this._hasBindings = false;
        }
        EventHandler.prototype.Bind = function (action) {
            this._actions.push(action);
            this._hasBindings = true;
        };
        EventHandler.prototype.Unbind = function (action) {
            for(var i = 0; i < this._actions.length; i++) {
                if(this._actions[i] === action) {
                    this._actions.splice(i, 1);
                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        };
        EventHandler.prototype.HasBindings = function () {
            return this._hasBindings;
        };
        EventHandler.prototype.Trigger = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            for(var i = 0; i < this._actions.length; i++) {
                this._actions[i].apply(this, args);
            }
        };
        return EventHandler;
    })();
    EndGate.EventHandler = EventHandler;    
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Collision) {
        (function (Assets) {
            var CollisionData = (function () {
                function CollisionData(at, w) {
                    this.At = at;
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
                this.OnCollision = new EndGate.EventHandler();
                this.OnDisposed = new EndGate.EventHandler();
            }
            Collidable._collidableIDs = 0;
            Collidable.prototype.IsCollidingWith = function (other) {
                return this.Bounds.Intersects(other.Bounds);
            };
            Collidable.prototype.Collided = function (data) {
                this.OnCollision.Trigger(data);
            };
            Collidable.prototype.Dispose = function () {
                if(!this._disposed) {
                    this._disposed = true;
                    this.OnDisposed.Trigger(this);
                } else {
                    throw new Error("Cannot dispose collidable more than once.");
                }
            };
            return Collidable;
        })();
        Collision.Collidable = Collidable;        
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Collision) {
        var CollisionManager = (function () {
            function CollisionManager() {
                this._type = "CollisionManager";
                this._collidables = [];
                this._enabled = false;
                this.OnCollision = new EndGate.EventHandler();
            }
            CollisionManager.prototype.Monitor = function (obj) {
                var _this = this;
                this._enabled = true;
                obj.OnDisposed.Bind(function () {
                    _this.Unmonitor(obj);
                });
                this._collidables.push(obj);
            };
            CollisionManager.prototype.Unmonitor = function (obj) {
                for(var i = 0; i < this._collidables.length; i++) {
                    if(this._collidables[i]._id === obj._id) {
                        this._collidables.splice(i, 1);
                        break;
                    }
                }
            };
            CollisionManager.prototype.Update = function (gameTime) {
                var first, second;
                if(this._enabled) {
                    for(var i = 0; i < this._collidables.length; i++) {
                        first = this._collidables[i];
                        for(var j = i + 1; j < this._collidables.length; j++) {
                            second = this._collidables[j];
                            if(first.IsCollidingWith(second)) {
                                first.Collided(new Collision.Assets.CollisionData(first.Bounds.Position.Clone(), second));
                                second.Collided(new Collision.Assets.CollisionData(second.Bounds.Position.Clone(), first));
                                this.OnCollision.Trigger(first, second);
                            }
                        }
                    }
                }
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
            var Graphic2dState = (function () {
                function Graphic2dState() {
                    this._type = "Graphic2dState";
                    this._cachedState = {
                    };
                }
                Graphic2dState.prototype.StrokeStyle = function (value) {
                    return this.GetOrSetCache("strokeStyle", value);
                };
                Graphic2dState.prototype.FillStyle = function (value) {
                    return this.GetOrSetCache("fillStyle", value);
                };
                Graphic2dState.prototype.GlobalAlpha = function (value) {
                    return this.GetOrSetCache("globalAlpha", value);
                };
                Graphic2dState.prototype.LineWidth = function (value) {
                    return this.GetOrSetCache("lineWidth", value);
                };
                Graphic2dState.prototype.LineCap = function (value) {
                    return this.GetOrSetCache("lineCap", value);
                };
                Graphic2dState.prototype.LineJoin = function (value) {
                    return this.GetOrSetCache("lineJoin", value);
                };
                Graphic2dState.prototype.MiterLimit = function (value) {
                    return this.GetOrSetCache("miterLimit", value);
                };
                Graphic2dState.prototype.ShadowOffsetX = function (value) {
                    return this.GetOrSetCache("shadowOffsetX", value);
                };
                Graphic2dState.prototype.ShadowOffsetY = function (value) {
                    return this.GetOrSetCache("shadowOffsetY", value);
                };
                Graphic2dState.prototype.ShadowBlur = function (value) {
                    return this.GetOrSetCache("shadowBlur", value);
                };
                Graphic2dState.prototype.ShadowColor = function (value) {
                    return this.GetOrSetCache("shadowColor", value);
                };
                Graphic2dState.prototype.GlobalCompositeOperation = function (value) {
                    return this.GetOrSetCache("globalCompositeOperation", value);
                };
                Graphic2dState.prototype.Font = function (value) {
                    return this.GetOrSetCache("font", value);
                };
                Graphic2dState.prototype.TextAlign = function (value) {
                    return this.GetOrSetCache("textAlign", value);
                };
                Graphic2dState.prototype.TextBaseline = function (value) {
                    return this.GetOrSetCache("textBaseline", value);
                };
                Graphic2dState.prototype.SetContextState = function (context) {
                    for(var key in this._cachedState) {
                        context[key] = this._cachedState[key];
                    }
                };
                Graphic2dState.prototype.GetOrSetCache = function (property, value) {
                    if(typeof value !== "undefined") {
                        this._cachedState[property] = value;
                    }
                    return this._cachedState[property];
                };
                return Graphic2dState;
            })();
            Assets.Graphic2dState = Graphic2dState;            
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Abstractions) {
            var Graphic2d = (function () {
                function Graphic2d(position) {
                    this._type = "Graphic2d";
                    this.Position = position;
                    this.Rotation = 0;
                    this.ZIndex = 0;
                    this.State = new Graphics.Assets.Graphic2dState();
                    this._children = [];
                }
                Graphic2d._zindexSort = function (a, b) {
                    return a.ZIndex - b.ZIndex;
                };
                Graphic2d.prototype.AddChild = function (graphic) {
                    this._children.push(graphic);
                    this._children.sort(Graphic2d._zindexSort);
                };
                Graphic2d.prototype.RemoveChild = function (graphic) {
                    var index = this._children.indexOf(graphic);
                    if(index >= 0) {
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
                    this.State.SetContextState(context);
                    context.translate(this.Position.X, this.Position.Y);
                    if(this.Rotation !== 0) {
                        context.rotate(this.Rotation);
                    }
                };
                Graphic2d.prototype._EndDraw = function (context) {
                    for(var i = 0; i < this._children.length; i++) {
                        this._children[i].Draw(context);
                    }
                    context.restore();
                };
                Graphic2d.prototype.Draw = function (context) {
                };
                Graphic2d.prototype.GetDrawBounds = function () {
                    throw new Error("GetDrawBounds is abstract, it must be implemented.");
                };
                return Graphic2d;
            })();
            Abstractions.Graphic2d = Graphic2d;            
        })(Graphics.Abstractions || (Graphics.Abstractions = {}));
        var Abstractions = Graphics.Abstractions;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
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
            function Vector2dHelpers() { }
            Vector2dHelpers.GetMinMaxProjections = function GetMinMaxProjections(axis, vertices) {
                var min = vertices[0].ProjectOnto(axis).Dot(axis);
                var max = min;
                for(var i = 1; i < vertices.length; i++) {
                    var vertex = vertices[i];
                    var value = vertex.ProjectOnto(axis).Dot(axis);
                    if(value < min) {
                        min = value;
                    } else if(value > max) {
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
                var foo = new BoundingCircle(EndGate.Vector2d.Zero(), 3);
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
                if(circleDistance.X > (rectangle.Size.HalfWidth() + this.Radius)) {
                    return false;
                }
                if(circleDistance.Y > (rectangle.Size.HalfHeight() + this.Radius)) {
                    return false;
                }
                if(circleDistance.X <= (rectangle.Size.HalfWidth())) {
                    return true;
                }
                if(circleDistance.Y <= (rectangle.Size.HalfHeight())) {
                    return true;
                }
                var cornerDistance_sq = Math.pow(circleDistance.X - rectangle.Size.HalfWidth(), 2) + Math.pow(circleDistance.Y - rectangle.Size.HalfHeight(), 2);
                return (cornerDistance_sq <= (this.Radius * this.Radius));
            };
            BoundingCircle.prototype.ContainsPoint = function (point) {
                return this.Position.Distance(point).Magnitude() < this.Radius;
            };
            return BoundingCircle;
        })(Bounds.Abstractions.Bounds2d);
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
            BoundingRectangle.prototype.Vertices = function () {
                return [
                    this.TopLeft(), 
                    this.TopRight(), 
                    this.BotLeft(), 
                    this.BotRight()
                ];
            };
            BoundingRectangle.prototype.TopLeft = function () {
                var v = new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight());
                if(this.Rotation === 0) {
                    return v;
                }
                return v.RotateAround(this.Position, this.Rotation);
            };
            BoundingRectangle.prototype.TopRight = function () {
                var v = new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight());
                if(this.Rotation === 0) {
                    return v;
                }
                return v.RotateAround(this.Position, this.Rotation);
            };
            BoundingRectangle.prototype.BotLeft = function () {
                var v = new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth(), this.Position.Y + this.Size.HalfHeight());
                if(this.Rotation === 0) {
                    return v;
                }
                return v.RotateAround(this.Position, this.Rotation);
            };
            BoundingRectangle.prototype.BotRight = function () {
                var v = new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth(), this.Position.Y + this.Size.HalfHeight());
                if(this.Rotation === 0) {
                    return v;
                }
                return v.RotateAround(this.Position, this.Rotation);
            };
            BoundingRectangle.prototype.IntersectsCircle = function (circle) {
                return circle.IntersectsRectangle(this);
            };
            BoundingRectangle.prototype.IntersectsRectangle = function (rectangle) {
                if(this.Rotation === 0 && rectangle.Rotation === 0) {
                    var myTopLeft = this.TopLeft(), myBotRight = this.BotRight(), theirTopLeft = rectangle.TopLeft(), theirBotRight = rectangle.BotRight();
                    return theirTopLeft.X <= myBotRight.X && theirBotRight.X >= myTopLeft.X && theirTopLeft.Y <= myBotRight.Y && theirBotRight.Y >= myTopLeft.Y;
                } else if(rectangle.Position.Distance(this.Position).Magnitude() <= rectangle.Size.Radius() + this.Size.Radius()) {
                    var axisList = [
                        this.TopRight().Subtract(this.TopLeft()), 
                        this.TopRight().Subtract(this.BotRight()), 
                        rectangle.TopLeft().Subtract(rectangle.BotLeft()), 
                        rectangle.TopLeft().Subtract(rectangle.TopRight())
                    ];
                    var myVertices = this.Vertices();
                    var theirVertices = rectangle.Vertices();
                    for(var i = 0; i < axisList.length; i++) {
                        var axi = axisList[i];
                        var myProjections = EndGate._.Vector2dHelpers.GetMinMaxProjections(axi, myVertices);
                        var theirProjections = EndGate._.Vector2dHelpers.GetMinMaxProjections(axi, theirVertices);
                        if(theirProjections.Max < myProjections.Min || myProjections.Max < theirProjections.Min) {
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            };
            BoundingRectangle.prototype.ContainsPoint = function (point) {
                var savedRotation = this.Rotation;
                if(this.Rotation !== 0) {
                    this.Rotation = 0;
                    point = point.RotateAround(this.Position, -savedRotation);
                }
                var myTopLeft = this.TopLeft(), myBotRight = this.BotRight();
                this.Rotation = savedRotation;
                return point.X <= myBotRight.X && point.X >= myTopLeft.X && point.Y <= myBotRight.Y && point.Y >= myTopLeft.Y;
            };
            return BoundingRectangle;
        })(Bounds.Abstractions.Bounds2d);
        Bounds.BoundingRectangle = BoundingRectangle;        
    })(EndGate.Bounds || (EndGate.Bounds = {}));
    var Bounds = EndGate.Bounds;
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
            Camera2d.DefaultDistance = 1000;
            Camera2d.prototype.GetDistanceScale = function () {
                return this.Distance / Camera2d.DefaultDistance;
            };
            Camera2d.prototype.ToCameraRelative = function (position) {
                var scaledTopLeft = this.Position.Subtract(this.Size.Multiply(this.GetDistanceScale() * .5));
                return scaledTopLeft.Add(position.Multiply(this.GetDistanceScale()));
            };
            Camera2d.prototype.GetInverseDistanceScale = function () {
                return Camera2d.DefaultDistance / this.Distance;
            };
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
                this._bufferCanvas = document.createElement("canvas");
                this._bufferContext = this._bufferCanvas.getContext("2d");
                this.OnRendererSizeChange = new EndGate.EventHandler();
                this.UpdateBufferSize();
                this._disposed = false;
            }
            Renderer2d._zindexSort = function (a, b) {
                return a.ZIndex - b.ZIndex;
            };
            Renderer2d.prototype.Render = function (renderables) {
                if(this._bufferCanvas.width !== this._visibleCanvas.width || this._bufferCanvas.height !== this._visibleCanvas.height) {
                    this.UpdateBufferSize();
                }
                this._visibleContext.clearRect(0, 0, this._visibleCanvas.width, this._visibleCanvas.height);
                this._visibleContext.drawImage(this._bufferCanvas, 0, 0);
                this._ClearBuffer();
                renderables.sort(Renderer2d._zindexSort);
                for(var i = 0; i < renderables.length; i++) {
                    renderables[i].Draw(this._bufferContext);
                }
                return this._bufferContext;
            };
            Renderer2d.prototype.Dispose = function () {
                if(!this._disposed) {
                    this._disposed = true;
                    this._visibleCanvas.parentNode.removeChild(this._visibleCanvas);
                }
            };
            Renderer2d.prototype._ClearBuffer = function () {
                this._bufferContext.clearRect(0, 0, this._bufferCanvas.width, this._bufferCanvas.height);
            };
            Renderer2d.prototype.UpdateBufferSize = function () {
                this._bufferCanvas.width = this._visibleCanvas.width;
                this._bufferCanvas.height = this._visibleCanvas.height;
                this.OnRendererSizeChange.Trigger(new EndGate.Size2d(this._visibleCanvas.width, this._visibleCanvas.height));
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
                Camera2dCanvasContextBuilder.prototype.BuildFrom = function (context) {
                    var that = this, savedCreateRadialGradient = context.createRadialGradient, savedTranslate = context.translate, savedSave = context.save, savedRestore = context.restore, savedDrawImage1 = this.BuildPositionReplacer(context.drawImage, 1), savedDrawImage2 = this.BuildPositionReplacer(context.drawImage, 5);
                    (context).unModifiedClearRect = context.clearRect;
                    context.arc = this.BuildPositionReplacer(context.arc);
                    context.arcTo = this.BuildPositionReplacer(context.arcTo, 0, 4);
                    context.bezierCurveTo = this.BuildPositionReplacer(context.bezierCurveTo, 0, 6);
                    context.clearRect = this.BuildPositionReplacer(context.clearRect);
                    context.createLinearGradient = this.BuildPositionReplacer(context.createLinearGradient, 0, 4);
                    context.createRadialGradient = function () {
                        var scale = that._camera.GetDistanceScale();
                        arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                        arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                        arguments[3] += -that._camera.Position.X + that._canvasCenter.X * scale;
                        arguments[4] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                        return savedCreateRadialGradient.apply(this, arguments);
                    };
                    context.drawImage = function () {
                        if(arguments.length <= 5) {
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
                        if(!that._translated) {
                            scale = that._camera.GetDistanceScale();
                            arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                            arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                        }
                        that._translated = true;
                        savedTranslate.apply(this, arguments);
                    };
                    return context;
                };
                Camera2dCanvasContextBuilder.prototype.UpdateCanvasCenter = function (newSize) {
                    this._canvasCenter.X = newSize.Width / 2;
                    this._canvasCenter.Y = newSize.Height / 2;
                };
                Camera2dCanvasContextBuilder.prototype.BuildPositionReplacer = function (replacee, positionArgOffset, argCount) {
                    if (typeof positionArgOffset === "undefined") { positionArgOffset = 0; }
                    if (typeof argCount === "undefined") { argCount = 2; }
                    var that = this, axiList = [
                        "X", 
                        "Y"
                    ];
                    return function () {
                        var scale, axi;
                        if(!that._translated) {
                            scale = that._camera.GetDistanceScale();
                            for(var i = 0; i < argCount; i++) {
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
                this.OnRendererSizeChange.Bind(this._contextBuilder.UpdateCanvasCenter);
                this._contextBuilder.UpdateCanvasCenter(new EndGate.Size2d(renderOnto.width, renderOnto.height));
                this._bufferContext = this._contextBuilder.BuildFrom(this._bufferContext);
            }
            Camera2dRenderer.prototype.Render = function (renderables) {
                var context, inverseScale = this._camera.GetInverseDistanceScale();
                this._bufferContext.save();
                this._bufferContext.scale(inverseScale, inverseScale);
                context = _super.prototype.Render.call(this, this.GetOnScreenRenderables(renderables));
                this._bufferContext.restore();
                return context;
            };
            Camera2dRenderer.prototype._ClearBuffer = function () {
                var cameraScale = this._camera.GetDistanceScale();
                (this._bufferContext).unModifiedClearRect(0, 0, this._bufferCanvas.width * cameraScale, this._bufferCanvas.height * cameraScale);
            };
            Camera2dRenderer.prototype.GetOnScreenRenderables = function (allRenderables) {
                var onscreen = [], scale = this._camera.GetDistanceScale(), unscale = 1 / scale;
                this._camera.Scale(scale, scale);
                for(var i = 0; i < allRenderables.length; i++) {
                    if(this._camera.Intersects(allRenderables[i].GetDrawBounds())) {
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
            function Scene2d(drawArea, onDraw) {
                this._actors = [];
                if(typeof drawArea === "undefined") {
                    drawArea = this.CreateDefaultDrawArea();
                }
                if(typeof onDraw === "undefined") {
                    this._onDraw = function (_) {
                    };
                } else {
                    this._onDraw = onDraw;
                }
                this.ApplyStyles(drawArea);
                this.DrawArea = drawArea;
                this.Camera = new Rendering.Camera2d(new EndGate.Vector2d(this.DrawArea.width / 2, this.DrawArea.height / 2), new EndGate.Size2d(this.DrawArea.width, this.DrawArea.height));
                this._renderer = new Rendering.Camera2dRenderer(this.DrawArea, this.Camera);
                this._disposed = false;
            }
            Scene2d.prototype.Add = function (actor) {
                this._actors.push(actor);
            };
            Scene2d.prototype.Remove = function (actor) {
                for(var i = 0; i < this._actors.length; i++) {
                    if(this._actors[i] === actor) {
                        this._actors.splice(i, 1);
                        return;
                    }
                }
            };
            Scene2d.prototype.Draw = function () {
                this._onDraw(this._renderer.Render(this._actors));
            };
            Scene2d.prototype.Dispose = function () {
                if(!this._disposed) {
                    this._disposed = true;
                    this._actors = [];
                    this._renderer.Dispose();
                }
            };
            Scene2d.prototype.ApplyStyles = function (drawArea) {
                drawArea.style.position = "absolute";
                drawArea.style.zIndex = "2";
                drawArea.parentElement.style.position = "relative";
            };
            Scene2d.prototype.CreateDefaultDrawArea = function () {
                var drawArea = document.createElement("canvas");
                drawArea.width = window.innerWidth;
                drawArea.height = window.innerHeight;
                document.getElementsByTagName('body')[0].appendChild(drawArea);
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
        var MouseButton = (function () {
            function MouseButton() { }
            MouseButton.Left = "Left";
            MouseButton.Middle = "Middle";
            MouseButton.Right = "Right";
            return MouseButton;
        })();
        Input.MouseButton = MouseButton;        
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
                this.OnClick = new EndGate.EventHandler();
                this.OnDoubleClick = new EndGate.EventHandler();
                this.OnDown = new EndGate.EventHandler();
                this.OnUp = new EndGate.EventHandler();
                this.OnMove = new EndGate.EventHandler();
                this.OnScroll = new EndGate.EventHandler();
                this.LeftIsDown = false;
                this.MiddleIsDown = false;
                this.RightIsDown = false;
                this.Wire();
                this.OnDown.Bind(function (e) {
                    _this.IsDown = true;
                    _this[e.Button + "IsDown"] = true;
                });
                this.OnUp.Bind(function (e) {
                    _this.IsDown = false;
                    _this[e.Button + "IsDown"] = false;
                });
            }
            MouseHandler.MouseButtonArray = [
                null, 
                Input.MouseButton.Left, 
                Input.MouseButton.Middle, 
                Input.MouseButton.Right
            ];
            MouseHandler.prototype.Wire = function () {
                var _this = this;
                this._target.addEventListener("click", this._target.oncontextmenu = this.BuildEvent(this.OnClick, this.BuildMouseClickEvent), false);
                this._target.addEventListener("dblclick", this.BuildEvent(this.OnDoubleClick, this.BuildMouseClickEvent), false);
                this._target.addEventListener("mousedown", this.BuildEvent(this.OnDown, this.BuildMouseClickEvent), false);
                this._target.addEventListener("mouseup", this.BuildEvent(this.OnUp, this.BuildMouseClickEvent), false);
                this._target.addEventListener("mousemove", this.BuildEvent(this.OnMove, this.BuildMouseEvent), false);
                if((/MSIE/i.test(navigator.userAgent))) {
                    this._target.addEventListener("wheel", this.BuildEvent(this.OnScroll, function (e) {
                        e.wheelDeltaX = -e.deltaX;
                        e.wheelDeltaY = -e.deltaY;
                        return _this.BuildMouseScrollEvent(e);
                    }), false);
                } else if((/Firefox/i.test(navigator.userAgent))) {
                    this._target.addEventListener("DOMMouseScroll", this.BuildEvent(this.OnScroll, function (e) {
                        e.wheelDeltaX = e.axis === 1 ? -e.detail : 0;
                        e.wheelDeltaY = e.axis === 2 ? -e.detail : 0;
                        return _this.BuildMouseScrollEvent(e);
                    }), false);
                } else {
                    this._target.addEventListener("mousewheel", this.BuildEvent(this.OnScroll, this.BuildMouseScrollEvent), false);
                }
            };
            MouseHandler.prototype.BuildEvent = function (eventHandler, mouseEventBuilder, returnValue) {
                if (typeof returnValue === "undefined") { returnValue = false; }
                var _this = this;
                return function (e) {
                    if(eventHandler.HasBindings()) {
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
                if(event.which) {
                    return MouseHandler.MouseButtonArray[event.which];
                }
                return Input.MouseButton.Right;
            };
            MouseHandler.prototype.GetMouseScrollDierction = function (event) {
                return new EndGate.Vector2d(-Math.max(-1, Math.min(1, event.wheelDeltaX)), -Math.max(-1, Math.min(1, event.wheelDeltaY)));
            };
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
                    if(tripped) {
                        this.Trip();
                    }
                }
                NoopTripInvoker._noop = function () {
                };
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
                KeyboardModifiers.BuildFromCommandString = function BuildFromCommandString(keyCommand) {
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
                if(keyEvent.keyCode) {
                    code = keyEvent.keyCode;
                } else if(keyEvent.which) {
                    code = keyEvent.which;
                }
                if(!((character = String.fromCharCode(keyEvent.keyCode)) === keyEvent.key)) {
                    if(!(character = specialKeys[code])) {
                        character = String.fromCharCode(code).toLowerCase();
                        if(this.Modifiers.Shift && shiftValues[character]) {
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
                function KeyboardCommandHelper() { }
                KeyboardCommandHelper.ParseKey = function ParseKey(command) {
                    var arr = command.split("+");
                    if(arr.length > 1) {
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
                    this.OnDispose = new EndGate.EventHandler();
                    this._onDisposeInvoker = new EndGate._.Utilities.NoopTripInvoker(function () {
                        _this.OnDispose.Trigger();
                    }, true);
                }
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
                this._onPressCommands = ({
                });
                this._onDownCommands = ({
                });
                this._onUpCommands = ({
                });
                this.OnKeyPress = new EndGate.EventHandler();
                this.OnKeyDown = new EndGate.EventHandler();
                this.OnKeyUp = new EndGate.EventHandler();
                this.Wire();
            }
            KeyboardHandler._keyboardCommandIds = 0;
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
                if(ke.target) {
                    element = ke.target;
                } else if(ke.srcElement) {
                    element = ke.srcElement;
                }
                if(element.nodeType === 3) {
                    element = element.parentNode;
                }
                if(element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    return true;
                }
                return false;
            };
            KeyboardHandler.prototype.BuildKeyEvent = function (store, eventHandler) {
                var _this = this;
                return function (ke) {
                    var keyboardCommandEvent, propogate = true;
                    if(_this.FocusingTextArea(ke)) {
                        return;
                    }
                    keyboardCommandEvent = new Input.KeyboardCommandEvent(ke);
                    eventHandler.Trigger(keyboardCommandEvent);
                    for(var keyboardCommandId in store) {
                        if(keyboardCommandEvent.Matches(store[keyboardCommandId])) {
                            store[keyboardCommandId].Action();
                            ke.preventDefault();
                            propogate = false;
                        }
                    }
                    return propogate;
                };
            };
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
            function InputManager(canvas) {
                this.Mouse = new Input.MouseHandler(canvas);
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
                this._settings = settings;
                this._audio = document.createElement("audio");
                this.SetAudioSource(source);
                this.ApplySettings();
                this.OnComplete = new EndGate.EventHandler();
            }
            AudioClip.prototype.Volume = function (percent) {
                if(typeof percent !== "undefined") {
                    this._settings.Volume = percent;
                    this._audio.volume = Math.max(Math.min(percent / 100, 1), 0);
                }
                return this._settings.Volume;
            };
            AudioClip.prototype.IsPlaying = function () {
                return !this._audio.paused;
            };
            AudioClip.prototype.IsComplete = function () {
                return this._audio.ended;
            };
            AudioClip.prototype.Play = function () {
                var _this = this;
                if(this._audio.readyState === 0) {
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
                if(this._audio.readyState === 0) {
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
                if(!(source instanceof Array)) {
                    source = [
                        source
                    ];
                }
                for(var i = 0; i < source.length; i++) {
                    sourceHolder = document.createElement("source");
                    sourceHolder.src = source[i];
                    sourceType = supportedAudioTypes[source[i].split('.').pop()];
                    if(typeof sourceType !== "undefined") {
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
                this.Volume(this._settings.Volume);
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
            function AudioPlayer(sourceLocation) {
                this._source = sourceLocation;
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
                this._audioPlayers = {
                };
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
            AudioManager.prototype.GetPlayer = function (name) {
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
            function SceneryHandler(foregroundCanvas, camera) {
                this._camera = camera;
                this._layers = [];
                this._sceneryCanvas = this.BuildSceneryCanvas(foregroundCanvas);
                this._renderer = new EndGate.Rendering.Camera2dRenderer(this._sceneryCanvas, this._camera);
            }
            SceneryHandler.prototype.AddLayer = function (layer) {
                this._layers.push(layer);
            };
            SceneryHandler.prototype.RemoveLayer = function (layer) {
                this._layers.splice(this._layers.indexOf(layer), 1);
            };
            SceneryHandler.prototype.Draw = function () {
                this._layers.sort(EndGate.Graphics.Abstractions.Graphic2d._zindexSort);
                this._renderer.Render(this._layers);
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
            function MapManager(foregroundCanvas, camera) {
                this.Scenery = new Map.SceneryHandler(foregroundCanvas, camera);
            }
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
            this._gameTime = new EndGate.GameTime();
            this.ID = Game._gameIds++;
            this.Scene = new EndGate.Rendering.Scene2d(gameCanvas, function (context) {
                _this.Draw(context);
            });
            this.Input = new EndGate.Input.InputManager(this.Scene.DrawArea);
            this.Audio = new EndGate.Sound.AudioManager();
            this.CollisionManager = new EndGate.Collision.CollisionManager();
            this.Configuration = new EndGate.GameConfiguration(GameRunnerInstance.Register(this));
            this.Map = new EndGate.Map.MapManager(this.Scene.DrawArea, this.Scene.Camera);
        }
        Game._gameIds = 0;
        Game.prototype.PrepareUpdate = function () {
            this._gameTime.Update();
            this.CollisionManager.Update(this._gameTime);
            this.Update(this._gameTime);
        };
        Game.prototype.Update = function (gameTime) {
        };
        Game.prototype.PrepareDraw = function () {
            this.Map.Scenery.Draw();
            this.Scene.Draw();
        };
        Game.prototype.Draw = function (context) {
        };
        Game.prototype.Dispose = function () {
            this.Scene.Dispose();
            GameRunnerInstance.Unregister(this);
        };
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
        (function (Abstractions) {
            var MovementController = (function () {
                function MovementController(moveables) {
                    this.Position = EndGate.Vector2d.Zero();
                    this.Velocity = EndGate.Vector2d.Zero();
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
                    for(var i = 0; i < this._moveables.length; i++) {
                        this._moveables[i].Position = this.Position;
                        this._moveables[i].Rotation = this.Rotation;
                    }
                };
                return MovementController;
            })();
            Abstractions.MovementController = MovementController;            
        })(MovementControllers.Abstractions || (MovementControllers.Abstractions = {}));
        var Abstractions = MovementControllers.Abstractions;
    })(EndGate.MovementControllers || (EndGate.MovementControllers = {}));
    var MovementControllers = EndGate.MovementControllers;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (MovementControllers) {
        var LinearMovementController = (function (_super) {
            __extends(LinearMovementController, _super);
            function LinearMovementController(moveables, moveSpeed, rotateWithMovements, multiDirectional) {
                if (typeof rotateWithMovements === "undefined") { rotateWithMovements = true; }
                if (typeof multiDirectional === "undefined") { multiDirectional = true; }
                var _this = this;
                        _super.call(this, moveables);
                this._moveSpeed = moveSpeed;
                this._moving = new MovementControllers.Assets.LinearDirections();
                this.OnMove = new EndGate.EventHandler();
                this._rotationUpdater = new EndGate._.Utilities.NoopTripInvoker(function () {
                    _this.UpdateRotation();
                }, rotateWithMovements);
                if(multiDirectional) {
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
                if(typeof speed !== "undefined") {
                    this._moveSpeed = speed;
                    this._velocityUpdater();
                }
                return this._moveSpeed;
            };
            LinearMovementController.prototype.Update = function (gameTime) {
                if(!this._frozen) {
                    this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.ElapsedSecond));
                    _super.prototype.Update.call(this, gameTime);
                }
            };
            LinearMovementController.prototype.Move = function (direction, startMoving) {
                if(typeof this._moving[direction] !== "undefined") {
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
                var velocity = EndGate.Vector2d.Zero();
                if(velocity.IsZero()) {
                    if(this._moving.Up) {
                        velocity.Y -= this._moveSpeed;
                    }
                    if(this._moving.Down) {
                        velocity.Y += this._moveSpeed;
                    }
                    if(velocity.Y === 0) {
                        if(this._moving.Left) {
                            velocity.X -= this._moveSpeed;
                        }
                        if(this._moving.Right) {
                            velocity.X += this._moveSpeed;
                        }
                    }
                }
                this.Velocity = velocity;
            };
            LinearMovementController.prototype.UpdateVelocityWithMultiDirection = function () {
                var velocity = EndGate.Vector2d.Zero();
                if(this._moving.Up) {
                    velocity.Y -= this._moveSpeed;
                }
                if(this._moving.Down) {
                    velocity.Y += this._moveSpeed;
                }
                if(this._moving.Left) {
                    velocity.X -= this._moveSpeed;
                }
                if(this._moving.Right) {
                    velocity.X += this._moveSpeed;
                }
                this.Velocity = velocity;
            };
            LinearMovementController.prototype.UpdateRotation = function () {
                if(!this.Velocity.IsZero()) {
                    this.Rotation = Math.atan2(this.Velocity.Y, this.Velocity.X);
                }
            };
            return LinearMovementController;
        })(MovementControllers.Abstractions.MovementController);
        MovementControllers.LinearMovementController = LinearMovementController;        
    })(EndGate.MovementControllers || (EndGate.MovementControllers = {}));
    var MovementControllers = EndGate.MovementControllers;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (InputControllers) {
        var DirectionalInputController = (function () {
            function DirectionalInputController(keyboard, onMove, upKeys, rightKeys, downKeys, leftKeys) {
                if (typeof upKeys === "undefined") { upKeys = [
                    "w", 
                    "Up"
                ]; }
                if (typeof rightKeys === "undefined") { rightKeys = [
                    "d", 
                    "Right"
                ]; }
                if (typeof downKeys === "undefined") { downKeys = [
                    "s", 
                    "Down"
                ]; }
                if (typeof leftKeys === "undefined") { leftKeys = [
                    "a", 
                    "Left"
                ]; }
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
                for(var i = 0; i < keyList.length; i++) {
                    this._keyboard[bindingAction](keyList[i], function () {
                        if(_this._directions[direction] != startMoving) {
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
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            (function (FontFamily) {
                FontFamily._map = [];
                FontFamily._map[0] = "Antiqua";
                FontFamily.Antiqua = 0;
                FontFamily._map[1] = "Arial";
                FontFamily.Arial = 1;
                FontFamily._map[2] = "Avqest";
                FontFamily.Avqest = 2;
                FontFamily._map[3] = "Blackletter";
                FontFamily.Blackletter = 3;
                FontFamily._map[4] = "Calibri";
                FontFamily.Calibri = 4;
                FontFamily._map[5] = "ComicSans";
                FontFamily.ComicSans = 5;
                FontFamily._map[6] = "Courier";
                FontFamily.Courier = 6;
                FontFamily._map[7] = "Decorative";
                FontFamily.Decorative = 7;
                FontFamily._map[8] = "Fraktur";
                FontFamily.Fraktur = 8;
                FontFamily._map[9] = "Frosty";
                FontFamily.Frosty = 9;
                FontFamily._map[10] = "Garamond";
                FontFamily.Garamond = 10;
                FontFamily._map[11] = "Georgia";
                FontFamily.Georgia = 11;
                FontFamily._map[12] = "Helvetica";
                FontFamily.Helvetica = 12;
                FontFamily._map[13] = "Impact";
                FontFamily.Impact = 13;
                FontFamily._map[14] = "Minion";
                FontFamily.Minion = 14;
                FontFamily._map[15] = "Modern";
                FontFamily.Modern = 15;
                FontFamily._map[16] = "Monospace";
                FontFamily.Monospace = 16;
                FontFamily._map[17] = "Palatino";
                FontFamily.Palatino = 17;
                FontFamily._map[18] = "Roman";
                FontFamily.Roman = 18;
                FontFamily._map[19] = "Script";
                FontFamily.Script = 19;
                FontFamily._map[20] = "Swiss";
                FontFamily.Swiss = 20;
                FontFamily._map[21] = "TimesNewRoman";
                FontFamily.TimesNewRoman = 21;
                FontFamily._map[22] = "Verdana";
                FontFamily.Verdana = 22;
            })(Assets.FontFamily || (Assets.FontFamily = {}));
            var FontFamily = Assets.FontFamily;
            ;
            var FontFamilyHelper = (function () {
                function FontFamilyHelper() { }
                FontFamilyHelper._Initialize = function _Initialize() {
                    FontFamilyHelper._families = ({
                    });
                    for(var family in FontFamily) {
                        if(family !== "_map") {
                            FontFamilyHelper._families[FontFamily[family]] = family;
                        }
                    }
                    FontFamilyHelper._families[FontFamily["TimesNewRoman"]] = "Times New Roman";
                };
                FontFamilyHelper.Get = function Get(family) {
                    return FontFamilyHelper._families[family];
                };
                return FontFamilyHelper;
            })();
            Assets.FontFamilyHelper = FontFamilyHelper;            
            FontFamilyHelper._Initialize();
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
                FontVariant._map = [];
                FontVariant._map[0] = "Normal";
                FontVariant.Normal = 0;
                FontVariant._map[1] = "SmallCaps";
                FontVariant.SmallCaps = 1;
            })(Assets.FontVariant || (Assets.FontVariant = {}));
            var FontVariant = Assets.FontVariant;
            ;
            var FontVariantHelper = (function () {
                function FontVariantHelper() { }
                FontVariantHelper._Initialize = function _Initialize() {
                    FontVariantHelper._variants = ({
                    });
                    for(var family in FontVariant) {
                        if(family !== "_map") {
                            FontVariantHelper._variants[FontVariant[family]] = family;
                        }
                    }
                    FontVariantHelper._variants["SmallCaps"] = "Times New Roman";
                };
                FontVariantHelper.Get = function Get(variant) {
                    return FontVariantHelper._variants[variant];
                };
                return FontVariantHelper;
            })();
            Assets.FontVariantHelper = FontVariantHelper;            
            FontVariantHelper._Initialize();
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
                FontStyle._map = [];
                FontStyle._map[0] = "Normal";
                FontStyle.Normal = 0;
                FontStyle._map[1] = "Italic";
                FontStyle.Italic = 1;
                FontStyle._map[2] = "Oblique";
                FontStyle.Oblique = 2;
            })(Assets.FontStyle || (Assets.FontStyle = {}));
            var FontStyle = Assets.FontStyle;
            var FontStyleHelper = (function () {
                function FontStyleHelper() { }
                FontStyleHelper._Initialize = function _Initialize() {
                    FontStyleHelper._styles = ({
                    });
                    for(var style in FontStyle) {
                        if(style !== "_map") {
                            FontStyleHelper._styles[FontStyle[style]] = style;
                        }
                    }
                };
                FontStyleHelper.Get = function Get(style) {
                    return FontStyleHelper._styles[style];
                };
                return FontStyleHelper;
            })();
            Assets.FontStyleHelper = FontStyleHelper;            
            FontStyleHelper._Initialize();
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
                        fontFamily: "Times New Roman",
                        fontVariant: "",
                        fontWeight: "",
                        fontStyle: ""
                    };
                    this._refreshCache = true;
                    this._BuildFont();
                }
                FontSettings.prototype.FontSize = function (size, measurement) {
                    if (typeof measurement === "undefined") { measurement = Assets.FontMeasurement.Points; }
                    if(size !== undefined) {
                        return this.GetOrSetCache("fontSize", size.toString() + Assets.FontMeasurementHelper.Get(measurement));
                    }
                    return this._cachedState["fontSize"];
                };
                FontSettings.prototype.FontFamily = function (family) {
                    return this.GetOrSetCache("fontFamily", Assets.FontFamilyHelper.Get(family));
                };
                FontSettings.prototype.FontVariant = function (variant) {
                    return this.GetOrSetCache("fontVariant", Assets.FontVariantHelper.Get(variant));
                };
                FontSettings.prototype.FontWeight = function (weight) {
                    return this.GetOrSetCache("fontWeight", weight);
                };
                FontSettings.prototype.FontStyle = function (style) {
                    return this.GetOrSetCache("fontStyle", Assets.FontStyleHelper.Get(style));
                };
                FontSettings.prototype._BuildFont = function () {
                    var font;
                    if(this._refreshCache) {
                        font = this._cachedState["fontWeight"] + " " + this._cachedState["fontStyle"] + " " + this._cachedState["fontSize"] + " " + this._cachedState["fontVariant"];
                        if(this._cachedState["fontFamily"]) {
                            font += this._cachedState["fontFamily"];
                            if(this._cachedState["fontFamilyType"]) {
                                font += ", " + this._cachedState["fontFamilyType"];
                            }
                        } else if(this._cachedState["fontFamilyType"]) {
                            font += this._cachedState["fontFamilyType"];
                        }
                        this._cachedFont = font.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                        this._refreshCache = false;
                    }
                    return this._cachedFont;
                };
                FontSettings.prototype.GetOrSetCache = function (property, value) {
                    if(typeof value !== "undefined") {
                        this._cachedState[property] = value;
                        this._refreshCache = true;
                    }
                    return this._cachedState[property];
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
                this._drawBounds = new EndGate.Bounds.BoundingRectangle(this.Position, EndGate.Size2d.One());
                this.FontSettings = new Graphics.Assets.FontSettings();
                this.Align("center");
                this.Baseline("middle");
                this.Color(color);
            }
            Text2d.prototype.Align = function (alignment) {
                return this.State.TextAlign(alignment);
            };
            Text2d.prototype.Baseline = function (baseline) {
                return this.State.TextBaseline(baseline);
            };
            Text2d.prototype.Color = function (color) {
                return this.State.FillStyle(color);
            };
            Text2d.prototype.Shadow = function (x, y, color, blur) {
                this.ShadowX(x);
                this.ShadowY(y);
                this.ShadowColor(color);
                this.ShadowBlur(blur);
            };
            Text2d.prototype.ShadowColor = function (color) {
                return this.State.ShadowColor(color);
            };
            Text2d.prototype.ShadowX = function (val) {
                return this.State.ShadowOffsetX(val);
            };
            Text2d.prototype.ShadowY = function (val) {
                return this.State.ShadowOffsetY(val);
            };
            Text2d.prototype.ShadowBlur = function (val) {
                return this.State.ShadowBlur(val);
            };
            Text2d.prototype.Opacity = function (alpha) {
                return this.State.GlobalAlpha(alpha);
            };
            Text2d.prototype.Text = function (text) {
                if(typeof text !== "undefined") {
                    this._text = text;
                }
                return this._text;
            };
            Text2d.prototype.Border = function (thickness, color) {
                this.BorderThickness(thickness);
                this.BorderColor(color);
            };
            Text2d.prototype.BorderThickness = function (thickness) {
                if(thickness === 0) {
                    this._stroker.Reset();
                } else {
                    this._stroker.Trip();
                }
                return this.State.LineWidth(thickness);
            };
            Text2d.prototype.BorderColor = function (color) {
                this._stroker.Trip();
                return this.State.StrokeStyle(color);
            };
            Text2d.prototype.Draw = function (context) {
                var textSize;
                _super.prototype._StartDraw.call(this, context);
                this.State.Font(this.FontSettings._BuildFont());
                textSize = context.measureText(this._text);
                this._drawBounds.Size.Width = textSize.width;
                this._drawBounds.Size.Height = parseInt(this.FontSettings.FontSize()) * 1.5;
                context.fillText(this._text, 0, 0);
                this._stroker.Invoke(context);
                _super.prototype._EndDraw.call(this, context);
            };
            Text2d.prototype.GetDrawBounds = function () {
                this._drawBounds.Rotation = this.Rotation;
                this._drawBounds.Position = this.Position;
                return this._drawBounds;
            };
            return Text2d;
        })(Graphics.Abstractions.Graphic2d);
        Graphics.Text2d = Text2d;        
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            var ImageSource = (function () {
                function ImageSource(imageLocation, width, height, clipX, clipY, clipWidth, clipHeight) {
                    if (typeof clipX === "undefined") { clipX = 0; }
                    if (typeof clipY === "undefined") { clipY = 0; }
                    if (typeof clipWidth === "undefined") { clipWidth = width; }
                    if (typeof clipHeight === "undefined") { clipHeight = height; }
                    var _this = this;
                    var setSize = typeof width !== "undefined";
                    this.Loaded = false;
                    this.OnLoaded = new EndGate.EventHandler();
                    this.Source = new Image();
                    this.Source.onload = function () {
                        _this.Loaded = true;
                        if(!setSize) {
                            _this.Size = new EndGate.Size2d(_this.Source.width, _this.Source.height);
                            _this.ClipLocation = EndGate.Vector2d.Zero();
                            _this.ClipSize = _this.Size.Clone();
                        }
                        _this.OnLoaded.Trigger(_this);
                    };
                    this.Source.src = imageLocation;
                    this._imageLocation = imageLocation;
                    if(setSize) {
                        this.Size = new EndGate.Size2d(width, height);
                        this.ClipLocation = new EndGate.Vector2d(clipX, clipY);
                        this.ClipSize = new EndGate.Size2d(clipWidth, clipHeight);
                    }
                }
                ImageSource.prototype.Extract = function (clipX, clipY, clipWidth, clipHeight) {
                    return new ImageSource(this._imageLocation, this.Size.Width, this.Size.Height, clipX, clipY, clipWidth, clipHeight);
                };
                return ImageSource;
            })();
            Assets.ImageSource = ImageSource;            
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
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
            Sprite2d.prototype.Opacity = function (alpha) {
                return this.State.GlobalAlpha(alpha);
            };
            Sprite2d.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);
                context.drawImage(this.Image.Source, this.Image.ClipLocation.X, this.Image.ClipLocation.Y, this.Image.ClipSize.Width, this.Image.ClipSize.Height, -this.Size.HalfWidth(), -this.Size.HalfHeight(), this.Size.Width, this.Size.Height);
                _super.prototype._EndDraw.call(this, context);
            };
            Sprite2d.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, this.Size);
                bounds.Rotation = this.Rotation;
                return bounds;
            };
            return Sprite2d;
        })(Graphics.Abstractions.Graphic2d);
        Graphics.Sprite2d = Sprite2d;        
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var SpriteAnimation = (function () {
            function SpriteAnimation(imageSource, fps, frameSize, frameCount, startOffset) {
                if (typeof startOffset === "undefined") { startOffset = EndGate.Vector2d.Zero(); }
                this._imageSource = imageSource;
                this._frameSize = frameSize;
                this._frameCount = frameCount;
                this._startOffset = startOffset;
                this._playing = false;
                this._repeating = false;
                this._currentFrame = 0;
                this._framesPerRow = Math.min(Math.floor((imageSource.ClipSize.Width - startOffset.X) / frameSize.Width), frameCount);
                this._lastStepAt = 0;
                this.OnComplete = new EndGate.EventHandler();
                this.Fps(fps);
            }
            SpriteAnimation.prototype.IsPlaying = function () {
                return this._playing;
            };
            SpriteAnimation.prototype.Play = function (repeat) {
                if (typeof repeat === "undefined") { repeat = false; }
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
                if(this._currentFrame >= this._frameCount) {
                    if(this._repeating) {
                        this._currentFrame %= this._frameCount;
                    } else {
                        this._currentFrame = this._frameCount - 1;
                        this.OnComplete.Trigger();
                        this.Stop(false);
                    }
                }
                if(count !== 0) {
                    this.UpdateImageSource();
                }
            };
            SpriteAnimation.prototype.Stop = function (resetFrame) {
                if (typeof resetFrame === "undefined") { resetFrame = true; }
                this._playing = false;
                if(resetFrame) {
                    this.Reset();
                }
            };
            SpriteAnimation.prototype.Reset = function () {
                this._currentFrame = 0;
                this.UpdateImageSource();
            };
            SpriteAnimation.prototype.Fps = function (newFps) {
                if(typeof newFps !== "undefined") {
                    this._fps = newFps;
                    this._stepEvery = 1000 / this._fps;
                }
                return this._fps;
            };
            SpriteAnimation.prototype.Update = function (gameTime) {
                var timeSinceStep = gameTime.Now.getTime() - this._lastStepAt, stepCount = 0;
                if(this._playing) {
                    stepCount = Math.floor(timeSinceStep / this._stepEvery);
                    if(stepCount !== 0) {
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
        (function (Abstractions) {
            var Shape = (function (_super) {
                __extends(Shape, _super);
                function Shape(position, color) {
                                _super.call(this, position);
                    this._type = "Shape";
                    this._fill = false;
                    this._stroke = false;
                    if(typeof color !== "undefined") {
                        this.Color(color);
                    }
                }
                Shape.prototype.Color = function (color) {
                    this._fill = true;
                    return this.State.FillStyle(color);
                };
                Shape.prototype.Border = function (thickness, color) {
                    this.BorderThickness(thickness);
                    this.BorderColor(color);
                };
                Shape.prototype.BorderThickness = function (thickness) {
                    return this.State.LineWidth(thickness);
                };
                Shape.prototype.BorderColor = function (color) {
                    this._stroke = true;
                    return this.State.StrokeStyle(color);
                };
                Shape.prototype.Shadow = function (x, y, color, blur) {
                    this.ShadowX(x);
                    this.ShadowY(y);
                    this.ShadowColor(color);
                    this.ShadowBlur(blur);
                };
                Shape.prototype.ShadowColor = function (color) {
                    this._fill = true;
                    return this.State.ShadowColor(color);
                };
                Shape.prototype.ShadowX = function (x) {
                    return this.State.ShadowOffsetX(x);
                };
                Shape.prototype.ShadowY = function (y) {
                    return this.State.ShadowOffsetY(y);
                };
                Shape.prototype.ShadowBlur = function (blur) {
                    return this.State.ShadowBlur(blur);
                };
                Shape.prototype.Opacity = function (alpha) {
                    return this.State.GlobalAlpha(alpha);
                };
                Shape.prototype._StartDraw = function (context) {
                    context.beginPath();
                    _super.prototype._StartDraw.call(this, context);
                };
                Shape.prototype._EndDraw = function (context) {
                    if(this._fill) {
                        context.fill();
                    }
                    if(this._stroke) {
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
            })(Abstractions.Graphic2d);
            Abstractions.Shape = Shape;            
        })(Graphics.Abstractions || (Graphics.Abstractions = {}));
        var Abstractions = Graphics.Abstractions;
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
        })(Graphics.Abstractions.Shape);
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
                context.rect(-this.Size.HalfWidth(), -this.Size.HalfHeight(), this.Size.Width, this.Size.Height);
            };
            return Rectangle;
        })(Graphics.Abstractions.Shape);
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
                        _super.call(this, EndGate.Vector2d.Zero());
                this._type = "Line2d";
                this._from = new EndGate.Vector2d(fromX, fromY);
                this._to = new EndGate.Vector2d(toX, toY);
                this.LineWidth(lineWidth);
                this.UpdatePosition();
                if(typeof color !== "undefined") {
                    this.Color(color);
                }
            }
            Line2d.prototype.From = function (newPosition) {
                return this.GetOrSetLinePoint("from", newPosition);
            };
            Line2d.prototype.To = function (newPosition) {
                return this.GetOrSetLinePoint("to", newPosition);
            };
            Line2d.prototype.Color = function (color) {
                return this.State.StrokeStyle(color);
            };
            Line2d.prototype.LineWidth = function (width) {
                return this.State.LineWidth(width);
            };
            Line2d.prototype.LineCap = function (cap) {
                return this.State.LineCap(cap);
            };
            Line2d.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);
                if(!this._cachedPosition.Equivalent(this.Position)) {
                    this.RefreshCache();
                }
                context.beginPath();
                context.moveTo(this._from.X - this.Position.X, this._from.Y - this.Position.Y);
                context.lineTo(this._to.X - this.Position.X, this._to.Y - this.Position.Y);
                context.stroke();
                _super.prototype._EndDraw.call(this, context);
            };
            Line2d.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, new EndGate.Size2d(this._boundsWidth, this.LineWidth()));
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
            Line2d.prototype.GetOrSetLinePoint = function (name, newPosition) {
                if(typeof newPosition === "undefined") {
                    this["_" + name] = newPosition;
                    this.UpdatePosition();
                }
                return this["_" + name];
            };
            return Line2d;
        })(Graphics.Abstractions.Graphic2d);
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
                var halfSize, topLeft, bottomRight;
                this._size = new EndGate.Size2d(tileWidth * columns, tileHeight * rows);
                this._tileSize = new EndGate.Size2d(tileWidth, tileHeight);
                this._grid = [];
                this._rows = rows;
                this._columns = columns;
                this.DrawGridLines = drawGridLines;
                this._gridLines = [];
                halfSize = this._size.Multiply(.5);
                topLeft = new EndGate.Vector2d(-halfSize.Width, -halfSize.Height);
                bottomRight = new EndGate.Vector2d(halfSize.Width, halfSize.Height);
                for(var i = 0; i < rows; i++) {
                    this._grid[i] = [];
                    this._gridLines.push(new Graphics.Line2d(topLeft.X, topLeft.Y + i * this._tileSize.Height, bottomRight.X, topLeft.Y + i * this._tileSize.Height, 1));
                    for(var j = 0; j < columns; j++) {
                        if(i === 0) {
                            this._gridLines.push(new Graphics.Line2d(topLeft.X + j * this._tileSize.Width, topLeft.Y, topLeft.X + j * this._tileSize.Width, bottomRight.Y, 1));
                        }
                        this._grid[i].push(null);
                    }
                }
                this._gridLines.push(new Graphics.Line2d(topLeft.X, bottomRight.Y, bottomRight.X, bottomRight.Y, 1));
                this._gridLines.push(new Graphics.Line2d(bottomRight.X, topLeft.Y, bottomRight.X, bottomRight.Y, 1));
                this.GridLineColor(gridLineColor);
            }
            Grid.prototype.GridLineColor = function (color) {
                if(typeof color !== "undefined") {
                    this._gridLineColor = color;
                    for(var i = 0; i < this._gridLines.length; i++) {
                        this._gridLines[i].Color(color);
                    }
                }
                return this._gridLineColor;
            };
            Grid.prototype.Size = function () {
                return this._size.Clone();
            };
            Grid.prototype.TileSize = function () {
                return this._tileSize.Clone();
            };
            Grid.prototype.Rows = function () {
                return this._rows;
            };
            Grid.prototype.Columns = function () {
                return this._columns;
            };
            Grid.prototype.Opacity = function (alpha) {
                return this.State.GlobalAlpha(alpha);
            };
            Grid.prototype.Fill = function (row, column, graphic) {
                if(!this.ValidRow(row) || !this.ValidColumn(column)) {
                    return;
                }
                graphic.Position = this.GetInsideGridPosition(row, column);
                this._grid[row][column] = graphic;
                this.AddChild(graphic);
            };
            Grid.prototype.FillRow = function (row, graphicList, columnOffset) {
                if (typeof columnOffset === "undefined") { columnOffset = 0; }
                var graphic;
                for(var i = 0; i < graphicList.length; i++) {
                    graphic = graphicList[i];
                    graphic.Position = this.GetInsideGridPosition(row, i + columnOffset);
                    this._grid[row][i + columnOffset] = graphic;
                    this.AddChild(graphic);
                }
            };
            Grid.prototype.FillColumn = function (column, graphicList, rowOffset) {
                if (typeof rowOffset === "undefined") { rowOffset = 0; }
                var graphic;
                for(var i = 0; i < graphicList.length; i++) {
                    graphic = graphicList[i];
                    graphic.Position = this.GetInsideGridPosition(i + rowOffset, column);
                    this._grid[i + rowOffset][column] = graphic;
                    this.AddChild(graphic);
                }
            };
            Grid.prototype.FillSpace = function (row, column, graphicList) {
                var graphic;
                for(var i = 0; i < graphicList.length; i++) {
                    for(var j = 0; j < graphicList[i].length; j++) {
                        graphic = graphicList[i][j];
                        if(graphic) {
                            graphic.Position = this.GetInsideGridPosition(i + row, j + column);
                            this._grid[i + row][j + column] = graphic;
                            this.AddChild(graphic);
                        }
                    }
                }
            };
            Grid.prototype.Get = function (row, column) {
                if(!this.ValidRow(row) || !this.ValidColumn(column)) {
                    return null;
                }
                return this._grid[row][column];
            };
            Grid.prototype.GetRow = function (row, columnOffset) {
                if (typeof columnOffset === "undefined") { columnOffset = 0; }
                var rowList = [];
                for(var i = columnOffset; i < this._columns; i++) {
                    rowList.push(this._grid[row][i]);
                }
                return rowList;
            };
            Grid.prototype.GetColumn = function (column, rowOffset) {
                if (typeof rowOffset === "undefined") { rowOffset = 0; }
                var columnList = [];
                for(var i = rowOffset; i < this._rows; i++) {
                    columnList.push(this._grid[i][column]);
                }
                return columnList;
            };
            Grid.prototype.GetSpace = function (rowStart, columnStart, rowEnd, columnEnd) {
                var space = [], rowIncrementor = (rowEnd >= rowStart) ? 1 : -1, columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;
                for(var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                    if(i >= this._rows) {
                        break;
                    }
                    for(var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                        if(j >= this._columns) {
                            break;
                        }
                        space.push(this._grid[i][j]);
                    }
                }
                return space;
            };
            Grid.prototype.Clear = function (row, column) {
                if(!this.ValidRow(row) || !this.ValidColumn(column)) {
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
                for(var i = 0; i < this._columns; i++) {
                    vals.push(this._grid[row][i]);
                    this.RemoveChild(this._grid[row][i]);
                    this._grid[row][i] = null;
                }
                return vals;
            };
            Grid.prototype.ClearColumn = function (column, rowOffset) {
                if (typeof rowOffset === "undefined") { rowOffset = 0; }
                var vals = [];
                for(var i = 0; i < this._rows; i++) {
                    vals.push(this._grid[i][column]);
                    this.RemoveChild(this._grid[i][column]);
                    this._grid[i][column] = null;
                }
                return vals;
            };
            Grid.prototype.ClearSpace = function (rowStart, columnStart, rowEnd, columnEnd) {
                var space = [], rowIncrementor = (rowEnd >= rowStart) ? 1 : -1, columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;
                for(var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                    if(i > this._rows) {
                        break;
                    }
                    for(var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                        if(j > this._columns) {
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
                if(this.DrawGridLines) {
                    for(var i = 0; i < this._gridLines.length; i++) {
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
                return Math.floor((y - (this.Position.Y - this._size.HalfHeight())) / this._tileSize.Height);
            };
            Grid.prototype.ConvertToColumn = function (x) {
                return Math.floor((x - (this.Position.X - this._size.HalfWidth())) / this._tileSize.Width);
            };
            Grid.prototype.GetInsideGridPosition = function (row, column) {
                return new EndGate.Vector2d(column * this._tileSize.Width - this._size.HalfWidth() + this._tileSize.HalfWidth(), row * this._tileSize.Height - this._size.HalfHeight() + this._tileSize.HalfHeight());
            };
            Grid.prototype.ValidRow = function (row) {
                return row >= 0 && row < this._rows;
            };
            Grid.prototype.ValidColumn = function (column) {
                return column >= 0 && column < this._columns;
            };
            return Grid;
        })(Graphics.Abstractions.Graphic2d);
        Graphics.Grid = Grid;        
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
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
        })(EndGate.Graphics.Abstractions.Graphic2d);
        Map.TileMap = TileMap;        
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Map) {
        var Tile = (function (_super) {
            __extends(Tile, _super);
            function Tile(image, width, height) {
                        _super.call(this, 0, 0, image, width, height);
            }
            return Tile;
        })(EndGate.Graphics.Sprite2d);
        Map.Tile = Tile;        
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Map) {
        var SquareTileMap = (function (_super) {
            __extends(SquareTileMap, _super);
            function SquareTileMap(x, y, tileWidth, tileHeight, resources, mappings, drawGridLines) {
                if (typeof drawGridLines === "undefined") { drawGridLines = false; }
                        _super.call(this, x, y, resources);
                this._grid = new EndGate.Graphics.Grid(0, 0, mappings.length, mappings[0].length, tileWidth, tileHeight, drawGridLines);
                this.FillGridWith(mappings);
            }
            SquareTileMap.ExtractTiles = function ExtractTiles(imageSource, tileWidth, tileHeight) {
                var resources = [], framesPerRow = Math.floor(imageSource.ClipSize.Width / tileWidth), rows = Math.floor(imageSource.ClipSize.Height / tileHeight);
                for(var i = 0; i < rows; i++) {
                    for(var j = 0; j < framesPerRow; j++) {
                        resources.push(imageSource.Extract(j * tileWidth, i * tileHeight, tileWidth, tileHeight));
                    }
                }
                return resources;
            };
            SquareTileMap.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);
                this._grid.Draw(context);
                _super.prototype._EndDraw.call(this, context);
            };
            SquareTileMap.prototype.GetDrawBounds = function () {
                var bounds = this._grid.GetDrawBounds();
                bounds.Position = this.Position;
                return bounds;
            };
            SquareTileMap.prototype.FillGridWith = function (mappings) {
                var tiles = [];
                for(var i = 0; i < mappings.length; i++) {
                    tiles[i] = [];
                    for(var j = 0; j < mappings[i].length; j++) {
                        if(mappings[i][j] >= 0) {
                            tiles[i].push(new Map.Tile(this._Resources[mappings[i][j]], this._grid.TileSize().Width, this._grid.TileSize().Height));
                        } else {
                            tiles[i].push(null);
                        }
                    }
                }
                this._grid.FillSpace(0, 0, tiles);
            };
            return SquareTileMap;
        })(Map.TileMap);
        Map.SquareTileMap = SquareTileMap;        
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
var eg = EndGate;
