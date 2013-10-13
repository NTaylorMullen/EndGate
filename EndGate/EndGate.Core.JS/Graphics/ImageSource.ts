/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ICloneable.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Utilities/EventHandler1.ts" />

module EndGate.Graphics {

    /**
    * Defines an image resource that can be used within Sprite's, SpriteAnimation's and other drawable graphics.
    */
    export class ImageSource implements IDisposable, ICloneable {
        /**
        * Gets or sets the ClipLocation.  Represents where the image clip is within the base image.
        */
        public ClipLocation: Vector2d;
        /**
        * Gets or sets the ClipSize.  Represents how large the image clip is within the base image.
        */
        public ClipSize: Size2d;
        /**
        * Gets the base image source.  Should not be modified once the ImageSource has been constructed
        */
        public Source: HTMLImageElement;

        private _size: Size2d;
        private _loaded: boolean;
        private _imageLocation;
        private _onLoaded: EventHandler1<ImageSource>;
        private _loadWire: (e: Event) => void;

        /**
        * Creates a new instance of the ImageSource object with a pre-loaded image object.
        * @param image Image object to use as the source.
        */
        constructor(image: HTMLImageElement);
        /**
        * Creates a new instance of the ImageSource object.
        * @param imageLocation Image source url (this cannot change after construction). 
        */
        constructor(imageLocation: string);
        /**
        * Creates a new instance of the ImageSource object with a specified width and height.  ClipSize defaults to the full size and the ClipLocation defaults to (0,0). If width and height are not equal to the actual width and height of the image source the image will be stretched
        * @param imageLocation Image source url (this cannot change after construction).
        * @param width The width of the base image (this cannot change after construction).
        * @param height The height of the base image (this cannot change after construction).
        */
        constructor(imageLocation: string, width: number, height: number);
        /**
        * Creates a new instance of the ImageSource object with a specified width and height and a clip location.  If width and height are smaller than the actual width and height of the image source the image will be stretched
        * @param image Image object to use as the source.
        * @param clipX The horizontal location of the clip.
        * @param clipY The vertical location of the clip.
        * @param clipWidth The width of the clip.  Ultimately this width is the width that is drawn to the screen.
        * @param clipHeight The height of the clip.  Ultimately this height is the height that is drawn to the screen.
        */
        constructor(image: HTMLImageElement, clipX: number, clipY: number, clipWidth: number, clipHeight: number);
        /**
        * Creates a new instance of the ImageSource object with a specified width and height and a clip location.  If width and height are smaller than the actual width and height of the image source the image will be stretched
        * @param imageLocation Image source url (this cannot change after construction).
        * @param width The width of the base image (this cannot change after construction).
        * @param height The height of the base image (this cannot change after construction).
        * @param clipX The horizontal location of the clip.
        * @param clipY The vertical location of the clip.
        * @param clipWidth The width of the clip.  Ultimately this width is the width that is drawn to the screen.
        * @param clipHeight The height of the clip.  Ultimately this height is the height that is drawn to the screen.
        */
        constructor(imageLocation: string, width: number, height: number, clipX: number, clipY: number, clipWidth: number, clipHeight: number);        
        constructor(image: any, width?: number, height?: number, clipX: number = 0, clipY: number = 0, clipWidth: number = width, clipHeight: number = height) {
            var sizeDefined: boolean = typeof width !== "undefined", imageLocation: string;

            this._onLoaded = new EventHandler1<ImageSource>();

            if (typeof image === "string") {
                imageLocation = image;
                this._loaded = false;
                this.Source = new Image();
                this._loadWire = (e: Event) => {
                    this._loaded = true;

                    if (!sizeDefined) {
                        this._size = new Size2d(this.Source.width, this.Source.height);
                        this.ClipLocation = Vector2d.Zero;
                        this.ClipSize = this._size.Clone();
                    }

                    this._onLoaded.Trigger(this);
                };

                this.Source.src = imageLocation;
                this._imageLocation = imageLocation;

                if (sizeDefined) {
                    this._size = new Size2d(width, height);
                    this.ClipLocation = new Vector2d(clipX, clipY);
                    this.ClipSize = new Size2d(clipWidth, clipHeight);
                }
                else {
                    this.ClipSize = null; // Waiting for the image source OnLoad to set it
                }
            } else {
                clipWidth = clipX;
                clipHeight = clipY;
                clipX = width;
                clipY = height;

                this.Source = image;

                this._loaded = false;

                this._loadWire = (e: Event) => {
                    this._loaded = true;
                    this._onLoaded.Trigger(this);
                };                

                this._imageLocation = image.src;
                this._size = new Size2d(image.width, image.height);

                this.ClipLocation = new Vector2d(clipX, clipY);
                this.ClipSize = new Size2d(clipWidth, clipHeight);
            }

            if (!this.Source.complete) {
                this.Source.addEventListener("load", this._loadWire, false);
            } else {
                setTimeout(this._loadWire, 0);
            }
        }

        /**
        * Gets an event that is triggered when the base image is finished loading.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnLoaded(): EventHandler1<ImageSource> {
            return this._onLoaded;
        }

        /**
        * Returns the base Size of the image source.
        */
        public get Size(): Size2d {
            return this._size.Clone();
        }

        /**
        * Determines if the ImageSource has been loaded.
        */
        public IsLoaded(): boolean {
            return this._loaded;
        }

        /**
        * Returns an ImageSource that is extracted from the current ImageSource based on the provided clip location and clip size.
        * @param clipX The horizontal location of the clip.
        * @param clipY The vertical location of the clip.
        * @param clipWidth The width of the clip.
        * @param clipHeight The height of the clip.
        */
        public Extract(clipX: number, clipY: number, clipWidth: number, clipHeight: number): ImageSource {
            return new ImageSource(this._imageLocation, this._size.Width, this._size.Height, clipX, clipY, clipWidth, clipHeight);
        }

        /**
        * Disposes the image source and unbinds all bound events.
        */
        public Dispose(): void {
            this.Source.removeEventListener("load", this._loadWire);
            this.Source = null;
            this._onLoaded.Dispose();
        }

        /**
        * Returns an identical copy of this image source.  Uses existing base image source.
        */
        public Clone(): ImageSource {
            return new ImageSource(this.Source, this.ClipLocation.X, this.ClipLocation.Y, this.ClipSize.Width, this.ClipSize.Height);
        }
    }

}