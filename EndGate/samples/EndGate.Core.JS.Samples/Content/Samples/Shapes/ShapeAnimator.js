/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
// Wrap in module to keep code out of global scope
var Shapes;
(function (Shapes) {
    var ShapeAnimator = (function () {
        function ShapeAnimator(shapeAnimators, _defaultPosition, _defaultSize, _defaultRotation, _defaultOpacity, _syncSliders) {
            this._defaultPosition = _defaultPosition;
            this._defaultSize = _defaultSize;
            this._defaultRotation = _defaultRotation;
            this._defaultOpacity = _defaultOpacity;
            this._syncSliders = _syncSliders;
            this.Direction = 1;
            this.CurrentAnimations = {
                Position: false,
                Rotation: false,
                Size: false,
                Opacity: false
            };
            var that = this, animatorClicked = function () {
                var $this = $(this), animation = $this.attr("animation");
                if($this.hasClass("btn-success")) {
                    that.CurrentAnimations[animation] = false;
                    $this.removeClass("btn-success");
                } else {
                    that.CurrentAnimations[animation] = true;
                    $this.addClass("btn-success");
                }
            };
            $.each(shapeAnimators, function (i, btn) {
                $(this).click(animatorClicked);
            });
            this._lastChanged = new Date().getTime();
        }
        ShapeAnimator.AnimationSpeed = 50;
        ShapeAnimator.RotationSpeed = Math.PI / 4;
        ShapeAnimator.ChangeDirectionEvery = 3000;
        ShapeAnimator.prototype.ApplyAnimation = function (shape, gameTime) {
            if(gameTime.Now.getTime() - this._lastChanged > ShapeAnimator.ChangeDirectionEvery) {
                this.Direction *= -1;
                this._lastChanged = gameTime.Now.getTime();
            }
            for(var key in this.CurrentAnimations) {
                if(this.CurrentAnimations[key]) {
                    this[key](shape, gameTime);
                    this._syncSliders(key);
                }
            }
        };
        ShapeAnimator.prototype.Position = function (shape, gameTime) {
            var incrementor = ShapeAnimator.AnimationSpeed * gameTime.ElapsedSecond, direction = shape.Position.Subtract(this._defaultPosition).Abs().Sign();
            if(direction.Magnitude() === 0) {
                direction = eg.Vector2d.One();
            }
            shape.Position = shape.Position.Add(direction.Multiply(this.Direction).Multiply(incrementor));
        };
        ShapeAnimator.prototype.Size = function (shape, gameTime) {
            var incrementor = ShapeAnimator.AnimationSpeed * gameTime.ElapsedSecond;
            if(shape._type === "Circle") {
                shape.Radius += this.Direction * incrementor;
            } else {
                shape.Size = shape.Size.Add(this.Direction * incrementor);
            }
        };
        ShapeAnimator.prototype.Rotation = function (shape, gameTime) {
            var incrementor = ShapeAnimator.RotationSpeed * gameTime.ElapsedSecond, direction = 1;
            shape.Rotation += direction * this.Direction * incrementor;
        };
        ShapeAnimator.prototype.Opacity = function (shape, gameTime) {
            var incrementor = .33 * gameTime.ElapsedSecond;
            shape.Opacity(shape.Opacity() + incrementor * this.Direction);
            if(shape.Opacity() > 1) {
                shape.Opacity(1);
            }
        };
        return ShapeAnimator;
    })();
    Shapes.ShapeAnimator = ShapeAnimator;    
})(Shapes || (Shapes = {}));
//@ sourceMappingURL=ShapeAnimator.js.map
