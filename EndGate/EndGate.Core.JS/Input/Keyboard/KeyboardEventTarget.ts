module EndGate.Input {

    /**
    * HtmlElement that defines the 
    */
    export class KeyboardEventTarget {

        /**
        * Id of the target element.
        */
        public Id: string;

        /**
        * A list of classes on the target element.
        */
        public Classes: string[];

        /**
        * Element that caused the keyboard event.
        */
        public Element: HTMLElement;

        /**
        * The type of tag of the target element.
        */
        public Tag: string;

        constructor(target: EventTarget) {
            this.Element = <HTMLElement>target;
            this.Id = this.Element.id;
            this.Classes = Array.prototype.slice.call(this.Element.classList);
            this.Tag = this.Element.tagName;
        }
    }
}