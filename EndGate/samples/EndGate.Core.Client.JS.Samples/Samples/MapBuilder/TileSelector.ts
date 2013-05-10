/// <reference path="../../Scripts/endGate.core.client.ts" />
/// <reference path="CameraDragController.ts" />

class TileSelector {
    public SelectedTiles: eg.Graphics.Rectangle[];
    public GroupSelector: eg.Graphics.Rectangle;

    // Start group selecting if user drags over X pixels
    private static _groupSelectAfter: number = 10;

    constructor(private _grid: eg.Graphics.Grid, scene: eg.Rendering.Scene2d, camera: eg.Rendering.Camera2d, cameraDragController: CameraDragController, mouseHandler: eg.Input.MouseHandler) {
        var tiles = _grid.Children(),
            tile: eg.Bounds.BoundingRectangle,
            tileBounds: eg.Bounds.BoundingRectangle[] = [],
            downAt: eg.Vector2d,
            groupSelecting = false;

        this.GroupSelector = new eg.Graphics.Rectangle(0, 0, 0, 0, "rgb(100, 255, 0)");
        this.GroupSelector.Border(2, "green");
        this.GroupSelector.Opacity(.4);
        this.SelectedTiles = [];

        for (var i = 0; i < tiles.length; i++) {
            tile = <eg.Bounds.BoundingRectangle>tiles[i].GetDrawBounds();
            tile.Position = tile.Position.Add(_grid.Position);
            tileBounds.push(tile);
        }

        mouseHandler.OnDown.Bind((e: eg.Input.IMouseClickEvent) => {
            downAt = camera.ToCameraRelative(e.Position);
        });

        mouseHandler.OnUp.Bind((e: eg.Input.IMouseClickEvent) => {
            // Reset group selecting on a timeout to let the click event fire
            window.setTimeout(() => {
                groupSelecting = false;
            }, 50);
            scene.Remove(this.GroupSelector);
        });

        mouseHandler.OnMove.Bind((e: eg.Input.IMouseEvent) => {
            var locationDifference: eg.Vector2d;

            e.Position = camera.ToCameraRelative(e.Position);

            if (mouseHandler.IsDown && !groupSelecting && e.Position.Distance(downAt).Magnitude() >= TileSelector._groupSelectAfter) {
                groupSelecting = true;
                scene.Add(this.GroupSelector);
            }

            if (groupSelecting) {
                locationDifference = e.Position.Subtract(downAt);

                this.GroupSelector.Size = new eg.Size2d(Math.abs(locationDifference.X), Math.abs(locationDifference.Y));

                this.GroupSelector.Position = e.Position.Subtract(this.GroupSelector.Size.Multiply(.5).Multiply(locationDifference.Sign()));
            }
        });

        mouseHandler.OnClick.Bind((e: eg.Input.IMouseClickEvent) => {
            // Translate the click to abide by the camera position
            var translatedClick = camera.ToCameraRelative(e.Position),
                selectedTileBounds: eg.Bounds.BoundingRectangle[] = [],
                groupSelectionBounds: eg.Bounds.BoundingRectangle;

            if (!groupSelecting) {
                for (var i = 0; i < tileBounds.length; i++) {
                    if (tileBounds[i].ContainsPoint(translatedClick)) {
                        selectedTileBounds.push(tileBounds[i]);
                        break;
                    }
                }
            }
            else {
                groupSelectionBounds = <eg.Bounds.BoundingRectangle>this.GroupSelector.GetDrawBounds();

                for (var i = 0; i < tileBounds.length; i++) {
                    if (tileBounds[i].Intersects(groupSelectionBounds)) {
                        selectedTileBounds.push(tileBounds[i]);
                    }
                }
            }

            if (e.Button === "Left") {
                this.Select(selectedTileBounds);
            }
            else if (e.Button === "Right") {
                this.Unselect(selectedTileBounds);
            }
        });
    }


    private Select(tileBounds: eg.Bounds.BoundingRectangle[]): void {
        var tile,
            newPos;

        for (var i = 0; i < this.SelectedTiles.length; i++) {
            this._grid.RemoveChild(this.SelectedTiles[i]);
        }

        this.SelectedTiles = [];

        for (var i = 0; i < tileBounds.length; i++) {
            newPos = tileBounds[i].Position.Subtract(this._grid.Position);
            tile = new eg.Graphics.Rectangle(newPos.X, newPos.Y, tileBounds[i].Size.Width, tileBounds[i].Size.Height);
            tile.Border(2, "red");
            this._grid.AddChild(tile);
            this.SelectedTiles.push(tile)
        }
    }

    private Unselect(tileBounds: eg.Bounds.BoundingRectangle[]): void {
        var newPos;

        for (var i = 0; i < this.SelectedTiles.length; i++) {
            newPos = this.SelectedTiles[i].Position.Add(this._grid.Position);
            for (var j = 0; j < tileBounds.length; j++) {
                if (newPos.Equivalent(tileBounds[j].Position)) {
                    this._grid.RemoveChild(this.SelectedTiles[i]);
                    this.SelectedTiles.splice(i--, 1);
                    tileBounds.splice(j--, 1);
                    break;
                }
            }

            if (tileBounds.length === 0) {
                break;
            }
        }
    }

}