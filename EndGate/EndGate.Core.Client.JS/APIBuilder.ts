/// <reference path="Game.ts" />
/// <reference path="GameConfiguration.ts" />
/// <reference path="GameTime.ts" />
/// <reference path="Utilities/EventHandler.ts" />
/// <reference path="Rendering/Scene2d.ts" />
/// <reference path="Rendering/Camera/Camera2d.ts" />
/// <reference path="MovementControllers/LinearMovementController.ts" />
/// <reference path="Input/Controllers/DirectionalInputController.ts" />
/// <reference path="Graphics/Graphic2d.ts" />
/// <reference path="Graphics/Text/Text2d.ts" />
/// <reference path="Graphics/Sprites/Sprite2d.ts" />
/// <reference path="Graphics/Sprites/ImageSource.ts" />
/// <reference path="Graphics/Sprites/Animation/SpriteAnimation.ts" />
/// <reference path="Graphics/Shapes/Shape.ts" />
/// <reference path="Graphics/Shapes/Circle.ts" />
/// <reference path="Graphics/Shapes/Rectangle.ts" />
/// <reference path="Collision/Collidable.ts" />
/// <reference path="BoundingObject/BoundingCircle.ts" />
/// <reference path="BoundingObject/BoundingRectangle.ts" />
/// <reference path="AudioManagement/AudioClip.ts" />
/// <reference path="AudioManagement/AudioPlayer.ts" />
/// <reference path="AudioManagement/AudioSettings.ts" />
/// <reference path="Assets/Sizes/Size2d.ts" />
/// <reference path="Assets/Vectors/Vector2d.ts" />

var eg = {
    Game: EndGate.Core.Game,
    GameConfiguration: EndGate.Core.GameConfiguration,
    GameTime: EndGate.Core.GameTime,
    EventHandler: EndGate.Core.Utilities.EventHandler,
    Scene2d: EndGate.Core.Rendering.Scene2d,
    Camera2d: EndGate.Core.Rendering.Camera.Camera2d,
    MovementControllers: {
        LinearMovementController: EndGate.Core.MovementControllers.LinearMovementController
    },
    InputControllers: {
        DirectionalInputController: EndGate.Core.Input.Controllers.DirectionalInputController
    },
    Graphic2d: EndGate.Core.Graphics.Graphic2d,
    Text2d: EndGate.Core.Graphics.Text.Text2d,
    Sprite2d: EndGate.Core.Graphics.Sprites.Sprite2d,
    ImageSource: EndGate.Core.Graphics.Sprites.ImageSource,
    SpriteAnimation: EndGate.Core.Graphics.Sprites.Animation.SpriteAnimation,
    Shape: EndGate.Core.Graphics.Shapes.Shape,
    Circle: EndGate.Core.Graphics.Shapes.Circle,
    Rectangle: EndGate.Core.Graphics.Shapes.Rectangle,
    Collidable: EndGate.Core.Collision.Collidable,
    BoundingCircle: EndGate.Core.BoundingObject.BoundingCircle,
    BoundingCircle: EndGate.Core.BoundingObject.BoundingRectangle,
    AudioClip: EndGate.Core.AudioManagement.AudioClip,
    AudioPlayer: EndGate.Core.AudioManagement.AudioPlayer,
    AudioSettings: EndGate.Core.AudioManagement.AudioSettings,
    Size2d: EndGate.Core.Assets.Size2d,
    Vector2d: EndGate.Core.Assets.Vector2d
};