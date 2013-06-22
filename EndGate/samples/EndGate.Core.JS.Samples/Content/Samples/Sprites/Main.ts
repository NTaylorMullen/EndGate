/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="CustomSlider.ts" />
/// <reference path="SpriteAnimator.ts" />

(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        game: Sprites.Game,
        // Instantiates all of the sliders
        rotationSlider: Sprites.CustomSlider,
        xPositionSlider: Sprites.CustomSlider,
        yPositionSlider: Sprites.CustomSlider,
        opacitySlider: Sprites.CustomSlider,
        widthSlider: Sprites.CustomSlider,
        heightSlider: Sprites.CustomSlider,
        // Return value that is closest to provided value but still within min-max range
        ensureValue = function (val, min, max) {
            return Math.min(Math.max(val, min), max);
        },
        slidersAnimationMappings = {
            Position: function () {
                xPositionSlider.UpdateSlider(ensureValue(game.Sprite.Position.X, 0, canvas.width / 2));
                yPositionSlider.UpdateSlider(ensureValue(game.Sprite.Position.Y, 0, canvas.height / 2));
            },
            Rotation: function () {
                rotationSlider.UpdateSlider(ensureValue(game.Sprite.Rotation * 100, -628, 628));
            },
            Size: function () {
                var newWidth,
                    newHeight;

                newWidth = game.Sprite.Size.Width;
                newHeight = game.Sprite.Size.Height;

                widthSlider.UpdateSlider(ensureValue(newWidth, 0, canvas.width));
                heightSlider.UpdateSlider(ensureValue(newHeight, 0, canvas.height));
            },
            Opacity: function () {
                opacitySlider.UpdateSlider(ensureValue(game.Sprite.Opacity * 100, 0, 100));
            }
        },
        // Sync sliders is used to make sure that all sliders are showing the correct values
        syncSliders: Function = function (animation) {
            slidersAnimationMappings[animation]();
        };

    // Setup DOM
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    // Create game
    game = new Sprites.Game(canvas, $(".spriteAnimator"), new eg.Vector2d(canvas.width / 2, canvas.height / 2), new eg.Size2d(100, 100), 0, 1, syncSliders);

    // Wire up all the sliders
    rotationSlider = new Sprites.CustomSlider($("#rotationSlider"), -628, 628, 0, (newrotation: number) => {
        game.Sprite.Rotation = newrotation / 100;
    });
    xPositionSlider = new Sprites.CustomSlider($("#positionXSlider"), 0, canvas.width, game.Sprite.Position.X, (newX: number) => {
        game.Sprite.Position.X = newX;
    });
    yPositionSlider = new Sprites.CustomSlider($("#positionYSlider"), 0, canvas.height, game.Sprite.Position.Y, (newY: number) => {
        game.Sprite.Position.Y = newY;
    });
    opacitySlider = new Sprites.CustomSlider($("#opacitySlider"), 0, 100, 100, (newAlpha) => {
        game.Sprite.Opacity = newAlpha / 100;
    });
    widthSlider = new Sprites.CustomSlider($("#widthSlider"), 0, canvas.width, game.Sprite.Size.Width, (newWidth: number) => {
        game.Sprite.Size.Width = newWidth;
    });
    heightSlider = new Sprites.CustomSlider($("#heightSlider"), 0, canvas.height, game.Sprite.Size.Height, (newHeight: number) => {
        game.Sprite.Size.Height = newHeight;
    });

})($, window);