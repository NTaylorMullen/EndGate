 module EndGate._.Utilities {
    export var UtilityFunctions = {
        MonitorProperty: (obj: any, property: string, getFn: () => any, setFn: (value: any) => void): void => {
            Object.defineProperty(obj, property, {
                get: getFn,
                set: setFn,
                enumerable: true,
                configurable: true
            });
        },
        MapToPixiVector: (context: any, vectorProperty: string, pixiVector: any): void => {
            UtilityFunctions.MonitorProperty(pixiVector, "x",
                () => {
                    return context[vectorProperty].X;
                }, (newX: number) => {
                    context[vectorProperty].X = newX;
                });
            UtilityFunctions.MonitorProperty(pixiVector, "y",
                () => {
                    return context[vectorProperty].Y;
                }, (newY: number) => {
                    context[vectorProperty].Y = newY;
                });
        },
        MapToPixiSize: (context: any, sizeProperty: string, pixiSize: any): void => {
            UtilityFunctions.MonitorProperty(pixiSize, "width",
                () => {
                    return context[sizeProperty].Width;
                }, (newWidth: number) => {
                    context[sizeProperty].Width = newWidth;
                });
            UtilityFunctions.MonitorProperty(pixiSize, "height",
                () => {
                    return context[sizeProperty].Height;
                }, (newHeight: number) => {
                    context[sizeProperty].Height = newHeight;
                });
        }
    }
 }