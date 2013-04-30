/// <reference path="../Utilities/EventHandler.ts" />
/// <reference path="AudioSettings.ts" />

module EndGate.Sound {

    var supportedAudioTypes = {
        mp3: 'audio/mpeg',
        ogg: 'audio/ogg',
        wav: 'audio/wav',
        aac: 'audio/aac',
        m4a: 'audio/x-m4a'
    };

    export class AudioClip {
        private _audio: HTMLAudioElement;
        private _settings: AudioSettings;

        constructor(source: any, settings?: AudioSettings = AudioSettings.Default) {
            this._settings = settings;
            this._audio = <HTMLAudioElement>document.createElement("audio");
            this.SetAudioSource(source);
            this.ApplySettings();

            this.OnComplete = new EventHandler();
        }

        public OnComplete: EventHandler;

        public Volume(percent?: number): number {
            if (typeof percent !== "undefined") {
                this._settings.Volume = percent;
                this._audio.volume = Math.max(Math.min(percent / 100, 1), 0);
            }

            return this._settings.Volume;
        }

        public IsPlaying(): bool {
            return !this._audio.paused;
        }

        public Complete(): bool {
            return this._audio.ended;
        }

        public Play(): void {
            if (this._audio.readyState === <any>0) {
                this._audio.addEventListener("canplay", () => {
                    this._audio.play();
                }, true);
            }
            else {
                this._audio.play();
            }
        }

        public Pause(): void {
            this._audio.pause();
        }

        public Seek(time: number): void {
            if (this._audio.readyState === <any>0) {
                this._audio.addEventListener("canplay", () => {
                    this._audio.currentTime = time;
                }, true);
            }
            else {
                this._audio.currentTime = time;
            }
        }

        public Stop(): void {
            this.Seek(0);
            this._audio.pause();
        }

        private SetAudioSource(source: any): void {
            var sourceHolder: HTMLSourceElement,
                sourceType: string;

            // If we've passed in a list of sources
            if (!(source instanceof Array)) {
                source = [source];
            }

            for (var i = 0; i < source.length; i++) {
                sourceHolder = < HTMLSourceElement > document.createElement("source");
                sourceHolder.src = source[i];

                sourceType = supportedAudioTypes[source[i].split('.').pop()];

                if (typeof sourceType !== "undefined") {
                    sourceHolder.type = sourceType;
                }

                this._audio.appendChild(sourceHolder);
            }
        }

        private ApplySettings(): void {
            this._audio.loop = this._settings.Repeat;
            this._audio.autoplay = this._settings.AutoPlay;
            this._audio.preload = this._settings.Preload;
            this.Volume(this._settings.Volume);

            this._audio.addEventListener("ended", (e: Event) => {
                this.OnComplete.Trigger(e);
            }, true);
        }

    }
}