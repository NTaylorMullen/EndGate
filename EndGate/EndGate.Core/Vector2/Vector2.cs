using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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

        public bool Equivalent(Vector2 v1)
        {
            return v1.X == X && v1.Y == Y;
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
