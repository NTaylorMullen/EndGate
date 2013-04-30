var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var eg;
(function (eg) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.apply(this, arguments);

        }
        return Game;
    })(EndGate.Core.Game);
    eg.Game = Game;    
    ;
    var GameConfiguration = (function (_super) {
        __extends(GameConfiguration, _super);
        function GameConfiguration() {
            _super.apply(this, arguments);

        }
        return GameConfiguration;
    })(EndGate.Core.GameConfiguration);
    eg.GameConfiguration = GameConfiguration;    
    ;
    var GameTime = (function (_super) {
        __extends(GameTime, _super);
        function GameTime() {
            _super.apply(this, arguments);

        }
        return GameTime;
    })(EndGate.Core.GameTime);
    eg.GameTime = GameTime;    
    ;
    var EventHandler = (function (_super) {
        __extends(EventHandler, _super);
        function EventHandler() {
            _super.apply(this, arguments);

        }
        return EventHandler;
    })(EndGate.Core.Utilities.EventHandler);
    eg.EventHandler = EventHandler;    
    ;
    var Scene2d = (function (_super) {
        __extends(Scene2d, _super);
        function Scene2d() {
            _super.apply(this, arguments);

        }
        return Scene2d;
    })(EndGate.Core.Rendering.Scene2d);
    eg.Scene2d = Scene2d;    
    ;
    var Camera2d = (function (_super) {
        __extends(Camera2d, _super);
        function Camera2d() {
            _super.apply(this, arguments);

        }
        return Camera2d;
    })(EndGate.Core.Rendering.Camera.Camera2d);
    eg.Camera2d = Camera2d;    
    ;
    var Graphic2d = (function (_super) {
        __extends(Graphic2d, _super);
        function Graphic2d() {
            _super.apply(this, arguments);

        }
        return Graphic2d;
    })(EndGate.Core.Graphics.Graphic2d);
    eg.Graphic2d = Graphic2d;    
    ;
    var Text2d = (function (_super) {
        __extends(Text2d, _super);
        function Text2d() {
            _super.apply(this, arguments);

        }
        return Text2d;
    })(EndGate.Core.Graphics.Text.Text2d);
    eg.Text2d = Text2d;    
    ;
    var Sprite2d = (function (_super) {
        __extends(Sprite2d, _super);
        function Sprite2d() {
            _super.apply(this, arguments);

        }
        return Sprite2d;
    })(EndGate.Core.Graphics.Sprites.Sprite2d);
    eg.Sprite2d = Sprite2d;    
    ;
    var ImageSource = (function (_super) {
        __extends(ImageSource, _super);
        function ImageSource() {
            _super.apply(this, arguments);

        }
        return ImageSource;
    })(EndGate.Core.Graphics.Sprites.ImageSource);
    eg.ImageSource = ImageSource;    
    ;
    var SpriteAnimation = (function (_super) {
        __extends(SpriteAnimation, _super);
        function SpriteAnimation() {
            _super.apply(this, arguments);

        }
        return SpriteAnimation;
    })(EndGate.Core.Graphics.Sprites.Animation.SpriteAnimation);
    eg.SpriteAnimation = SpriteAnimation;    
    ;
    var Shape = (function (_super) {
        __extends(Shape, _super);
        function Shape() {
            _super.apply(this, arguments);

        }
        return Shape;
    })(EndGate.Core.Graphics.Shapes.Shape);
    eg.Shape = Shape;    
    ;
    var Circle = (function (_super) {
        __extends(Circle, _super);
        function Circle() {
            _super.apply(this, arguments);

        }
        return Circle;
    })(EndGate.Core.Graphics.Shapes.Circle);
    eg.Circle = Circle;    
    ;
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle() {
            _super.apply(this, arguments);

        }
        return Rectangle;
    })(EndGate.Core.Graphics.Shapes.Rectangle);
    eg.Rectangle = Rectangle;    
    ;
    var Collidable = (function (_super) {
        __extends(Collidable, _super);
        function Collidable() {
            _super.apply(this, arguments);

        }
        return Collidable;
    })(EndGate.Core.Collision.Collidable);
    eg.Collidable = Collidable;    
    ;
    var BoundingCircle = (function (_super) {
        __extends(BoundingCircle, _super);
        function BoundingCircle() {
            _super.apply(this, arguments);

        }
        return BoundingCircle;
    })(EndGate.Core.BoundingObject.BoundingCircle);
    eg.BoundingCircle = BoundingCircle;    
    ;
    var BoundingRectangle = (function (_super) {
        __extends(BoundingRectangle, _super);
        function BoundingRectangle() {
            _super.apply(this, arguments);

        }
        return BoundingRectangle;
    })(EndGate.Core.BoundingObject.BoundingRectangle);
    eg.BoundingRectangle = BoundingRectangle;    
    ;
    var AudioClip = (function (_super) {
        __extends(AudioClip, _super);
        function AudioClip() {
            _super.apply(this, arguments);

        }
        return AudioClip;
    })(EndGate.Core.AudioManagement.AudioClip);
    eg.AudioClip = AudioClip;    
    ;
    var AudioPlayer = (function (_super) {
        __extends(AudioPlayer, _super);
        function AudioPlayer() {
            _super.apply(this, arguments);

        }
        return AudioPlayer;
    })(EndGate.Core.AudioManagement.AudioPlayer);
    eg.AudioPlayer = AudioPlayer;    
    ;
    var AudioSettings = (function (_super) {
        __extends(AudioSettings, _super);
        function AudioSettings() {
            _super.apply(this, arguments);

        }
        return AudioSettings;
    })(EndGate.Core.AudioManagement.AudioSettings);
    eg.AudioSettings = AudioSettings;    
    ;
    var Size2d = (function (_super) {
        __extends(Size2d, _super);
        function Size2d() {
            _super.apply(this, arguments);

        }
        return Size2d;
    })(EndGate.Core.Assets.Size2d);
    eg.Size2d = Size2d;    
    ;
    var Vector2d = (function (_super) {
        __extends(Vector2d, _super);
        function Vector2d() {
            _super.apply(this, arguments);

        }
        return Vector2d;
    })(EndGate.Core.Assets.Vector2d);
    eg.Vector2d = Vector2d;    
    ;
    (function (MovementControllers) {
        var LinearMovementController = (function (_super) {
            __extends(LinearMovementController, _super);
            function LinearMovementController() {
                _super.apply(this, arguments);

            }
            return LinearMovementController;
        })(EndGate.Core.MovementControllers.LinearMovementController);
        MovementControllers.LinearMovementController = LinearMovementController;        
        ;
    })(eg.MovementControllers || (eg.MovementControllers = {}));
    var MovementControllers = eg.MovementControllers;
    ;
    (function (InputControllers) {
        var DirectionalInputController = (function (_super) {
            __extends(DirectionalInputController, _super);
            function DirectionalInputController() {
                _super.apply(this, arguments);

            }
            return DirectionalInputController;
        })(EndGate.Core.Input.Controllers.DirectionalInputController);
        InputControllers.DirectionalInputController = DirectionalInputController;        
        ;
    })(eg.InputControllers || (eg.InputControllers = {}));
    var InputControllers = eg.InputControllers;
    ;
    (function (Input) {
        var MouseHandler = (function (_super) {
            __extends(MouseHandler, _super);
            function MouseHandler() {
                _super.apply(this, arguments);

            }
            return MouseHandler;
        })(EndGate.Core.Input.Mouse.MouseHandler);
        Input.MouseHandler = MouseHandler;        
        ;
        var KeyboardHandler = (function (_super) {
            __extends(KeyboardHandler, _super);
            function KeyboardHandler() {
                _super.apply(this, arguments);

            }
            return KeyboardHandler;
        })(EndGate.Core.Input.Keyboard.KeyboardHandler);
        Input.KeyboardHandler = KeyboardHandler;        
        ;
    })(eg.Input || (eg.Input = {}));
    var Input = eg.Input;
    ;
})(eg || (eg = {}));
;
//@ sourceMappingURL=EndGateAPI.js.map
