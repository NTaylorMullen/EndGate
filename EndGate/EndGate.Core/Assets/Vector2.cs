using System;

namespace EndGate.Core
{
    public partial class Vector2
    {
        public Vector2(double x, double y)
        {
            X = x;
            Y = y;
        }

        public double X { get; set; }
        public double Y { get; set; }

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

        public bool Equivalent(Vector2 v1)
        {
            return v1.X == X && v1.Y == Y;
        }

        /// <summary>
        /// Clones the vector2
        /// </summary>
        /// <returns>A new Vector2s</returns>
        public Vector2 Clone()
        {
            return new Vector2(X, Y);
        }

        /// <summary>
        /// Creates a Normalized copy of the current Vector2
        /// </summary>
        /// <returns>A new Vector2</returns>
        public Vector2 Normalized()
        {
            var magnitude = Magnitude();
            return new Vector2(X / magnitude, Y / magnitude);
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
        public double Dot(Vector2 v1)
        {
            return v1.X * X + v1.Y * Y;
        }

        /// <summary>
        /// Returns a new vector2 which has Math.Abs(X) and Math.Abs(Y) values
        /// </summary>
        /// <returns>A new Vector2</returns>
        public Vector2 Abs()
        {
            return new Vector2(Math.Abs(X), Math.Abs(Y));
        }

        /// <summary>
        /// Calculates the Sign of the vector (X/|X|, Y/|Y|)
        /// </summary>
        /// <returns>A new Vector2</returns>
        public Vector2 Sign()
        {
            return new Vector2(X / Math.Abs(X), Y / Math.Abs(Y));
        }

        public Vector2 Add(Number val)
        {
            return this + val;
        }

        public Vector2 Add(Vector2 v1)
        {
            return this + v1;
        }

        public Vector2 Subtract(Number val)
        {
            return this - val;
        }

        public Vector2 SubtractFrom(Number val)
        {
            return val - this;
        }

        public Vector2 Subtract(Vector2 v1)
        {
            return this - v1;
        }

        public Vector2 Multiply(Vector2 v1)
        {
            return this * v1;
        }

        public Vector2 Multiply(Number val)
        {
            return this * val;
        }

        public Vector2 Divide(Number val)
        {
            return this / val;
        }

        public Vector2 DivideFrom(Number val)
        {
            return val / this;
        }

        public Vector2 Divide(Vector2 v1)
        {
            return this / v1;
        }

        public static Vector2 operator +(Vector2 v1, Vector2 v2)
        {
            return new Vector2(v1.X + v2.X, v1.Y + v2.Y);
        }

        public static Vector2 operator +(Vector2 v1, Number val)
        {
            return new Vector2(v1.X + val, v1.Y + val);
        }

        public static Vector2 operator +(Number val, Vector2 v1)
        {
            return v1 + val;
        }

        public static Vector2 operator -(Vector2 v1, Vector2 v2)
        {
            return new Vector2(v1.X - v2.X, v1.Y - v2.Y);
        }

        public static Vector2 operator -(Vector2 v1, Number val)
        {
            return new Vector2(v1.X - val, v1.Y - val);
        }

        public static Vector2 operator -(Number val, Vector2 v1)
        {
            return new Vector2(val - v1.X, val - v1.Y);
        }

        public static Vector2 operator *(Vector2 v1, Vector2 v2)
        {
            return new Vector2(v1.X * v2.X, v1.Y * v2.Y);
        }

        public static Vector2 operator *(Vector2 v1, Number val)
        {
            return new Vector2(v1.X * val, v1.Y * val);
        }

        public static Vector2 operator *(Number val, Vector2 v1)
        {
            return v1 * val;
        }

        public static Vector2 operator /(Vector2 v1, Vector2 v2)
        {
            return new Vector2(v1.X / v2.X, v1.Y / v2.Y);
        }

        public static Vector2 operator /(Vector2 v1, Number val)
        {
            return new Vector2(v1.X / val, v1.Y / val);
        }

        public static Vector2 operator /(Number val, Vector2 v1)
        {
            return new Vector2(val / v1.X, val / v1.Y);
        }

        public static Vector2 operator -(Vector2 v1)
        {
            return v1 * -1;
        }

        public static Vector2 Zero = new Vector2(0, 0);
    }
}
