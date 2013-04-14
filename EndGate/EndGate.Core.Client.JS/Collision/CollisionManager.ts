/// <reference path="../Interfaces/IUpdateable.d.ts" />
/// <reference path="../Interfaces/ITyped.d.ts" />
/// <reference path="Collidable.ts" />
/// <reference path="CollisionData.ts" />
/// <reference path="../Utilities/EventHandler.ts" />
/// <reference path="../GameTime.ts" />

module EndGate.Core.Collision {

    export class CollisionManager implements IUpdateable, ITyped {
        public _type: string = "CollisionManager";

        public _collidables: Collidable[];

        private _enabled: bool;

        constructor() {
            this._collidables = [];
            this._enabled = false;

            this.OnCollision = new Utilities.EventHandler();
        }

        public OnCollision: Utilities.EventHandler;

        public Monitor(obj: Collidable): void {
            this._enabled = true;

            obj.OnDisposed.Bind(() => {
                this.Unmonitor(obj);
            });

            this._collidables.push(obj);
        }

        public Unmonitor(obj: Collidable): void {
            for (var i = 0; i < this._collidables.length; i++) {
                if (this._collidables[i].ID === obj.ID) {
                    this._collidables.splice(i, 1);
                    break;
                }
            }
        }

        public Update(gameTime: GameTime): void {
            var first: Collidable,
                second: Collidable;

            if (this._enabled) {
                for (var i = 0; i < this._collidables.length; i++) {
                    first = this._collidables[i];

                    for (var j = i + 1; j < this._collidables.length; j++) {
                        second = this._collidables[j];

                        if (first.IsCollidingWith(second)) {
                            first.Collided(new CollisionData(first.Bounds.Position.Clone(), second));
                            second.Collided(new CollisionData(second.Bounds.Position.Clone(), first));
                            this.OnCollision.Trigger(first, second);
                        }
                    }
                }
            }
        }
    }

}