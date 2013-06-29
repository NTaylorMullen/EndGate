var EndGate;
(function (EndGate) {
    /// <reference path="../Interfaces/IUpdateable.ts" />
    /// <reference path="../Interfaces/ITyped.ts" />
    /// <reference path="Collidable.ts" />
    /// <reference path="CollisionData.ts" />
    /// <reference path="../Utilities/EventHandler2.ts" />
    /// <reference path="../GameTime.ts" />
    (function (Collision) {
        /**
        * Defines a manager that will check for collisions between objects that it is monitoring.
        */
        var CollisionManager = (function () {
            /**
            * Creates a new instance of CollisionManager.
            */
            function CollisionManager() {
                this._type = "CollisionManager";
                this._collidables = [];
                this._enabled = false;

                this._onCollision = new EndGate.EventHandler2();
            }
            Object.defineProperty(CollisionManager.prototype, "OnCollision", {
                get: /**
                * Gets an event that is triggered when a collision happens among two of the monitored objects.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onCollision;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Monitors the provided collidable and will trigger its Collided function and OnCollision event whenever a collision occurs with it and another Collidable.
            * If the provided collidable gets disposed it will automatically become unmonitored.
            * @param obj Collidable to monitor.
            */
            CollisionManager.prototype.Monitor = function (obj) {
                var _this = this;
                this._enabled = true;

                obj.OnDisposed.Bind(function () {
                    _this.Unmonitor(obj);
                });

                this._collidables.push(obj);
            };

            /**
            * Unmonitors the provided collidable.  The Collided function and OnCollision event will no longer be triggered when an actual collision may have occurred.
            * Disposing a monitored collidable will automatically be unmonitored
            * @param obj Collidable to unmonitor.
            */
            CollisionManager.prototype.Unmonitor = function (obj) {
                for (var i = 0; i < this._collidables.length; i++) {
                    if (this._collidables[i]._id === obj._id) {
                        this._collidables.splice(i, 1);
                        break;
                    }
                }
            };

            /**
            * Checks for collisions within its monitored objects.  Games CollisionManager's automatically have their Update functions called at the beginning of each update loop.
            * @param gameTime The current game time object.
            */
            CollisionManager.prototype.Update = function (gameTime) {
                var first, second;

                if (this._enabled) {
                    for (var i = 0; i < this._collidables.length; i++) {
                        first = this._collidables[i];

                        for (var j = i + 1; j < this._collidables.length; j++) {
                            second = this._collidables[j];

                            if (first.IsCollidingWith(second)) {
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
