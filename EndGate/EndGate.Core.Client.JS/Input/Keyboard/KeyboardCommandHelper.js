var EndGate;
(function (EndGate) {
    (function (Input) {
        (function (_) {
            var KeyboardCommandHelper = (function () {
                function KeyboardCommandHelper() { }
                KeyboardCommandHelper.ParseKey = function ParseKey(command) {
                    var arr = command.split("+");
                    if(arr.length > 1) {
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
//@ sourceMappingURL=KeyboardCommandHelper.js.map
