var EndGate;
(function (EndGate) {
    (function (Input) {
        /**
        * HtmlElement that defines the
        */
        var KeyboardEventTarget = (function () {
            function KeyboardEventTarget(target) {
                this.Element = target;
                this.Id = this.Element.id;
                this.Classes = Array.prototype.slice.call(this.Element.classList);
                this.Tag = this.Element.tagName;
            }
            return KeyboardEventTarget;
        })();
        Input.KeyboardEventTarget = KeyboardEventTarget;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
