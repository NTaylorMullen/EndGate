(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), spriteGame, rotationSlider, xPositionSlider, yPositionSlider, opacitySlider, widthSlider, heightSlider, ensureValue = function (val, min, max) {
        return Math.min(Math.max(val, min), max);
    }, slidersAnimationMappings = {
        Position: function () {
            xPositionSlider.UpdateSlider(ensureValue(spriteGame.Sprite.Position.X, 0, canvas.width / 2));
            yPositionSlider.UpdateSlider(ensureValue(spriteGame.Sprite.Position.Y, 0, canvas.height / 2));
        },
        Rotation: function () {
            rotationSlider.UpdateSlider(ensureValue(spriteGame.Sprite.Rotation * 100, -628, 628));
        },
        Size: function () {
            var newWidth, newHeight;
            newWidth = spriteGame.Sprite.Size.Width;
            newHeight = spriteGame.Sprite.Size.Height;
            widthSlider.UpdateSlider(ensureValue(newWidth, 0, canvas.width));
            heightSlider.UpdateSlider(ensureValue(newHeight, 0, canvas.height));
        },
        Opacity: function () {
            opacitySlider.UpdateSlider(ensureValue(spriteGame.Sprite.Opacity() * 100, 0, 100));
        }
    }, syncSliders = function (animation) {
        slidersAnimationMappings[animation]();
    };
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    spriteGame = new SpriteGame(canvas, $(".spriteAnimator"), new eg.Vector2d(canvas.width / 2, canvas.height / 2), new eg.Size2d(100, 100), 0, 1, syncSliders);
    rotationSlider = new CustomSlider($("#rotationSlider"), -628, 628, 0, function (newrotation) {
        spriteGame.Sprite.Rotation = newrotation / 100;
    });
    xPositionSlider = new CustomSlider($("#positionXSlider"), 0, canvas.width, spriteGame.Sprite.Position.X, function (newX) {
        spriteGame.Sprite.Position.X = newX;
    });
    yPositionSlider = new CustomSlider($("#positionYSlider"), 0, canvas.height, spriteGame.Sprite.Position.Y, function (newY) {
        spriteGame.Sprite.Position.Y = newY;
    });
    opacitySlider = new CustomSlider($("#opacitySlider"), 0, 100, 100, function (newAlpha) {
        spriteGame.Sprite.Opacity(newAlpha / 100);
    });
    widthSlider = new CustomSlider($("#widthSlider"), 0, canvas.width, spriteGame.Sprite.Size.Width, function (newWidth) {
        spriteGame.Sprite.Size.Width = newWidth;
    });
    heightSlider = new CustomSlider($("#heightSlider"), 0, canvas.height, spriteGame.Sprite.Size.Height, function (newHeight) {
        spriteGame.Sprite.Size.Height = newHeight;
    });
})($, window);
//@ sourceMappingURL=Main.js.map
