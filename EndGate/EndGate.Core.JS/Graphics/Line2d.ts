/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Bounds/BoundingRectangle.ts" />
/// <reference path="Graphic2d.ts" />

module EndGate.Graphics {

    export class Line2d extends Abstractions.Graphic2d {
        public _type: string = "Line2d";

        private _from: Vector2d;
        private _to: Vector2d;
        private _difference: Vector2d;
        private _boundsWidth: number;
        private _cachedPosition: Vector2d;

        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth?: number = 1, color?: string) {
            super(Vector2d.Zero());// Set to zero here then updated in the rest of the constructor (use same logic)

            this._from = new Vector2d(fromX, fromY);
            this._to = new Vector2d(toX, toY);
            this.LineWidth(lineWidth);
            this.UpdatePosition();

            if (typeof color !== "undefined") {
                this.Color(color);
            }
        }

        public From(newPosition?: Vector2d): Vector2d {
            return this.GetOrSetLinePoint("from", newPosition);
        }

        public To(newPosition?: Vector2d): Vector2d {
            return this.GetOrSetLinePoint("to", newPosition);
        }

        public Color(color?: string): string {
            return this.State.StrokeStyle(color);
        }

        public LineWidth(width?: number): number {
            return this.State.LineWidth(width);
        }

        public LineCap(cap?: string): string {
            return this.State.LineCap(cap);
        }

        public Draw(context: CanvasRenderingContext2D): void {
            super._StartDraw(context);

            // Check if the user has modified the position directly, if so we need to translate the from and to positions accordingly
            if (!this._cachedPosition.Equivalent(this.Position)) {
                this.RefreshCache();
            }

            // Context origin is at the center point of the line
            context.beginPath();
            context.moveTo(this._from.X - this.Position.X, this._from.Y - this.Position.Y);
            context.lineTo(this._to.X - this.Position.X, this._to.Y - this.Position.Y);
            context.stroke();

            super._EndDraw(context);
        }

        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, new Size2d(this._boundsWidth, this.LineWidth()));

            bounds.Rotation = Math.atan2(this._difference.Y, this._difference.X) + this.Rotation;

            return bounds;
        }

        private UpdatePosition(): void {
            this.Position = ((this._from.Add(this._to)).Divide(2));
            this._difference = this._to.Subtract(this._from);
            this._boundsWidth = this._from.Distance(this._to).Length();
            this._cachedPosition = this.Position.Clone();
        }

        private RefreshCache(): void {
            var difference = this.Position.Subtract(this._cachedPosition);
            this._from.X += difference.X;
            this._from.Y += difference.Y;
            this._to.X += difference.X;
            this._to.Y += difference.Y;
            this._cachedPosition = this.Position.Clone();
        }

        private GetOrSetLinePoint(name: string, newPosition?: Vector2d): Vector2d {
            if (typeof newPosition === "undefined") {
                this["_" + name] = newPosition;
                this.UpdatePosition();
            }

            return this["_" + name];
        }
    }

}