/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../Graphic2d.ts" />
/// <reference path="../Line2d.ts" />

module EndGate.Graphics {

    /**
    * Defines a drawable grid that can be used to store other graphics in a grid like structure.
    */
    export class Grid extends Graphic2d {
        public _type: string = "Grid";

        private _size: Size2d;
        private _tileSize: Size2d;
        private _grid: Graphic2d[][];
        private _gridLines: Line2d[];
        private _positionOffset: Vector2d;
        private _rows: number;
        private _columns: number;
        private _gridLineColor: string;
        private _drawGridLines: boolean;

        /**
        * Creates a new instance of the Grid object.
        * @param x Initial horizontal location of the grid.
        * @param y Initial vertical location of the grid.
        * @param rows Number of rows the grid will have (this cannot change after construction).
        * @param columns Number of columns the grid will have (this cannot change after construction).
        * @param tileWidth The width of the grid tiles (this cannot change after construction).
        * @param tileHeight The height of the grid tiles (this cannot change after construction).
        */
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number);
        /**
        * Creates a new instance of the Grid object.
        * @param x Initial horizontal location of the grid.
        * @param y Initial vertical location of the grid.
        * @param rows Number of rows the grid will have (this cannot change after construction).
        * @param columns Number of columns the grid will have (this cannot change after construction).
        * @param tileWidth The width of the grid tiles (this cannot change after construction).
        * @param tileHeight The height of the grid tiles (this cannot change after construction).
        * @param drawGridLines Initial value for DrawGridLines.
        */
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines: boolean);
        /**
        * Creates a new instance of the Grid object.
        * @param x Initial horizontal location of the grid.
        * @param y Initial vertical location of the grid.
        * @param rows Number of rows the grid will have (this cannot change after construction).
        * @param columns Number of columns the grid will have (this cannot change after construction).
        * @param tileWidth The width of the grid tiles (this cannot change after construction).
        * @param tileHeight The height of the grid tiles (this cannot change after construction).
        * @param drawGridLines Initial value for DrawGridLines.
        * @param gridLineColor Initial grid line color (only useful if drawGridLines is true); 
        */
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines: boolean, gridLineColor: string);
        constructor(x: number, y: number, rows: number, columns: number, tileWidth: number, tileHeight: number, drawGridLines: boolean = false, gridLineColor: string = "gray") {
            super(new Vector2d(x, y));

            this._size = new Size2d(tileWidth * columns, tileHeight * rows);
            this._tileSize = new Size2d(tileWidth, tileHeight);
            this._grid = [];
            this._rows = rows;
            this._columns = columns;
            this._gridLines = [];
            this.GridLineColor = gridLineColor;
            this.DrawGridLines = drawGridLines;

            // Initialize our grid
            for (var i = 0; i < this._rows; i++) {
                this._grid[i] = [];

                for (var j = 0; j < this._columns; j++) {
                    this._grid[i].push(null);
                }
            }
        }

        /**
        * Gets or sets the DrawGridLines property.  Indicates whether the grids column and row lines will be drawn.
        */
        public get DrawGridLines(): boolean {
            return this._drawGridLines;
        }
        public set DrawGridLines(shouldDraw: boolean) {
            if (shouldDraw && this._gridLines.length === 0) {
                this.BuildGridLines();
            }

            this._drawGridLines = shouldDraw;
        }

        /**
        * Gets or sets the current grid line color.  Grid lines are only drawn of DrawGridLines is set to true.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get GridLineColor(): string {
            return this._gridLineColor;
        }
        public set GridLineColor(color: string) {
            this._gridLineColor = color;

            for (var i = 0; i < this._gridLines.length; i++) {
                this._gridLines[i].Color = color;
            }
        }

        /**
        * Gets the size of the grid.
        */
        public get Size(): Size2d {
            return this._size.Clone();
        }

        /**
        * Gets the size of the tiles.
        */
        public get TileSize(): Size2d {
            return this._tileSize.Clone();
        }

        /**
        * Gets the number of rows.
        */
        public get Rows(): number {
            return this._rows;
        }

        /**
        * Gets the number of columns.
        */
        public get Columns(): number {
            return this._columns;
        }

        /**
        * Fills a tile with the provided graphic.
        * @param row The row.
        * @param column The column.
        * @param graphic The graphic to fill the tile with.
        */
        public Fill(row: number, column: number, graphic: Graphic2d): void {
            if (!graphic || !this.ValidRow(row) || !this.ValidColumn(column)) {
                return;
            }

            graphic.Position = this.GetInsideGridPosition(row, column);

            this._grid[row][column] = graphic;
            this.AddChild(graphic);
        }

        /**
        * Fills a row with the provided graphics
        * @param row The row to fill.
        * @param graphicList The list of graphics to fill the row with.  The row will be filled with as many elements that are contained within the graphicList.
        */
        public FillRow(row: number, graphicList: Graphic2d[]): void;
        /**
        * Fills a row with the provided graphics starting at the provided column
        * @param row The row to fill.
        * @param graphicList The list of graphics to fill the row with.  The row will be filled with as many elements that are contained within the graphicList.
        * @param columnOffset The column to start filling at.
        */
        public FillRow(row: number, graphicList: Graphic2d[], columnOffset: number): void;
        public FillRow(row: number, graphicList: Graphic2d[], columnOffset: number = 0): void {
            var graphic: Graphic2d;

            for (var i = 0; i < graphicList.length; i++) {
                graphic = graphicList[i];
                graphic.Position = this.GetInsideGridPosition(row, i + columnOffset);

                this._grid[row][i + columnOffset] = graphic;
                this.AddChild(graphic);
            }
        }

        /**
        * Fills a column with the provided graphics
        * @param column The column to fill.
        * @param graphicList The list of graphics to fill the column with.  The column will be filled with as many elements that are contained within the graphicList.
        */
        public FillColumn(column: number, graphicList: Graphic2d[]): void;
        /**
        * Fills a column with the provided graphics starting at the provided row.
        * @param column The column to fill.
        * @param graphicList The list of graphics to fill the column with.  The column will be filled with as many elements that are contained within the graphicList.
        * @param rowOffset The row to start filling at.
        */
        public FillColumn(column: number, graphicList: Graphic2d[], rowOffset: number): void;
        public FillColumn(column: number, graphicList: Graphic2d[], rowOffset: number = 0): void {
            var graphic: Graphic2d;

            for (var i = 0; i < graphicList.length; i++) {
                graphic = graphicList[i];
                graphic.Position = this.GetInsideGridPosition(i + rowOffset, column);

                this._grid[i + rowOffset][column] = graphic;
                this.AddChild(graphic);
            }
        }

        /**
        * Fills a tile with the provided graphic.
        * @param row The row to start filling at.
        * @param column The column to start filling at.
        * @param graphicList The list of graphics to fill the space with.  The space will be filled with as many elements that are contained within the multi-dimensional graphicList.
        */
        public FillSpace(row: number, column: number, graphicList: Graphic2d[][]): void {
            var graphic: Graphic2d;

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

        /**
        * Gets a graphic within the grid.
        * @param row The row.
        * @param column The column.
        */
        public Get(row: number, column: number): Graphic2d {
            if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                return null;
            }

            return this._grid[row][column];
        }

        /**
        * Retrieves graphics within the provided row.
        * @param row The row to retrieve.
        */
        public GetRow(row: number): Graphic2d[];
        /**
        * Retrieves graphics within the row starting at the provided column offset.
        * @param row The row to retrieve.
        * @param columnOffset The column to start retrieving the row at.
        */
        public GetRow(row: number, columnOffset: number): Graphic2d[];
        public GetRow(row: number, columnOffset: number = 0): Graphic2d[] {
            var rowList: Graphic2d[] = [];

            for (var i = columnOffset; i < this._columns; i++) {
                rowList.push(this._grid[row][i]);
            }

            return rowList;
        }

        /**
        * Retrieves graphics within the provided column.
        * @param column The column to retrieve.
        */
        public GetColumn(column: number): Graphic2d[];
        /**
        * Retrieves graphics within the column starting at the provided row offset.
        * @param column The column to retrieve.
        * @param rowOffset The row to start retrieving the column at.
        */
        public GetColumn(column: number, rowOffset: number): Graphic2d[];
        public GetColumn(column: number, rowOffset: number = 0): Graphic2d[] {
            var columnList: Graphic2d[] = [];

            for (var i = rowOffset; i < this._rows; i++) {
                columnList.push(this._grid[i][column]);
            }

            return columnList;
        }

        /**
        * Retrieves graphics within row column cross section.
        * @param rowStart The row to start pulling graphics from.
        * @param columnStart The column to start pulling graphics from.
        * @param rowEnd The row to stop pulling graphics from.
        * @param columnEnd The column to stop pulling graphics from.
        */
        public GetSpace(rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): Graphic2d[] {
            var space: Graphic2d[] = [],
                rowIncrementor = (rowEnd >= rowStart) ? 1 : -1,
                columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;

            for (var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                if (i >= this._rows) {
                    break;
                }

                for (var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                    if (j >= this._columns) {
                        break;
                    }

                    space.push(this._grid[i][j]);
                }
            }

            return space;
        }

        /**
        * Clear a grid tile.
        * @param row The row.
        * @param column The column.
        */
        public Clear(row: number, column: number): Graphic2d {
            if (!this.ValidRow(row) || !this.ValidColumn(column)) {
                return null;
            }

            var val = this._grid[row][column];

            this._grid[row][column] = null;
            this.RemoveChild(val);

            return val;
        }

        /**
        * Clears graphics within the provided row.
        * @param row The row to clear.
        */
        public ClearRow(row: number): Graphic2d[];
        /**
        * Clears graphics within the row starting at the provided column offset.
        * @param row The row to clear.
        * @param columnOffset The column to start clearing the row at.
        */
        public ClearRow(row: number, columnOffset: number): Graphic2d[];
        public ClearRow(row: number, columnOffset: number = 0): Graphic2d[] {
            var vals: Graphic2d[] = [];

            for (var i = 0; i < this._columns; i++) {
                vals.push(this._grid[row][i]);
                this.RemoveChild(this._grid[row][i]);
                this._grid[row][i] = null;
            }

            return vals;
        }

        /**
        * Clears graphics within the provided column.
        * @param column The column to clear.
        */
        public ClearColumn(column: number): Graphic2d[];
        /**
        * Clears graphics within the column starting at the provided column offset.
        * @param column The column to clear.
        * @param rowOffset The row to start clearing the column at.
        */
        public ClearColumn(column: number, rowOffset: number): Graphic2d[];
        public ClearColumn(column: number, rowOffset: number = 0): Graphic2d[] {
            var vals: Graphic2d[] = [];

            for (var i = 0; i < this._rows; i++) {
                vals.push(this._grid[i][column]);
                this.RemoveChild(this._grid[i][column]);
                this._grid[i][column] = null;
            }

            return vals;
        }

        /**
        * Clears graphics within row column cross section.
        * @param rowStart The row to start clearing graphics from.
        * @param columnStart The column to start clearing graphics from.
        * @param rowEnd The row to stop clearing graphics from.
        * @param columnEnd The column to stop clearing graphics from.
        */
        public ClearSpace(rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): Graphic2d[] {
            var space: Graphic2d[] = [],
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

                    space.push(this._grid[i][j]);
                    this.RemoveChild(this._grid[i][j]);
                    this._grid[i][j] = null;
                }
            }

            return space;
        }

        /**
        * Draws the grid onto the given context.  If this grid is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the grid onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            super._StartDraw(context);

            context.save();
            super._EndDraw(context);

            if (this.DrawGridLines) {
                for (var i = 0; i < this._gridLines.length; i++) {
                    this._gridLines[i].Draw(context);
                }
            }
            context.restore();
        }

        /**
        * The bounding area that represents where the grid will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, this._size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }

        /**
        * Scale is not implemented.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void {
            throw new Error("Scale is not implemented for the Grid class.");
        }

        /**
        * Converts the provided vertical coordinate to a row number that is based on the current grid.
        * @param y The vertical coordinate to convert to a row.
        */
        public ConvertToRow(y: number): number {
            return Math.floor((y - (this.Position.Y - this._size.HalfHeight)) / this._tileSize.Height);
        }

        /**
        * Converts the provided horizontal coordinate to a column number that is based on the current grid.
        * @param x The horizontal component to convert to a column.
        */
        public ConvertToColumn(x: number): number {
            return Math.floor((x - (this.Position.X - this._size.HalfWidth)) / this._tileSize.Width);
        }

        private BuildGridLines(): void {
            var halfSize: Size2d = this._size.Multiply(.5),
                topLeft: Vector2d = new Vector2d(-halfSize.Width, -halfSize.Height),
                bottomRight: Vector2d = new Vector2d(halfSize.Width, halfSize.Height);

            for (var i = 0; i < this._rows; i++) {
                this._gridLines.push(new Line2d(topLeft.X, topLeft.Y + i * this._tileSize.Height, bottomRight.X, topLeft.Y + i * this._tileSize.Height, 1, this._gridLineColor));

                if (i === 0) {
                    for (var j = 0; j < this._columns; j++) {
                        this._gridLines.push(new Line2d(topLeft.X + j * this._tileSize.Width, topLeft.Y, topLeft.X + j * this._tileSize.Width, bottomRight.Y, 1, this._gridLineColor));
                    }
                }
            }

            this._gridLines.push(new Line2d(topLeft.X, bottomRight.Y, bottomRight.X, bottomRight.Y, 1));
            this._gridLines.push(new Line2d(bottomRight.X, topLeft.Y, bottomRight.X, bottomRight.Y, 1));
        }

        private GetInsideGridPosition(row: number, column: number): Vector2d {
            return new Vector2d(column * this._tileSize.Width - this._size.HalfWidth + this._tileSize.HalfWidth, row * this._tileSize.Height - this._size.HalfHeight + this._tileSize.HalfHeight);
        }

        private ValidRow(row: number): boolean {
            return row >= 0 && row < this._rows;
        }

        private ValidColumn(column: number): boolean {
            return column >= 0 && column < this._columns;
        }
    }

}