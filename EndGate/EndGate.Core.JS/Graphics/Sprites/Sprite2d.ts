/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../Graphic2d.ts" />
/// <reference path="../ImageSource.ts" />

module EndGate.Graphics {

    /**
    * Defines a drawable sprite.  Sprites are used to draw images to the game screen.
    */
    export class Sprite2d extends Graphic2d {
        public _type: string = "Sprite2d";

        /**
        * Gets or sets the Image that is drawn to the game screen.
        */
        public Image: ImageSource;

        /**
        * Gets or sets the PIXIBase object that is used to render the Sprite.
        */
        public PixiBase: PIXI.Sprite;

        /**
        * Gets or sets the Size of the Sprite2d.  If the Size is not equal to the image's ClipSize the Sprite2d will appear stretched.
        */
        public Size: Size2d;

        /**
        * Creates a new instance of the Sprite2d object with an initial size matching the image's clip size.
        * @param x Initial horizontal location of the Sprite2d.
        * @param y Initial vertical location of the Sprite2d.
        * @param image Initial ImageSource of the Sprite2d.
        */
        constructor(x: number, y: number, image: ImageSource);
        /**
        * Creates a new instance of the Sprite2d object.
        * @param x Initial horizontal location of the Sprite2d.
        * @param y Initial vertical location of the Sprite2d.
        * @param image Initial ImageSource of the Sprite2d.
        * @param width Initial width of the Sprite2d.  If the width does not equal the width of the image's clip width the Sprite2d will appear stretched.
        * @param height Initial height of the Sprite2d.  If the height does not equal the height of the image's clip height the Sprite2d will appear stretched.
        */
        constructor(x: number, y: number, image: ImageSource, width: number, height: number);
        constructor(x: number, y: number, image: ImageSource, width: number = image.ClipSize.Width, height: number = image.ClipSize.Height) {
            super(new PIXI.Sprite(image.ToTexture()), new Vector2d(x, y));

            this.Image = image;
            this.Size = new Size2d(width, height);
            this.PixiBase.anchor.x = this.PixiBase.anchor.y = .5;
        }

        /**
        * The bounding area that represents where the Sprite2d will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, this.Size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }

        /**
        * Draws the sprite onto the given context.  If this sprite is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the sprite onto.
        */
        public Draw(): void {
            this.PixiBase.width = this.Size.Width;
            this.PixiBase.height = this.Size.Height;            
            (<any>this.PixiBase).dirty = true;

            super.Draw();
        }

        /**
        * Returns a nearly identical copy of this Sprite2d.  If this Sprite2d belongs to a parent, the cloned Sprite2d will not. If this Sprite2d has children, all children will be cloned as well.  Lastly, the cloned Sprite2d will not have the same event bindings as this one does.
        */
        public Clone(): Sprite2d {
            var graphic = new Sprite2d(this.Position.X, this.Position.Y, this.Image.Clone(), this.Size.Width, this.Size.Height);

            super._Clone(graphic);

            return graphic;
        }
    }

}