/// <reference path="KeyboardCommand.ts" />
/// <reference path="KeyboardCommandEvent.ts" />

module EndGate.Input._ {
    
    export class KeyboardCommandHelper {
        public static ParseKey(command: string): string {
            var arr = command.split("+");

            if (arr.length > 1) {
                return arr[arr.length - 1];
            }

            return arr[0];
        }
    }

}