using System;

namespace EndGate.Core
{
    public partial class Vector3
    {
        public Vector3(double x, double y, double z)
        {
            X = x;
            Y = y;
            Z = z;
        }

        public double X { get; set; }
        public double Y { get; set; }
        public double Z { get; set; }

        public void Apply(Func<double, double> action)
        {
            X = action(X);
            Y = action(Y);
            Z = action(Z);
        }

        public void Trigger(Action<double> action)
        {
            action(X);
            action(Y);
            action(Z);
        }

        public bool Equivalent(Vector3 v1)
        {
            return v1.X == X && v1.Y == Y && v1.Z == Z;
        }

        /// <summary>
        /// Clones the Vector3
        /// </summary>
        /// <returns>A new Vector3s</returns>
        public Vector3 Clone()
        {
            return new Vector3(X, Y, Z);
        }

        /// <summary>
        /// Creates a Normalized copy of the current Vector3
        /// </summary>
        /// <returns>A new Vector3</returns>
        public Vector3 Normalized()
        {
            var magnitude = Magnitude();
            return new Vector3(X / magnitude, Y / magnitude, Z / magnitude);
        }

        /// <summary>
        /// Calculates the magnitude of the Vector3 (X*X + Y*Y)^.5
        /// </summary>
        /// <returns>A new Vector3</returns>
        public double Magnitude()
        {
            return Math.Sqrt(X * X + Y * Y + Z * Z);
        }

        /// <summary>
        /// Equivalent to Magnitude()
        /// </summary>
        /// <returns>A new Vector3</returns>
        public double Length()
        {
            return Magnitude();
        }

        /// <summary>
        /// Calculates the Dot product of the current vector and the one provided
        /// </summary>
        /// <param name="v1">Vector to dot product with</param>
        /// <returns>Dot product</returns>
        public double Dot(Vector3 v1)
        {
            return v1.X * X + v1.Y * Y + v1.Z * Z;
        }

        /// <summary>
        /// Returns a new Vector3 which has Math.Abs(X) and Math.Abs(Y) values
        /// </summary>
        /// <returns>A new Vector3</returns>
        public Vector3 Abs()
        {
            return new Vector3(Math.Abs(X), Math.Abs(Y), Math.Abs(Z));
        }

        /// <summary>
        /// Calculates the Sign of the vector (X/|X|, Y/|Y|)
        /// </summary>
        /// <returns>A new Vector3</returns>
        public Vector3 Sign()
        {
            return new Vector3(X / Math.Abs(X), Y / Math.Abs(Y), Z / Math.Abs(Z));
        }

        public Vector3 Add(Number val)
        {
            return this + val;
        }

        public Vector3 Add(Vector3 v1)
        {
            return this + v1;
        }

        public Vector3 Subtract(Number val)
        {
            return this - val;
        }

        public Vector3 SubtractFrom(Number val)
        {
            return val - this;
        }

        public Vector3 Subtract(Vector3 v1)
        {
            return this - v1;
        }

        public Vector3 Multiply(Vector3 v1)
        {
            return this * v1;
        }

        public Vector3 Multiply(Number val)
        {
            return this * val;
        }

        public Vector3 Divide(Number val)
        {
            return this / val;
        }

        public Vector3 DivideFrom(Number val)
        {
            return val / this;
        }

        public Vector3 Divide(Vector3 v1)
        {
            return this / v1;
        }

        public static Vector3 operator +(Vector3 v1, Vector3 v2)
        {
            return new Vector3(v1.X + v2.X, v1.Y + v2.Y, v1.Z + v2.Z);
        }

        public static Vector3 operator +(Vector3 v1, Number val)
        {
            return new Vector3(v1.X + val, v1.Y + val, v1.Z + val);
        }

        public static Vector3 operator +(Number val, Vector3 v1)
        {
            return v1 + val;
        }

        public static Vector3 operator -(Vector3 v1, Vector3 v2)
        {
            return new Vector3(v1.X - v2.X, v1.Y - v2.Y, v1.Z - v2.Z);
        }

        public static Vector3 operator -(Vector3 v1, Number val)
        {
            return new Vector3(v1.X - val, v1.Y - val, v1.Z - val);
        }

        public static Vector3 operator -(Number val, Vector3 v1)
        {
            return new Vector3(val - v1.X, val - v1.Y, val - v1.Z);
        }

        public static Vector3 operator *(Vector3 v1, Vector3 v2)
        {
            return new Vector3(v1.X * v2.X, v1.Y * v2.Y, v1.Z * v2.Z);
        }

        public static Vector3 operator *(Vector3 v1, Number val)
        {
            return new Vector3(v1.X * val, v1.Y * val, v1.Z * val);
        }

        public static Vector3 operator *(Number val, Vector3 v1)
        {
            return v1 * val;
        }

        public static Vector3 operator /(Vector3 v1, Vector3 v2)
        {
            return new Vector3(v1.X / v2.X, v1.Y / v2.Y, v1.Z / v2.Z);
        }

        public static Vector3 operator /(Vector3 v1, Number val)
        {
            return new Vector3(v1.X / val, v1.Y / val, v1.Z / val);
        }

        public static Vector3 operator /(Number val, Vector3 v1)
        {
            return new Vector3(val / v1.X, val / v1.Y, val / v1.Z);
        }

        public static Vector3 operator -(Vector3 v1)
        {
            return v1 * -1;
        }

        public static Vector3 Zero = new Vector3(0, 0, 0);
    }
}
