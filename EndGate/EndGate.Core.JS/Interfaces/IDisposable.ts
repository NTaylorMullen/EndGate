declare module eg {

    /**
    * Represents a Disposable object with a Dispose method.
    */
    export interface IDisposable {
        /**
        * Disposes the object.  Dispose should only be called once.
        */
        Dispose(): void;
    }

}