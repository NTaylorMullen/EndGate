module EndGate.Core.AudioManagement {

    export class AudioSettings {
        public static Default: AudioSettings = new AudioSettings();
        public Repeat: bool;
        public Volume: number;
        public AutoPlay: bool;
        public Preload: string;

        constructor(repeat?: bool = false, volume?: number = 100, autoplay?: bool = false, preload?: string = "auto") {
            this.Repeat = repeat;
            this.Volume = volume;
            this.AutoPlay = autoplay;
            this.Preload = preload;
        }
    }

}