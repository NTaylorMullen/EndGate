/// <reference path="../Interfaces/ITyped.d.ts" />

module EndGate.Graphics.Assets {

    export class Graphic2dState implements _.ITyped {
        public _type: string ="Graphic2dState";

        private _cachedState: { [property: string]: any; };

        constructor() {
            this._cachedState = {};
        }
        
        public StrokeStyle(value?: string): string {
            return this.GetOrSetCache("strokeStyle", value);
        }

        public FillStyle(value?: string): string {
            return this.GetOrSetCache("fillStyle", value);
        }

        public GlobalAlpha(value?: number): number {
            return this.GetOrSetCache("globalAlpha", value);
        }

        public LineWidth(value?: number): number {
            return this.GetOrSetCache("lineWidth", value);
        }

        public LineCap(value?: string): string {
            return this.GetOrSetCache("lineCap", value);
        }

        public LineJoin(value?: string): string {
            return this.GetOrSetCache("lineJoin", value);
        }

        public MiterLimit(value?: number): number {
            return this.GetOrSetCache("miterLimit", value);
        }
        
        public ShadowOffsetX(value?: number): number {
            return this.GetOrSetCache("shadowOffsetX", value);
        }

        public ShadowOffsetY(value?: number): number {
            return this.GetOrSetCache("shadowOffsetY", value);
        }

        public ShadowBlur(value?: number): number {
            return this.GetOrSetCache("shadowBlur", value);
        }

        public ShadowColor(value?: string): string {
            return this.GetOrSetCache("shadowColor", value);
        }

        public GlobalCompositeOperation(value?: string): string {
            return this.GetOrSetCache("globalCompositeOperation", value);
        }

        public Font(value?: string): string {
            return this.GetOrSetCache("font", value);
        }

        public TextAlign(value?: string): string {
            return this.GetOrSetCache("textAlign", value);
        }

        public TextBaseline(value?: string): string {
            return this.GetOrSetCache("textBaseline", value);
        }

        public SetContextState(context: CanvasRenderingContext2D): void {
            for (var key in this._cachedState) {
                context[key] = this._cachedState[key];
            }
        }

        private GetOrSetCache(property: string, value: any): any {
            if (typeof value !== "undefined") {
                this._cachedState[property] = value;
            }

            return this._cachedState[property];
        }
    }

}