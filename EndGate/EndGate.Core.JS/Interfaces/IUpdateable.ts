/// <reference path="../GameTime.ts" />

declare module EndGate {

    export interface IUpdateable {
        Update(gameTime: EndGate.GameTime): void;
    }

}