/// <reference path="../Interfaces/IDisposable.d.ts" />
/// <reference path="../Interfaces/ITyped.d.ts" />
/// <reference path="LooperCallback.ts" />

module EndGate._.Loopers {

    export interface ILooper extends IDisposable, ITyped {
        Start(): void;
        AddCallback(callback: LooperCallback): void;
        RemoveCallback(callback: LooperCallback): void;
    }

}