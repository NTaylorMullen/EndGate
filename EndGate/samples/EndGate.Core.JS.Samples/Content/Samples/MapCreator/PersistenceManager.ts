/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="MapBuilder.ts" />

// Wrap in module to keep code out of global scope
module MapCreator {

    export interface ILayerMap {
        Layer: number[][];
        Name: string;
    }

    export interface ISettings {
        Rows: number;
        Columns: number;
        TileSize: eg.Size2d;
        SpriteSheetUrl: string;
        Layers: ILayerMap[];
    }

    export class PersistenceManager {
        constructor(utilities: JQuery, private _getLayers: () => ILayer[], private _spriteSheetUrl: string, private _buildResourceMap: (grid: eg.Graphics.Grid) => number[][]) {
            var saveButton = $("#save"),
                saveName = $("#saveName"),
                saveDialog = $("#saveDialog"),
                layerMaps: ILayerMap[] = [],
                that = this;

            saveButton.click(() => {
                this.SaveMap(saveName.val());
                saveDialog.html("Last saved at: " + new Date().toTimeString());
            });
        }

        public BuildResourceMaps(): ILayerMap[] {
            var layerMaps: ILayerMap[] = [],
                layers = this._getLayers();

            for (var i = 0; i < layers.length; i++) {
                layerMaps.push({
                    Layer: this._buildResourceMap(layers[i].Layer),
                    Name: layers[i].Name
                });
            }

            return layerMaps;
        }

        public SaveMap(saveName: string, namespace?: string = "mapBuilder"): void {
            var layerMaps: ILayerMap[] = this.BuildResourceMaps(),
                layers = this._getLayers();

            var settings: ISettings = {
                Rows: layers[0].Layer.Rows(),
                Columns: layers[0].Layer.Columns(),
                TileSize: layers[0].Layer.TileSize(),
                SpriteSheetUrl: this._spriteSheetUrl,
                Layers: layerMaps
            },
            maps = localStorage.getItem(namespace);

            if (!maps) {
                maps = {}
            }
            else {
                maps = JSON.parse(maps);
            }

            maps[saveName] = settings;

            localStorage.setItem(namespace, JSON.stringify(maps));
        }

        public static GetSavedMaps(namespace?: string = "mapBuilder"): { [name: string]: ISettings; } {
            var strMaps = localStorage.getItem(namespace),
                maps: { [name: string]: ISettings; } = JSON.parse(strMaps);

            return maps;
        }

    }

}