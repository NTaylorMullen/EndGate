module eg.Tweening {

    export class Tween<T> {
        private _playing: boolean;

        constructor(from: T, to: T) {
        }

        get Playing(): boolean {
            return this._playing;
        }
    }
}