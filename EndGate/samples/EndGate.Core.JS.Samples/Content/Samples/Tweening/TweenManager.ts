/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module Tweening {

    export class TweenManager implements eg.IUpdateable {
        // Tweens for each aspect of the target object that is passed in.
        private _activeTween: eg.Tweening.Tween<any>;
        private _positionTween: eg.Tweening.Vector2dTween;
        private _sizeTween: eg.Tweening.Size2dTween;
        private _rotationTween: eg.Tweening.NumberTween;
        private _opacityTween: eg.Tweening.NumberTween;
        private _colorTween: eg.Tweening.ColorTween;

        constructor(target: eg.Graphics.Rectangle, onTweenComplete: Function) {
            // Build a general reverse function that will reverse the current tween so it can essentially just cycle back and forth
            var tweenReverse: (tween: eg.Tweening.Tween<any>) => void = (tween: eg.Tweening.Tween<any>): void => {
                tween.Reverse();
                onTweenComplete();
            };

            // Build each tweening object.
            // The last two parameters of each tweening object are default's within this tweening manager because
            // they are replaced via the front end when "Play" is clicked.

            this._positionTween = new eg.Tweening.Vector2dTween(
                target.Position,
                target.Position.Add(new eg.Vector2d(target.Position.X * 4, 0)),
                eg.TimeSpan.Zero,
                eg.Tweening.Functions.Linear.EaseNone);

            this._sizeTween = new eg.Tweening.Size2dTween(
                target.Size,
                target.Size.Multiply(3),
                eg.TimeSpan.Zero,
                eg.Tweening.Functions.Linear.EaseNone);

            this._rotationTween = new eg.Tweening.NumberTween(
                0,
                Math.PI * 2,
                eg.TimeSpan.Zero,
                eg.Tweening.Functions.Linear.EaseNone);

            this._opacityTween = new eg.Tweening.NumberTween(
                target.Opacity,
                0,
                eg.TimeSpan.Zero,
                eg.Tweening.Functions.Linear.EaseNone);

            this._colorTween = new eg.Tweening.ColorTween(
                target.Color,
                eg.Graphics.Color.Red,
                eg.TimeSpan.Zero,
                eg.Tweening.Functions.Linear.EaseNone);

            // Bind each of the reverse functions as the completion to each tween component.
            this._positionTween.OnComplete.Bind(tweenReverse);
            this._sizeTween.OnComplete.Bind(tweenReverse);
            this._rotationTween.OnComplete.Bind(tweenReverse);
            this._opacityTween.OnComplete.Bind(tweenReverse);
            this._colorTween.OnComplete.Bind(tweenReverse);

            // Bind each of the OnChange events so we can update the target object correctly.
            this._positionTween.OnChange.Bind((newPosition: eg.Vector2d) => {
                target.Position = newPosition;
            });
            this._sizeTween.OnChange.Bind((newSize: eg.Size2d) => {
                target.Size = newSize;
            });
            this._rotationTween.OnChange.Bind((newRotation: number) => {
                target.Rotation = newRotation;
            });
            this._opacityTween.OnChange.Bind((newOpacity: number) => {
                target.Opacity = newOpacity;
            });
            this._colorTween.OnChange.Bind((newColor: eg.Graphics.Color) => {
                target.Color = newColor;
            });
        }

        public Play(name: string, duration: eg.TimeSpan, tweenFunction: eg.Tweening.Functions.ITweeningFunction): void {
            // Set an active tween
            // Build the tween property, if name is "Position" the property translates to "_positionTween"
            this._activeTween = this["_" + name.toLowerCase() + "Tween"];
            // Update the duration
            this._activeTween.Duration = duration;
            // Update the tweening function
            this._activeTween.TweeningFunction = tweenFunction;
            // Need to play the tween
            this._activeTween.Play();
        }

        public Update(gameTime: eg.GameTime): void {
            // Check if the active tween is set
            if (this._activeTween) {
                // Tweens need to be updated in order to change position
                this._activeTween.Update(gameTime);
            }
        }
    }

}