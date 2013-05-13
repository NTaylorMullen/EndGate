/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../Graphic2d.ts" />
/// <reference path="../Line2d.ts" />

module EndGate.Graphics {

    export class Grid extends Abstractions.Graphic2d {
        public _type: string = "Grid";

        private _size: Size2d;
        private _tileSize: Size2d;
        private _grid: Abstractions.Graphic2d[][];
        private _gridLines: Line2d[];
        private _positionOffset: Vector2d;
        private _rows: number;
        private _columns: number;
        private _drawGridLines: bool;
        private _gridLineColor: string;

        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines?: bool = false, color?: string = "gray") {
            super(new Vector2d(x, y));
            var halfSize: Size2d,
                topLeft: Vector2d,
                bottomRight: Vector2d;

            this._size = new Size2d(tileWidth * columns, tileHeight * rows);
            this._tileSize = new Size2d(tileWidth, tileHeight);
            this._grid = [];
            this._rows = rows;
            this._columns = columns;
            this._drawGridLines = drawGridLines;
            this._gridLines = [];

            halfSize = this._size.Multiply(.5);
            topLeft = new Vector2d(-halfSize.Width, -halfSize.Height);
            bottomRight = new Vector2d(halfSize.Width, halfSize.Height);

            for (var i = 0; i < rows; i++) {
                this._grid[i] = [];
                this._gridLines.push(new Line2d(topLeft.X, topLeft.Y + i * this._tileSize.Height, bottomRight.X, topLeft.Y + i * this._tileSize.Height, 1));

                for (var j = 0; j < columns; j++) {
                    if (i === 0) {
                        this._gridLines.push(new Line2d(topLeft.X + j * this._tileSize.Width, topLeft.Y, topLeft.X + j * this._tileSize.Width, bottomRight.Y, 1));
                    }

                    this._grid[i].push(null);
                }
            }

            this._gridLines.push(new Line2d(topLeft.X, bottomRight.Y, bottomRight.X, bottomRight.Y, 1));
            this._gridLines.push(new Line2d(bottomRight.X, topLeft.Y, bottomRight.X, bottomRight.Y, 1));

            this.Color(color);
        }

        public Color(color?: string): string {
            if (typeof color !== "undefined") {
                this._gridLineColor = color;

                for (var i = 0; i < this._gridLines.length; i++) {
                    this._gridLines[i].Color(color);
                }
            }

            return this._gridLineColor;
        }

        public Size(): Size2d {
            return this._size.Clone();
        }

        public TileSize(): Size2d {
            return this._tileSize.Clone();
        }

        public Rows(): number {
            return this._rows;
        }

        public Columns(): number {
            return this._columns;
        }

        public Opacity(alpha?: number): number {
            return this.State.GlobalAlpha(alpha);
        }

        public Fill(row: number, column: number, graphic: Abstractions.Graphic2d): void {
            if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                return;
            }

            row--;
            column--;
            graphic.Position = this.GetInsideGridPosition(row, column);

