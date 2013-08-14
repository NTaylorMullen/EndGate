/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="CameraDragController.ts" />
/// <reference path="GridEntry.ts" />
// Wrap in module to keep code out of global scope
var MapCreator;
(function (MapCreator) {
    var TileSelector = (function () {
        function TileSelector(_grid, scene, camera, cameraDragController, mouseHandler, _onSelect, _onDeselect) {
            var _this = this;
            this._grid = _grid;
            this._onSelect = _onSelect;
            this._onDeselect = _onDeselect;
            var downAt, groupSelecting = false;

            this._groupSelector = new eg.Graphics.Rectangle(0, 0, 0, 0, new eg.Graphics.Color(100, 255, 0));
            this._groupSelector.Border(2, eg.Graphics.Color.Green);
            this._groupSelector.Opacity = .4;

            mouseHandler.OnDown.Bind(function (e) {
                downAt = camera.ToCameraRelative(e.Position);
            });

            mouseHandler.OnUp.Bind(function (e) {
                // Reset group selecting on a timeout to let the click event fire
                window.setTimeout(function () {
                    groupSelecting = false;
                }, 50);
                scene.Remove(_this._groupSelector);
            });

            mouseHandler.OnMove.Bind(function (e) {
                if (cameraDragController.Active) {
                    return;
                }

                var locationDifference;

                e.Position = camera.ToCameraRelative(e.Position);

                if (mouseHandler.IsDown && !groupSelecting && e.Position.Distance(downAt).Magnitude() >= TileSelector._groupSelectAfter) {
                    groupSelecting = true;
                    scene.Add(_this._groupSelector);
                }

                if (groupSelecting) {
                    locationDifference = e.Position.Subtract(downAt);

                    _this._groupSelector.Size = new eg.Size2d(Math.abs(locationDifference.X), Math.abs(locationDifference.Y));

                    _this._groupSelector.Position = e.Position.Subtract(_this._groupSelector.Size.Multiply(.5).Multiply(locationDifference.Sign()));
                }
            });

            mouseHandler.OnClick.Bind(function (e) {
                if (cameraDragController.Active) {
                    return;
                }

                // Translate the click to abide by the camera position
                var translatedClick = camera.ToCameraRelative(e.Position), selectedTiles = [], groupSelectionBounds;

                if (!groupSelecting) {
                    selectedTiles.push(new MapCreator.GridEntry(_this._grid.ConvertToRow(translatedClick.Y), _this._grid.ConvertToColumn(translatedClick.X)));
                } else {
                    groupSelectionBounds = _this._groupSelector.GetDrawBounds();

                    selectedTiles = _this.GetSpaceSelection(_this._grid.ConvertToRow(downAt.Y), _this._grid.ConvertToColumn(downAt.X), _this._grid.ConvertToRow(translatedClick.Y), _this._grid.ConvertToColumn(translatedClick.X));
                }

                if (e.Button === "Left") {
                    _this._onSelect(selectedTiles);
                } else if (e.Button === "Right") {
                    _this._onDeselect(selectedTiles);
                }
            });
        }
        TileSelector.prototype.GetSpaceSelection = function (rowStart, columnStart, rowEnd, columnEnd) {
            var space = [], rowIncrementor = (rowEnd >= rowStart) ? 1 : -1, columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;

            for (var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
                if (i >= this._grid.Rows) {
                    break;
                }

                for (var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                    if (j >= this._grid.Columns) {
                        break;
                    }

                    space.push(new MapCreator.GridEntry(i, j));
                }
            }

            return space;
        };
        TileSelector._groupSelectAfter = 10;
        return TileSelector;
    })();
    MapCreator.TileSelector = TileSelector;
})(MapCreator || (MapCreator = {}));
//@ sourceMappingURL=TileSelector.js.map
