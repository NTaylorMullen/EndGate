var EndGate;
(function (EndGate) {
    /// <reference path="../Interfaces/IUpdateable.ts" />
    /// <reference path="../Interfaces/ITyped.ts" />
    /// <reference path="Assets/QuadTree.ts" />
    /// <reference path="CollisionConfiguration.ts" />
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
            function CollisionManager(configuration) {
                this._type = "CollisionManager";
                this._collidables = [];
                this._nonStaticCollidables = [];
                this._quadTree = new Collision.Assets._.QuadTree(configuration);
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

            CollisionManager.prototype.Monitor = function (obj, staticPosition) {
                if (typeof staticPosition === "undefined") { staticPosition = false; }
                var _this = this;
                this._enabled = true;

                obj.OnDisposed.Bind(function () {
                    _this.Unmonitor(obj);
                });

                this._collidables.push(obj);

                if (!staticPosition) {
                    this._nonStaticCollidables.push(obj);
                }

                this._quadTree.Insert(obj);
            };

            /**
            * Unmonitors the provided collidable.  The Collided function and OnCollision event will no longer be triggered when an actual collision may have occurred.
            * Disposing a monitored collidable will automatically be unmonitored
            * @param obj Collidable to unmonitor.
            */
            CollisionManager.prototype.Unmonitor = function (obj) {
                var index = this._collidables.indexOf(obj);

                if (index >= 0) {
                    this._collidables.splice(index, 1);
                }

                index = this._nonStaticCollidables.indexOf(obj);

                if (index >= 0) {
                    this._nonStaticCollidables.splice(index, 1);
                }

                this._quadTree.Remove(obj);
            };

            /**
            * Checks for collisions within its monitored objects.  Games CollisionManager's automatically have their Update functions called at the beginning of each update loop.
            * @param gameTime The current game time object.
            */
            CollisionManager.prototype.Update = function (gameTime) {
                var collidable, hash, candidates, cacheMap = {}, colliding = new Array();

                if (this._enabled) {
                    // Update the structure of the quad tree, this accounts for moving objects
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
