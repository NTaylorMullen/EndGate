using System;

namespace EndGate.Core.Net.Assets
{
    // Internal for now because the libraries do not fully support 3d
    internal class Vector3d
    {
        public Vector3d(double x, double y, double z)
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

        public bool Equivalent(Vector3d v1)
        {
            return v1.X == X && v1.Y == Y && v1.Z == Z;
        }

        /// <summary>
        /// Clones the Vector3
        /// </summary>
        /// <returns>A new Vector3s</returns>
        public Vector3d Clone()
        {
            return new Vector3d(X, Y, Z);
        }

        /// <summary>
        /// Creates a Normalized copy of the current Vector3
        /// </summary>
        /// <returns>A new Vector3</returns>
        public Vector3d Normalized()
        {
            var magnitude = Magnitude();
            return new Vector3d(X / magnitude, Y / magnitude, Z / magnitude);
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
        public double Dot(Vector3d v1)
        {
            return v1.X * X + v1.Y * Y + v1.Z * Z;
        }

        /// <summary>
        /// Returns a new Vector3 which has Math.Abs(X) and Math.Abs(Y) values
        /// </summary>
        /// <returns>A new Vector3</returns>
        public Vector3d Abs()
        {
            return new Vector3d(Math.Abs(X), Math.Abs(Y), Math.Abs(Z));
        }

        /// <summary>
        /// Calculates the Sign of the vector (X/|X|, Y/|Y|)
        /// </summary>
        /// <returns>A new Vector3</returns>
        public Vector3d Sign()
        {
            return new Vector3d(X / Math.Abs(X), Y / Math.Abs(Y), Z / Math.Abs(Z));
        }

        public Vector3d Add(Number val)
        {
            return this + val;
        }

        public Vector3d Add(Vector3d v1)
        {
            return this + v1;
        }

        public Vector3d Subtract(Number val)
        {
            return this - val;
        }

        public Vector3d SubtractFrom(Number val)
        {
            return val - this;
        }

        public Vector3d Subtract(Vector3d v1)
        {
            return this - v1;
        }

        public Vector3d Multiply(Vector3d v1)
        {
            return this * v1;
        }

        public Vector3d Multiply(Number val)
        {
            return this * val;
        }

        public Vector3d Divide(Number val)
        {
            return this / val;
        }

        public Vector3d DivideFrom(Number val)
        {
            return val / this;
        }

        public Vector3d Divide(Vector3d v1)
        {
            return this / v1;
        }

        public static Vector3d operator +(Vector3d v1, Vector3d v2)
        {
            return new Vector3d(v1.X + v2.X, v1.Y + v2.Y, v1.Z + v2.Z);
        }

        public static Vector3d operator +(Vector3d v1, Number val)
        {
            return new Vector3d(v1.X + val, v1.Y + val, v1.Z + val);
        }

        public static Vector3d operator +(Number val, Vector3d v1)
        {
            return v1 + val;
        }

        public static Vector3d operator -(Vector3d v1, Vector3d v2)
        {
            return new Vector3d(v1.X - v2.X, v1.Y - v2.Y, v1.Z - v2.Z);
        }

        public static Vector3d operator -(Vector3d v1, Number val)
        {
            return new Vector3d(v1.X - val, v1.Y - val, v1.Z - val);
        }

        public static Vector3d operator -(Number val, Vector3d v1)
        {
            return new Vector3d(val - v1.X, val - v1.Y, val - v1.Z);
        }

        public static Vector3d operator *(Vector3d v1, Vector3d v2)
        {
            return new Vector3d(v1.X * v2.X, v1.Y * v2.Y, v1.Z * v2.Z);
        }

        public static Vector3d operator *(Vector3d v1, Number val)
        {
            return new Vector3d(v1.X * val, v1.Y * val, v1.Z * val);
        }

        public static Vector3d operator *(Number val, Vector3d v1)
        {
            return v1 * val;
        }

        public static Vector3d operator /(Vector3d v1, Vector3d v2)
        {
            return new Vector3d(v1.X / v2.X, v1.Y / v2.Y, v1.Z / v2.Z);
        }

        public static Vector3d operator /(Vector3d v1, Number val)
        {
            return new Vector3d(v1.X / val, v1.Y / val, v1.Z / val);
        }

        public static Vector3d operator /(Number val, Vector3d v1)
        {
            return new Vector3d(val / v1.X, val / v1.Y, val / v1.Z);
        }

        public static Vector3d operator -(Vector3d v1)
        {
            return v1 * -1;
        }

        public static Vector3d Zero = new Vector3d(0, 0, 0);

        public override string ToString()
        {
            return "(" + X + ", " + Y + ", " + Z + ")";
        }
    }
}
