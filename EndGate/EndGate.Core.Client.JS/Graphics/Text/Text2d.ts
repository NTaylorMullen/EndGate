/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Graphic2d.ts" />
/// <reference path="../../Utilities/NoopTripInvoker.ts" />

module EndGate.Core.Graphics.Text {

    export class Text2d extends Graphic2d {
        private _text: string;
        private _stroker: Utilities.NoopTripInvoker;

        constructor(position: Assets.Vector2d, text: string, color: string = "black") {
            super(position);

            this._text = text;
            this._stroker = new Utilities.NoopTripInvoker((context: CanvasRenderingContext2D) => {
                context.strokeText(this._text, this.Position.X, this.Position.Y);
            });

            this.Align("center");
            this.Baseline("middle");
            this.Color(color);
        }

        public Align(alignment?: string): string {
            return this.State.TextAlign(alignment);
        }

        public Baseline(baseline?: string): string {
            return this.State.TextBaseline(baseline);
        }

        public Color(color?: string): string {
            return this.State.FillStyle(color);
        }

        public Font(font: string): string {
            return this.State.Font(font);
        }

        public Text(text?: string): string {
            if (typeof text !== "undefined") {
                this._text = text;
            }

            return this._text;
        }

        public Border(thickness?: number, color?: string): any[] {
            return [this.BorderThickness(thickness), this.BorderColor(color)];
        }

        public BorderThickness(thickness?: number): number {
            if (thickness === 0) {
                this._stroker.Reset();
            }
            else {
                this._stroker.Trip();
            }

            return this.State.LineWidth(thickness);
        }

        public BorderColor(color?: string): string {
            this._stroker.Trip();
            return this.State.StrokeStyle(color);
        }

        public Draw(context: CanvasRenderingContext2D): void {
            super.StartDraw(context);

            context.fillText(this._text, this.Position.X, this.Position.Y);
            this._stroker.Invoke(context);

            super.EndDraw(context);
        }
    }

}