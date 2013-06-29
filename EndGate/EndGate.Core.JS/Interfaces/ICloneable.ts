declare module EndGate {

    /**
    * Represents an object that can be cloned.
    */
    export interface ICloneable {
        /**
        * Duplicates the current element, returning a copy of itself.
        */
        Clone(): any;
    }

}