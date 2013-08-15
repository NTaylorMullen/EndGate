var EndGate;
(function (EndGate) {
    /// <reference path="../Interfaces/ITyped.ts" />
    /// <reference path="../Interfaces/ICloneable.ts" />
    /// <reference path="../Interfaces/IDisposable.ts" />
    /// <reference path="../Utilities/EventHandler1.ts" />
    (function (Graphics) {
        /**
        * Color class used to pass around colors in a typed manner.
        */
        var Color = (function () {
            function Color(r, g, b, a) {
                this._type = "Color";
                this._cached = undefined;
                this._onChange = new EndGate.EventHandler1();

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
            Object.defineProperty(Color.prototype, "OnChange", {
                get: /**
                * Gets an EventHandler that is triggered when the R, G, B, or A values of this Color change.
                */
                function () {
                    return this._onChange;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color.prototype, "R", {
                get: /**
                * Gets or sets the current red channel. Value must be an integer between 0 and 255 inclusive.
                */
                function () {
                    return this._r;
                },
                set: function (r) {
                    this._cached = undefined;
                    this._r = Math.round(Math.min(Math.max(r, 0), 255));
                    this._onChange.Trigger(this);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color.prototype, "G", {
                get: /**
                * Gets or sets the current green channel. Value must be an integer between 0 and 255 inclusive.
                */
                function () {
                    return this._g;
                },
                set: function (g) {
                    this._cached = undefined;
                    this._g = Math.round(Math.min(Math.max(g, 0), 255));
                    this._onChange.Trigger(this);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color.prototype, "B", {
                get: /**
                * Gets or sets the current blue channel. Value must be an integer between 0 and 255 inclusive.
                */
                function () {
                    return this._b;
                },
                set: function (b) {
                    this._cached = undefined;
                    this._b = Math.round(Math.min(Math.max(b, 0), 255));
                    this._onChange.Trigger(this);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color.prototype, "A", {
                get: /**
                * Gets or sets the current alpha channel. Value must be between 0 and 1 inclusive.
                */
                function () {
                    return this._a;
                },
                set: function (a) {
                    this._cached = undefined;
                    this._a = Math.min(Math.max(a, 0), 1);
                    this._onChange.Trigger(this);
                },
                enumerable: true,
                configurable: true
            });

            Color.FromRGB = /**
            * Creates a new Color object with the specified RGB values.
            * @param r The red channel. Must be between 0 and 255 inclusive.
            * @param g The green channel. Must be between 0 and 255 inclusive.
            * @param b The blue channel. Must be between 0 and 255 inclusive.
            */
            function (r, g, b) {
                return new Color(r, g, b);
            };

            Color.FromRGBA = /**
            * Creates a new Color object with the specified RGBA values.
            * @param r The red channel. Must be between 0 and 255 inclusive.
            * @param g The green channel. Must be between 0 and 255 inclusive.
            * @param b The blue channel. Must be between 0 and 255 inclusive.
            * @param a The alpha channel. Must be between 0 and 1 inclusive.
            */
            function (r, g, b, a) {
                return new Color(r, g, b, a);
            };

            Color.FromARGB = /**
            * Creates a new Color object with the specified ARGB values.
            * @param a The alpha channel. Must be between 0 and 1 inclusive.
            * @param r The red channel. Must be between 0 and 255 inclusive.
            * @param g The green channel. Must be between 0 and 255 inclusive.
            * @param b The blue channel. Must be between 0 and 255 inclusive.
            */
            function (a, r, g, b) {
                return new Color(r, g, b, a);
            };

            Color.FromHex = /**
            * Creates a new Color object from the specified hex assignment.
            * @param hex The hex based color code.
            */
            function (hex) {
                return new Color(hex);
            };

            Color.FromName = /**
            * Creates a new Color object form the HTML5 named colors.
            * @param name The name of the HTML5 color to use.
            */
            function (name) {
                return new Color(name);
            };

            Color.ConvertShortHexToLong = //Converts a short hex string e.g. fff or cccc to the long version
            //e.g. ffffffff the alpha channel.
            function (hex) {
                if (hex.length === 3) {
                    //append the alpha channel default which is fully opaque
                    hex = hex + 'f';
                }

                if (hex.length === 4) {
                    //short version that includes alpha channel
                    hex = hex.replace(Color.RgbaHexRegExp, function (m, a, r, g, b) {
                        return r + r + g + g + b + b + a + a;
                    });
                }

                return hex;
            };

            //Initializes a color object based on the string passed.
            //Possible values are hex and named values
            //rgba/argb/rgb values are handled elsewhere
            Color.prototype.InitializeColorFromString = function (color) {
                //rgb, hex, rgba, argb
                var namedColor = this.NamedColorToHex(color);
                var result = null;

                if (typeof (namedColor) === 'string') {
                    result = this.CreateColorObjectFromString(namedColor);
                } else {
                    result = namedColor;
                }

                this.A = result.A;
                this.B = result.B;
                this.R = result.R;
                this.G = result.G;
            };

            //Creates a color object from the string provided
            Color.prototype.CreateColorObjectFromString = function (hex) {
                if (hex.charAt(0) === '#') {
                    hex = hex.substr(1);
                }

                //convert short hexes to long hexes
                hex = Color.ConvertShortHexToLong(hex);

                if (hex.length === 6) {
                    hex = hex + 'ff';
                }

                if (hex.length === 8) {
                    return this.ParseAlphaHex(hex);
                }

                //it's no longer a hex and must be an rgb style function
                return this.ParseRGB(hex);
            };

            //Parses a color function and returns a Color object
            Color.prototype.ParseRGB = function (rgb) {
                var result = Color.RgbRegExp.exec(rgb);
                if (result) {
                    var name = result[1];

                    switch (name) {
                        case 'rgb':
                            return new Color(parseInt(result[2]), parseInt(result[3]), parseInt(result[4]));
                        case 'argb':
                            return new Color(parseInt(result[3]), parseInt(result[4]), parseInt(result[5]), parseFloat(result[2]));
                        case 'rgba':
                            return new Color(parseInt(result[2]), parseInt(result[3]), parseInt(result[4]), parseFloat(result[5]));
                    }
                }

                //since the hex, named colors and color functions were
                //not available in the string passed then it's not a color
                //return Magenta so it's obvious something is wrong
                return Color.Magenta;
            };

            //Parses out all color channels including alpha
            //and returns a Color object based on the values
            Color.prototype.ParseAlphaHex = function (hex) {
                var a, r, g, b;

                r = parseInt(hex.charAt(0) + hex.charAt(1), 16);
                g = parseInt(hex.charAt(2) + hex.charAt(3), 16);
                b = parseInt(hex.charAt(4) + hex.charAt(5), 16);
                a = parseInt(hex.charAt(6) + hex.charAt(7), 16) / 255;

                return new Color(r, g, b, a);
            };

            //Parses out all color channels and returns a Color object based on the values
            Color.prototype.ParseHex = function (hex) {
                var r, g, b;

                r = parseInt(hex.charAt(0) + hex.charAt(1), 16);
                g = parseInt(hex.charAt(2) + hex.charAt(3), 16);
                b = parseInt(hex.charAt(4) + hex.charAt(5), 16);

                return new Color(r, g, b);
            };

            //Checks the named color object and looks for a similarly named color
            //if one is found returns the named Color object
            Color.prototype.NamedColorToHex = function (color) {
                if (color.substring(0, 1) === '#') {
                    return color;
                }
                if (typeof Color._namedColors[color.toLowerCase()] !== 'undefined') {
                    return Color._namedColors[color.toLowerCase()];
                }

                return color;
            };

            Object.defineProperty(Color, "Transparent", {
                get: /**
                * Returns a transparent Color object.
                */
                function () {
                    return Color._namedColors.transparent.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "AliceBlue", {
                get: /**
                * Returns a Color object set to the color named color AliceBlue.
                */
                function () {
                    return Color._namedColors.aliceblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "AntiqueWhite", {
                get: /**
                * Returns a Color object set to the color named color AntiqueWhite.
                */
                function () {
                    return Color._namedColors.antiquewhite.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Aqua", {
                get: /**
                * Returns a Color object set to the color named color Aqua.
                */
                function () {
                    return Color._namedColors.aqua.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Aquamarine", {
                get: /**
                * Returns a Color object set to the color named color Aquamarine.
                */
                function () {
                    return Color._namedColors.aquamarine.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Azure", {
                get: /**
                * Returns a Color object set to the color named color Azure.
                */
                function () {
                    return Color._namedColors.azure.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Beige", {
                get: /**
                * Returns a Color object set to the color named color Beige.
                */
                function () {
                    return Color._namedColors.beige.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Bisque", {
                get: /**
                * Returns a Color object set to the color named color Bisque.
                */
                function () {
                    return Color._namedColors.bisque.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Black", {
                get: /**
                * Returns a Color object set to the color named color Black.
                */
                function () {
                    return Color._namedColors.black.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "BlanchedAlmond", {
                get: /**
                * Returns a Color object set to the color named color BlanchedAlmond.
                */
                function () {
                    return Color._namedColors.blanchedalmond.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Blue", {
                get: /**
                * Returns a Color object set to the color named color Blue.
                */
                function () {
                    return Color._namedColors.blue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "BlueViolet", {
                get: /**
                * Returns a Color object set to the color named color BlueViolet.
                */
                function () {
                    return Color._namedColors.blueviolet.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Brown", {
                get: /**
                * Returns a Color object set to the color named color Brown.
                */
                function () {
                    return Color._namedColors.brown.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "BurlyWood", {
                get: /**
                * Returns a Color object set to the color named color BurlyWood.
                */
                function () {
                    return Color._namedColors.burlywood.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "CadetBlue", {
                get: /**
                * Returns a Color object set to the color named color CadetBlue.
                */
                function () {
                    return Color._namedColors.cadetblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Chartreuse", {
                get: /**
                * Returns a Color object set to the color named color Chartreuse.
                */
                function () {
                    return Color._namedColors.chartreuse.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Chocolate", {
                get: /**
                * Returns a Color object set to the color named color Chocolate.
                */
                function () {
                    return Color._namedColors.chocolate.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Coral", {
                get: /**
                * Returns a Color object set to the color named color Coral.
                */
                function () {
                    return Color._namedColors.coral.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "CornflowerBlue", {
                get: /**
                * Returns a Color object set to the color named color CornflowerBlue.
                */
                function () {
                    return Color._namedColors.cornflowerblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Cornsilk", {
                get: /**
                * Returns a Color object set to the color named color Cornsilk.
                */
                function () {
                    return Color._namedColors.cornsilk.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Crimson", {
                get: /**
                * Returns a Color object set to the color named color Crimson.
                */
                function () {
                    return Color._namedColors.crimson.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Cyan", {
                get: /**
                * Returns a Color object set to the color named color Cyan.
                */
                function () {
                    return Color._namedColors.cyan.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkBlue", {
                get: /**
                * Returns a Color object set to the color named color DarkBlue.
                */
                function () {
                    return Color._namedColors.darkblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkCyan", {
                get: /**
                * Returns a Color object set to the color named color DarkCyan.
                */
                function () {
                    return Color._namedColors.darkcyan.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkGoldenRod", {
                get: /**
                * Returns a Color object set to the color named color DarkGoldenRod.
                */
                function () {
                    return Color._namedColors.darkgoldenrod.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkGray", {
                get: /**
                * Returns a Color object set to the color named color DarkGray.
                */
                function () {
                    return Color._namedColors.darkgray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkGreen", {
                get: /**
                * Returns a Color object set to the color named color DarkGreen.
                */
                function () {
                    return Color._namedColors.darkgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkKhaki", {
                get: /**
                * Returns a Color object set to the color named color DarkKhaki.
                */
                function () {
                    return Color._namedColors.darkkhaki.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkMagenta", {
                get: /**
                * Returns a Color object set to the color named color DarkMagenta.
                */
                function () {
                    return Color._namedColors.darkmagenta.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkOliveGreen", {
                get: /**
                * Returns a Color object set to the color named color DarkOliveGreen.
                */
                function () {
                    return Color._namedColors.darkolivegreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkOrange", {
                get: /**
                * Returns a Color object set to the color named color DarkOrange.
                */
                function () {
                    return Color._namedColors.darkorange.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkOrchid", {
                get: /**
                * Returns a Color object set to the color named color DarkOrchid.
                */
                function () {
                    return Color._namedColors.darkorchid.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkRed", {
                get: /**
                * Returns a Color object set to the color named color DarkRed.
                */
                function () {
                    return Color._namedColors.darkred.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkSalmon", {
                get: /**
                * Returns a Color object set to the color named color DarkSalmon.
                */
                function () {
                    return Color._namedColors.darksalmon.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkSeaGreen", {
                get: /**
                * Returns a Color object set to the color named color DarkSeaGreen.
                */
                function () {
                    return Color._namedColors.darkseagreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkSlateBlue", {
                get: /**
                * Returns a Color object set to the color named color DarkSlateBlue.
                */
                function () {
                    return Color._namedColors.darkslateblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkSlateGray", {
                get: /**
                * Returns a Color object set to the color named color DarkSlateGray.
                */
                function () {
                    return Color._namedColors.darkslategray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkTurquoise", {
                get: /**
                * Returns a Color object set to the color named color DarkTurquoise.
                */
                function () {
                    return Color._namedColors.darkturquoise.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkViolet", {
                get: /**
                * Returns a Color object set to the color named color DarkViolet.
                */
                function () {
                    return Color._namedColors.darkviolet.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DeepPink", {
                get: /**
                * Returns a Color object set to the color named color DeepPink.
                */
                function () {
                    return Color._namedColors.deeppink.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DeepSkyBlue", {
                get: /**
                * Returns a Color object set to the color named color DeepSkyBlue.
                */
                function () {
                    return Color._namedColors.deepskyblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DimGray", {
                get: /**
                * Returns a Color object set to the color named color DimGray.
                */
                function () {
                    return Color._namedColors.dimgray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DodgerBlue", {
                get: /**
                * Returns a Color object set to the color named color DodgerBlue.
                */
                function () {
                    return Color._namedColors.dodgerblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "FireBrick", {
                get: /**
                * Returns a Color object set to the color named color FireBrick.
                */
                function () {
                    return Color._namedColors.firebrick.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "FloralWhite", {
                get: /**
                * Returns a Color object set to the color named color FloralWhite.
                */
                function () {
                    return Color._namedColors.floralwhite.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "ForestGreen", {
                get: /**
                * Returns a Color object set to the color named color ForestGreen.
                */
                function () {
                    return Color._namedColors.forestgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Fuchsia", {
                get: /**
                * Returns a Color object set to the color named color Fuchsia.
                */
                function () {
                    return Color._namedColors.fuchsia.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Gainsboro", {
                get: /**
                * Returns a Color object set to the color named color Gainsboro.
                */
                function () {
                    return Color._namedColors.gainsboro.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "GhostWhite", {
                get: /**
                * Returns a Color object set to the color named color GhostWhite.
                */
                function () {
                    return Color._namedColors.ghostwhite.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Gold", {
                get: /**
                * Returns a Color object set to the color named color Gold.
                */
                function () {
                    return Color._namedColors.gold.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "GoldenRod", {
                get: /**
                * Returns a Color object set to the color named color GoldenRod.
                */
                function () {
                    return Color._namedColors.goldenrod.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Gray", {
                get: /**
                * Returns a Color object set to the color named color Gray.
                */
                function () {
                    return Color._namedColors.gray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Green", {
                get: /**
                * Returns a Color object set to the color named color Green.
                */
                function () {
                    return Color._namedColors.green.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "GreenYellow", {
                get: /**
                * Returns a Color object set to the color named color GreenYellow.
                */
                function () {
                    return Color._namedColors.greenyellow.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "HoneyDew", {
                get: /**
                * Returns a Color object set to the color named color HoneyDew.
                */
                function () {
                    return Color._namedColors.honeydew.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "HotPink", {
                get: /**
                * Returns a Color object set to the color named color HotPink.
                */
                function () {
                    return Color._namedColors.hotpink.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "IndianRed", {
                get: /**
                * Returns a Color object set to the color named color IndianRed.
                */
                function () {
                    return Color._namedColors.indianred.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Indigo", {
                get: /**
                * Returns a Color object set to the color named color Indigo.
                */
                function () {
                    return Color._namedColors.indigo.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Ivory", {
                get: /**
                * Returns a Color object set to the color named color Ivory.
                */
                function () {
                    return Color._namedColors.ivory.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Khaki", {
                get: /**
                * Returns a Color object set to the color named color Khaki.
                */
                function () {
                    return Color._namedColors.khaki.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Lavender", {
                get: /**
                * Returns a Color object set to the color named color Lavender.
                */
                function () {
                    return Color._namedColors.lavender.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LavenderBlush", {
                get: /**
                * Returns a Color object set to the color named color LavenderBlush.
                */
                function () {
                    return Color._namedColors.lavenderblush.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LawnGreen", {
                get: /**
                * Returns a Color object set to the color named color LawnGreen.
                */
                function () {
                    return Color._namedColors.lawngreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LemonChiffon", {
                get: /**
                * Returns a Color object set to the color named color LemonChiffon.
                */
                function () {
                    return Color._namedColors.lemonchiffon.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightBlue", {
                get: /**
                * Returns a Color object set to the color named color LightBlue.
                */
                function () {
                    return Color._namedColors.lightblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightCoral", {
                get: /**
                * Returns a Color object set to the color named color LightCoral.
                */
                function () {
                    return Color._namedColors.lightcoral.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightCyan", {
                get: /**
                * Returns a Color object set to the color named color LightCyan.
                */
                function () {
                    return Color._namedColors.lightcyan.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightGoldenRodYellow", {
                get: /**
                * Returns a Color object set to the color named color LightGoldenRodYellow.
                */
                function () {
                    return Color._namedColors.lightgoldenrodyellow.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightGray", {
                get: /**
                * Returns a Color object set to the color named color LightGray.
                */
                function () {
                    return Color._namedColors.lightgray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightGrey", {
                get: /**
                * Returns a Color object set to the color named color LightGrey.
                */
                function () {
                    return Color._namedColors.lightgrey.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightGreen", {
                get: /**
                * Returns a Color object set to the color named color LightGreen.
                */
                function () {
                    return Color._namedColors.lightgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightPink", {
                get: /**
                * Returns a Color object set to the color named color LightPink.
                */
                function () {
                    return Color._namedColors.lightpink.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightSalmon", {
                get: /**
                * Returns a Color object set to the color named color LightSalmon.
                */
                function () {
                    return Color._namedColors.lightsalmon.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightSeaGreen", {
                get: /**
                * Returns a Color object set to the color named color LightSeaGreen.
                */
                function () {
                    return Color._namedColors.lightseagreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightSkyBlue", {
                get: /**
                * Returns a Color object set to the color named color LightSkyBlue.
                */
                function () {
                    return Color._namedColors.lightskyblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightSlateGray", {
                get: /**
                * Returns a Color object set to the color named color LightSlateGray.
                */
                function () {
                    return Color._namedColors.lightslategray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightSteelBlue", {
                get: /**
                * Returns a Color object set to the color named color LightSteelBlue.
                */
                function () {
                    return Color._namedColors.lightsteelblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightYellow", {
                get: /**
                * Returns a Color object set to the color named color LightYellow.
                */
                function () {
                    return Color._namedColors.lightyellow.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Lime", {
                get: /**
                * Returns a Color object set to the color named color Lime.
                */
                function () {
                    return Color._namedColors.lime.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LimeGreen", {
                get: /**
                * Returns a Color object set to the color named color LimeGreen.
                */
                function () {
                    return Color._namedColors.limegreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Linen", {
                get: /**
                * Returns a Color object set to the color named color Linen.
                */
                function () {
                    return Color._namedColors.linen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Magenta", {
                get: /**
                * Returns a Color object set to the color named color Magenta.
                */
                function () {
                    return Color._namedColors.magenta.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Maroon", {
                get: /**
                * Returns a Color object set to the color named color Maroon.
                */
                function () {
                    return Color._namedColors.maroon.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumAquaMarine", {
                get: /**
                * Returns a Color object set to the color named color MediumAquaMarine.
                */
                function () {
                    return Color._namedColors.mediumaquamarine.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumBlue", {
                get: /**
                * Returns a Color object set to the color named color MediumBlue.
                */
                function () {
                    return Color._namedColors.mediumblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumOrchid", {
                get: /**
                * Returns a Color object set to the color named color MediumOrchid.
                */
                function () {
                    return Color._namedColors.mediumorchid.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumPurple", {
                get: /**
                * Returns a Color object set to the color named color MediumPurple.
                */
                function () {
                    return Color._namedColors.mediumpurple.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumSeaGreen", {
                get: /**
                * Returns a Color object set to the color named color MediumSeaGreen.
                */
                function () {
                    return Color._namedColors.mediumseagreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumSlateBlue", {
                get: /**
                * Returns a Color object set to the color named color MediumSlateBlue.
                */
                function () {
                    return Color._namedColors.mediumslateblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumSpringGreen", {
                get: /**
                * Returns a Color object set to the color named color MediumSpringGreen.
                */
                function () {
                    return Color._namedColors.mediumspringgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumTurquoise", {
                get: /**
                * Returns a Color object set to the color named color MediumTurquoise.
                */
                function () {
                    return Color._namedColors.mediumturquoise.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumVioletRed", {
                get: /**
                * Returns a Color object set to the color named color MediumVioletRed.
                */
                function () {
                    return Color._namedColors.mediumvioletred.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MidnightBlue", {
                get: /**
                * Returns a Color object set to the color named color MidnightBlue.
                */
                function () {
                    return Color._namedColors.midnightblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MintCream", {
                get: /**
                * Returns a Color object set to the color named color MintCream.
                */
                function () {
                    return Color._namedColors.mintcream.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MistyRose", {
                get: /**
                * Returns a Color object set to the color named color MistyRose.
                */
                function () {
                    return Color._namedColors.mistyrose.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Moccasin", {
                get: /**
                * Returns a Color object set to the color named color Moccasin.
                */
                function () {
                    return Color._namedColors.moccasin.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "NavajoWhite", {
                get: /**
                * Returns a Color object set to the color named color NavajoWhite.
                */
                function () {
                    return Color._namedColors.navajowhite.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Navy", {
                get: /**
                * Returns a Color object set to the color named color Navy.
                */
                function () {
                    return Color._namedColors.navy.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "OldLace", {
                get: /**
                * Returns a Color object set to the color named color OldLace.
                */
                function () {
                    return Color._namedColors.oldlace.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Olive", {
                get: /**
                * Returns a Color object set to the color named color Olive.
                */
                function () {
                    return Color._namedColors.olive.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "OliveDrab", {
                get: /**
                * Returns a Color object set to the color named color OliveDrab.
                */
                function () {
                    return Color._namedColors.olivedrab.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Orange", {
                get: /**
                * Returns a Color object set to the color named color Orange.
                */
                function () {
                    return Color._namedColors.orange.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "OrangeRed", {
                get: /**
                * Returns a Color object set to the color named color OrangeRed.
                */
                function () {
                    return Color._namedColors.orangered.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Orchid", {
                get: /**
                * Returns a Color object set to the color named color Orchid.
                */
                function () {
                    return Color._namedColors.orchid.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PaleGoldenRod", {
                get: /**
                * Returns a Color object set to the color named color PaleGoldenRod.
                */
                function () {
                    return Color._namedColors.palegoldenrod.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PaleGreen", {
                get: /**
                * Returns a Color object set to the color named color PaleGreen.
                */
                function () {
                    return Color._namedColors.palegreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PaleTurquoise", {
                get: /**
                * Returns a Color object set to the color named color PaleTurquoise.
                */
                function () {
                    return Color._namedColors.paleturquoise.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PaleVioletRed", {
                get: /**
                * Returns a Color object set to the color named color PaleVioletRed.
                */
                function () {
                    return Color._namedColors.palevioletred.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PapayaWhip", {
                get: /**
                * Returns a Color object set to the color named color PapayaWhip.
                */
                function () {
                    return Color._namedColors.papayawhip.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PeachPuff", {
                get: /**
                * Returns a Color object set to the color named color PeachPuff.
                */
                function () {
                    return Color._namedColors.peachpuff.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Peru", {
                get: /**
                * Returns a Color object set to the color named color Peru.
                */
                function () {
                    return Color._namedColors.peru.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Pink", {
                get: /**
                * Returns a Color object set to the color named color Pink.
                */
                function () {
                    return Color._namedColors.pink.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Plum", {
                get: /**
                * Returns a Color object set to the color named color Plum.
                */
                function () {
                    return Color._namedColors.plum.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PowderBlue", {
                get: /**
                * Returns a Color object set to the color named color PowderBlue.
                */
                function () {
                    return Color._namedColors.powderblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Purple", {
                get: /**
                * Returns a Color object set to the color named color Purple.
                */
                function () {
                    return Color._namedColors.purple.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Red", {
                get: /**
                * Returns a Color object set to the color named color Red.
                */
                function () {
                    return Color._namedColors.red.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "RosyBrown", {
                get: /**
                * Returns a Color object set to the color named color RosyBrown.
                */
                function () {
                    return Color._namedColors.rosybrown.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "RoyalBlue", {
                get: /**
                * Returns a Color object set to the color named color RoyalBlue.
                */
                function () {
                    return Color._namedColors.royalblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SaddleBrown", {
                get: /**
                * Returns a Color object set to the color named color SaddleBrown.
                */
                function () {
                    return Color._namedColors.saddlebrown.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Salmon", {
                get: /**
                * Returns a Color object set to the color named color Salmon.
                */
                function () {
                    return Color._namedColors.salmon.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SandyBrown", {
                get: /**
                * Returns a Color object set to the color named color SandyBrown.
                */
                function () {
                    return Color._namedColors.sandybrown.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SeaGreen", {
                get: /**
                * Returns a Color object set to the color named color SeaGreen.
                */
                function () {
                    return Color._namedColors.seagreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SeaShell", {
                get: /**
                * Returns a Color object set to the color named color SeaShell.
                */
                function () {
                    return Color._namedColors.seashell.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Sienna", {
                get: /**
                * Returns a Color object set to the color named color Sienna.
                */
                function () {
                    return Color._namedColors.sienna.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Silver", {
                get: /**
                * Returns a Color object set to the color named color Silver.
                */
                function () {
                    return Color._namedColors.silver.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SkyBlue", {
                get: /**
                * Returns a Color object set to the color named color SkyBlue.
                */
                function () {
                    return Color._namedColors.skyblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SlateBlue", {
                get: /**
                * Returns a Color object set to the color named color SlateBlue.
                */
                function () {
                    return Color._namedColors.slateblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SlateGray", {
                get: /**
                * Returns a Color object set to the color named color SlateGray.
                */
                function () {
                    return Color._namedColors.slategray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Snow", {
                get: /**
                * Returns a Color object set to the color named color Snow.
                */
                function () {
                    return Color._namedColors.snow.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SpringGreen", {
                get: /**
                * Returns a Color object set to the color named color SpringGreen.
                */
                function () {
                    return Color._namedColors.springgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SteelBlue", {
                get: /**
                * Returns a Color object set to the color named color SteelBlue.
                */
                function () {
                    return Color._namedColors.steelblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Tan", {
                get: /**
                * Returns a Color object set to the color named color Tan.
                */
                function () {
                    return Color._namedColors.tan.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Teal", {
                get: /**
                * Returns a Color object set to the color named color Teal.
                */
                function () {
                    return Color._namedColors.teal.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Thistle", {
                get: /**
                * Returns a Color object set to the color named color Thistle.
                */
                function () {
                    return Color._namedColors.thistle.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Tomato", {
                get: /**
                * Returns a Color object set to the color named color Tomato.
                */
                function () {
                    return Color._namedColors.tomato.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Turquoise", {
                get: /**
                * Returns a Color object set to the color named color Turquoise.
                */
                function () {
                    return Color._namedColors.turquoise.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Violet", {
                get: /**
                * Returns a Color object set to the color named color Violet.
                */
                function () {
                    return Color._namedColors.violet.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Wheat", {
                get: /**
                * Returns a Color object set to the color named color Wheat.
                */
                function () {
                    return Color._namedColors.wheat.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "White", {
                get: /**
                * Returns a Color object set to the color named color White.
                */
                function () {
                    return Color._namedColors.white.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "WhiteSmoke", {
                get: /**
                * Returns a Color object set to the color named color WhiteSmoke.
                */
                function () {
                    return Color._namedColors.whitesmoke.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Yellow", {
                get: /**
                * Returns a Color object set to the color named color Yellow.
                */
                function () {
                    return Color._namedColors.yellow.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "YellowGreen", {
                get: /**
                * Returns a Color object set to the color named color YellowGreen.
                */
                function () {
                    return Color._namedColors.yellowgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Returns a copy of the color with the current color channels.
            */
            Color.prototype.Clone = function () {
                return new Color(this.R, this.G, this.B, this.A);
            };

            /**
            * Disposes the Color object and unbinds any active event bindings.
            */
            Color.prototype.Dispose = function () {
                this._onChange.Dispose();
            };

            /**
            * toString override that returns the Color in the "rgba(r,g,b,a)" format.
            */
            Color.prototype.toString = function () {
                if (this._cached === undefined) {
                    this._cached = 'rgba(' + this.R + ',' + this.G + ',' + this.B + ',' + this.A + ')';
                }
                return this._cached;
            };
            Color.RgbaHexRegExp = /^([a-f\d])([a-f\d])([a-f\d])([a-f\d])$/i;

            Color.RgbRegExp = /^(argb|rgb|rgba)\s*\(\s*([\d+(\.\d+)]{0,3})\s*,\s*([\d]{0,3})\s*,\s*([\d]{0,3})\s*(?:,\s*([\d+(\.\d+)]{0,3})\s*)?\s*\)$/i;

            Color.RgbaRegExp = /^([a-f\d])([a-f\d])([a-f\d])$/i;

            Color._namedColors = {
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
            return Color;
        })();
        Graphics.Color = Color;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
