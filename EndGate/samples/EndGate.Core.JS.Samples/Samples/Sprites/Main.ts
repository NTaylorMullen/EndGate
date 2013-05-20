/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="SpriteGame.ts" />
/// <reference path="CustomSlider.ts" />
/// <reference path="SpriteAnimator.ts" />

(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        spriteGame: SpriteGame,
        // Instantiates all of the sliders
        rotationSlider: CustomSlider,
        xPositionSlider: CustomSlider,
        yPositionSlider: CustomSlider,
        opacitySlider: CustomSlider,
        widthSlider: CustomSlider,
        heightSlider: CustomSlider,
        // Return value that is closest to provided value but still within min-max range
        ensureValue = function (val, min, max) {
            return Math.min(Math.max(val, min), max);
        },
        slidersAnimationMappings = {
            Position: function () {
                xPositionSlider.UpdateSlider(ensureValue(spriteGame.Sprite.Position.X, 0, canvas.width / 2));
                yPositionSlider.UpdateSlider(ensureValue(spriteGame.Sprite.Position.Y, 0, canvas.height / 2));
            },
            Rotation: function () {
                rotationSlider.UpdateSlider(ensureValue(spriteGame.Sprite.Rotation * 100, -628, 628));
            },
            Size: function () {
                var newWidth,
                    newHeight;

                newWidth = spriteGame.Sprite.Size.Width;
                newHeight = spriteGame.Sprite.Size.Height;

                widthSlider.UpdateSlider(ensureValue(newWidth, 0, canvas.width));
                heightSlider.UpdateSlider(ensureValue(newHeight, 0, canvas.height));
            },
            Opacity: function () {
                opacitySlider.UpdateSlider(ensureValue(spriteGame.Sprite.Opacity() * 100, 0, 100));
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
    spriteGame = new SpriteGame(canvas, $(".spriteAnimator"), new eg.Vector2d(canvas.width / 2, canvas.height / 2), new eg.Size2d(100, 100), 0, 1, syncSliders);

    // Wire up all the sliders
    rotationSlider = new CustomSlider($("#rotationSlider"), -628, 628, 0, (newrotation: number) => {
        spriteGame.Sprite.Rotation = newrotation / 100;
    });
    xPositionSlider = new CustomSlider($("#positionXSlider"), 0, canvas.width, spriteGame.Sprite.Position.X, (newX: number) => {
        spriteGame.Sprite.Position.X = newX;
    });
    yPositionSlider = new CustomSlider($("#positionYSlider"), 0, canvas.height, spriteGame.Sprite.Position.Y, (newY: number) => {
        spriteGame.Sprite.Position.Y = newY;
    });
    opacitySlider = new CustomSlider($("#opacitySlider"), 0, 100, 100, (newAlpha) => {
        spriteGame.Sprite.Opacity(newAlpha / 100);
    });
    widthSlider = new CustomSlider($("#widthSlider"), 0, canvas.width, spriteGame.Sprite.Size.Width, (newWidth: number) => {
        spriteGame.Sprite.Size.Width = newWidth;
    });
    heightSlider = new CustomSlider($("#heightSlider"), 0, canvas.height, spriteGame.Sprite.Size.Height, (newHeight: number) => {
        spriteGame.Sprite.Size.Height = newHeight;
    });

})($, window);