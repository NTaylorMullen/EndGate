using System;

namespace EndGate.Core.Net.Assets
{
    public class Vector2d
    {
        public Vector2d()
            : this(0, 0)
        {
        }

        public Vector2d(double x, double y)
        {
            X = x;
            Y = y;
        }

        public double X { get; set; }
        public double Y { get; set; }

        public Vector2d ProjectOnto(Vector2d v)
        {
            return (this.Dot(v) / v.Dot(v)) * v;
        }

        public Vector2d RotateAround(Vector2d point, double angle, int precision = 2)
        {
            var ca = Math.Cos(angle);
            var sa = Math.Sin(angle);

            return new Vector2d(
                Math.Round(ca * (X - point.X) - sa * (Y - point.Y) + point.X, precision),
                Math.Round(sa * (X - point.X) + ca * (Y - point.Y) + point.Y, precision)
            );
        }

        public void Apply(Func<double, double> action)
        {
            X = action(X);
            Y = action(Y);
        }

        public void Trigger(Action<double> action)
        {
            action(X);
            action(Y);
        }

        public bool Equivalent(Vector2d v1)
        {
            return v1.X == X && v1.Y == Y;
        }

        public bool IsZero() {
            return this.X == 0 && this.Y == 0;
        }

        /// <summary>
        /// Clones the vector2
        /// </summary>
        /// <returns>A new Vector2s</returns>
        public Vector2d Clone()
        {
            return new Vector2d(X, Y);
        }

        /// <summary>
        /// Creates a Normalized copy of the current Vector2
        /// </summary>
        /// <returns>A new Vector2</returns>
        public Vector2d Normalized()
        {
            var magnitude = Magnitude();
            return new Vector2d(X / magnitude, Y / magnitude);
        }

        /// <summary>
        /// Calculates the magnitude of the Vector2 (X*X + Y*Y)^.5
        /// </summary>
        /// <returns>A new Vector2</returns>
        public double Magnitude()
        {
            return Math.Sqrt(X * X + Y * Y);
        }

        /// <summary>
        /// Equivalent to Magnitude()
        /// </summary>
        /// <returns>A new Vector2</returns>
        public double Length()
        {
            return Magnitude();
        }

        /// <summary>
        /// Calculates the Dot product of the current vector and the one provided
        /// </summary>
        /// <param name="v1">Vector to dot product with</param>
        /// <returns>Dot product</returns>
        public double Dot(Vector2d v1)
        {
            return v1.X * X + v1.Y * Y;
        }

        /// <summary>
        /// Returns a new vector2 which has Math.Abs(X) and Math.Abs(Y) values
        /// </summary>
        /// <returns>A new Vector2</returns>
        public Vector2d Abs()
        {
            return new Vector2d(Math.Abs(X), Math.Abs(Y));
        }

        /// <summary>
        /// Calculates the Sign of the vector (X/|X|, Y/|Y|)
        /// </summary>
        /// <returns>A new Vector2</returns>
        public Vector2d Sign()
        {
            return new Vector2d(X / Math.Abs(X), Y / Math.Abs(Y));
        }

        public Vector2d Distance(Vector2d v1)
        {
            return new Vector2d(Math.Abs(v1.X - X), Math.Abs(v1.Y - Y));
        }

        public Vector2d Add(Number val)
        {
            return this + val;
        }

        public Vector2d Add(Vector2d v1)
        {
            return this + v1;
        }

        public Vector2d Subtract(Number val)
        {
            return this - val;
        }

        public Vector2d SubtractFrom(Number val)
        {
            return val - this;
        }

        public Vector2d Subtract(Vector2d v1)
        {
            return this - v1;
        }

        public Vector2d Multiply(Vector2d v1)
        {
            return this * v1;
        }

        public Vector2d Multiply(Number val)
        {
            return this * val;
        }

        public Vector2d Divide(Number val)
        {
            return this / val;
        }

        public Vector2d DivideFrom(Number val)
        {
            return val / this;
        }

        public Vector2d Divide(Vector2d v1)
        {
            return this / v1;
        }

        public Vector2d Negate()
        {
            return this * -1;
        }

        public static Vector2d operator +(Vector2d v1, Vector2d v2)
        {
            return new Vector2d(v1.X + v2.X, v1.Y + v2.Y);
        }

        public static Vector2d operator +(Vector2d v1, Number val)
        {
            return new Vector2d(v1.X + val, v1.Y + val);
        }

        public static Vector2d operator +(Number val, Vector2d v1)
        {
            return v1 + val;
        }

        public static Vector2d operator -(Vector2d v1, Vector2d v2)
        {
            return new Vector2d(v1.X - v2.X, v1.Y - v2.Y);
        }

        public static Vector2d operator -(Vector2d v1, Number val)
        {
            return new Vector2d(v1.X - val, v1.Y - val);
        }

        public static Vector2d operator -(Number val, Vector2d v1)
        {
            return new Vector2d(val - v1.X, val - v1.Y);
        }

        public static Vector2d operator *(Vector2d v1, Vector2d v2)
        {
            return new Vector2d(v1.X * v2.X, v1.Y * v2.Y);
        }

        public static Vector2d operator *(Vector2d v1, Number val)
        {
            return new Vector2d(v1.X * val, v1.Y * val);
        }

        public static Vector2d operator *(Number val, Vector2d v1)
        {
            return v1 * val;
        }

        public static Vector2d operator /(Vector2d v1, Vector2d v2)
        {
            return new Vector2d(v1.X / v2.X, v1.Y / v2.Y);
        }

        public static Vector2d operator /(Vector2d v1, Number val)
        {
            return new Vector2d(v1.X / val, v1.Y / val);
        }

        public static Vector2d operator /(Number val, Vector2d v1)
        {
            return new Vector2d(val / v1.X, val / v1.Y);
        }

        public static Vector2d operator -(Vector2d v1)
        {
            return v1 * -1;
        }

        public static Vector2d operator ++(Vector2d v1)
        {
            return v1 + 1;
        }

        public static Vector2d operator --(Vector2d v1)
        {
            return v1 - 1;
        }

        public static Vector2d Zero
        {
            get
            {
                return new Vector2d(0, 0);
            }
        }

        public static Vector2d One
        {
            get
            {
                return new Vector2d(1,1);
            }
        }

        public override string ToString()
        {
            return "(" + X + ", " + Y + ")";
        }
    }
}