            this._grid[row][column] = graphic;
            this.AddChild(graphic);
        }

        public FillSpace(row: number, column: number, graphicList: Abstractions.Graphic2d[][]): void {
            var graphic: Abstractions.Graphic2d;

            row--;
            column--;

            for (var i = 0; i < graphicList.length; i++) {
                for (var j = 0; j < graphicList[i].length; j++) {
                    graphic = graphicList[i][j];
                    if (graphic) {
                        graphic.Position = this.GetInsideGridPosition(i + row, j + column);

                        this._grid[i + row][j + column] = graphic;
                        this.AddChild(graphic);
                    }
                }
            }
        }

        public FillRow(row: number, graphicList: Abstractions.Graphic2d[], offset?: number = 0): void {
            var graphic: Abstractions.Graphic2d;

            row--;

            for (var i = 0; i < graphicList.length; i++) {
                graphic = graphicList[i];
                graphic.Position = this.GetInsideGridPosition(row, i + offset);

                this._grid[row][i + offset] = graphic;
                this.AddChild(graphic);
            }
        }

        public FillColumn(column: number, graphicList: Abstractions.Graphic2d[], offset?: number = 0): void {
            var graphic: Abstractions.Graphic2d;

            column--;

            for (var i = 0; i < graphicList.length; i++) {
                graphic = graphicList[i];
                graphic.Position = this.GetInsideGridPosition(i + offset, column);

                this._grid[i + offset][column] = graphic;
                this.AddChild(graphic);
            }
        }

        public Get(row: number, column: number): Abstractions.Graphic2d {
            if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                return null;
            }

            return this._grid[row - 1][column - 1];
        }

        public GetColumn(column: number): Abstractions.Graphic2d[]{
            var columnList: Abstractions.Graphic2d[] = [];

            column--;

            for (var i = 0; i < this._rows; i++) {
                columnList.push(this._grid[i][column]);
            }

            return columnList;
        }

        public GetRow(row: number): Abstractions.Graphic2d[] {
            var rowList: Abstractions.Graphic2d[] = [];

            row--;

            for (var i = 0; i < this._columns; i++) {
                rowList.push(this._grid[row][i]);
            }

            return rowList;
        }

        public GetSpace(rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): Abstractions.Graphic2d[]{
            var space: Abstractions.Graphic2d[] = [],
                rowIncrementor = (rowEnd >= rowStart) ? 1 : -1,
                columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;

            for (var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                if (i > this._rows) {
                    break;
                }

                for (var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                    if (j > this._columns) {
                        break;
                    }

                    space.push(this._grid[i - 1][j - 1]);
                }
            }

            return space;
        }

        public Clear(row: number, column: number): Abstractions.Graphic2d {
            if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                return null;
            }
            
            var val = this._grid[row - 1][column - 1];

            this._grid[row - 1][column - 1] = null;
            this.RemoveChild(val);

            return val;
        }

        public ClearRow(row: number): Abstractions.Graphic2d[] {
            var vals: Abstractions.Graphic2d[] = [];

            row--;

            for (var i = 0; i < this._columns; i++) {
                vals.push(this._grid[row][i]);
                this.RemoveChild(this._grid[row][i]);
                this._grid[row][i] = null;
            }

            return vals;
        }

        public ClearColumn(column: number): Abstractions.Graphic2d[] {
            var vals: Abstractions.Graphic2d[] = [];

            column--;

            for (var i = 0; i < this._rows; i++) {
                vals.push(this._grid[i][column]);
                this.RemoveChild(this._grid[i][column]);
                this._grid[i][column] = null;
            }

            return vals;
        }

        public ClearSpace (rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): Abstractions.Graphic2d[] {
            var space: Abstractions.Graphic2d[] = [],
                rowIncrementor = (rowEnd >= rowStart) ? 1 : -1,
                columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;

            for (var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                if (i > this._rows) {
                    break;
                }

                for (var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                    if (j > this._columns) {
                        break;
                    }

                    space.push(this._grid[i - 1][j - 1]);
                    this.RemoveChild(this._grid[i - 1][j - 1]);
                    this._grid[i - 1][j - 1] = null;
                }
            }

            return space;
        }

        public Draw(context: CanvasRenderingContext2D): void {
            super.StartDraw(context);            

            context.save();
            super.EndDraw(context);

            if (this._drawGridLines) {
                for (var i = 0; i < this._gridLines.length; i++) {
                    this._gridLines[i].Draw(context);
                }
            }
            context.restore();
        }

        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, this._size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }

        public ConvertToRow(y: number): number {
            return Math.floor(1 + (y - (this.Position.Y - this._size.HalfHeight())) / this._tileSize.Height);
        }

        public ConvertToColumn(x: number): number {
            return Math.floor(1 + (x - (this.Position.X - this._size.HalfWidth())) / this._tileSize.Width);
        }

        private GetInsideGridPosition(row: number, column: number): Vector2d {
            return new Vector2d(column * this._tileSize.Width - this._size.HalfWidth() + this._tileSize.HalfWidth(), row * this._tileSize.Height - this._size.HalfHeight() + this._tileSize.HalfHeight());
        }

        private ValidRow(row: number): bool {
            return row > 0 && row <= this._rows;
        }

        private ValidColumn(column: number): bool {
            return column > 0 && column <= this._columns;
        }
    }

}