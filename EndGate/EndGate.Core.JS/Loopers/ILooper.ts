/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
/// <reference path="LooperCallback.ts" />

declare module eg._.Loopers {

    export interface ILooper extends IDisposable, ITyped {
        Start(): void;
        AddCallback(callback: LooperCallback): void;
        RemoveCallback(callback: LooperCallback): void;
    }

}