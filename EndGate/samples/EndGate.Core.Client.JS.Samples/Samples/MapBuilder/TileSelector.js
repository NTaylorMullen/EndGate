var TileSelector = (function () {
    function TileSelector(_grid, scene, camera, cameraDragController, mouseHandler) {
        this._grid = _grid;
        var _this = this;
        var tiles = _grid.Children(), tile, tileBounds = [], downAt, groupSelecting = false;
        this.GroupSelector = new eg.Graphics.Rectangle(0, 0, 0, 0, "rgb(100, 255, 0)");
        this.GroupSelector.Border(2, "green");
        this.GroupSelector.Opacity(.4);
        this.SelectedTiles = [];
        for(var i = 0; i < tiles.length; i++) {
            tile = tiles[i].GetDrawBounds();
            tile.Position = tile.Position.Add(_grid.Position);
            tileBounds.push(tile);
        }
        mouseHandler.OnDown.Bind(function (e) {
            downAt = camera.ToCameraRelative(e.Position);
        });
        mouseHandler.OnUp.Bind(function (e) {
            window.setTimeout(function () {
                groupSelecting = false;
            }, 50);
            scene.Remove(_this.GroupSelector);
        });
        mouseHandler.OnMove.Bind(function (e) {
            var locationDifference;
            e.Position = camera.ToCameraRelative(e.Position);
            if(mouseHandler.IsDown && !groupSelecting && e.Position.Distance(downAt).Magnitude() >= TileSelector._groupSelectAfter) {
                groupSelecting = true;
                scene.Add(_this.GroupSelector);
            }
            if(groupSelecting) {
                locationDifference = e.Position.Subtract(downAt);
                _this.GroupSelector.Size = new eg.Size2d(Math.abs(locationDifference.X), Math.abs(locationDifference.Y));
                _this.GroupSelector.Position = e.Position.Subtract(_this.GroupSelector.Size.Multiply(.5).Multiply(locationDifference.Sign()));
            }
        });
        mouseHandler.OnClick.Bind(function (e) {
            var translatedClick = camera.ToCameraRelative(e.Position), selectedTileBounds = [], groupSelectionBounds;
            if(!groupSelecting) {
                for(var i = 0; i < tileBounds.length; i++) {
                    if(tileBounds[i].ContainsPoint(translatedClick)) {
                        selectedTileBounds.push(tileBounds[i]);
                        break;
                    }
                }
            } else {
                groupSelectionBounds = _this.GroupSelector.GetDrawBounds();
                for(var i = 0; i < tileBounds.length; i++) {
                    if(tileBounds[i].Intersects(groupSelectionBounds)) {
                        selectedTileBounds.push(tileBounds[i]);
                    }
                }
            }
            if(e.Button === "Left") {
                _this.Select(selectedTileBounds);
            } else if(e.Button === "Right") {
                _this.Unselect(selectedTileBounds);
            }
        });
    }
    TileSelector._groupSelectAfter = 10;
    TileSelector.prototype.Select = function (tileBounds) {
        var tile, newPos;
        for(var i = 0; i < this.SelectedTiles.length; i++) {
            this._grid.RemoveChild(this.SelectedTiles[i]);
        }
        this.SelectedTiles = [];
        for(var i = 0; i < tileBounds.length; i++) {
            newPos = tileBounds[i].Position.Subtract(this._grid.Position);
            tile = new eg.Graphics.Rectangle(newPos.X, newPos.Y, tileBounds[i].Size.Width, tileBounds[i].Size.Height);
            tile.Border(2, "red");
            this._grid.AddChild(tile);
            this.SelectedTiles.push(tile);
        }
    };
    TileSelector.prototype.Unselect = function (tileBounds) {
        var newPos;
        for(var i = 0; i < this.SelectedTiles.length; i++) {
            newPos = this.SelectedTiles[i].Position.Add(this._grid.Position);
            for(var j = 0; j < tileBounds.length; j++) {
                if(newPos.Equivalent(tileBounds[j].Position)) {
                    this._grid.RemoveChild(this.SelectedTiles[i]);
                    this.SelectedTiles.splice(i--, 1);
                    tileBounds.splice(j--, 1);
                    break;
                }
            }
            if(tileBounds.length === 0) {
                break;
            }
        }
    };
    return TileSelector;
})();
//@ sourceMappingURL=TileSelector.js.map
