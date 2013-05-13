/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="CameraDragController.ts" />
/// <reference path="CameraZoomController.ts" />
/// <reference path="TileSelector.ts" />
/// <reference path="TileFiller.ts" />
/// <reference path="GridEntry.ts" />
/// <reference path="SpriteSheetViewer.ts" />
/// <reference path="PersistenceManager.ts" />
/// <reference path="OutputHandler.ts" />

interface ILayer {
    Name: string;
    Layer: eg.Graphics.Grid;
}

class MapBuilder extends eg.Game {
    public _layers: ILayer[];
    private _visibleGrid: eg.Graphics.Grid;
    private _cameraDragController: CameraDragController;
    private _cameraZoomController: CameraZoomController;
    private _tileSelector: TileSelector;
    private _tileFiller: TileFiller;
    private _outputHandler: OutputHandler;
    private _persistenceManager: PersistenceManager;
    private _layersSelect: JQuery;

    constructor(canvas: HTMLCanvasElement, utilities: JQuery, private _spriteSheetViewer: SpriteSheetViewer, private _rows: number, private _columns: number, private _tileWidth: number, private _tileHeight: number) {
        super(canvas);
        var addLayer = $("#addLayer"),
            layerName = $("#layerName");

        this._layersSelect = $("#layers");
        this._visibleGrid = new eg.Graphics.Grid(canvas.width / 2, canvas.height / 2, _rows, _columns, _tileWidth, _tileHeight, true);
        this._visibleGrid.ZIndex = 100;
        this._layers = [{ Name: "Background", Layer: new eg.Graphics.Grid(this._visibleGrid.Position.X, this._visibleGrid.Position.Y, _rows, _columns, _tileWidth, _tileHeight) }];
        this._cameraDragController = new CameraDragController(canvas, this.Scene.Camera, this.Input.Keyboard, this.Input.Mouse);
        this._cameraZoomController = new CameraZoomController(this.Scene.Camera, this.Input.Mouse);
        this._persistenceManager = new PersistenceManager(utilities, () => {
            return this._layers;
        }, _spriteSheetViewer.SpriteSheetUrl, (grid: eg.Graphics.Grid) => {
            return this.BuildResourceMap(grid)
        });
        this._outputHandler = new OutputHandler(utilities, this._persistenceManager, _spriteSheetViewer,_tileWidth, _tileHeight);

        this.Scene.Add(this._visibleGrid);
        this.Scene.Add(this._layers[0].Layer);

        this._tileFiller = new TileFiller(this._layers[0].Layer, _tileWidth, _tileHeight);
        this._tileSelector = new TileSelector(this._visibleGrid, this.Scene, this.Scene.Camera, this._cameraDragController, this.Input.Mouse,
        (gridEntries: GridEntry[]) => {
            this._tileFiller.Fill(gridEntries, this._spriteSheetViewer.SelectedSources);
        },
        (gridEntries: GridEntry[]) => {
            this._tileFiller.Clear(gridEntries);
        });

        addLayer.click(() => {
            this.AddLayer(layerName.val());
            layerName.val("");
            addLayer.blur();
        });

        this._layersSelect.change(() => {
            this._tileFiller.ChangeGrid(this._layers[parseInt(this._layersSelect.val())].Layer);
        });
    }

    public AddLayer(layerName: string): ILayer {
        var addedLayer: ILayer = {
            Name: layerName,
            Layer: new eg.Graphics.Grid(this._visibleGrid.Position.X, this._visibleGrid.Position.Y, this._rows, this._columns, this._tileWidth, this._tileHeight)
        };

        this._layers.push(addedLayer);

        this._layersSelect.append($("<option value='" + (this._layers.length - 1) + "'>" + addedLayer.Name + "</option>"));
        this._layersSelect.val((this._layers.length - 1).toString());

        this._tileFiller.ChangeGrid(addedLayer.Layer);
        this.Scene.Add(addedLayer.Layer);

        return addedLayer;
    }

    public BuildResourceMap(grid: eg.Graphics.Grid): number[][] {
        var resources = <eg.Graphics.Sprite2d[]>this._spriteSheetViewer.VisibleGrid.GetSpace(1, 1, this._spriteSheetViewer.VisibleGrid.Rows(), this._spriteSheetViewer.VisibleGrid.Columns()),
            rows = grid.Rows(),
            columns = grid.Columns(),
            tile: eg.Graphics.Sprite2d,
            resourceMap: number[][] = [];

        for (var i = 1; i <= rows; i++) {
            resourceMap[i - 1] = [];
            for (var j = 1; j <= columns; j++) {
                tile = <eg.Graphics.Sprite2d>grid.Get(i, j);

                if (tile) {
                    resourceMap[i-1][j-1] = this.FindResource(tile.Image, resources);
                }
                else {
                    resourceMap[i-1][j-1] = -1;
                }
            }
        }

        return resourceMap;
    }

    public LoadLayersFromResourceMaps(resourceMaps: ILayerMap[]) {
        var resources = <eg.Graphics.Sprite2d[]>this._spriteSheetViewer.VisibleGrid.GetSpace(1, 1, this._spriteSheetViewer.VisibleGrid.Rows(), this._spriteSheetViewer.VisibleGrid.Columns()),
            grid: eg.Graphics.Grid,
            currentLayer: ILayer,
            originalLayer: eg.Graphics.Grid = this._layers[0].Layer;

        this.Scene.Remove(originalLayer);
        this._layersSelect.html("");
        this._layers = [];

        for (var i = 0; i < resourceMaps.length; i++) {
            currentLayer = this.AddLayer(resourceMaps[i].Name);
            grid = currentLayer.Layer;

            for (var row = 0; row < resourceMaps[i].Layer.length; row++) {
                for (var column = 0; column < resourceMaps[i].Layer[row].length; column++) {
                    if (resourceMaps[i].Layer[row][column] !== -1) {
                        grid.Fill(row + 1, column + 1, new eg.Graphics.Sprite2d(0, 0, resources[resourceMaps[i].Layer[row][column]].Image, this._tileWidth, this._tileHeight));
                    }
                }
            }

            this._tileFiller.ChangeGrid(this._layers[0].Layer);
        }

        this._layersSelect.val('0');
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