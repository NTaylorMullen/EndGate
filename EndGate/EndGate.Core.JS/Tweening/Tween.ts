module eg.Tweening {

    export class Tween {
        private _playing: boolean;

        constructor() {
        }

        get Playing(): boolean {
            return this._playing;
        }
    }
}