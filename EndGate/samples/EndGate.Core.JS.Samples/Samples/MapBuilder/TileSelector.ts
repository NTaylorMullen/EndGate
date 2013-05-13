/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="CameraDragController.ts" />
/// <reference path="GridEntry.ts" />

class TileSelector {
    private _groupSelector: eg.Graphics.Rectangle;

    // Start group selecting if user drags over X pixels
    private static _groupSelectAfter: number = 10;

    constructor(private _grid: eg.Graphics.Grid, scene: eg.Rendering.Scene2d, camera: eg.Rendering.Camera2d, cameraDragController: CameraDragController, mouseHandler: eg.Input.MouseHandler, private _onSelect: (gridEntries: GridEntry[]) => void , private _onDeselect: (bounds: GridEntry[]) => void ) {
        var downAt: eg.Vector2d,
            groupSelecting = false;

        this._groupSelector = new eg.Graphics.Rectangle(0, 0, 0, 0, "rgb(100, 255, 0)");
        this._groupSelector.Border(2, "green");
        this._groupSelector.Opacity(.4);

        mouseHandler.OnDown.Bind((e: eg.Input.IMouseClickEvent) => {
            downAt = camera.ToCameraRelative(e.Position);
        });

        mouseHandler.OnUp.Bind((e: eg.Input.IMouseClickEvent) => {
            // Reset group selecting on a timeout to let the click event fire
            window.setTimeout(() => {
                groupSelecting = false;
            }, 50);
            scene.Remove(this._groupSelector);
        });

        mouseHandler.OnMove.Bind((e: eg.Input.IMouseEvent) => {
            if (cameraDragController.Active) {
                return;
            }

            var locationDifference: eg.Vector2d;

            e.Position = camera.ToCameraRelative(e.Position);

            if (mouseHandler.IsDown && !groupSelecting && e.Position.Distance(downAt).Magnitude() >= TileSelector._groupSelectAfter) {
                groupSelecting = true;
                scene.Add(this._groupSelector);
            }

            if (groupSelecting) {
                locationDifference = e.Position.Subtract(downAt);

                this._groupSelector.Size = new eg.Size2d(Math.abs(locationDifference.X), Math.abs(locationDifference.Y));

                this._groupSelector.Position = e.Position.Subtract(this._groupSelector.Size.Multiply(.5).Multiply(locationDifference.Sign()));
            }
        });

        mouseHandler.OnClick.Bind((e: eg.Input.IMouseClickEvent) => {
            
            if (cameraDragController.Active) {
                return;
            }

            // Translate the click to abide by the camera position
            var translatedClick = camera.ToCameraRelative(e.Position),
                selectedTiles: GridEntry[] = [],
                groupSelectionBounds: eg.Bounds.BoundingRectangle;

            if (!groupSelecting) {
                selectedTiles.push(new GridEntry(this._grid.ConvertToRow(translatedClick.Y), this._grid.ConvertToColumn(translatedClick.X)));
            }
            else {
                groupSelectionBounds = <eg.Bounds.BoundingRectangle>this._groupSelector.GetDrawBounds();

                selectedTiles = this.GetSpaceSelection(this._grid.ConvertToRow(downAt.Y), this._grid.ConvertToColumn(downAt.X), this._grid.ConvertToRow(translatedClick.Y), this._grid.ConvertToColumn(translatedClick.X));
            }

            if (e.Button === "Left") {
                this._onSelect(selectedTiles);
            }
            else if (e.Button === "Right") {
                this._onDeselect(selectedTiles);
            }
        });
    }

    private GetSpaceSelection(rowStart: number, columnStart: number, rowEnd: number, columnEnd: number): GridEntry[] {
        var space: GridEntry[] = [],
            rowIncrementor = (rowEnd >= rowStart) ? 1 : -1,
            columnIncrementor = (columnEnd >= columnStart) ? 1 : -1;

        for (var i = rowStart; i !== rowEnd + rowIncrementor; i += rowIncrementor) {
            if (i > this._grid.Rows()) {
                break;
            }

            for (var j = columnStart; j !== columnEnd + columnIncrementor; j += columnIncrementor) {
                if (j > this._grid.Rows()) {
                    break;
                }

                space.push(new GridEntry(i, j));
            }
        }

        return space;
    }
}