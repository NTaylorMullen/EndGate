/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="CameraDragController.ts" />
/// <reference path="CameraZoomController.ts" />
/// <reference path="TileSelector.ts" />
/// <reference path="TileFiller.ts" />
/// <reference path="GridEntry.ts" />
/// <reference path="SpriteSheetViewer.ts" />
/// <reference path="PersistenceManager.ts" />
/// <reference path="OutputHandler.ts" />
/// <reference path="LayerManager.ts" />

// Wrap in module to keep code out of global scope
module MapCreator {

    export class MapBuilder extends eg.Game {
        private _visibleGrid: eg.Graphics.Grid;
        private _cameraDragController: CameraDragController;
        private _cameraZoomController: CameraZoomController;
        private _tileSelector: TileSelector;
        private _tileFiller: TileFiller;
        private _outputHandler: OutputHandler;
        private _persistenceManager: PersistenceManager;

        public LayerManager: LayerManager;

        constructor(canvas: HTMLCanvasElement, utilities: JQuery, private _spriteSheetViewer: SpriteSheetViewer, private _rows: number, private _columns: number, private _tileWidth: number, private _tileHeight: number) {
            super(canvas);

            // Create a grid that draws grid lines 
            this._visibleGrid = new eg.Graphics.Grid(canvas.width / 2, canvas.height / 2, _rows, _columns, _tileWidth, _tileHeight, true);
            // Set ZIndex to be high so that it overlays any map that is created
            this._visibleGrid.ZIndex = 100;


            // Build map builder objects
            this._cameraDragController = new CameraDragController(canvas, this.Scene.Camera, this.Input.Keyboard, this.Input.Mouse);
            this._cameraZoomController = new CameraZoomController(this.Scene.Camera, this.Input.Mouse);
            this._persistenceManager = new PersistenceManager(utilities, () => {
                return this.LayerManager.Layers;
            }, _spriteSheetViewer.SpriteSheetUrl, (grid: eg.Graphics.Grid) => {
                return this.BuildResourceMap(grid)
            });
            this.LayerManager = new LayerManager(this.Scene, this._visibleGrid, $("#layers"), $("#addLayer"), $("#layerName"), (layer: ILayer) => {
                this._tileFiller.ChangeGrid(layer.Layer);
            });
            this._outputHandler = new OutputHandler(utilities, this._persistenceManager, this, _spriteSheetViewer, _tileWidth, _tileHeight);
            this._tileFiller = new TileFiller(this.LayerManager.SelectedLayer.Layer, _tileWidth, _tileHeight);
            this._tileSelector = new TileSelector(this._visibleGrid, this.Scene, this.Scene.Camera, this._cameraDragController, this.Input.Mouse,
            (gridEntries: GridEntry[]) => {
                this._tileFiller.Fill(gridEntries, this._spriteSheetViewer.SelectedSources);
            },
            (gridEntries: GridEntry[]) => {
                this._tileFiller.Clear(gridEntries);
            });

            // Draw the visible grid and the default layer
            this.Scene.Add(this._visibleGrid);

            // Bind the "g" key to the "DrawGridLines" functionality of the visible grid
            this.Input.Keyboard.OnCommandDown("g", () => {
                this._visibleGrid.DrawGridLines = !this._visibleGrid.DrawGridLines;
            });
        }

        public BuildResourceMap(grid: eg.Graphics.Grid): number[][] {
            var resources = <eg.Graphics.Sprite2d[]>this._spriteSheetViewer.VisibleGrid.GetSpace(0, 0, this._spriteSheetViewer.VisibleGrid.Rows() - 1, this._spriteSheetViewer.VisibleGrid.Columns() - 1),
                rows = grid.Rows(),
                columns = grid.Columns(),
                tile: eg.Graphics.Sprite2d,
                resourceMap: number[][] = [];

            for (var i = 0; i < rows; i++) {
                resourceMap[i] = [];
                for (var j = 0; j < columns; j++) {
                    tile = <eg.Graphics.Sprite2d>grid.Get(i, j);

                    if (tile) {
                        resourceMap[i][j] = this.FindResource(tile.Image, resources);
                    }
                    else {
                        resourceMap[i][j] = -1;
                    }
                }
            }

            return resourceMap;
        }

        private FindResource(source: eg.Graphics.Assets.ImageSource, resources: eg.Graphics.Sprite2d[]): number {
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].Image === source) {
                    return i;
                }
            }

            return -1;
        }
    }

}