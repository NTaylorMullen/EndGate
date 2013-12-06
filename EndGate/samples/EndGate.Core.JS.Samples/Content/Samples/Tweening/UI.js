/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="../../../Scripts/jquery.d.ts" />
var Tweening;
(function (Tweening) {
    var UI = (function () {
        function UI() {
            var _this = this;
            this.OnPlay = new eg.EventHandler3();

            this._tweenTypeSelect = $("#tweenType");
            this._tweenFunctionSelect = $("#tweenFunction");
            this._tweenPlay = $("#tweenPlay");
            this._tweenDuration = $("#tweenDuration");
            this._enabled = true;

            this._tweenPlay.click(function () {
                // Only trigger the completion event if the UI is enabled
                if (_this._enabled) {
                    var tweeningFunctionSplit = _this._tweenFunctionSelect.val().split(" - ");

                    _this.OnPlay.Trigger(_this._tweenTypeSelect.val(), eg.TimeSpan.FromSeconds(parseInt(_this._tweenDuration.val())), eg.Tweening.Functions[tweeningFunctionSplit[0]][tweeningFunctionSplit[1]]);
                }
            });

            // Fill the select with all of the tweening function types.
            this.LoadFunctions();
        }
        // Disables the UI by updating the "Play" button to be grayed out and to not allow anymore plays.
        UI.prototype.Disable = function () {
            this._tweenPlay.addClass("disabled");
            this._enabled = false;
        };

        // Enables the UI by updating the "Play" button to not be grayed out and to allow plays.
        UI.prototype.Enable = function () {
            this._tweenPlay.removeClass("disabled");
            this._enabled = true;
        };

        // Finds all of the tweening functions and their types and adds them to the tween function select
        UI.prototype.LoadFunctions = function () {
            for (var fn in eg.Tweening.Functions) {
                if (fn.indexOf("_") === -1) {
                    for (var fnEase in eg.Tweening.Functions[fn]) {
                        if (fnEase.indexOf("_") === -1) {
                            this._tweenFunctionSelect.append($("<option value='" + fn + " - " + fnEase + "'>" + fn + " - " + fnEase + "</option>"));
                        }
                    }
                }
            }
        };
        return UI;
    })();
    Tweening.UI = UI;
})(Tweening || (Tweening = {}));
//# sourceMappingURL=UI.js.map
