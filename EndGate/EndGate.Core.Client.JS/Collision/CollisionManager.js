var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Collision) {
            var CollisionManager = (function () {
                function CollisionManager() {
                    this._type = "CollisionManager";
                    this._collidables = [];
                    this._enabled = false;
                    this.OnCollision = new Core.Utilities.EventHandler();
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
                        if(this._collidables[i].ID === obj.ID) {
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
                                    first.Collided(new Collision.CollisionData(first.Bounds.Position.Clone(), second));
                                    second.Collided(new Collision.CollisionData(second.Bounds.Position.Clone(), first));
                                    this.OnCollision.Trigger(first, second);
                                }
                            }
                        }
                    }
                };
                return CollisionManager;
            })();
            Collision.CollisionManager = CollisionManager;            
        })(Core.Collision || (Core.Collision = {}));
        var Collision = Core.Collision;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=CollisionManager.js.map
