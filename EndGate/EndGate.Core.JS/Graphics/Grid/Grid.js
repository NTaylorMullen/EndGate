var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Assets/Sizes/Size2d.ts" />
    /// <reference path="../Graphic2d.ts" />
    /// <reference path="../Line2d.ts" />
    (function (Graphics) {
        /**
        * Defines a drawable grid that can be used to store other graphics in a grid like structure.
        */
        var Grid = (function (_super) {
            __extends(Grid, _super);
            function Grid(x, y, rows, columns, tileWidth, tileHeight, drawGridLines, gridLineColor) {
                if (typeof drawGridLines === "undefined") { drawGridLines = false; }
                if (typeof gridLineColor === "undefined") { gridLineColor = "gray"; }
                        _super.call(this, new EndGate.Vector2d(x, y));
                this._type = "Grid";
                var halfSize, topLeft, bottomRight;
                this._size = new EndGate.Size2d(tileWidth * columns, tileHeight * rows);
                this._tileSize = new EndGate.Size2d(tileWidth, tileHeight);
                this._grid = [];
                this._rows = rows;
                this._columns = columns;
                this.DrawGridLines = drawGridLines;
                this._gridLines = [];
                halfSize = this._size.Multiply(.5);
                topLeft = new EndGate.Vector2d(-halfSize.Width, -halfSize.Height);
                bottomRight = new EndGate.Vector2d(halfSize.Width, halfSize.Height);
                for(var i = 0; i < rows; i++) {
                    this._grid[i] = [];
                    this._gridLines.push(new Graphics.Line2d(topLeft.X, topLeft.Y + i * this._tileSize.Height, bottomRight.X, topLeft.Y + i * this._tileSize.Height, 1));
                    for(var j = 0; j < columns; j++) {
                        if(i === 0) {
                            this._gridLines.push(new Graphics.Line2d(topLeft.X + j * this._tileSize.Width, topLeft.Y, topLeft.X + j * this._tileSize.Width, bottomRight.Y, 1));
                        }
                        this._grid[i].push(null);
                    }
                }
                this._gridLines.push(new Graphics.Line2d(topLeft.X, bottomRight.Y, bottomRight.X, bottomRight.Y, 1));
                this._gridLines.push(new Graphics.Line2d(bottomRight.X, topLeft.Y, bottomRight.X, bottomRight.Y, 1));
                this.GridLineColor(gridLineColor);
            }
            Grid.prototype.GridLineColor = function (color) {
                if(typeof color !== "undefined") {
                    this._gridLineColor = color;
                    for(var i = 0; i < this._gridLines.length; i++) {
                        this._gridLines[i].Color(color);
                    }
                }
                return this._gridLineColor;
            };
            Grid.prototype.Size = /**
            * Gets the size of the grid.
            */
            function () {
                return this._size.Clone();
            };
            Grid.prototype.TileSize = /**
            * Gets the size of the tiles.
            */
            function () {
                return this._tileSize.Clone();
            };
            Grid.prototype.Rows = /**
            * Gets the number of rows
            */
            function () {
                return this._rows;
            };
            Grid.prototype.Columns = /**
            * Gets the number of columns
            */
            function () {
                return this._columns;
            };
            Grid.prototype.Opacity = function (alpha) {
                return this.State.GlobalAlpha(alpha);
            };
            Grid.prototype.Fill = /**
            * Fills a tile with the provided graphic.
            * @param row The row.
            * @param column The column.
            * @param graphic The graphic to fill the tile with.
            */
            function (row, column, graphic) {
                if(!this.ValidRow(row) || !this.ValidColumn(column)) {
                    return;
                }
                graphic.Position = this.GetInsideGridPosition(row, column);
                this._grid[row][column] = graphic;
                this.AddChild(graphic);
            };
            Grid.prototype.FillRow = function (row, graphicList, columnOffset) {
                if (typeof columnOffset === "undefined") { columnOffset = 0; }
                var graphic;
                for(var i = 0; i < graphicList.length; i++) {
                    graphic = graphicList[i];
                    graphic.Position = this.GetInsideGridPosition(row, i + columnOffset);
                    this._grid[row][i + columnOffset] = graphic;
                    this.AddChild(graphic);
                }
            };
            Grid.prototype.FillColumn = function (column, graphicList, rowOffset) {
                if (typeof rowOffset === "undefined") { rowOffset = 0; }
                var graphic;
                for(var i = 0; i < graphicList.length; i++) {
                    graphic = graphicList[i];
                    graphic.Position = this.GetInsideGridPosition(i + rowOffset, column);
                    this._grid[i + rowOffset][column] = graphic;
                    this.AddChild(graphic);
                }
            };
            Grid.prototype.FillSpace = /**
            * Fills a tile with the provided graphic.
            * @param row The row to start filling at.
            * @param column The column to start filling at.
            * @param graphicList The list of graphics to fill the space with.  The space will be filled with as many elements that are contained within the multi-dimensional graphicList.
            */
            function (row, column, graphicList) {
                var graphic;
                for(var i = 0; i < graphicList.length; i++) {
                    for(var j = 0; j < graphicList[i].length; j++) {
                        graphic = graphicList[i][j];
                        if(graphic) {
                            graphic.Position = this.GetInsideGridPosition(i + row, j + column);
                            this._grid[i + row][j + column] = graphic;
                            this.AddChild(graphic);
                        }
                    }
                }
            };
            Grid.prototype.Get = /**
            * Gets a graphic within the grid.
            * @param row The row.
            * @param column The column.
            */
            function (row, column) {
                if(!this.ValidRow(row) || !this.ValidColumn(column)) {
                    return null;
                }
                return this._grid[row][column];
            };
            Grid.prototype.GetRow = function (row, columnOffset) {
                if (typeof columnOffset === "undefined") { columnOffset = 0; }
                var rowList = [];
                for(var i = columnOffset; i < this._columns; i++) {
                    rowList.push(this._grid[row][i]);
                }
                return rowList;
            };
            Grid.prototype.GetColumn = function (column, rowOffset) {
                if (typeof rowOffset === "undefined") { rowOffset = 0; }
                var columnList = [];
                for(var i = rowOffset; i < this._rows; i++) {
                    columnList.push(this._grid[i][column]);
                }
                return columnList;
            };
            Grid.prototype.GetSpace = /**
            * Retrieves graphics within row column cross section.
            * @param rowStart The row to start pulling graphics from.
            * @param columnStart The column to start pulling graphics from.
            * @param rowEnd The row to stop pulling graphics from.
            * @param columnEnd The column to stop pulling graphics from.
            */
            function (rowStart, columnStart, rowEnd, columnEnd) {
                var space = [], rowIncrementor = (rowEnd >= rowStart) ? 1 : -1, columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;
                for(var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                    if(i >= this._rows) {
                        break;
                    }
                    for(var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                        if(j >= this._columns) {
                            break;
                        }
                        space.push(this._grid[i][j]);
                    }
                }
                return space;
            };
            Grid.prototype.Clear = /**
            * Clear a grid tile.
            * @param row The row.
            * @param column The column.
            */
            function (row, column) {
                if(!this.ValidRow(row) || !this.ValidColumn(column)) {
                    return null;
                }
                var val = this._grid[row][column];
                this._grid[row][column] = null;
                this.RemoveChild(val);
                return val;
            };
            Grid.prototype.ClearRow = function (row, columnOffset) {
                if (typeof columnOffset === "undefined") { columnOffset = 0; }
                var vals = [];
                for(var i = 0; i < this._columns; i++) {
                    vals.push(this._grid[row][i]);
                    this.RemoveChild(this._grid[row][i]);
                    this._grid[row][i] = null;
                }
                return vals;
            };
            Grid.prototype.ClearColumn = function (column, rowOffset) {
                if (typeof rowOffset === "undefined") { rowOffset = 0; }
                var vals = [];
                for(var i = 0; i < this._rows; i++) {
                    vals.push(this._grid[i][column]);
                    this.RemoveChild(this._grid[i][column]);
                    this._grid[i][column] = null;
                }
                return vals;
            };
            Grid.prototype.ClearSpace = /**
            * Clears graphics within row column cross section.
            * @param rowStart The row to start clearing graphics from.
            * @param columnStart The column to start clearing graphics from.
            * @param rowEnd The row to stop clearing graphics from.
            * @param columnEnd The column to stop clearing graphics from.
            */
            function (rowStart, columnStart, rowEnd, columnEnd) {
                var space = [], rowIncrementor = (rowEnd >= rowStart) ? 1 : -1, columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;
                for(var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                    if(i > this._rows) {
                        break;
                    }
                    for(var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                        if(j > this._columns) {
                            break;
                        }
                        space.push(this._grid[i][j]);
                        this.RemoveChild(this._grid[i][j]);
                        this._grid[i][j] = null;
                    }
                }
                return space;
            };
            Grid.prototype.Draw = /**
            * Draws the grid onto the given context.  If this grid is part of a scene the Draw function will be called automatically.
            * @param context The canvas context to draw the grid onto.
            */
            function (context) {
                _super.prototype._StartDraw.call(this, context);
                context.save();
                _super.prototype._EndDraw.call(this, context);
                if(this.DrawGridLines) {
                    for(var i = 0; i < this._gridLines.length; i++) {
                        this._gridLines[i].Draw(context);
                    }
                }
                context.restore();
            };
            Grid.prototype.GetDrawBounds = /**
            * The bounding area that represents where the grid will draw.
            */
            function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, this._size);
                bounds.Rotation = this.Rotation;
                return bounds;
            };
            Grid.prototype.ConvertToRow = /**
            * Converts the provided vertical coordinate to a row number that is based on the current grid.
            * @param y The vertical coordinate to convert to a row.
            */
            function (y) {
                return Math.floor((y - (this.Position.Y - this._size.HalfHeight())) / this._tileSize.Height);
            };
            Grid.prototype.ConvertToColumn = /**
            * Converts the provided horizontal coordinate to a column number that is based on the current grid.
            * @param x The horizontal component to convert to a column.
            */
            function (x) {
                return Math.floor((x - (this.Position.X - this._size.HalfWidth())) / this._tileSize.Width);
            };
            Grid.prototype.GetInsideGridPosition = function (row, column) {
                return new EndGate.Vector2d(column * this._tileSize.Width - this._size.HalfWidth() + this._tileSize.HalfWidth(), row * this._tileSize.Height - this._size.HalfHeight() + this._tileSize.HalfHeight());
            };
            Grid.prototype.ValidRow = function (row) {
                return row >= 0 && row < this._rows;
            };
            Grid.prototype.ValidColumn = function (column) {
                return column >= 0 && column < this._columns;
            };
            return Grid;
        })(Graphics.Abstractions.Graphic2d);
        Graphics.Grid = Grid;        
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
