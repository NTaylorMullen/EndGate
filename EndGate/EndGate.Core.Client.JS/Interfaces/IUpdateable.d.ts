/// <reference path="../GameTime.ts" />

module EndGate.Core {

    export interface IUpdateable {
        Update(gameTime: EndGate.Core.GameTime): void;
    }

}