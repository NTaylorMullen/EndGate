/// <reference path="../Interfaces/ITyped.ts" />
/// <reference path="../Interfaces/ICloneable.ts" />
/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Utilities/EventHandler1.ts" />
module EndGate.Graphics {

    /**
    * Color class used to pass around colors in a typed manner.
    */
    export class Color implements _.ITyped, ICloneable, IDisposable {
        public _type: string = "Color";
        
        //Regex to match rgba in hex form ffffffff, 00000000, ff33dd4499
        private static RgbaHexRegExp: RegExp = /^([a-f\d])([a-f\d])([a-f\d])([a-f\d])$/i;

        //Regex to match function color form for argb(d, n, n, n), rgb(n, n, n), and rgba(n, n, n, d) 
        private static RgbRegExp: RegExp = /^(argb|rgb|rgba)\s*\(\s*([\d+(\.\d+)]{0,3})\s*,\s*([\d]{0,3})\s*,\s*([\d]{0,3})\s*(?:,\s*([\d+(\.\d+)]{0,3})\s*)?\s*\)$/i;

        //regex to match rgb in hex form ffffff, 000000, ff33dd
        private static RgbaRegExp: RegExp = /^([a-f\d])([a-f\d])([a-f\d])$/i;

        //Object to hold all HTML5 named colors
        //ref: http://www.tutorialspoint.com/html5/html5_color_names.htm
        private static _namedColors = {
            "transparent": new Color(255, 255, 255, 0),
            "aliceblue": new Color("#f0f8ff"),
            "antiquewhite": new Color("#faebd7"),
            "aqua": new Color("#00ffff"),
            "aquamarine": new Color("#7fffd4"),
            "azure": new Color("#f0ffff"),
            "beige": new Color("#f5f5dc"),
            "bisque": new Color("#ffe4c4"),
            "black": new Color("#000000"),
            "blanchedalmond": new Color("#ffebcd"),
            "blue": new Color("#0000ff"),
            "blueviolet": new Color("#8a2be2"),
            "brown": new Color("#a52a2a"),
            "burlywood": new Color("#deb887"),
            "cadetblue": new Color("#5f9ea0"),
            "chartreuse": new Color("#7fff00"),
            "chocolate": new Color("#d2691e"),
            "coral": new Color("#ff7f50"),
            "cornflowerblue": new Color("#6495ed"),
            "cornsilk": new Color("#fff8dc"),
            "crimson": new Color("#dc143c"),
            "cyan": new Color("#00ffff"),
            "darkblue": new Color("#00008b"),
            "darkcyan": new Color("#008b8b"),
            "darkgoldenrod": new Color("#b8860b"),
            "darkgray": new Color("#a9a9a9"),
            "darkgreen": new Color("#006400"),
            "darkkhaki": new Color("#bdb76b"),
            "darkmagenta": new Color("#8b008b"),
            "darkolivegreen": new Color("#556b2f"),
            "darkorange": new Color("#ff8c00"),
            "darkorchid": new Color("#9932cc"),
            "darkred": new Color("#8b0000"),
            "darksalmon": new Color("#e9967a"),
            "darkseagreen": new Color("#8fbc8f"),
            "darkslateblue": new Color("#483d8b"),
            "darkslategray": new Color("#2f4f4f"),
            "darkturquoise": new Color("#00ced1"),
            "darkviolet": new Color("#9400d3"),
            "deeppink": new Color("#ff1493"),
            "deepskyblue": new Color("#00bfff"),
            "dimgray": new Color("#696969"),
            "dodgerblue": new Color("#1e90ff"),
            "firebrick": new Color("#b22222"),
            "floralwhite": new Color("#fffaf0"),
            "forestgreen": new Color("#228b22"),
            "fuchsia": new Color("#ff00ff"),
            "gainsboro": new Color("#dcdcdc"),
            "ghostwhite": new Color("#f8f8ff"),
            "gold": new Color("#ffd700"),
            "goldenrod": new Color("#daa520"),
            "gray": new Color("#808080"),
            "green": new Color("#008000"),
            "greenyellow": new Color("#adff2f"),
            "honeydew": new Color("#f0fff0"),
            "hotpink": new Color("#ff69b4"),
            "indianred": new Color("#cd5c5c"),
            "indigo": new Color("#4b0082"),
            "ivory": new Color("#fffff0"),
            "khaki": new Color("#f0e68c"),
            "lavender": new Color("#e6e6fa"),
            "lavenderblush": new Color("#fff0f5"),
            "lawngreen": new Color("#7cfc00"),
            "lemonchiffon": new Color("#fffacd"),
            "lightblue": new Color("#add8e6"),
            "lightcoral": new Color("#f08080"),
            "lightcyan": new Color("#e0ffff"),
            "lightgoldenrodyellow": new Color("#fafad2"),
            "lightgray": new Color("#d3d3d3"),
            "lightgrey": new Color("#d3d3d3"),
            "lightgreen": new Color("#90ee90"),
            "lightpink": new Color("#ffb6c1"),
            "lightsalmon": new Color("#ffa07a"),
            "lightseagreen": new Color("#20b2aa"),
            "lightskyblue": new Color("#87cefa"),
            "lightslategray": new Color("#778899"),
            "lightsteelblue": new Color("#b0c4de"),
            "lightyellow": new Color("#ffffe0"),
            "lime": new Color("#00ff00"),
            "limegreen": new Color("#32cd32"),
            "linen": new Color("#faf0e6"),
            "magenta": new Color("#ff00ff"),
            "maroon": new Color("#800000"),
            "mediumaquamarine": new Color("#66cdaa"),
            "mediumblue": new Color("#0000cd"),
            "mediumorchid": new Color("#ba55d3"),
            "mediumpurple": new Color("#9370d8"),
            "mediumseagreen": new Color("#3cb371"),
            "mediumslateblue": new Color("#7b68ee"),
            "mediumspringgreen": new Color("#00fa9a"),
            "mediumturquoise": new Color("#48d1cc"),
            "mediumvioletred": new Color("#c71585"),
            "midnightblue": new Color("#191970"),
            "mintcream": new Color("#f5fffa"),
            "mistyrose": new Color("#ffe4e1"),
            "moccasin": new Color("#ffe4b5"),
            "navajowhite": new Color("#ffdead"),
            "navy": new Color("#000080"),
            "oldlace": new Color("#fdf5e6"),
            "olive": new Color("#808000"),
            "olivedrab": new Color("#6b8e23"),
            "orange": new Color("#ffa500"),
            "orangered": new Color("#ff4500"),
            "orchid": new Color("#da70d6"),
            "palegoldenrod": new Color("#eee8aa"),
            "palegreen": new Color("#98fb98"),
            "paleturquoise": new Color("#afeeee"),
            "palevioletred": new Color("#d87093"),
            "papayawhip": new Color("#ffefd5"),
            "peachpuff": new Color("#ffdab9"),
            "peru": new Color("#cd853f"),
            "pink": new Color("#ffc0cb"),
            "plum": new Color("#dda0dd"),
            "powderblue": new Color("#b0e0e6"),
            "purple": new Color("#800080"),
            "red": new Color("#ff0000"),
            "rosybrown": new Color("#bc8f8f"),
            "royalblue": new Color("#4169e1"),
            "saddlebrown": new Color("#8b4513"),
            "salmon": new Color("#fa8072"),
            "sandybrown": new Color("#f4a460"),
            "seagreen": new Color("#2e8b57"),
            "seashell": new Color("#fff5ee"),
            "sienna": new Color("#a0522d"),
            "silver": new Color("#c0c0c0"),
            "skyblue": new Color("#87ceeb"),
            "slateblue": new Color("#6a5acd"),
            "slategray": new Color("#708090"),
            "snow": new Color("#fffafa"),
            "springgreen": new Color("#00ff7f"),
            "steelblue": new Color("#4682b4"),
            "tan": new Color("#d2b48c"),
            "teal": new Color("#008080"),
            "thistle": new Color("#d8bfd8"),
            "tomato": new Color("#ff6347"),
            "turquoise": new Color("#40e0d0"),
            "violet": new Color("#ee82ee"),
            "wheat": new Color("#f5deb3"),
            "white": new Color("#ffffff"),
            "whitesmoke": new Color("#f5f5f5"),
            "yellow": new Color("#ffff00"),
            "yellowgreen": new Color("#9acd32")
        };
        
