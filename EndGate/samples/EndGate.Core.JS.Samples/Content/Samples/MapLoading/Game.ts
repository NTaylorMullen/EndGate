/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="CameraController.ts" />
/// <reference path="LoadHandler.ts" />

// Wrap in module to keep code out of global scope
module MapLoading {

    export class Game extends eg.Game {        
        private _cameraController: CameraController;
        private _loadHandler: LoadHandler;
        private _loading: boolean;

        constructor(canvas: HTMLCanvasElement, mapUrlInput: JQuery, private _loadMapButton: JQuery, private _gameHolder: JQuery, private _loadDialog: JQuery) {
            super(canvas);

            this._loading = false;
            this._loadHandler = new LoadHandler(this, this._loadDialog);

            this._loadMapButton.click(() => {
                // Only allow clicks if we aren't already loading a map
                if (!this._loading) {
                    this._loading = true;

                    // Show the loading dialog
                    this.ShowLoadDialog();

                    // Use our custom load handler to load the map and to display the info.
                    this._loadHandler.Load(mapUrlInput.val(), () => {
                        // Delay the show game so the loading can seem complete
                        setTimeout(() => {
                            // Triggered when the map has finished loading

                            // Show the game
                            this.ShowGame();

                            // Allow other loads
                            this._loading = false;
                        }, 500);
                    });
                }
            });

            // Pre-load the scene with the initial json map
            this._loadMapButton.click();

            // This camera controller is what makes the camera move around the game map.
            this._cameraController = new CameraController(this.Scene.Camera, this.Input.Mouse);
        }

        public Update(gameTime: eg.GameTime): void {
            this._cameraController.Update(gameTime);
        }

        private ShowLoadDialog(): void {
            this._loadMapButton.addClass("disabled");
            this._gameHolder.hide();
            this._loadDialog.show();
        }

        private ShowGame(): void {
            this._loadDialog.hide();
            this._gameHolder.show();
            this._loadMapButton.removeClass("disabled");
        }
    }

}