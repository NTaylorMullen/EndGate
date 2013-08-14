/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module Camera {

    export class World {
        constructor(scene: eg.Rendering.Scene2d) {
            var camSize: eg.Size2d = scene.Camera.Size;

            // Add shapes and text to the Scene to represent the game world
            scene.Add(new eg.Graphics.Circle(350, 600, 25, eg.Graphics.Color.Green));
            scene.Add(new eg.Graphics.Rectangle(camSize.Width, camSize.Height + 125, 125, 125, new eg.Graphics.Color("red")));
            scene.Add(new eg.Graphics.Circle(400, 200, 25, eg.Graphics.Color.Orange));
            scene.Add(this.CreateRotatedRect(0, 0, 200, 150, eg.Graphics.Color.Gray, Math.PI / 4));
            scene.Add(this.CreateRotatedRect(0, 800, 400, 125, eg.Graphics.Color.Yellow, Math.PI * 1.75));
            scene.Add(this.CreateRotatedText(camSize.Width, -30, "Hello!", 0));
            scene.Add(this.CreateRotatedText(camSize.HalfWidth, 0, "TOP SIDE", 0));
            scene.Add(this.CreateRotatedText(0, camSize.HalfHeight, "LEFT SIDE", -Math.PI / 2));
            scene.Add(this.CreateRotatedText(camSize.Width, camSize.HalfHeight, "RIGHT SIDE", Math.PI / 2));
            scene.Add(this.CreateRotatedText(camSize.HalfWidth, camSize.Height, "BOTTOM SIDE", Math.PI));
        }

        // These two functions are just helper functions to make the above code look nicer

        private CreateRotatedRect(x: number, y: number, width: number, height: number, color: eg.Graphics.Color, rotation: number): eg.Graphics.Rectangle {
            var rect = new eg.Graphics.Rectangle(x, y, width, height, color);
            rect.Rotation = rotation;
            return rect;
        }

        private CreateRotatedText(x: number, y: number, text: string, rotation: number): eg.Graphics.Text2d {
            var t: eg.Graphics.Text2d = new eg.Graphics.Text2d(x, y, text);
            t.FontSettings.FontSize = 16 + "pt";
            t.Rotation = rotation;
            return t;
        }
    }

}