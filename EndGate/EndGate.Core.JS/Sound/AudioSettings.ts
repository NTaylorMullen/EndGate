module EndGate.Sound {

    /**
    * Defines a set of settings that are used to play AudioClip's a custom way.
    */
    export class AudioSettings {
        /**
        * The default audio settings.
        */
        public static Default: AudioSettings = new AudioSettings();

        /**
        * Gets or sets the repeat function of the AudioClip.
        */
        public Repeat: bool;
        /**
        * Gets or sets the volume level of the AudioClip. Value between 0-100.
        */
        public Volume: number;
        /**
        * Gets or sets the auto play functionality of the AudioClip.
        */
        public AutoPlay: bool;
        /**
        * Gets or sets the preload functionality of the AudioClip.  Values can be "auto", "metadata", or "none".
        */
        public Preload: string;
        
        /**
        * Creates a new instance of the AudioSettings object with default values.
        */
        constructor();
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        */
        constructor(repeat: bool);
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        * @param volume Initial value of the volume component. Value between 0-100.
        */
        constructor(repeat: bool, volume: number);
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        * @param volume Initial value of the volume component. Value between 0-100.
        * @param autoplay Initial value of the auto play component.
        */
        constructor(repeat: bool, volume: number, autoplay: bool);
        /**
        * Creates a new instance of the AudioSettings object.
        * @param repeat Initial value of the repeat component.
        * @param volume Initial value of the volume component. Value between 0-100.
        * @param autoplay Initial value of the auto play component.
        * @param preload Initial value of the preload component.  Values can be "auto", "metadata", or "none".
        */
        constructor(repeat: bool, volume: number, autoplay: bool, preload: string);
        constructor(repeat: bool = false, volume: number = 100, autoplay: bool = false, preload: string = "auto") {
            this.Repeat = repeat;
            this.Volume = volume;
            this.AutoPlay = autoplay;
            this.Preload = preload;
        }
    }

}