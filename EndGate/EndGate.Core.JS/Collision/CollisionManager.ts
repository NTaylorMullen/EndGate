/// <reference path="../Interfaces/IUpdateable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
/// <reference path="Collidable.ts" />
/// <reference path="CollisionData.ts" />
/// <reference path="../Utilities/EventHandler.ts" />
/// <reference path="../GameTime.ts" />

module EndGate.Collision {

    /**
    * Defines a manager that will check for collisions between objects that it is monitoring.
    */
    export class CollisionManager implements IUpdateable, _.ITyped {
        public _type: string = "CollisionManager";
        private _collidables: Collidable[];
        private _enabled: bool;

        /**
        * Creates a new instance of CollisionManager.
        */
        constructor() {
            this._collidables = [];
            this._enabled = false;

            this.OnCollision = new EventHandler();
        }

        /**
        * Event: Triggered when a collision happens among two of the monitored objects.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes two CollisionData objects to bound functions.
        */
        public OnCollision: EventHandler;

        /**
        * Monitors the provided collidable and will trigger its Collided function and OnCollision event whenever a collision occurs with it and another Collidable.
        * If the provided collidable gets disposed it will automatically become unmonitored.
        * @param obj Collidable to monitor.
        */
        public Monitor(obj: Collidable): void {
            this._enabled = true;

            obj.OnDisposed.Bind(() => {
                this.Unmonitor(obj);
            });

            this._collidables.push(obj);
        }

        /**
        * Unmonitors the provided collidable.  The Collided function and OnCollision event will no longer be triggered when an actual collision may have occured.
        * Disposing a monitored collidable will automatically be unmonitored
        * @param obj Collidable to unmonitor.
        */
        public Unmonitor(obj: Collidable): void {
            for (var i = 0; i < this._collidables.length; i++) {
                if (this._collidables[i]._id === obj._id) {
                    this._collidables.splice(i, 1);
                    break;
                }
            }
        }

        /**
        * Checks for collisions within its monitored objects.  Games CollisionManager's automatically have their Update functions called at the beginning of each update loop.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: GameTime): void {
            var first: Collidable,
                second: Collidable;

            if (this._enabled) {
                for (var i = 0; i < this._collidables.length; i++) {
                    first = this._collidables[i];

                    for (var j = i + 1; j < this._collidables.length; j++) {
                        second = this._collidables[j];

                        if (first.IsCollidingWith(second)) {
                            first.Collided(new Assets.CollisionData(first.Bounds.Position.Clone(), second));
                            second.Collided(new Assets.CollisionData(second.Bounds.Position.Clone(), first));
                            this.OnCollision.Trigger(first, second);
                        }
                    }
                }
            }
        }
    }

}