        private _cached: string = undefined;
        private _r: number;
        private _g: number;
        private _b: number;
        private _a: number;
        private _onChange: EventHandler1<Color>;

        /**
        * Creates a new instance of Color with color channels set to black.
        */
        constructor();
        /**
        * Creates a new instance of Color with the specified string.
        * @param color Hex, named or function style string declaration.
        */
        constructor(color: string);
        /**
        * Creates a new instance of Color with the specified rgb channels.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        */
        constructor(r: number, g: number, b: number);
        /**
        * Creates a new instance of Color with the specified rgba channels.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        * @param a The alpha channel. Must be between 0 and 1 inclusive.
        */
        constructor(r: number, g: number, b: number, a: number);
        constructor(r?: any, g?: any, b?: any, a?: any) {
            this._onChange = new EventHandler1<Color>();

            if (typeof (r) === 'string' && r.length > 0) {
                this.InitializeColorFromString(r);
            } else {
                //check if the alpha channel is defined
                this.A = a === undefined ? 1 : a;
                this.R = r;
                this.G = g;
                this.B = b;
            }
        }

        /**
        * Gets an EventHandler that is triggered when the R, G, B, or A values of this Color change.
        */
        public get OnChange(): EventHandler1<Color> {
            return this._onChange;
        }
        
