/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="ShapeGame.ts" />
/// <reference path="ColorPicker.ts" />
/// <reference path="CustomSlider.ts" />

(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        shapeGame: ShapeGame,
        // Instantiates all of the sliders
        shapeColorPicker: ColorPicker,
        borderColorPicker: ColorPicker,
        borderThicknessSlider: CustomSlider,
        rotationSlider: CustomSlider,
        xPositionSlider: CustomSlider,
        yPositionSlider: CustomSlider,
        opacitySlider: CustomSlider,
        widthSlider: CustomSlider,
        heightSlider: CustomSlider,
        shadowXSlider: CustomSlider,
        shadowYSlider: CustomSlider,
        shadowColorPicker: ColorPicker,
        shadowBlurSlider: CustomSlider,
        // Return value that is closest to provided value but still within min-max range
        ensureValue = function (val, min, max) {
            return Math.min(Math.max(val, min), max);
        },
        // These functions are used to sync the shapes positions with the sliders
        slidersAnimationMappings = {
            Position: function () {
                xPositionSlider.UpdateSlider(ensureValue(shapeGame.Shape.Position.X, 0, canvas.width / 2));
                yPositionSlider.UpdateSlider(ensureValue(shapeGame.Shape.Position.Y, 0, canvas.height / 2));
            },
            Rotation: function () {
                rotationSlider.UpdateSlider(ensureValue(shapeGame.Shape.Rotation * 100, -628, 628));
            },
            Size: function () {
                var newWidth,
                    newHeight;

                // Need to special case the Circle due to the difference in how Size is handled
                if (shapeGame.Shape._type === "Circle") {
                    newWidth = shapeGame.Shape.Radius;
                    newHeight = shapeGame.Shape.Radius;
                }
                else {
                    newWidth = shapeGame.Shape.Size.Width;
                    newHeight = shapeGame.Shape.Size.Height;
                }

                widthSlider.UpdateSlider(ensureValue(newWidth, 0, canvas.width));
                heightSlider.UpdateSlider(ensureValue(newHeight, 0, canvas.height));
            },
            Opacity: function () {
                opacitySlider.UpdateSlider(ensureValue(shapeGame.Shape.Opacity() * 100, 0, 100));
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
    shapeGame = new ShapeGame(canvas, $(".shapeBuilder"), $(".shapeAnimator"), new eg.Vector2d(canvas.width / 2, canvas.height / 2), new eg.Size2d(100, 100), 0, 1, syncSliders);

    // Wire up all the sliders
    shapeColorPicker = new ColorPicker($("#redColorPicker"), $("#greenColorPicker"), $("#blueColorPicker"), [127, 0, 127], (newcolor: string) => {
        shapeGame.Shape.Color(newcolor);
    });
    rotationSlider = new CustomSlider($("#rotationSlider"), -628, 628, 0, (newrotation: number) => {
        shapeGame.Shape.Rotation = newrotation / 100;
    });
    xPositionSlider = new CustomSlider($("#positionXSlider"), 0, canvas.width, shapeGame.Shape.Position.X, (newX: number) => {
        shapeGame.Shape.Position.X = newX;
    });
    yPositionSlider = new CustomSlider($("#positionYSlider"), 0, canvas.height, shapeGame.Shape.Position.Y, (newY: number) => {
        shapeGame.Shape.Position.Y = newY;
    });
    opacitySlider = new CustomSlider($("#opacitySlider"), 0, 100, 100, (newAlpha) => {
        shapeGame.Shape.Opacity(newAlpha / 100);
    });
    widthSlider = new CustomSlider($("#widthSlider"), 0, canvas.width, shapeGame.Shape.Size.Width, (newWidth: number) => {
        if (shapeGame.Shape._type === "Circle") {
            shapeGame.Shape.Radius = newWidth;
        }
        else {
            shapeGame.Shape.Size.Width = newWidth;
        }
    });
    heightSlider = new CustomSlider($("#heightSlider"), 0, canvas.height, shapeGame.Shape.Size.Height, (newHeight: number) => {
        if (shapeGame.Shape._type === "Circle") {
            shapeGame.Shape.Radius = newHeight;
        }
        else {
            shapeGame.Shape.Size.Height = newHeight;
        }
    });
    borderColorPicker = new ColorPicker($("#borderRed"), $("#borderGreen"), $("#borderBlue"), [0, 0, 0], (newcolor: string) => {
        shapeGame.Shape.BorderColor(newcolor);
    });
    borderThicknessSlider = new CustomSlider($("#borderThickness"), 0, 100, 7, (newThickness) => {
        shapeGame.Shape.BorderThickness(newThickness);
    });
    shadowXSlider = new CustomSlider($("#shadowX"), -30, 30, 20, (newX: number) => {
        shapeGame.Shape.ShadowX(newX);
    });
    shadowYSlider = new CustomSlider($("#shadowY"), -30, 30, 10, (newY: number) => {
        shapeGame.Shape.ShadowY(newY);
    });
    shadowColorPicker = new ColorPicker($("#shadowColorRed"), $("#shadowColorGreen"), $("#shadowColorBlue"), [0, 0, 100], (newcolor: string) => {
        shapeGame.Shape.ShadowColor(newcolor);
    });
    shadowBlurSlider = new CustomSlider($("#shadowBlur"), 0, 300, 55, (newBlur: number) => {
        shapeGame.Shape.ShadowBlur(newBlur);
    });

})($, window);