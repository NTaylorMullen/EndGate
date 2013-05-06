/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Utilities/EventHandler.ts" />

module EndGate.Graphics.Assets {

    export class ImageSource {
        public Loaded: bool;
        public ClipLocation: Vector2d;
        public ClipSize: Size2d;
        public Size: Size2d;
        public Source: HTMLImageElement;

        private _imageLocation;

        constructor(imageLocation: string, width: number, height: number);
        constructor(imageLocation: string, width: number, height: number, clipX?: number = 0, clipY?: number = 0, clipWidth?: number, clipHeight?: number);
        constructor(imageLocation: string, width: number, height: number, clipX?: number = 0, clipY?: number = 0, clipWidth?: number = width, clipHeight?: number = height) {
            this.Loaded = false;
            this.OnLoaded = new EventHandler();
            this.Size = new Size2d(width, height);

            this.Source = new Image();
            this.Source.onload = () => {
                this.Loaded = true;

                this.OnLoaded.Trigger(this);
            };

            this.Source.src = imageLocation;
            this.ClipLocation = new Vector2d(clipX, clipY);
            this.ClipSize = new Size2d(clipWidth, clipHeight);
            this._imageLocation = imageLocation;
        }

        public OnLoaded: EventHandler;

        public Extract(clipX: number, clipY: number, clipWidth: number, clipHeight: number): ImageSource {
            return new ImageSource(this._imageLocation, this.Size.Width, this.Size.Height, clipX, clipY, clipWidth, clipHeight);
        }
    }

}