        /**
        * Gets or sets the current red channel. Value must be an integer between 0 and 255 inclusive.
        */
        public get R(): number {
            return this._r;
        }
        public set R(r: number) {
            this._cached = undefined;
            this._r = Math.round(Math.min(Math.max(r, 0), 255));
            this._onChange.Trigger(this);
        }

        /**
        * Gets or sets the current green channel. Value must be an integer between 0 and 255 inclusive.
        */
        public get G(): number {
            return this._g;
        }
        public set G(g: number) {
            this._cached = undefined;
            this._g = Math.round(Math.min(Math.max(g, 0), 255));
            this._onChange.Trigger(this);
        }

        /**
        * Gets or sets the current blue channel. Value must be an integer between 0 and 255 inclusive.
        */
        public get B(): number {
            return this._b;
        }
        public set B(b: number) {
            this._cached = undefined;
            this._b = Math.round(Math.min(Math.max(b, 0), 255));
            this._onChange.Trigger(this);
        }

        /**
        * Gets or sets the current alpha channel. Value must be between 0 and 1 inclusive.
        */
        public get A(): number{
            return this._a;
        }
        public set A(a: number) {
            this._cached = undefined;
            this._a = Math.min(Math.max(a, 0), 1);
            this._onChange.Trigger(this);
        }

        /**
        * Creates a new Color object with the specified RGB values.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        */
        public static FromRGB(r: number, g: number, b: number): Color {
            return new Color(r, g, b);
        }

        /**
        * Creates a new Color object with the specified RGBA values.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        * @param a The alpha channel. Must be between 0 and 1 inclusive.
        */
        public static FromRGBA(r: number, g: number, b: number, a: number): Color {
            return new Color(r, g, b, a);
        }

        /**
        * Creates a new Color object with the specified ARGB values.
        * @param a The alpha channel. Must be between 0 and 1 inclusive.
        * @param r The red channel. Must be between 0 and 255 inclusive.
        * @param g The green channel. Must be between 0 and 255 inclusive.
        * @param b The blue channel. Must be between 0 and 255 inclusive.
        */
        public static FromARGB(a: number, r: number, g: number, b: number): Color {
            return new Color(r, g, b, a);
        }

        /**
        * Creates a new Color object from the specified hex assignment.
        * @param hex The hex based color code.
        */
        public static FromHex(hex: string): Color {
            return new Color(hex);
        }

        /**
        * Creates a new Color object form the HTML5 named colors.
        * @param name The name of the HTML5 color to use.
        */
        public static FromName(name: string): Color {
            return new Color(name);
        }

        //Converts a short hex string e.g. fff or cccc to the long version 
        //e.g. ffffffff the alpha channel.
        private static ConvertShortHexToLong(hex: string) : string {
            if (hex.length === 3) {
                //append the alpha channel default which is fully opaque
                hex = hex + 'f'; 
            }

            if (hex.length === 4) {
                //short version that includes alpha channel
                hex = hex.replace(Color.RgbaHexRegExp, function(m, a, r, g, b) {
                    return r + r + g + g + b + b + a + a;
                });
            }

            return hex;
        }

        //Initializes a color object based on the string passed.
        //Possible values are hex and named values
        //rgba/argb/rgb values are handled elsewhere
        private InitializeColorFromString(color: string): void {
            //rgb, hex, rgba, argb
            var namedColor: any = this.NamedColorToHex(color);
            var result: Color = null;

            if (typeof (namedColor) === 'string') {
                result = this.CreateColorObjectFromString(namedColor);
            } else {
                result = namedColor;
            }

            this.A = result.A;
            this.B = result.B;
            this.R = result.R;
            this.G = result.G;
        }

        //Creates a color object from the string provided
        private CreateColorObjectFromString(hex: string): Color {
            //we're not interested in the pound sign
            if (hex.charAt(0) === '#') {
                hex = hex.substr(1);
            }

            //convert short hexes to long hexes
            hex = Color.ConvertShortHexToLong(hex);

            //ensure we have an alpha channel
            if (hex.length === 6) {
                hex = hex + 'ff';
            }

            //if it's exactly 8 characters long then it's
            //a hex and we build the Color object from this
            if (hex.length === 8) {
                return this.ParseAlphaHex(hex);
            }

            //it's no longer a hex and must be an rgb style function
            return this.ParseRGB(hex);
        }

