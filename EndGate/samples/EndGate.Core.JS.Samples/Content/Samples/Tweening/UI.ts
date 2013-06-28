/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="../../../Scripts/jquery.d.ts" />

module Tweening {

    export class UI {
        private _tweenTypeSelect: JQuery;
        private _tweenFunctionSelect: JQuery;
        private _tweenDuration: JQuery;
        private _tweenPlay: JQuery;
        private _enabled: boolean;

        constructor() {            
            this.OnPlay = new eg.EventHandler3<string, eg.TimeSpan, eg.Tweening.Functions.ITweeningFunction>();

            this._tweenTypeSelect = $("#tweenType");
            this._tweenFunctionSelect = $("#tweenFunction");
            this._tweenPlay = $("#tweenPlay");
            this._tweenDuration = $("#tweenDuration");
            this._enabled = true;

            this._tweenPlay.click(() => {
                // Only trigger the completion event if the UI is enabled
                if (this._enabled) {
                    var tweeningFunctionSplit = (<string>this._tweenFunctionSelect.val()).split(" - ");

                    this.OnPlay.Trigger(this._tweenTypeSelect.val(), eg.TimeSpan.FromSeconds(parseInt(this._tweenDuration.val())), eg.Tweening.Functions[tweeningFunctionSplit[0]][tweeningFunctionSplit[1]]);
                }
            });

            // Fill the select with all of the tweening function types.
            this.LoadFunctions();
        }

        // Triggered whenever the "Play" button is clicked and is passed the appropriate arguments
        public OnPlay: eg.EventHandler3<string, eg.TimeSpan, eg.Tweening.Functions.ITweeningFunction>;

        // Disables the UI by updating the "Play" button to be grayed out and to not allow anymore plays.
        public Disable(): void {
            this._tweenPlay.addClass("disabled");
            this._enabled = false;
        }

        // Enables the UI by updating the "Play" button to not be grayed out and to allow plays.
        public Enable(): void {
            this._tweenPlay.removeClass("disabled");
            this._enabled = true;
        }

        // Finds all of the tweening functions and their types and adds them to the tween function select
        private LoadFunctions(): void {
            for (var fn in eg.Tweening.Functions) {
                if (fn.indexOf("_") === -1) {
                    for (var fnEase in eg.Tweening.Functions[fn]) {
                        if (fnEase.indexOf("_") === -1) {
                            this._tweenFunctionSelect.append($("<option value='" + fn + " - " + fnEase + "'>" + fn + " - " + fnEase + "</option>"));
                        }
                    }
                }
            }
        }
    }

}