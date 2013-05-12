using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EndGate.Core.Net.Assets
{
    public class Size2d
    {
        private double _width;
        private double _height;

        public Size2d()
            : this(0)
        {
        }

        public Size2d(double size)
            : this(size, size)
        {
        }

        public Size2d(double width, double height)
        {
            _width = width;
            _height = height;
            UpdateRadius();
        }

        private void UpdateRadius()
        {
            Radius = .5 * Math.Sqrt(Width * Width + Height * Height);
        }

        public double Width 
        {
            get
            {
                return _width;
            }
            set
            {
                _width = value;
                UpdateRadius();
            }
        }

        public double Height
        {
            get
            {
                return _height;
            }
            set
            {
                _height = value;
                UpdateRadius();
            }
        }
        
        public double Radius { get; private set; }

        public Size2d Clone()
        {
            return new Size2d(Width, Height);
        }

        public bool Equivalent(Size2d s1)
        {
            return Width == s1.Width && Height == s1.Height;
        }

        public void Apply(Func<double, double> action)
        {
            Width = action(Width);
            Height = action(Height);
        }

        public void Trigger(Action<double> action)
        {
            action(Width);
            action(Height);
        }

        public double HalfWidth
        {
            get
            {
                return Width / 2;
            }
            set
            {
                Width = value * 2;
            }
        }

        public double HalfHeight
        {
            get
            {
                return Height / 2;
            }
            set
            {
                Height = value * 2;
            }
        }

        public Size2d Add(Number val)
        {
            return this + val;
        }

        public Size2d Add(Size2d s1)
        {
            return this + s1;
        }

        public Size2d Add(Vector2d v1)
        {
            return this + v1;
        }

        public Size2d Multiply(Number val)
        {
            return this * val;
        }

        public Size2d Multiply(Size2d s1)
        {
            return this * s1;
        }

        public Size2d Multiply(Vector2d v1)
        {
            return this * v1;
        }

        public Size2d Subtract(Number val)
        {
            return this - val;
        }

        public Size2d Subtract(Size2d s1)
        {
            return this - s1;
        }

        public Size2d Subtract(Vector2d v1)
        {
            return this - v1;
        }

        public Size2d SubtractFrom(Size2d s1)
        {
            return s1 - this;
        }

        public Size2d SubtractFrom(Number val)
        {
            return val - this;
        }

        public Size2d SubtractFrom(Vector2d v1)
        {
            return v1 - this;
        }

        public Size2d Divide(Number val)
        {
            return this / val;
        }

        public Size2d Divide(Size2d s1)
        {
            return this / s1;
        }

        public Size2d Divide(Vector2d v1)
        {
            return this / v1;
        }

        public Size2d DivideFrom(Number val)
        {
            return val / this;
        }

        public Size2d DivideFrom(Size2d s1)
        {
            return s1 / this;
        }

        public Size2d DivideFrom(Vector2d v1)
        {
            return v1 / this;
        }

        public static Size2d operator *(Size2d s1, Size2d s2)
        {
            return new Size2d(s1.Width * s2.Width, s1.Height * s2.Height);
        }

        public static Size2d operator *(Size2d s1, Number val)
        {
            return new Size2d(s1.Width * val, s1.Height * val);
        }

        public static Size2d operator *(Number val, Size2d s1)
        {
            return s1 * val;
        }

        public static Size2d operator *(Size2d s1, Vector2d v1)
        {
            return new Size2d(s1.Width * v1.X, s1.Height * v1.Y);
        }

        public static Size2d operator *(Vector2d v1, Size2d s1)
        {
            return s1 * v1;
        }

        public static Size2d operator +(Size2d s1, Size2d s2)
        {
            return new Size2d(s1.Width + s2.Width, s1.Height + s2.Height);
        }

        public static Size2d operator +(Size2d s1, Number val)
        {
            return new Size2d(s1.Width + val, s1.Height + val);
        }

        public static Size2d operator +(Number val, Size2d s1)
        {
            return s1 + val;
        }

        public static Size2d operator +(Size2d s1, Vector2d v1)
        {
            return new Size2d(s1.Width + v1.X, s1.Height + v1.Y);
        }

        public static Size2d operator +(Vector2d v1, Size2d s1)
        {
            return s1 + v1;
        }

        public static Size2d operator -(Size2d s1, Size2d s2)
        {
            return new Size2d(s1.Width - s2.Width, s1.Height - s2.Height);
        }

        public static Size2d operator -(Size2d s1, Number val)
        {
            return new Size2d(s1.Width - val, s1.Height - val);
        }

        public static Size2d operator -(Number val, Size2d s1)
        {
            return new Size2d(val - s1.Width, val - s1.Height);
        }

        public static Size2d operator -(Size2d s1, Vector2d v1)
        {
            return new Size2d(s1.Width - v1.X, s1.Height - v1.Y);
        }

        public static Size2d operator -(Vector2d v1, Size2d s1)
        {
            return new Size2d(v1.X - s1.Width, v1.Y - s1.Height);
        }

        public static Size2d operator /(Size2d s1, Size2d s2)
        {
            return new Size2d(s1.Width / s2.Width, s1.Height / s2.Height);
        }

        public static Size2d operator /(Size2d s1, Number val)
        {
            return new Size2d(s1.Width / val, s1.Height / val);
        }

        public static Size2d operator /(Number val, Size2d s1)
        {
            return new Size2d(val / s1.Width, val / s1.Height);
        }

        public static Size2d operator /(Size2d s1, Vector2d v1)
        {
            return new Size2d(s1.Width / v1.X, s1.Height / v1.Y);
        }

        public static Size2d operator /(Vector2d v1, Size2d s1)
        {
            return new Size2d(v1.X / s1.Width, v1.Y / s1.Height);
        }

        public static Size2d operator -(Size2d s1)
        {
            return s1 * -1;
        }

        public static Size2d Zero = new Size2d(0);

        public override string ToString()
        {
            return "("+Width + ", " + Height + ")";
        }
    }
}