        //Parses a color function and returns a Color object
        private ParseRGB(rgb: string): Color {
            var result = Color.RgbRegExp.exec(rgb);
            if (result) {
                var name = result[1];

                switch(name) {
                    case 'rgb': //rgb(n, n, n)
                        return new Color(parseInt(result[2]), parseInt(result[3]), parseInt(result[4]));
                    case 'argb': //argb(d, n, n, n)
                        return new Color(parseInt(result[3]), parseInt(result[4]), parseInt(result[5]), parseFloat(result[2]));
                    case 'rgba': //rgba(n, n, n, d)
                        return new Color(parseInt(result[2]), parseInt(result[3]), parseInt(result[4]), parseFloat(result[5]));
                }
            }

            //since the hex, named colors and color functions were
            //not available in the string passed then it's not a color
            //return Magenta so it's obvious something is wrong
            return Color.Magenta;
        }

        //Parses out all color channels including alpha
        //and returns a Color object based on the values
        private ParseAlphaHex(hex: string): Color {
            var a: number,
                r: number,
                g: number,
                b: number;

            r = parseInt(hex.charAt(0) + hex.charAt(1), 16);
            g = parseInt(hex.charAt(2) + hex.charAt(3), 16);
            b = parseInt(hex.charAt(4) + hex.charAt(5), 16);
            a = parseInt(hex.charAt(6) + hex.charAt(7), 16) / 255;

            return new Color(r, g, b, a);
        }

        //Parses out all color channels and returns a Color object based on the values
        private ParseHex(hex: string): Color {
            var r: number,
                g: number,
                b: number;    

            r = parseInt(hex.charAt(0) + hex.charAt(1), 16);
            g = parseInt(hex.charAt(2) + hex.charAt(3), 16);
            b = parseInt(hex.charAt(4) + hex.charAt(5), 16);

            return new Color(r, g, b);
        }

        //Checks the named color object and looks for a similarly named color
        //if one is found returns the named Color object
        private NamedColorToHex(color: string) : string {
            if (color.substring(0, 1) === '#') {
                return color;
            }
            if (typeof Color._namedColors[color.toLowerCase()] !== 'undefined') {
                return Color._namedColors[color.toLowerCase()];
            }

            return color;
        }
        
        /**
        * Returns a transparent Color object.
        */
        public static get Transparent(): Color {
            return Color._namedColors.transparent.Clone();
        }

