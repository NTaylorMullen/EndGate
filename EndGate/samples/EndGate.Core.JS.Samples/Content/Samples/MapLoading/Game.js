var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="CameraController.ts" />
/// <reference path="LoadHandler.ts" />
// Wrap in module to keep code out of global scope
var MapLoading;
(function (MapLoading) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(canvas, mapUrlInput, _loadMapButton, _gameHolder, _loadDialog) {
            var _this = this;
            _super.call(this, canvas);
            this._loadMapButton = _loadMapButton;
            this._gameHolder = _gameHolder;
            this._loadDialog = _loadDialog;

            this._loading = false;
            this._loadHandler = new MapLoading.LoadHandler(this, this._loadDialog);

            this._loadMapButton.click(function () {
                if (!_this._loading) {
                    _this._loading = true;

                    // Show the loading dialog
                    _this.ShowLoadDialog();

                    // Use our custom load handler to load the map and to display the info.
                    _this._loadHandler.Load(mapUrlInput.val(), function () {
                        // Delay the show game so the loading can seem complete
                        setTimeout(function () {
                            // Triggered when the map has finished loading
                            // Show the game
                            _this.ShowGame();

                            // Allow other loads
                            _this._loading = false;
                        }, 500);
                    });
                }
            });

            // Pre-load the scene with the initial json map
            this._loadMapButton.click();

            // This camera controller is what makes the camera move around the game map.
            this._cameraController = new MapLoading.CameraController(this.Scene.Camera, this.Input.Mouse);
        }
        Game.prototype.Update = function (gameTime) {
            this._cameraController.Update(gameTime);
        };

        Game.prototype.ShowLoadDialog = function () {
            this._loadMapButton.addClass("disabled");
            this._gameHolder.hide();
            this._loadDialog.show();
        };

        Game.prototype.ShowGame = function () {
            this._loadDialog.hide();
            this._gameHolder.show();
            this._loadMapButton.removeClass("disabled");
        };
        return Game;
    })(eg.Game);
    MapLoading.Game = Game;
})(MapLoading || (MapLoading = {}));
//@ sourceMappingURL=Game.js.map
