/// <reference path="Game.ts" />
/// <reference path="GameConfiguration.ts" />
/// <reference path="GameTime.ts" />
/// <reference path="Utilities/EventHandler.ts" />
/// <reference path="Utilities/EventHandler1.ts" />
/// <reference path="Utilities/EventHandler2.ts" />
/// <reference path="Rendering/Scene2d.ts" />
/// <reference path="Rendering/Camera/Camera2d.ts" />
/// <reference path="MovementControllers/LinearMovementController.ts" />
/// <reference path="InputControllers/DirectionalInputController.ts" />
/// <reference path="Graphics/Graphic2d.ts" />
/// <reference path="Graphics/Text/Text2d.ts" />
/// <reference path="Graphics/Sprites/Sprite2d.ts" />
/// <reference path="Graphics/Sprites/ImageSource.ts" />
/// <reference path="Graphics/Sprites/Animation/SpriteAnimation.ts" />
/// <reference path="Graphics/Shapes/Shape.ts" />
/// <reference path="Graphics/Shapes/Circle.ts" />
/// <reference path="Graphics/Shapes/Rectangle.ts" />
/// <reference path="Graphics/Line2d.ts" />
/// <reference path="Graphics/Grid/Grid.ts" />
/// <reference path="Collision/Collidable.ts" />
/// <reference path="Bounds/BoundingCircle.ts" />
/// <reference path="Bounds/BoundingRectangle.ts" />
/// <reference path="Sound/AudioClip.ts" />
/// <reference path="Sound/AudioPlayer.ts" />
/// <reference path="Sound/AudioSettings.ts" />
/// <reference path="Assets/Sizes/Size2d.ts" />
/// <reference path="Assets/Vectors/Vector2d.ts" />
/// <reference path="Assets/Matrixes/Matrix2x2.ts" />
/// <reference path="Map/MapManager.ts" />
/// <reference path="Map/Scenery/SceneryHandler.ts" />
/// <reference path="Map/Scenery/SquareTileMap.ts" />
/// <reference path="Map/Scenery/TileMap.ts" />

// When this file is compiled into a declaration file it does not include this line,
// therefore in the build.ps1 we have to append this aliasing module.


// NOTE: Should re-alias all methods once the TypeScript .9 bug has been fixed: https://typescript.codeplex.com/workitem/1182
//import eg = EndGate;