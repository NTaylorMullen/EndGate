/// <reference path="../../BoundingObject/Bounds2d.ts" />
/// <reference path="../Graphic2d.ts" />

module EndGate.Core.Graphics.Shapes  {

    export class Shape extends Graphic2d {
        public _type: string = "Shape";
        private _fill: bool;
        private _stroke: bool;

        constructor(bounds: BoundingObject.Bounds2d, color?: string) {
            super(bounds);

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
        
        public Border(thickness?: number, color?: string): any[]{
            return [this.BorderThickness(thickness), this.BorderColor(color)];
        }

        public BorderThickness(thickness?: number): number {
            return this.State.LineWidth(thickness);
        }

        public BorderColor(color?: string): string {
            this._stroke = true;
            return this.State.StrokeStyle(color);
        }

        public Shadow(x?: number, y?: number, color?: string, blur?: number): any[] {
            return [this.ShadowX(x), this.ShadowY(y), this.ShadowColor(color), this.ShadowBlur(blur)];
        }

        public ShadowColor(color?: string): string {
            this._fill = true;
            return this.State.ShadowColor(color);
        }

        public ShadowX(val?: number): number {
            return this.State.ShadowOffsetX(val);
        }

        public ShadowY(val?: number): number {
            return this.State.ShadowOffsetY(val);
        }

        public ShadowBlur(val?: number): number {
            return this.State.ShadowBlur(val);
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

        // This should be overridden if you want to build a proper shape
        public BuildPath(context: CanvasRenderingContext2D): void {
        }

        // You can override this Draw if you want to implement your own logic for applying styles and drawing (do not recommend overriding)
        public Draw(context: CanvasRenderingContext2D): void {
            this.StartDraw(context);
            this.BuildPath(context);
            this.EndDraw(context);
        }
    }
}