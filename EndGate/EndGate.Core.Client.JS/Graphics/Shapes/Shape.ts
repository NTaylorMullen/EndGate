/// <reference path="../Graphic2d.ts" />

module EndGate.Core.Graphics.Shapes  {

    export class Shape extends Graphic2d {
        public _type: string = "Shape";
        private _fill: bool;
        private _stroke: bool;

        constructor(position: Assets.Vector2d, size: Assets.Size2d, color?: string) {
            super(position, size);

            this._fill = false;
            this._stroke = false;

            if (typeof color !== "undefined") {
                this.Color(color);
            }
        }

        public Color(color?: string): string {
            this._fill = true;
            return this.State.FillStyle(color);
        }

        public BorderColor(color?: string): string {
            this._stroke = true;
            return this.State.StrokeStyle(color);
        }

        public BorderThickness(thickness?: number): number {
            return this.State.LineWidth(thickness);
        }

        public Opacity(alpha?: number): number {
            return this.State.GlobalAlpha(alpha);
        }

        public StartDraw(context: CanvasRenderingContext2D): void {
            context.beginPath();

            super.StartDraw(context);
        }

        public EndDraw(context: CanvasRenderingContext2D): void {
            if (this._fill) {
                context.fill();
            }
            
            if (this._stroke) {
                context.stroke();
            }
            else {
                context.closePath();
            }

            super.EndDraw(context);
        }
    }
}