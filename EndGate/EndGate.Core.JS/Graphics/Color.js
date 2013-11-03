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
                this._hexCached = undefined;
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
                /**
                * Gets an EventHandler that is triggered when the R, G, B, or A values of this Color change.
                */
                get: function () {
                    return this._onChange;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color.prototype, "R", {
                /**
                * Gets or sets the current red channel. Value must be an integer between 0 and 255 inclusive.
                */
                get: function () {
                    return this._r;
                },
                set: function (r) {
                    this._cached = this._hexCached = undefined;
                    this._r = Math.round(Math.min(Math.max(r, 0), 255));
                    this._onChange.Trigger(this);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color.prototype, "G", {
                /**
                * Gets or sets the current green channel. Value must be an integer between 0 and 255 inclusive.
                */
                get: function () {
                    return this._g;
                },
                set: function (g) {
                    this._cached = this._hexCached = undefined;
                    this._g = Math.round(Math.min(Math.max(g, 0), 255));
                    this._onChange.Trigger(this);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color.prototype, "B", {
                /**
                * Gets or sets the current blue channel. Value must be an integer between 0 and 255 inclusive.
                */
                get: function () {
                    return this._b;
                },
                set: function (b) {
                    this._cached = this._hexCached = undefined;
                    this._b = Math.round(Math.min(Math.max(b, 0), 255));
                    this._onChange.Trigger(this);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color.prototype, "A", {
                /**
                * Gets or sets the current alpha channel. Value must be between 0 and 1 inclusive.
                */
                get: function () {
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

            /**
            * Creates a new Color object with the specified RGB values.
            * @param r The red channel. Must be between 0 and 255 inclusive.
            * @param g The green channel. Must be between 0 and 255 inclusive.
            * @param b The blue channel. Must be between 0 and 255 inclusive.
            */
            Color.FromRGB = function (r, g, b) {
                return new Color(r, g, b);
            };

            /**
            * Creates a new Color object with the specified RGBA values.
            * @param r The red channel. Must be between 0 and 255 inclusive.
            * @param g The green channel. Must be between 0 and 255 inclusive.
            * @param b The blue channel. Must be between 0 and 255 inclusive.
            * @param a The alpha channel. Must be between 0 and 1 inclusive.
            */
            Color.FromRGBA = function (r, g, b, a) {
                return new Color(r, g, b, a);
            };

            /**
            * Creates a new Color object with the specified ARGB values.
            * @param a The alpha channel. Must be between 0 and 1 inclusive.
            * @param r The red channel. Must be between 0 and 255 inclusive.
            * @param g The green channel. Must be between 0 and 255 inclusive.
            * @param b The blue channel. Must be between 0 and 255 inclusive.
            */
            Color.FromARGB = function (a, r, g, b) {
                return new Color(r, g, b, a);
            };

            /**
            * Creates a new Color object from the specified hex assignment.
            * @param hex The hex based color code.
            */
            Color.FromHex = function (hex) {
                return new Color(hex);
            };

            /**
            * Creates a new Color object form the HTML5 named colors.
            * @param name The name of the HTML5 color to use.
            */
            Color.FromName = function (name) {
                return new Color(name);
            };

            //Converts a short hex string e.g. fff or cccc to the long version
            //e.g. ffffffff the alpha channel.
            Color.ConvertShortHexToLong = function (hex) {
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
                /**
                * Returns a transparent Color object.
                */
                get: function () {
                    return Color._namedColors.transparent.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "AliceBlue", {
                /**
                * Returns a Color object set to the color named color AliceBlue.
                */
                get: function () {
                    return Color._namedColors.aliceblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "AntiqueWhite", {
                /**
                * Returns a Color object set to the color named color AntiqueWhite.
                */
                get: function () {
                    return Color._namedColors.antiquewhite.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Aqua", {
                /**
                * Returns a Color object set to the color named color Aqua.
                */
                get: function () {
                    return Color._namedColors.aqua.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Aquamarine", {
                /**
                * Returns a Color object set to the color named color Aquamarine.
                */
                get: function () {
                    return Color._namedColors.aquamarine.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Azure", {
                /**
                * Returns a Color object set to the color named color Azure.
                */
                get: function () {
                    return Color._namedColors.azure.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Beige", {
                /**
                * Returns a Color object set to the color named color Beige.
                */
                get: function () {
                    return Color._namedColors.beige.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Bisque", {
                /**
                * Returns a Color object set to the color named color Bisque.
                */
                get: function () {
                    return Color._namedColors.bisque.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Black", {
                /**
                * Returns a Color object set to the color named color Black.
                */
                get: function () {
                    return Color._namedColors.black.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "BlanchedAlmond", {
                /**
                * Returns a Color object set to the color named color BlanchedAlmond.
                */
                get: function () {
                    return Color._namedColors.blanchedalmond.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Blue", {
                /**
                * Returns a Color object set to the color named color Blue.
                */
                get: function () {
                    return Color._namedColors.blue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "BlueViolet", {
                /**
                * Returns a Color object set to the color named color BlueViolet.
                */
                get: function () {
                    return Color._namedColors.blueviolet.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Brown", {
                /**
                * Returns a Color object set to the color named color Brown.
                */
                get: function () {
                    return Color._namedColors.brown.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "BurlyWood", {
                /**
                * Returns a Color object set to the color named color BurlyWood.
                */
                get: function () {
                    return Color._namedColors.burlywood.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "CadetBlue", {
                /**
                * Returns a Color object set to the color named color CadetBlue.
                */
                get: function () {
                    return Color._namedColors.cadetblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Chartreuse", {
                /**
                * Returns a Color object set to the color named color Chartreuse.
                */
                get: function () {
                    return Color._namedColors.chartreuse.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Chocolate", {
                /**
                * Returns a Color object set to the color named color Chocolate.
                */
                get: function () {
                    return Color._namedColors.chocolate.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Coral", {
                /**
                * Returns a Color object set to the color named color Coral.
                */
                get: function () {
                    return Color._namedColors.coral.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "CornflowerBlue", {
                /**
                * Returns a Color object set to the color named color CornflowerBlue.
                */
                get: function () {
                    return Color._namedColors.cornflowerblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Cornsilk", {
                /**
                * Returns a Color object set to the color named color Cornsilk.
                */
                get: function () {
                    return Color._namedColors.cornsilk.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Crimson", {
                /**
                * Returns a Color object set to the color named color Crimson.
                */
                get: function () {
                    return Color._namedColors.crimson.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Cyan", {
                /**
                * Returns a Color object set to the color named color Cyan.
                */
                get: function () {
                    return Color._namedColors.cyan.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkBlue", {
                /**
                * Returns a Color object set to the color named color DarkBlue.
                */
                get: function () {
                    return Color._namedColors.darkblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkCyan", {
                /**
                * Returns a Color object set to the color named color DarkCyan.
                */
                get: function () {
                    return Color._namedColors.darkcyan.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkGoldenRod", {
                /**
                * Returns a Color object set to the color named color DarkGoldenRod.
                */
                get: function () {
                    return Color._namedColors.darkgoldenrod.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkGray", {
                /**
                * Returns a Color object set to the color named color DarkGray.
                */
                get: function () {
                    return Color._namedColors.darkgray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkGreen", {
                /**
                * Returns a Color object set to the color named color DarkGreen.
                */
                get: function () {
                    return Color._namedColors.darkgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkKhaki", {
                /**
                * Returns a Color object set to the color named color DarkKhaki.
                */
                get: function () {
                    return Color._namedColors.darkkhaki.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkMagenta", {
                /**
                * Returns a Color object set to the color named color DarkMagenta.
                */
                get: function () {
                    return Color._namedColors.darkmagenta.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkOliveGreen", {
                /**
                * Returns a Color object set to the color named color DarkOliveGreen.
                */
                get: function () {
                    return Color._namedColors.darkolivegreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkOrange", {
                /**
                * Returns a Color object set to the color named color DarkOrange.
                */
                get: function () {
                    return Color._namedColors.darkorange.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkOrchid", {
                /**
                * Returns a Color object set to the color named color DarkOrchid.
                */
                get: function () {
                    return Color._namedColors.darkorchid.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkRed", {
                /**
                * Returns a Color object set to the color named color DarkRed.
                */
                get: function () {
                    return Color._namedColors.darkred.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkSalmon", {
                /**
                * Returns a Color object set to the color named color DarkSalmon.
                */
                get: function () {
                    return Color._namedColors.darksalmon.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkSeaGreen", {
                /**
                * Returns a Color object set to the color named color DarkSeaGreen.
                */
                get: function () {
                    return Color._namedColors.darkseagreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkSlateBlue", {
                /**
                * Returns a Color object set to the color named color DarkSlateBlue.
                */
                get: function () {
                    return Color._namedColors.darkslateblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkSlateGray", {
                /**
                * Returns a Color object set to the color named color DarkSlateGray.
                */
                get: function () {
                    return Color._namedColors.darkslategray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkTurquoise", {
                /**
                * Returns a Color object set to the color named color DarkTurquoise.
                */
                get: function () {
                    return Color._namedColors.darkturquoise.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DarkViolet", {
                /**
                * Returns a Color object set to the color named color DarkViolet.
                */
                get: function () {
                    return Color._namedColors.darkviolet.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DeepPink", {
                /**
                * Returns a Color object set to the color named color DeepPink.
                */
                get: function () {
                    return Color._namedColors.deeppink.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DeepSkyBlue", {
                /**
                * Returns a Color object set to the color named color DeepSkyBlue.
                */
                get: function () {
                    return Color._namedColors.deepskyblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DimGray", {
                /**
                * Returns a Color object set to the color named color DimGray.
                */
                get: function () {
                    return Color._namedColors.dimgray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "DodgerBlue", {
                /**
                * Returns a Color object set to the color named color DodgerBlue.
                */
                get: function () {
                    return Color._namedColors.dodgerblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "FireBrick", {
                /**
                * Returns a Color object set to the color named color FireBrick.
                */
                get: function () {
                    return Color._namedColors.firebrick.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "FloralWhite", {
                /**
                * Returns a Color object set to the color named color FloralWhite.
                */
                get: function () {
                    return Color._namedColors.floralwhite.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "ForestGreen", {
                /**
                * Returns a Color object set to the color named color ForestGreen.
                */
                get: function () {
                    return Color._namedColors.forestgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Fuchsia", {
                /**
                * Returns a Color object set to the color named color Fuchsia.
                */
                get: function () {
                    return Color._namedColors.fuchsia.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Gainsboro", {
                /**
                * Returns a Color object set to the color named color Gainsboro.
                */
                get: function () {
                    return Color._namedColors.gainsboro.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "GhostWhite", {
                /**
                * Returns a Color object set to the color named color GhostWhite.
                */
                get: function () {
                    return Color._namedColors.ghostwhite.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Gold", {
                /**
                * Returns a Color object set to the color named color Gold.
                */
                get: function () {
                    return Color._namedColors.gold.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "GoldenRod", {
                /**
                * Returns a Color object set to the color named color GoldenRod.
                */
                get: function () {
                    return Color._namedColors.goldenrod.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Gray", {
                /**
                * Returns a Color object set to the color named color Gray.
                */
                get: function () {
                    return Color._namedColors.gray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Green", {
                /**
                * Returns a Color object set to the color named color Green.
                */
                get: function () {
                    return Color._namedColors.green.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "GreenYellow", {
                /**
                * Returns a Color object set to the color named color GreenYellow.
                */
                get: function () {
                    return Color._namedColors.greenyellow.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "HoneyDew", {
                /**
                * Returns a Color object set to the color named color HoneyDew.
                */
                get: function () {
                    return Color._namedColors.honeydew.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "HotPink", {
                /**
                * Returns a Color object set to the color named color HotPink.
                */
                get: function () {
                    return Color._namedColors.hotpink.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "IndianRed", {
                /**
                * Returns a Color object set to the color named color IndianRed.
                */
                get: function () {
                    return Color._namedColors.indianred.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Indigo", {
                /**
                * Returns a Color object set to the color named color Indigo.
                */
                get: function () {
                    return Color._namedColors.indigo.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Ivory", {
                /**
                * Returns a Color object set to the color named color Ivory.
                */
                get: function () {
                    return Color._namedColors.ivory.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Khaki", {
                /**
                * Returns a Color object set to the color named color Khaki.
                */
                get: function () {
                    return Color._namedColors.khaki.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Lavender", {
                /**
                * Returns a Color object set to the color named color Lavender.
                */
                get: function () {
                    return Color._namedColors.lavender.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LavenderBlush", {
                /**
                * Returns a Color object set to the color named color LavenderBlush.
                */
                get: function () {
                    return Color._namedColors.lavenderblush.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LawnGreen", {
                /**
                * Returns a Color object set to the color named color LawnGreen.
                */
                get: function () {
                    return Color._namedColors.lawngreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LemonChiffon", {
                /**
                * Returns a Color object set to the color named color LemonChiffon.
                */
                get: function () {
                    return Color._namedColors.lemonchiffon.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightBlue", {
                /**
                * Returns a Color object set to the color named color LightBlue.
                */
                get: function () {
                    return Color._namedColors.lightblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightCoral", {
                /**
                * Returns a Color object set to the color named color LightCoral.
                */
                get: function () {
                    return Color._namedColors.lightcoral.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightCyan", {
                /**
                * Returns a Color object set to the color named color LightCyan.
                */
                get: function () {
                    return Color._namedColors.lightcyan.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightGoldenRodYellow", {
                /**
                * Returns a Color object set to the color named color LightGoldenRodYellow.
                */
                get: function () {
                    return Color._namedColors.lightgoldenrodyellow.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightGray", {
                /**
                * Returns a Color object set to the color named color LightGray.
                */
                get: function () {
                    return Color._namedColors.lightgray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightGrey", {
                /**
                * Returns a Color object set to the color named color LightGrey.
                */
                get: function () {
                    return Color._namedColors.lightgrey.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightGreen", {
                /**
                * Returns a Color object set to the color named color LightGreen.
                */
                get: function () {
                    return Color._namedColors.lightgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightPink", {
                /**
                * Returns a Color object set to the color named color LightPink.
                */
                get: function () {
                    return Color._namedColors.lightpink.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightSalmon", {
                /**
                * Returns a Color object set to the color named color LightSalmon.
                */
                get: function () {
                    return Color._namedColors.lightsalmon.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightSeaGreen", {
                /**
                * Returns a Color object set to the color named color LightSeaGreen.
                */
                get: function () {
                    return Color._namedColors.lightseagreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightSkyBlue", {
                /**
                * Returns a Color object set to the color named color LightSkyBlue.
                */
                get: function () {
                    return Color._namedColors.lightskyblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightSlateGray", {
                /**
                * Returns a Color object set to the color named color LightSlateGray.
                */
                get: function () {
                    return Color._namedColors.lightslategray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightSteelBlue", {
                /**
                * Returns a Color object set to the color named color LightSteelBlue.
                */
                get: function () {
                    return Color._namedColors.lightsteelblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LightYellow", {
                /**
                * Returns a Color object set to the color named color LightYellow.
                */
                get: function () {
                    return Color._namedColors.lightyellow.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Lime", {
                /**
                * Returns a Color object set to the color named color Lime.
                */
                get: function () {
                    return Color._namedColors.lime.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "LimeGreen", {
                /**
                * Returns a Color object set to the color named color LimeGreen.
                */
                get: function () {
                    return Color._namedColors.limegreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Linen", {
                /**
                * Returns a Color object set to the color named color Linen.
                */
                get: function () {
                    return Color._namedColors.linen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Magenta", {
                /**
                * Returns a Color object set to the color named color Magenta.
                */
                get: function () {
                    return Color._namedColors.magenta.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Maroon", {
                /**
                * Returns a Color object set to the color named color Maroon.
                */
                get: function () {
                    return Color._namedColors.maroon.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumAquaMarine", {
                /**
                * Returns a Color object set to the color named color MediumAquaMarine.
                */
                get: function () {
                    return Color._namedColors.mediumaquamarine.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumBlue", {
                /**
                * Returns a Color object set to the color named color MediumBlue.
                */
                get: function () {
                    return Color._namedColors.mediumblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumOrchid", {
                /**
                * Returns a Color object set to the color named color MediumOrchid.
                */
                get: function () {
                    return Color._namedColors.mediumorchid.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumPurple", {
                /**
                * Returns a Color object set to the color named color MediumPurple.
                */
                get: function () {
                    return Color._namedColors.mediumpurple.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumSeaGreen", {
                /**
                * Returns a Color object set to the color named color MediumSeaGreen.
                */
                get: function () {
                    return Color._namedColors.mediumseagreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumSlateBlue", {
                /**
                * Returns a Color object set to the color named color MediumSlateBlue.
                */
                get: function () {
                    return Color._namedColors.mediumslateblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumSpringGreen", {
                /**
                * Returns a Color object set to the color named color MediumSpringGreen.
                */
                get: function () {
                    return Color._namedColors.mediumspringgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumTurquoise", {
                /**
                * Returns a Color object set to the color named color MediumTurquoise.
                */
                get: function () {
                    return Color._namedColors.mediumturquoise.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MediumVioletRed", {
                /**
                * Returns a Color object set to the color named color MediumVioletRed.
                */
                get: function () {
                    return Color._namedColors.mediumvioletred.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MidnightBlue", {
                /**
                * Returns a Color object set to the color named color MidnightBlue.
                */
                get: function () {
                    return Color._namedColors.midnightblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MintCream", {
                /**
                * Returns a Color object set to the color named color MintCream.
                */
                get: function () {
                    return Color._namedColors.mintcream.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "MistyRose", {
                /**
                * Returns a Color object set to the color named color MistyRose.
                */
                get: function () {
                    return Color._namedColors.mistyrose.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Moccasin", {
                /**
                * Returns a Color object set to the color named color Moccasin.
                */
                get: function () {
                    return Color._namedColors.moccasin.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "NavajoWhite", {
                /**
                * Returns a Color object set to the color named color NavajoWhite.
                */
                get: function () {
                    return Color._namedColors.navajowhite.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Navy", {
                /**
                * Returns a Color object set to the color named color Navy.
                */
                get: function () {
                    return Color._namedColors.navy.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "OldLace", {
                /**
                * Returns a Color object set to the color named color OldLace.
                */
                get: function () {
                    return Color._namedColors.oldlace.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Olive", {
                /**
                * Returns a Color object set to the color named color Olive.
                */
                get: function () {
                    return Color._namedColors.olive.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "OliveDrab", {
                /**
                * Returns a Color object set to the color named color OliveDrab.
                */
                get: function () {
                    return Color._namedColors.olivedrab.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Orange", {
                /**
                * Returns a Color object set to the color named color Orange.
                */
                get: function () {
                    return Color._namedColors.orange.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "OrangeRed", {
                /**
                * Returns a Color object set to the color named color OrangeRed.
                */
                get: function () {
                    return Color._namedColors.orangered.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Orchid", {
                /**
                * Returns a Color object set to the color named color Orchid.
                */
                get: function () {
                    return Color._namedColors.orchid.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PaleGoldenRod", {
                /**
                * Returns a Color object set to the color named color PaleGoldenRod.
                */
                get: function () {
                    return Color._namedColors.palegoldenrod.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PaleGreen", {
                /**
                * Returns a Color object set to the color named color PaleGreen.
                */
                get: function () {
                    return Color._namedColors.palegreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PaleTurquoise", {
                /**
                * Returns a Color object set to the color named color PaleTurquoise.
                */
                get: function () {
                    return Color._namedColors.paleturquoise.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PaleVioletRed", {
                /**
                * Returns a Color object set to the color named color PaleVioletRed.
                */
                get: function () {
                    return Color._namedColors.palevioletred.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PapayaWhip", {
                /**
                * Returns a Color object set to the color named color PapayaWhip.
                */
                get: function () {
                    return Color._namedColors.papayawhip.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PeachPuff", {
                /**
                * Returns a Color object set to the color named color PeachPuff.
                */
                get: function () {
                    return Color._namedColors.peachpuff.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Peru", {
                /**
                * Returns a Color object set to the color named color Peru.
                */
                get: function () {
                    return Color._namedColors.peru.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Pink", {
                /**
                * Returns a Color object set to the color named color Pink.
                */
                get: function () {
                    return Color._namedColors.pink.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Plum", {
                /**
                * Returns a Color object set to the color named color Plum.
                */
                get: function () {
                    return Color._namedColors.plum.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "PowderBlue", {
                /**
                * Returns a Color object set to the color named color PowderBlue.
                */
                get: function () {
                    return Color._namedColors.powderblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Purple", {
                /**
                * Returns a Color object set to the color named color Purple.
                */
                get: function () {
                    return Color._namedColors.purple.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Red", {
                /**
                * Returns a Color object set to the color named color Red.
                */
                get: function () {
                    return Color._namedColors.red.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "RosyBrown", {
                /**
                * Returns a Color object set to the color named color RosyBrown.
                */
                get: function () {
                    return Color._namedColors.rosybrown.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "RoyalBlue", {
                /**
                * Returns a Color object set to the color named color RoyalBlue.
                */
                get: function () {
                    return Color._namedColors.royalblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SaddleBrown", {
                /**
                * Returns a Color object set to the color named color SaddleBrown.
                */
                get: function () {
                    return Color._namedColors.saddlebrown.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Salmon", {
                /**
                * Returns a Color object set to the color named color Salmon.
                */
                get: function () {
                    return Color._namedColors.salmon.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SandyBrown", {
                /**
                * Returns a Color object set to the color named color SandyBrown.
                */
                get: function () {
                    return Color._namedColors.sandybrown.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SeaGreen", {
                /**
                * Returns a Color object set to the color named color SeaGreen.
                */
                get: function () {
                    return Color._namedColors.seagreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SeaShell", {
                /**
                * Returns a Color object set to the color named color SeaShell.
                */
                get: function () {
                    return Color._namedColors.seashell.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Sienna", {
                /**
                * Returns a Color object set to the color named color Sienna.
                */
                get: function () {
                    return Color._namedColors.sienna.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Silver", {
                /**
                * Returns a Color object set to the color named color Silver.
                */
                get: function () {
                    return Color._namedColors.silver.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SkyBlue", {
                /**
                * Returns a Color object set to the color named color SkyBlue.
                */
                get: function () {
                    return Color._namedColors.skyblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SlateBlue", {
                /**
                * Returns a Color object set to the color named color SlateBlue.
                */
                get: function () {
                    return Color._namedColors.slateblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SlateGray", {
                /**
                * Returns a Color object set to the color named color SlateGray.
                */
                get: function () {
                    return Color._namedColors.slategray.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Snow", {
                /**
                * Returns a Color object set to the color named color Snow.
                */
                get: function () {
                    return Color._namedColors.snow.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SpringGreen", {
                /**
                * Returns a Color object set to the color named color SpringGreen.
                */
                get: function () {
                    return Color._namedColors.springgreen.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "SteelBlue", {
                /**
                * Returns a Color object set to the color named color SteelBlue.
                */
                get: function () {
                    return Color._namedColors.steelblue.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Tan", {
                /**
                * Returns a Color object set to the color named color Tan.
                */
                get: function () {
                    return Color._namedColors.tan.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Teal", {
                /**
                * Returns a Color object set to the color named color Teal.
                */
                get: function () {
                    return Color._namedColors.teal.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Thistle", {
                /**
                * Returns a Color object set to the color named color Thistle.
                */
                get: function () {
                    return Color._namedColors.thistle.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Tomato", {
                /**
                * Returns a Color object set to the color named color Tomato.
                */
                get: function () {
                    return Color._namedColors.tomato.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Turquoise", {
                /**
                * Returns a Color object set to the color named color Turquoise.
                */
                get: function () {
                    return Color._namedColors.turquoise.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Violet", {
                /**
                * Returns a Color object set to the color named color Violet.
                */
                get: function () {
                    return Color._namedColors.violet.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Wheat", {
                /**
                * Returns a Color object set to the color named color Wheat.
                */
                get: function () {
                    return Color._namedColors.wheat.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "White", {
                /**
                * Returns a Color object set to the color named color White.
                */
                get: function () {
                    return Color._namedColors.white.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "WhiteSmoke", {
                /**
                * Returns a Color object set to the color named color WhiteSmoke.
                */
                get: function () {
                    return Color._namedColors.whitesmoke.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "Yellow", {
                /**
                * Returns a Color object set to the color named color Yellow.
                */
                get: function () {
                    return Color._namedColors.yellow.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Color, "YellowGreen", {
                /**
                * Returns a Color object set to the color named color YellowGreen.
                */
                get: function () {
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

            /**
            * Returns the Color in the "#rrggbb" format.
            */
            Color.prototype.toHexString = function () {
                if (this._hexCached === undefined) {
                    this._hexCached = "#" + this.ComponentToHex(this.R) + this.ComponentToHex(this.G) + this.ComponentToHex(this.B);
                }

                return this._hexCached;
            };

            /**
            * Returns the Color in the hexadecimal numeric format.
            */
            Color.prototype.toHexValue = function () {
                return parseInt(this.toHexString().substring(1), 16);
            };

            Color.prototype.ComponentToHex = function (value) {
                var hex = value.toString(16);

                return hex.length === 1 ? "0" + hex : hex;
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
