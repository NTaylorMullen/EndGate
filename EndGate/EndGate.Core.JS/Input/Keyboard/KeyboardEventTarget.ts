module EndGate.Input {

    /**
    * HtmlElement that triggered a KeyboardEvent. 
    */
    export class KeyboardEventTarget {
        private _id: string;
        private _classes: string[];
        private _element: HTMLElement;
        private _tag: string;

        /**
        * Id of the target element.
        */
        public get Id(): string {
            return this._id;
        }

        /**
        * A list of classes on the target element.
        */
        public get Classes(): string[] {
            return this._classes;
        }

        /**
        * Element that caused the keyboard event.
        */
        public get Element(): HTMLElement {
            return this._element;
        }

        /**
        * The type of tag of the target element.
        */
        public get Tag(): string {
            return this._tag;
        }

        constructor(target: EventTarget) {
            this._element = <HTMLElement>target;
            this._id = this._element.id;
            this._classes = Array.prototype.slice.call(this._element.classList);
            this._tag = this._element.tagName;
        }
    }
}