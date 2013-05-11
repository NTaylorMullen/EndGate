/// <reference path="../GameTime.ts" />

module EndGate {

    export interface IUpdateable {
        Update(gameTime: EndGate.GameTime): void;
    }

}