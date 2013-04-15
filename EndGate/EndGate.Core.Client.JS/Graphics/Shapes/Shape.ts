/// <reference path="../Graphic2d.ts" />

module EndGate.Core.Graphics.Shapes  {

    export class Shape extends Graphic2d {
        public _type: string = "Shape";

        constructor(position: Assets.Vector2d, size: Assets.Size2d, color?: string) {
            super(position, size);

            if (typeof color !== "undefined") {
                this.Color(color);
            }
        }

        public Color(color: string): string {
            return this.State.FillStyle(color);
        }
    }
}