        /**
        * Returns a Color object set to the color named color AliceBlue.
        */
        public static get AliceBlue(): Color {
            return Color._namedColors.aliceblue.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color AntiqueWhite.
        */
        public static get AntiqueWhite(): Color {
            return Color._namedColors.antiquewhite.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color Aqua.
        */
        public static get Aqua(): Color {
            return Color._namedColors.aqua.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color Aquamarine.
        */
        public static get Aquamarine(): Color {
            return Color._namedColors.aquamarine.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color Azure.
        */
        public static get Azure(): Color {
            return Color._namedColors.azure.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color Beige.
        */
        public static get Beige(): Color {
            return Color._namedColors.beige.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color Bisque.
        */
        public static get Bisque(): Color {
            return Color._namedColors.bisque.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color Black.
        */
        public static get Black(): Color {
            return Color._namedColors.black.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color BlanchedAlmond.
        */
        public static get BlanchedAlmond(): Color {
            return Color._namedColors.blanchedalmond.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color Blue.
        */
        public static get Blue(): Color {
            return Color._namedColors.blue.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color BlueViolet.
        */
        public static get BlueViolet(): Color {
            return Color._namedColors.blueviolet.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color Brown.
        */
        public static get Brown(): Color {
            return Color._namedColors.brown.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color BurlyWood.
        */
        public static get BurlyWood(): Color {
            return Color._namedColors.burlywood.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color CadetBlue.
        */
        public static get CadetBlue(): Color {
            return Color._namedColors.cadetblue.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color Chartreuse.
        */
        public static get Chartreuse(): Color {
            return Color._namedColors.chartreuse.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color Chocolate.
        */
        public static get Chocolate(): Color {
            return Color._namedColors.chocolate.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color Coral.
        */
        public static get Coral(): Color {
            return Color._namedColors.coral.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color CornflowerBlue.
        */
        public static get CornflowerBlue(): Color {
            return Color._namedColors.cornflowerblue.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color Cornsilk.
        */
        public static get Cornsilk(): Color {
            return Color._namedColors.cornsilk.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color Crimson.
        */
        public static get Crimson(): Color {
            return Color._namedColors.crimson.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color Cyan.
        */
        public static get Cyan(): Color {
            return Color._namedColors.cyan.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color DarkBlue.
        */
        public static get DarkBlue(): Color {
            return Color._namedColors.darkblue.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color DarkCyan.
        */
        public static get DarkCyan(): Color {
            return Color._namedColors.darkcyan.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color DarkGoldenRod.
        */
        public static get DarkGoldenRod(): Color {
            return Color._namedColors.darkgoldenrod.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color DarkGray.
        */
        public static get DarkGray(): Color {
            return Color._namedColors.darkgray.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color DarkGreen.
        */
        public static get DarkGreen(): Color {
            return Color._namedColors.darkgreen.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color DarkKhaki.
        */
        public static get DarkKhaki(): Color {
            return Color._namedColors.darkkhaki.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color DarkMagenta.
        */
        public static get DarkMagenta(): Color {
            return Color._namedColors.darkmagenta.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color DarkOliveGreen.
        */
        public static get DarkOliveGreen(): Color {
            return Color._namedColors.darkolivegreen.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color DarkOrange.
        */
        public static get DarkOrange(): Color {
            return Color._namedColors.darkorange.Clone();
        }
        
        /**
        * Returns a Color object set to the color named color DarkOrchid.
        */
        public static get DarkOrchid(): Color {
            return Color._namedColors.darkorchid.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkRed.
        */
        public static get DarkRed(): Color {
            return Color._namedColors.darkred.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkSalmon.
        */
        public static get DarkSalmon(): Color {
            return Color._namedColors.darksalmon.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkSeaGreen.
        */
        public static get DarkSeaGreen(): Color {
            return Color._namedColors.darkseagreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkSlateBlue.
        */
        public static get DarkSlateBlue(): Color {
            return Color._namedColors.darkslateblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkSlateGray.
        */
        public static get DarkSlateGray(): Color {
            return Color._namedColors.darkslategray.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkTurquoise.
        */
        public static get DarkTurquoise(): Color {
            return Color._namedColors.darkturquoise.Clone();
        }

        /**
        * Returns a Color object set to the color named color DarkViolet.
        */
        public static get DarkViolet(): Color {
            return Color._namedColors.darkviolet.Clone();
        }

        /**
        * Returns a Color object set to the color named color DeepPink.
        */
        public static get DeepPink(): Color {
            return Color._namedColors.deeppink.Clone();
        }

        /**
        * Returns a Color object set to the color named color DeepSkyBlue.
        */
        public static get DeepSkyBlue(): Color {
            return Color._namedColors.deepskyblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color DimGray.
        */
        public static get DimGray(): Color {
            return Color._namedColors.dimgray.Clone();
        }

        /**
        * Returns a Color object set to the color named color DodgerBlue.
        */
        public static get DodgerBlue(): Color {
            return Color._namedColors.dodgerblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color FireBrick.
        */
        public static get FireBrick(): Color {
            return Color._namedColors.firebrick.Clone();
        }

        /**
        * Returns a Color object set to the color named color FloralWhite.
        */
        public static get FloralWhite(): Color {
            return Color._namedColors.floralwhite.Clone();
        }

        /**
        * Returns a Color object set to the color named color ForestGreen.
        */
        public static get ForestGreen(): Color {
            return Color._namedColors.forestgreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color Fuchsia.
        */
        public static get Fuchsia(): Color {
            return Color._namedColors.fuchsia.Clone();
        }

        /**
        * Returns a Color object set to the color named color Gainsboro.
        */
        public static get Gainsboro(): Color {
            return Color._namedColors.gainsboro.Clone();
        }

        /**
        * Returns a Color object set to the color named color GhostWhite.
        */
        public static get GhostWhite(): Color {
            return Color._namedColors.ghostwhite.Clone();
        }

        /**
        * Returns a Color object set to the color named color Gold.
        */
        public static get Gold(): Color {
            return Color._namedColors.gold.Clone();
        }

        /**
        * Returns a Color object set to the color named color GoldenRod.
        */
        public static get GoldenRod(): Color {
            return Color._namedColors.goldenrod.Clone();
        }

        /**
        * Returns a Color object set to the color named color Gray.
        */
        public static get Gray(): Color {
            return Color._namedColors.gray.Clone();
        }

        /**
        * Returns a Color object set to the color named color Green.
        */
        public static get Green(): Color {
            return Color._namedColors.green.Clone();
        }

        /**
        * Returns a Color object set to the color named color GreenYellow.
        */
        public static get GreenYellow(): Color {
            return Color._namedColors.greenyellow.Clone();
        }

        /**
        * Returns a Color object set to the color named color HoneyDew.
        */
        public static get HoneyDew(): Color {
            return Color._namedColors.honeydew.Clone();
        }

        /**
        * Returns a Color object set to the color named color HotPink.
        */
        public static get HotPink(): Color {
            return Color._namedColors.hotpink.Clone();
        }

        /**
        * Returns a Color object set to the color named color IndianRed.
        */
        public static get IndianRed(): Color {
            return Color._namedColors.indianred.Clone();
        }

        /**
        * Returns a Color object set to the color named color Indigo.
        */
        public static get Indigo(): Color {
            return Color._namedColors.indigo.Clone();
        }

        /**
        * Returns a Color object set to the color named color Ivory.
        */
        public static get Ivory(): Color {
            return Color._namedColors.ivory.Clone();
        }

        /**
        * Returns a Color object set to the color named color Khaki.
        */
        public static get Khaki(): Color {
            return Color._namedColors.khaki.Clone();
        }

        /**
        * Returns a Color object set to the color named color Lavender.
        */
        public static get Lavender(): Color {
            return Color._namedColors.lavender.Clone();
        }

        /**
        * Returns a Color object set to the color named color LavenderBlush.
        */
        public static get LavenderBlush(): Color {
            return Color._namedColors.lavenderblush.Clone();
        }

        /**
        * Returns a Color object set to the color named color LawnGreen.
        */
        public static get LawnGreen(): Color {
            return Color._namedColors.lawngreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color LemonChiffon.
        */
        public static get LemonChiffon(): Color {
            return Color._namedColors.lemonchiffon.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightBlue.
        */
        public static get LightBlue(): Color {
            return Color._namedColors.lightblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightCoral.
        */
        public static get LightCoral(): Color {
            return Color._namedColors.lightcoral.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightCyan.
        */
        public static get LightCyan(): Color {
            return Color._namedColors.lightcyan.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightGoldenRodYellow.
        */
        public static get LightGoldenRodYellow(): Color {
            return Color._namedColors.lightgoldenrodyellow.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightGray.
        */
        public static get LightGray(): Color {
            return Color._namedColors.lightgray.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightGrey.
        */
        public static get LightGrey(): Color {
            return Color._namedColors.lightgrey.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightGreen.
        */
        public static get LightGreen(): Color {
            return Color._namedColors.lightgreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightPink.
        */
        public static get LightPink(): Color {
            return Color._namedColors.lightpink.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightSalmon.
        */
        public static get LightSalmon(): Color {
            return Color._namedColors.lightsalmon.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightSeaGreen.
        */
        public static get LightSeaGreen(): Color {
            return Color._namedColors.lightseagreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightSkyBlue.
        */
        public static get LightSkyBlue(): Color {
            return Color._namedColors.lightskyblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightSlateGray.
        */
        public static get LightSlateGray(): Color {
            return Color._namedColors.lightslategray.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightSteelBlue.
        */
        public static get LightSteelBlue(): Color {
            return Color._namedColors.lightsteelblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color LightYellow.
        */
        public static get LightYellow(): Color {
            return Color._namedColors.lightyellow.Clone();
        }

        /**
        * Returns a Color object set to the color named color Lime.
        */
        public static get Lime(): Color {
            return Color._namedColors.lime.Clone();
        }

        /**
        * Returns a Color object set to the color named color LimeGreen.
        */
        public static get LimeGreen(): Color {
            return Color._namedColors.limegreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color Linen.
        */
        public static get Linen(): Color {
            return Color._namedColors.linen.Clone();
        }

        /**
        * Returns a Color object set to the color named color Magenta.
        */
        public static get Magenta(): Color {
            return Color._namedColors.magenta.Clone();
        }

        /**
        * Returns a Color object set to the color named color Maroon.
        */
        public static get Maroon(): Color {
            return Color._namedColors.maroon.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumAquaMarine.
        */
        public static get MediumAquaMarine(): Color {
            return Color._namedColors.mediumaquamarine.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumBlue.
        */
        public static get MediumBlue(): Color {
            return Color._namedColors.mediumblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumOrchid.
        */
        public static get MediumOrchid(): Color {
            return Color._namedColors.mediumorchid.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumPurple.
        */
        public static get MediumPurple(): Color {
            return Color._namedColors.mediumpurple.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumSeaGreen.
        */
        public static get MediumSeaGreen(): Color {
            return Color._namedColors.mediumseagreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumSlateBlue.
        */
        public static get MediumSlateBlue(): Color {
            return Color._namedColors.mediumslateblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumSpringGreen.
        */
        public static get MediumSpringGreen(): Color {
            return Color._namedColors.mediumspringgreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumTurquoise.
        */
        public static get MediumTurquoise(): Color {
            return Color._namedColors.mediumturquoise.Clone();
        }

        /**
        * Returns a Color object set to the color named color MediumVioletRed.
        */
        public static get MediumVioletRed(): Color {
            return Color._namedColors.mediumvioletred.Clone();
        }

        /**
        * Returns a Color object set to the color named color MidnightBlue.
        */
        public static get MidnightBlue(): Color {
            return Color._namedColors.midnightblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color MintCream.
        */
        public static get MintCream(): Color {
            return Color._namedColors.mintcream.Clone();
        }

        /**
        * Returns a Color object set to the color named color MistyRose.
        */
        public static get MistyRose(): Color {
            return Color._namedColors.mistyrose.Clone();
        }

        /**
        * Returns a Color object set to the color named color Moccasin.
        */
        public static get Moccasin(): Color {
            return Color._namedColors.moccasin.Clone();
        }

        /**
        * Returns a Color object set to the color named color NavajoWhite.
        */
        public static get NavajoWhite(): Color {
            return Color._namedColors.navajowhite.Clone();
        }

        /**
        * Returns a Color object set to the color named color Navy.
        */
        public static get Navy(): Color {
            return Color._namedColors.navy.Clone();
        }

        /**
        * Returns a Color object set to the color named color OldLace.
        */
        public static get OldLace(): Color {
            return Color._namedColors.oldlace.Clone();
        }

        /**
        * Returns a Color object set to the color named color Olive.
        */
        public static get Olive(): Color {
            return Color._namedColors.olive.Clone();
        }

        /**
        * Returns a Color object set to the color named color OliveDrab.
        */
        public static get OliveDrab(): Color {
            return Color._namedColors.olivedrab.Clone();
        }

        /**
        * Returns a Color object set to the color named color Orange.
        */
        public static get Orange(): Color {
            return Color._namedColors.orange.Clone();
        }

        /**
        * Returns a Color object set to the color named color OrangeRed.
        */
        public static get OrangeRed(): Color {
            return Color._namedColors.orangered.Clone();
        }

        /**
        * Returns a Color object set to the color named color Orchid.
        */
        public static get Orchid(): Color {
            return Color._namedColors.orchid.Clone();
        }

        /**
        * Returns a Color object set to the color named color PaleGoldenRod.
        */
        public static get PaleGoldenRod(): Color {
            return Color._namedColors.palegoldenrod.Clone();
        }

        /**
        * Returns a Color object set to the color named color PaleGreen.
        */
        public static get PaleGreen(): Color {
            return Color._namedColors.palegreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color PaleTurquoise.
        */
        public static get PaleTurquoise(): Color {
            return Color._namedColors.paleturquoise.Clone();
        }

        /**
        * Returns a Color object set to the color named color PaleVioletRed.
        */
        public static get PaleVioletRed(): Color {
            return Color._namedColors.palevioletred.Clone();
        }

        /**
        * Returns a Color object set to the color named color PapayaWhip.
        */
        public static get PapayaWhip(): Color {
            return Color._namedColors.papayawhip.Clone();
        }

        /**
        * Returns a Color object set to the color named color PeachPuff.
        */
        public static get PeachPuff(): Color {
            return Color._namedColors.peachpuff.Clone();
        }

        /**
        * Returns a Color object set to the color named color Peru.
        */
        public static get Peru(): Color {
            return Color._namedColors.peru.Clone();
        }

        /**
        * Returns a Color object set to the color named color Pink.
        */
        public static get Pink(): Color {
            return Color._namedColors.pink.Clone();
        }

        /**
        * Returns a Color object set to the color named color Plum.
        */
        public static get Plum(): Color {
            return Color._namedColors.plum.Clone();
        }

        /**
        * Returns a Color object set to the color named color PowderBlue.
        */
        public static get PowderBlue(): Color {
            return Color._namedColors.powderblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color Purple.
        */
        public static get Purple(): Color {
            return Color._namedColors.purple.Clone();
        }

        /**
        * Returns a Color object set to the color named color Red.
        */
        public static get Red(): Color {
            return Color._namedColors.red.Clone();
        }

        /**
        * Returns a Color object set to the color named color RosyBrown.
        */
        public static get RosyBrown(): Color {
            return Color._namedColors.rosybrown.Clone();
        }

        /**
        * Returns a Color object set to the color named color RoyalBlue.
        */
        public static get RoyalBlue(): Color {
            return Color._namedColors.royalblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color SaddleBrown.
        */
        public static get SaddleBrown(): Color {
            return Color._namedColors.saddlebrown.Clone();
        }

        /**
        * Returns a Color object set to the color named color Salmon.
        */
        public static get Salmon(): Color {
            return Color._namedColors.salmon.Clone();
        }

        /**
        * Returns a Color object set to the color named color SandyBrown.
        */
        public static get SandyBrown(): Color {
            return Color._namedColors.sandybrown.Clone();
        }

        /**
        * Returns a Color object set to the color named color SeaGreen.
        */
        public static get SeaGreen(): Color {
            return Color._namedColors.seagreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color SeaShell.
        */
        public static get SeaShell(): Color {
            return Color._namedColors.seashell.Clone();
        }

        /**
        * Returns a Color object set to the color named color Sienna.
        */
        public static get Sienna(): Color {
            return Color._namedColors.sienna.Clone();
        }

        /**
        * Returns a Color object set to the color named color Silver.
        */
        public static get Silver(): Color {
            return Color._namedColors.silver.Clone();
        }

        /**
        * Returns a Color object set to the color named color SkyBlue.
        */
        public static get SkyBlue(): Color {
            return Color._namedColors.skyblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color SlateBlue.
        */
        public static get SlateBlue(): Color {
            return Color._namedColors.slateblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color SlateGray.
        */
        public static get SlateGray(): Color {
            return Color._namedColors.slategray.Clone();
        }

        /**
        * Returns a Color object set to the color named color Snow.
        */
        public static get Snow(): Color {
            return Color._namedColors.snow.Clone();
        }

        /**
        * Returns a Color object set to the color named color SpringGreen.
        */
        public static get SpringGreen(): Color {
            return Color._namedColors.springgreen.Clone();
        }

        /**
        * Returns a Color object set to the color named color SteelBlue.
        */
        public static get SteelBlue(): Color {
            return Color._namedColors.steelblue.Clone();
        }

        /**
        * Returns a Color object set to the color named color Tan.
        */
        public static get Tan(): Color {
            return Color._namedColors.tan.Clone();
        }

        /**
        * Returns a Color object set to the color named color Teal.
        */
        public static get Teal(): Color {
            return Color._namedColors.teal.Clone();
        }

        /**
        * Returns a Color object set to the color named color Thistle.
        */
        public static get Thistle(): Color {
            return Color._namedColors.thistle.Clone();
        }

        /**
        * Returns a Color object set to the color named color Tomato.
        */
        public static get Tomato(): Color {
            return Color._namedColors.tomato.Clone();
        }

        /**
        * Returns a Color object set to the color named color Turquoise.
        */
        public static get Turquoise(): Color {
            return Color._namedColors.turquoise.Clone();
        }

        /**
        * Returns a Color object set to the color named color Violet.
        */
        public static get Violet(): Color {
            return Color._namedColors.violet.Clone();
        }

        /**
        * Returns a Color object set to the color named color Wheat.
        */
        public static get Wheat(): Color {
            return Color._namedColors.wheat.Clone();
        }

        /**
        * Returns a Color object set to the color named color White.
        */
        public static get White(): Color {
            return Color._namedColors.white.Clone();
        }

        /**
        * Returns a Color object set to the color named color WhiteSmoke.
        */
        public static get WhiteSmoke(): Color {
            return Color._namedColors.whitesmoke.Clone();
        }

        /**
        * Returns a Color object set to the color named color Yellow.
        */
        public static get Yellow(): Color {
            return Color._namedColors.yellow.Clone();
        }

        /**
        * Returns a Color object set to the color named color YellowGreen.
        */
        public static get YellowGreen(): Color {
            return Color._namedColors.yellowgreen.Clone();
        }
        
        /**
        * Returns a copy of the color with the current color channels.
        */
        public Clone() : any {
            return new Color(this.R, this.G, this.B, this.A);
        }

        /**
        * Disposes the Color object and unbinds any active event bindings.
        */
        public Dispose(): void {
            this._onChange.Dispose();
        }
 
        /**
        * toString override that returns the Color in the "rgba(r,g,b,a)" format.
        */
        public toString(): string {
            if (this._cached === undefined) {
                this._cached = 'rgba(' + this.R + ',' + this.G + ',' + this.B + ',' + this.A + ')';
            }
            return this._cached;
        }
   }
}