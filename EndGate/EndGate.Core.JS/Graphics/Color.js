var EndGate;
(function (EndGate) {
    /// <reference path="../Interfaces/ITyped.ts" />
    (function (Graphics) {
        var Color = (function () {
            function Color(a, r, g, b) {
                this._type = "Color";
                if (a && typeof (a) === 'string') {
                    this.initializeColor(a);
                } else {
                    if (b !== undefined) {
                        // we have all 4
                        this.A = a;
                        this.R = r;
                        this.G = g;
                        this.B = b;
                    } else {
                        // we have only 3 colors assume rgb
                        this.A = 1;
                        this.R = a;
                        this.G = r;
                        this.B = g;
                    }
                }
            }
            Color.prototype.ToString = function () {
                return 'argb(' + this.A + ',' + this.R + ',' + this.G + ',' + this.B + ')';
            };

            Color.prototype.initializeColor = function (color) {
                //rgb, hex, rgba, argb
                color = this.namedColorToHex(color);
                var result = this.convertStringToColor(color);
                this.A = result.A;
                this.B = result.B;
                this.R = result.R;
                this.G = result.G;
            };

            Color.prototype.convertStringToColor = function (hex) {
                if (hex.charAt(0) == '#') {
                    hex = hex.substr(1);
                }

                if (hex.length == 3) {
                    var shortHex = /^([a-f\d])([a-f\d])([a-f\d])$/i;
                    hex = hex.replace(shortHex, function (m, r, g, b) {
                        return r + r + g + g + b + b;
                    });
                }

                if (hex.length == 4) {
                    //short alpha
                    var shortHex = /^([a-f\d])([a-f\d])([a-f\d])([a-f\d])$/i;
                    hex = hex.replace(shortHex, function (m, a, r, g, b) {
                        return a + a + r + r + g + g + b + b;
                    });
                }

                if (hex.length == 6) {
                    return this.parseHex(hex);
                }

                if (hex.length == 8) {
                    return this.parseAlphaHex(hex);
                }

                return this.parseRGB(hex);
            };

            Color.prototype.parseRGB = function (rgb) {
                var regex = /^(argb|rgb|rgba)\s*\(\s*([\d]{0,3})\s*,\s*([\d]{0,3})\s*,\s*([\d]{0,3})\s*(?:,\s*(\d{0,3})\s*)?\s*\)$/i;

                var result = regex.exec(rgb);
                if (result) {
                    var name = result[1];

                    switch (name) {
                        case 'rgb':
                            return new Color(parseInt(result[2]), parseInt(result[3]), parseInt(result[4]));
                        case 'argb':
                            return new Color(parseInt(result[2]), parseInt(result[3]), parseInt(result[4]), parseInt(result[5]));
                        case 'rgba':
                            return new Color(parseInt(result[5]), parseInt(result[2]), parseInt(result[3]), parseInt(result[4]));
                    }
                }

                return new Color(0, 0, 0);
            };

            Color.prototype.parseAlphaHex = function (hex) {
                var a, r, g, b;

                a = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255;
                r = parseInt(hex.charAt(2) + hex.charAt(3), 16);
                g = parseInt(hex.charAt(4) + hex.charAt(5), 16);
                b = parseInt(hex.charAt(6) + hex.charAt(7), 16);

                return new Color(a, r, g, b);
            };

            Color.prototype.parseHex = function (hex) {
                var r, g, b;

                r = parseInt(hex.charAt(0) + hex.charAt(1), 16);
                g = parseInt(hex.charAt(2) + hex.charAt(3), 16);
                b = parseInt(hex.charAt(4) + hex.charAt(5), 16);

                return new Color(r, g, b);
            };

            Color.prototype.namedColorToHex = function (color) {
                var colors = {
                    "aliceblue": "#f0f8ff",
                    "antiquewhite": "#faebd7",
                    "aqua": "#00ffff",
                    "aquamarine": "#7fffd4",
                    "azure": "#f0ffff",
                    "beige": "#f5f5dc",
                    "bisque": "#ffe4c4",
                    "black": "#000000",
                    "blanchedalmond": "#ffebcd",
                    "blue": "#0000ff",
                    "blueviolet": "#8a2be2",
                    "brown": "#a52a2a",
                    "burlywood": "#deb887",
                    "cadetblue": "#5f9ea0",
                    "chartreuse": "#7fff00",
                    "chocolate": "#d2691e",
                    "coral": "#ff7f50",
                    "cornflowerblue": "#6495ed",
                    "cornsilk": "#fff8dc",
                    "crimson": "#dc143c",
                    "cyan": "#00ffff",
                    "darkblue": "#00008b",
                    "darkcyan": "#008b8b",
                    "darkgoldenrod": "#b8860b",
                    "darkgray": "#a9a9a9",
                    "darkgreen": "#006400",
                    "darkkhaki": "#bdb76b",
                    "darkmagenta": "#8b008b",
                    "darkolivegreen": "#556b2f",
                    "darkorange": "#ff8c00",
                    "darkorchid": "#9932cc",
                    "darkred": "#8b0000",
                    "darksalmon": "#e9967a",
                    "darkseagreen": "#8fbc8f",
                    "darkslateblue": "#483d8b",
                    "darkslategray": "#2f4f4f",
                    "darkturquoise": "#00ced1",
                    "darkviolet": "#9400d3",
                    "deeppink": "#ff1493",
                    "deepskyblue": "#00bfff",
                    "dimgray": "#696969",
                    "dodgerblue": "#1e90ff",
                    "firebrick": "#b22222",
                    "floralwhite": "#fffaf0",
                    "forestgreen": "#228b22",
                    "fuchsia": "#ff00ff",
                    "gainsboro": "#dcdcdc",
                    "ghostwhite": "#f8f8ff",
                    "gold": "#ffd700",
                    "goldenrod": "#daa520",
                    "gray": "#808080",
                    "green": "#008000",
                    "greenyellow": "#adff2f",
                    "honeydew": "#f0fff0",
                    "hotpink": "#ff69b4",
                    "indianred ": "#cd5c5c",
                    "indigo": "#4b0082",
                    "ivory": "#fffff0",
                    "khaki": "#f0e68c",
                    "lavender": "#e6e6fa",
                    "lavenderblush": "#fff0f5",
                    "lawngreen": "#7cfc00",
                    "lemonchiffon": "#fffacd",
                    "lightblue": "#add8e6",
                    "lightcoral": "#f08080",
                    "lightcyan": "#e0ffff",
                    "lightgoldenrodyellow": "#fafad2",
                    "lightgrey": "#d3d3d3",
                    "lightgreen": "#90ee90",
                    "lightpink": "#ffb6c1",
                    "lightsalmon": "#ffa07a",
                    "lightseagreen": "#20b2aa",
                    "lightskyblue": "#87cefa",
                    "lightslategray": "#778899",
                    "lightsteelblue": "#b0c4de",
                    "lightyellow": "#ffffe0",
                    "lime": "#00ff00",
                    "limegreen": "#32cd32",
                    "linen": "#faf0e6",
                    "magenta": "#ff00ff",
                    "maroon": "#800000",
                    "mediumaquamarine": "#66cdaa",
                    "mediumblue": "#0000cd",
                    "mediumorchid": "#ba55d3",
                    "mediumpurple": "#9370d8",
                    "mediumseagreen": "#3cb371",
                    "mediumslateblue": "#7b68ee",
                    "mediumspringgreen": "#00fa9a",
                    "mediumturquoise": "#48d1cc",
                    "mediumvioletred": "#c71585",
                    "midnightblue": "#191970",
                    "mintcream": "#f5fffa",
                    "mistyrose": "#ffe4e1",
                    "moccasin": "#ffe4b5",
                    "navajowhite": "#ffdead",
                    "navy": "#000080",
                    "oldlace": "#fdf5e6",
                    "olive": "#808000",
                    "olivedrab": "#6b8e23",
                    "orange": "#ffa500",
                    "orangered": "#ff4500",
                    "orchid": "#da70d6",
                    "palegoldenrod": "#eee8aa",
                    "palegreen": "#98fb98",
                    "paleturquoise": "#afeeee",
                    "palevioletred": "#d87093",
                    "papayawhip": "#ffefd5",
                    "peachpuff": "#ffdab9",
                    "peru": "#cd853f",
                    "pink": "#ffc0cb",
                    "plum": "#dda0dd",
                    "powderblue": "#b0e0e6",
                    "purple": "#800080",
                    "red": "#ff0000",
                    "rosybrown": "#bc8f8f",
                    "royalblue": "#4169e1",
                    "saddlebrown": "#8b4513",
                    "salmon": "#fa8072",
                    "sandybrown": "#f4a460",
                    "seagreen": "#2e8b57",
                    "seashell": "#fff5ee",
                    "sienna": "#a0522d",
                    "silver": "#c0c0c0",
                    "skyblue": "#87ceeb",
                    "slateblue": "#6a5acd",
                    "slategray": "#708090",
                    "snow": "#fffafa",
                    "springgreen": "#00ff7f",
                    "steelblue": "#4682b4",
                    "tan": "#d2b48c",
                    "teal": "#008080",
                    "thistle": "#d8bfd8",
                    "tomato": "#ff6347",
                    "turquoise": "#40e0d0",
                    "violet": "#ee82ee",
                    "wheat": "#f5deb3",
                    "white": "#ffffff",
                    "whitesmoke": "#f5f5f5",
                    "yellow": "#ffff00",
                    "yellowgreen": "#9acd32"
                };

                if (typeof colors[color.toLowerCase()] != 'undefined')
                    return colors[color.toLowerCase()];

                return color;
            };

            Color.AliceBlue = new Color("#F0F8FF");
            Color.AntiqueWhite = new Color("#FAEBD7");
            Color.Aqua = new Color("#00FFFF");
            Color.Aquamarine = new Color("#7FFFD4");
            Color.Azure = new Color("#F0FFFF");
            Color.Beige = new Color("#F5F5DC");
            Color.Bisque = new Color("#FFE4C4");
            Color.Black = new Color("#000000");
            Color.BlanchedAlmond = new Color("#FFEBCD");
            Color.Blue = new Color("#0000FF");
            Color.BlueViolet = new Color("#8A2BE2");
            Color.Brown = new Color("#A52A2A");
            Color.BurlyWood = new Color("#DEB887");
            Color.CadetBlue = new Color("#5F9EA0");
            Color.Chartreuse = new Color("#7FFF00");
            Color.Chocolate = new Color("#D2691E");
            Color.Coral = new Color("#FF7F50");
            Color.CornflowerBlue = new Color("#6495ED");
            Color.Cornsilk = new Color("#FFF8DC");
            Color.Crimson = new Color("#DC143C");
            Color.Cyan = new Color("#00FFFF");
            Color.DarkBlue = new Color("#00008B");
            Color.DarkCyan = new Color("#008B8B");
            Color.DarkGoldenRod = new Color("#B8860B");
            Color.DarkGray = new Color("#A9A9A9");
            Color.DarkGreen = new Color("#006400");
            Color.DarkKhaki = new Color("#BDB76B");
            Color.DarkMagenta = new Color("#8B008B");
            Color.DarkOliveGreen = new Color("#556B2F");
            Color.DarkOrange = new Color("#FF8C00");
            Color.DarkOrchid = new Color("#9932CC");
            Color.DarkRed = new Color("#8B0000");
            Color.DarkSalmon = new Color("#E9967A");
            Color.DarkSeaGreen = new Color("#8FBC8F");
            Color.DarkSlateBlue = new Color("#483D8B");
            Color.DarkSlateGray = new Color("#2F4F4F");
            Color.DarkTurquoise = new Color("#00CED1");
            Color.DarkViolet = new Color("#9400D3");
            Color.DeepPink = new Color("#FF1493");
            Color.DeepSkyBlue = new Color("#00BFFF");
            Color.DimGray = new Color("#696969");
            Color.DodgerBlue = new Color("#1E90FF");
            Color.FireBrick = new Color("#B22222");
            Color.FloralWhite = new Color("#FFFAF0");
            Color.ForestGreen = new Color("#228B22");
            Color.Fuchsia = new Color("#FF00FF");
            Color.Gainsboro = new Color("#DCDCDC");
            Color.GhostWhite = new Color("#F8F8FF");
            Color.Gold = new Color("#FFD700");
            Color.GoldenRod = new Color("#DAA520");
            Color.Gray = new Color("#808080");
            Color.Green = new Color("#008000");
            Color.GreenYellow = new Color("#ADFF2F");
            Color.HoneyDew = new Color("#F0FFF0");
            Color.HotPink = new Color("#FF69B4");
            Color.IndianRed = new Color("#CD5C5C");
            Color.Indigo = new Color("#4B0082");
            Color.Ivory = new Color("#FFFFF0");
            Color.Khaki = new Color("#F0E68C");
            Color.Lavender = new Color("#E6E6FA");
            Color.LavenderBlush = new Color("#FFF0F5");
            Color.LawnGreen = new Color("#7CFC00");
            Color.LemonChiffon = new Color("#FFFACD");
            Color.LightBlue = new Color("#ADD8E6");
            Color.LightCoral = new Color("#F08080");
            Color.LightCyan = new Color("#E0FFFF");
            Color.LightGoldenRodYellow = new Color("#FAFAD2");
            Color.LightGray = new Color("#D3D3D3");
            Color.LightGreen = new Color("#90EE90");
            Color.LightPink = new Color("#FFB6C1");
            Color.LightSalmon = new Color("#FFA07A");
            Color.LightSeaGreen = new Color("#20B2AA");
            Color.LightSkyBlue = new Color("#87CEFA");
            Color.LightSlateGray = new Color("#778899");
            Color.LightSteelBlue = new Color("#B0C4DE");
            Color.LightYellow = new Color("#FFFFE0");
            Color.Lime = new Color("#00FF00");
            Color.LimeGreen = new Color("#32CD32");
            Color.Linen = new Color("#FAF0E6");
            Color.Magenta = new Color("#FF00FF");
            Color.Maroon = new Color("#800000");
            Color.MediumAquaMarine = new Color("#66CDAA");
            Color.MediumBlue = new Color("#0000CD");
            Color.MediumOrchid = new Color("#BA55D3");
            Color.MediumPurple = new Color("#9370DB");
            Color.MediumSeaGreen = new Color("#3CB371");
            Color.MediumSlateBlue = new Color("#7B68EE");
            Color.MediumSpringGreen = new Color("#00FA9A");
            Color.MediumTurquoise = new Color("#48D1CC");
            Color.MediumVioletRed = new Color("#C71585");
            Color.MidnightBlue = new Color("#191970");
            Color.MintCream = new Color("#F5FFFA");
            Color.MistyRose = new Color("#FFE4E1");
            Color.Moccasin = new Color("#FFE4B5");
            Color.NavajoWhite = new Color("#FFDEAD");
            Color.Navy = new Color("#000080");
            Color.OldLace = new Color("#FDF5E6");
            Color.Olive = new Color("#808000");
            Color.OliveDrab = new Color("#6B8E23");
            Color.Orange = new Color("#FFA500");
            Color.OrangeRed = new Color("#FF4500");
            Color.Orchid = new Color("#DA70D6");
            Color.PaleGoldenRod = new Color("#EEE8AA");
            Color.PaleGreen = new Color("#98FB98");
            Color.PaleTurquoise = new Color("#AFEEEE");
            Color.PaleVioletRed = new Color("#DB7093");
            Color.PapayaWhip = new Color("#FFEFD5");
            Color.PeachPuff = new Color("#FFDAB9");
            Color.Peru = new Color("#CD853F");
            Color.Pink = new Color("#FFC0CB");
            Color.Plum = new Color("#DDA0DD");
            Color.PowderBlue = new Color("#B0E0E6");
            Color.Purple = new Color("#800080");
            Color.Red = new Color("#FF0000");
            Color.RosyBrown = new Color("#BC8F8F");
            Color.RoyalBlue = new Color("#4169E1");
            Color.SaddleBrown = new Color("#8B4513");
            Color.Salmon = new Color("#FA8072");
            Color.SandyBrown = new Color("#F4A460");
            Color.SeaGreen = new Color("#2E8B57");
            Color.SeaShell = new Color("#FFF5EE");
            Color.Sienna = new Color("#A0522D");
            Color.Silver = new Color("#C0C0C0");
            Color.SkyBlue = new Color("#87CEEB");
            Color.SlateBlue = new Color("#6A5ACD");
            Color.SlateGray = new Color("#708090");
            Color.Snow = new Color("#FFFAFA");
            Color.SpringGreen = new Color("#00FF7F");
            Color.SteelBlue = new Color("#4682B4");
            Color.Tan = new Color("#D2B48C");
            Color.Teal = new Color("#008080");
            Color.Thistle = new Color("#D8BFD8");
            Color.Tomato = new Color("#FF6347");
            Color.Turquoise = new Color("#40E0D0");
            Color.Violet = new Color("#EE82EE");
            Color.Wheat = new Color("#F5DEB3");
            Color.White = new Color("#FFFFFF");
            Color.WhiteSmoke = new Color("#F5F5F5");
            Color.Yellow = new Color("#FFFF00");
            Color.YellowGreen = new Color("#9ACD32");
            return Color;
        })();
        Graphics.Color = Color;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
