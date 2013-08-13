/// <reference path="../Interfaces/IUpdateable.ts" />
/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
/// <reference path="Assets/QuadTree.ts" />
/// <reference path="CollisionConfiguration.ts" />
/// <reference path="Collidable.ts" />
/// <reference path="CollisionData.ts" />
/// <reference path="../Utilities/EventHandler2.ts" />
/// <reference path="../GameTime.ts" />

module EndGate.Collision {

    interface ICollidableMappings {
        Collidable: Collidable;
        Unmonitor: (collidable: Collidable) => any;
    }

    /**
    * Defines a manager that will check for collisions between objects that it is monitoring.
    */
    export class CollisionManager implements IUpdateable, IDisposable, EndGate._.ITyped {
        public _type: string = "CollisionManager";
        private _collidables: ICollidableMappings[];
        private _nonStaticCollidables: Collidable[];
        public _quadTree: Assets._.QuadTree;
        private _onCollision: EventHandler2<Collidable, Collidable>;
        private _enabled: boolean;
        private _disposed: boolean;

        /**
        * Creates a new instance of CollisionManager.
        */
        constructor(configuration: CollisionConfiguration) {
            this._collidables = [];
            this._nonStaticCollidables = [];
            this._quadTree = new Assets._.QuadTree(configuration);
            this._enabled = false;
            this._disposed = false;
            this._onCollision = new EventHandler2<Collidable, Collidable>();
        }

        /**
        * Gets an event that is triggered when a collision happens among two of the monitored objects.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnCollision(): EventHandler2<Collidable, Collidable> {
            return this._onCollision;
        }

        /**
        * Monitors the provided collidable and will trigger its Collided function and OnCollision event whenever a collision occurs with it and another Collidable.
        * If the provided collidable gets disposed it will automatically become unmonitored.
        * @param obj Collidable to monitor.
        */
        public Monitor(obj: Collidable): void;
        /**
        * Monitors the provided collidable and will trigger its Collided function and OnCollision event whenever a collision occurs with it and another Collidable.
        * If the provided collidable gets disposed it will automatically become unmonitored.
        * Note: staticPosition'd collidable's will not collide with each other.
        * @param obj Collidable to monitor.
        * @param staticPosition Whether the Collidable will be stationary.  This value defaults to false.
        */
        public Monitor(obj: Collidable, staticPosition: boolean): void;
        public Monitor(obj: Collidable, staticPosition: boolean = false): void {
            var mapping: ICollidableMappings = {
                Collidable: obj,
                Unmonitor: (collidable) => {
                    this.Unmonitor(collidable);
                }
            };

            this._enabled = true;

            obj.OnDisposed.Bind(mapping.Unmonitor);

            this._collidables.push(mapping);

            if (!staticPosition) {
                this._nonStaticCollidables.push(obj);
            }

            this._quadTree.Insert(obj);
        }

        /**
        * Unmonitors the provided collidable.  The Collided function and OnCollision event will no longer be triggered when an actual collision may have occurred.
        * Disposing a monitored collidable will automatically be unmonitored
        * @param obj Collidable to unmonitor.
        */
        public Unmonitor(obj: Collidable): void {
            var index: number;
            
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
        }

        /**
        * Checks for collisions within its monitored objects.  Games CollisionManager's automatically have their Update functions called at the beginning of each update loop.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: GameTime): void {
            var collidable: Collidable,
                hash: string,
                candidates: Array<Collidable>,
                cacheMap: { [ids: string]: boolean; } = {},
                colliding: Array<Array<Collidable>> = new Array<Array<Collidable>>();

            if (this._enabled) {
                // Update the structure of the quad tree, this accounts for moving objects
                this._quadTree.Update(gameTime);

                // Determine colliding objects
                for (var i = 0; i < this._nonStaticCollidables.length; i++) {
                    collidable = this._nonStaticCollidables[i];
                    candidates = this._quadTree.CollisionCandidates(collidable);

                    for (var j = 0; j < candidates.length; j++) {
                        // If we're colliding with someone else
                        if (collidable._id !== candidates[j]._id && collidable.IsCollidingWith(candidates[j])) {
                            colliding.push([collidable, candidates[j]]);
                        }
                    }
                }

                // Dispatch collision events
                for (var i = 0; i < colliding.length; i++) {
                    hash = this.HashIds(colliding[i][0], colliding[i][1]);

                    if (!cacheMap[hash]) {
                        cacheMap[hash] = true;

                        colliding[i][0].Collided(new CollisionData(colliding[i][1]));
                        colliding[i][1].Collided(new CollisionData(colliding[i][0]));

                        this.OnCollision.Trigger(colliding[i][0], colliding[i][1]);
                    }
                }
            }
        }

        /**
        * Destroys removes all monitored collidables and destroys the collision manager.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;

                for (var i = 0; i < this._collidables.length; i++) {
                    this.Unmonitor(this._collidables[i].Collidable);
                }

                this._collidables = [];
                this._nonStaticCollidables = [];
                this._onCollision.Dispose();
                this._quadTree = null;
            }
            else {
                throw new Error("CollisionManager cannot be disposed more than once");
            }
        }

        private HashIds(c1: Collidable, c2: Collidable): string {
            return Math.min(c1._id, c2._id).toString() + Math.max(c2._id, c1._id).toString();
        }

    }

}