var EndGate;
(function (EndGate) {
    (function (Input) {
        /// <reference path="KeyboardCommand.ts" />
        /// <reference path="KeyboardCommandEvent.ts" />
        (function (_) {
            var KeyboardCommandHelper = (function () {
                function KeyboardCommandHelper() {
                }
                KeyboardCommandHelper.ParseKey = function (command) {
                    var arr = command.split("+");

                    if (arr.length > 1) {
                        return arr[arr.length - 1];
                    }

                    return arr[0];
                };
                return KeyboardCommandHelper;
            })();
            _.KeyboardCommandHelper = KeyboardCommandHelper;
        })(Input._ || (Input._ = {}));
        var _ = Input._;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
