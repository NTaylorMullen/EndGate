/// <reference path="../../IMapLoader.ts" />
/// <reference path="../../IMapLoadedResult.ts" />
/// <reference path="../../IMapPreloadInfo.ts" />
/// <reference path="ITMX.ts" />
/// <reference path="OrthogonalLoader.ts" />

module EndGate.MapLoaders._.TMX {

    export class TMXLoader implements IMapLoader {
        private _orientationLoaders: { [orientation: string]: IMapLoader };

        constructor() {
            this._orientationLoaders = {
                orthogonal: new OrthogonalLoader()
            };
        }

        public Load(data: ITMX, propertyHooks: IPropertyHooks, onComplete: (result: IMapLoadedResult) => any): IMapPreloadInfo {
            if (!this._orientationLoaders[data.orientation]) {
                throw new Error("Invalid orientation.  The orientation '" + data.orientation + "' is not supported.");
            }

            return this._orientationLoaders[data.orientation].Load(data, propertyHooks, onComplete);
        }
    }

}