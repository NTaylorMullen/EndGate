/// <reference path="Assets/Sizes/Size2d.ts" />
/// <reference path="Collision/CollisionConfiguration.ts" />

module EndGate {

    /**
    * Defines a GameConfiguration object that is used to represent the current state of a Game object.
    */
    export class GameConfiguration {
        /**
        * Indicates whether the game will only draw after an update.  If there are graphic modifications outside of the game update loop this should be set to 'false' to ensure the latest data is always drawn to the game screen.
        */
        public DrawOnlyAfterUpdate: boolean;

        private _defaultUpdateRate: number = 65;
        private _updateRateSetter: (updateRate: number) => void;
        private _updateRate: number;
        private _collisionConfiguration: Collision.CollisionConfiguration;

        /**
        * Creates a new instance of the GameConfiguration object.
        * @param updateRateSetter A function that updates the rate of "Update" execution.
        */
        constructor(updateRateSetter: (updateRate: number) => void , initialQuadTreeSize: Size2d) {
            this.DrawOnlyAfterUpdate = true;

            this._updateRateSetter = updateRateSetter;
            this.UpdateRate = this._defaultUpdateRate;
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