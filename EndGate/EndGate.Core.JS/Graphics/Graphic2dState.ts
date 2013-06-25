/// <reference path="../Interfaces/ITyped.ts" />

module eg.Graphics.Assets._ {

    export class Graphic2dState {
        private _cachedState: { [property: string]: any; };

        constructor() {
            this._cachedState = {};
        }

        public get StrokeStyle(): string {
            return this._cachedState["strokeStyle"];
        }
        public set StrokeStyle(value: string) {
            this._cachedState["strokeStyle"] = value
        }

        public get FillStyle(): string {
            return this._cachedState["fillStyle"];
        }
        public set FillStyle(value: string) {
            this._cachedState["fillStyle"] = value;
        }

        public get GlobalAlpha(): number {
            return this._cachedState["globalAlpha"];
        }
        public set GlobalAlpha(value: number) {
            this._cachedState["globalAlpha"] = value;
        }

        public get LineWidth(): number {
            return this._cachedState["lineWidth"];
        }
        public set LineWidth(value: number) {
            this._cachedState["lineWidth"] = value;
        }

        public get LineCap(): string {
            return this._cachedState["lineCap"];
        }
        public set LineCap(value: string) {
            this._cachedState["lineCap"] = value;
        }

        public get LineJoin(): string {
            return this._cachedState["lineJoin"];
        }
        public set LineJoin(value: string) {
            this._cachedState["lineJoin"] = value;
        }

        public get MiterLimit(): number {
            return this._cachedState["miterLimit"];
        }
        public set MiterLimit(value: number) {
            this._cachedState["miterLimit"] = value;
        }

        public get ShadowOffsetX(): number {
            return this._cachedState["shadowOffsetX"];
        }
        public set ShadowOffsetX(value: number) {
            this._cachedState["shadowOffsetX"] = value;
        }

        public get ShadowOffsetY(): number {
            return this._cachedState["shadowOffsetY"];
        }
        public set ShadowOffsetY(value: number) {
            this._cachedState["shadowOffsetY"] = value;
        }

        public get ShadowBlur(): number {
            return this._cachedState["shadowBlur"];
        }
        public set ShadowBlur(value: number) {
            this._cachedState["shadowBlur"] = value;
        }

        public get ShadowColor(): string {
            return this._cachedState["shadowColor"];
        }
        public set ShadowColor(value: string) {
            this._cachedState["shadowColor"] = value;
        }

        public get GlobalCompositeOperation(): string {
            return this._cachedState["globalCompositeOperation"];
        }
        public set GlobalCompositeOperation(value: string) {
            this._cachedState["globalCompositeOperation"] = value;
        }

        public get Font(): string {
            return this._cachedState["font"];
        }
        public set Font(value: string) {
            this._cachedState["font"] = value;
        }

        public get TextAlign(): string {
            return this._cachedState["textAlign"];
        }
        public set TextAlign(value: string) {
            this._cachedState["textAlign"] = value;
        }

        public get TextBaseline(): string {
            return this._cachedState["textBaseline"];
        }
        public set TextBaseline(value: string) {
            this._cachedState["textBaseline"] = value;
        }

        public SetContextState(context: CanvasRenderingContext2D): void {
            for (var key in this._cachedState) {
                context[key] = this._cachedState[key];
            }
        }
    }

}