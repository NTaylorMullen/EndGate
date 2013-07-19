/// <reference path="Assets/Sizes/Size2d.ts" />
/// <reference path="Collision/CollisionConfiguration.ts" />

module EndGate {

    /**
    * Defines a GameConfiguration object that is used to represent the current state of a Game object.
    */
    export class GameConfiguration {
        private _defaultUpdateRate: number = 40;
        private _updateRateSetter: (updateRate: number) => void;
        private _updateRate: number;
        private _collisionConfiguration: Collision.CollisionConfiguration;

        /**
        * Creates a new instance of the GameConfiguration object.
        * @param updateRateSetter A function that updates the rate of "Update" execution.
        */
        constructor(updateRateSetter: (updateRate: number) => void, initialQuadTreeSize: Size2d) {
            this._updateRateSetter = updateRateSetter;
            this._updateRate = this._defaultUpdateRate;
            this._collisionConfiguration = new Collision.CollisionConfiguration(initialQuadTreeSize);
        }

        /**
        * Gets or sets the UpdateRate of the game.  Update rates are represented as X many updates per second.
        */
        public get UpdateRate(): number {
            return this._updateRate;
        }
        public set UpdateRate(updateRate: number) {
            this._updateRate = updateRate;
            this._updateRateSetter(this._updateRate);
        }

        /**
        * Gets the CollisionConfiguration of the game.  These configurations are used to optimize the collision management performance.
        */
        public get CollisionConfiguration(): Collision.CollisionConfiguration {
            return this._collisionConfiguration;
        }
    }

}