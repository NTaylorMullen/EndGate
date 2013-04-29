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

module eg {
    export class Game extends EndGate.Core.Game { };
    export class GameConfiguration extends EndGate.Core.GameConfiguration { };
    export class GameTime extends EndGate.Core.GameTime { };
    export class EventHandler extends EndGate.Core.Utilities.EventHandler { };
    export class Scene2d extends EndGate.Core.Rendering.Scene2d { };
    export class Camera2d extends EndGate.Core.Rendering.Camera.Camera2d { };
    export module MovementControllers {
        export class LinearMovementController extends EndGate.Core.MovementControllers.LinearMovementController { };
    };
    export module InputControllers {
        export class DirectionalInputController extends EndGate.Core.Input.Controllers.DirectionalInputController { };
    };

    export class Graphic2d extends EndGate.Core.Graphics.Graphic2d { };
    export class Text2d extends EndGate.Core.Graphics.Text.Text2d { };
    export class Sprite2d extends EndGate.Core.Graphics.Sprites.Sprite2d { };
    export class ImageSource extends EndGate.Core.Graphics.Sprites.ImageSource { };
    export class SpriteAnimation extends EndGate.Core.Graphics.Sprites.Animation.SpriteAnimation { };
    export class Shape extends EndGate.Core.Graphics.Shapes.Shape { };
    export class Circle extends EndGate.Core.Graphics.Shapes.Circle { };
    export class Rectangle extends EndGate.Core.Graphics.Shapes.Rectangle { };
    export class Collidable extends EndGate.Core.Collision.Collidable { };
    export class BoundingCircle extends EndGate.Core.BoundingObject.BoundingCircle { };
    export class BoundingRectangle extends EndGate.Core.BoundingObject.BoundingRectangle { };
    export class AudioClip extends EndGate.Core.AudioManagement.AudioClip { };
    export class AudioPlayer extends EndGate.Core.AudioManagement.AudioPlayer { };
    export class AudioSettings extends EndGate.Core.AudioManagement.AudioSettings { };
    export class Size2d extends EndGate.Core.Assets.Size2d { };
    export class Vector2d extends EndGate.Core.Assets.Vector2d { };
};