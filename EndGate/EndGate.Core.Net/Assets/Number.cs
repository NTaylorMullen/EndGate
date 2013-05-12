using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EndGate.Core.Net.Assets
{
    // Thanks to Damian Edwards - https://gist.github.com/DamianEdwards/5260736
    public struct Number :
        IComparable,
        IComparable<Int16>,
        IComparable<Int32>,
        IComparable<Int64>,
        IComparable<Single>,
        IComparable<Double>,
        IComparable<Decimal>,
        IEquatable<Int16>,
        IEquatable<Int32>,
        IEquatable<Int64>,
        IEquatable<Single>,
        IEquatable<Double>,
        IEquatable<Decimal>
    {
        private double _value;

        public Number(short value) : this((double)value) { }
        public Number(int value) : this((double)value) { }
        public Number(long value) : this((double)value) { }
        public Number(float value) : this((double)value) { }
        public Number(decimal value) : this((double)value) { }

        public Number(double value)
        {
            _value = value;
        }

        public bool Equals(short other)
        {
            return (double)other == _value;
        }

        public bool Equals(int other)
        {
            return (double)other == _value;
        }

        public bool Equals(long other)
        {
            return (double)other == _value;
        }

        public bool Equals(float other)
        {
            return (double)other == _value;
        }

        public bool Equals(double other)
        {
            return other == _value;
        }

        public bool Equals(decimal other)
        {
            return (double)other == _value;
        }

        public override bool Equals(object obj)
        {
            return _value.Equals(obj);
        }

        public int CompareTo(object obj)
        {
            return _value.CompareTo((double)obj);
        }

        public int CompareTo(short other)
        {
            return _value.CompareTo((double)other);
        }

        public int CompareTo(int other)
        {
            return _value.CompareTo((double)other);
        }

        public int CompareTo(long other)
        {
            return _value.CompareTo((double)other);
        }

        public int CompareTo(float other)
        {
            return _value.CompareTo((double)other);
        }

        public int CompareTo(double other)
        {
            return _value.CompareTo(other);
        }

        public int CompareTo(decimal other)
        {
            return _value.CompareTo((double)other);
        }

        public override int GetHashCode()
        {
            return _value.GetHashCode();
        }

        public override string ToString()
        {
            return _value.ToString();
        }

        public static Number operator +(Number a, Number b)
        {
            return new Number(a._value + b._value);
        }

        public static Number operator -(Number a, Number b)
        {
            return new Number(a._value - b._value);
        }

        public static Number operator /(Number a, Number b)
        {
            return new Number(a._value / b._value);
        }

        public static Number operator *(Number a, Number b)
        {
            return new Number(a._value * b._value);
        }

        public static bool operator >(Number a, Number b)
        {
            return a._value > b._value;
        }

        public static bool operator <(Number a, Number b)
        {
            return a._value < b._value;
        }

        public static implicit operator Number(short d)
        {
            return new Number(d);
        }

        public static implicit operator Number(int d)
        {
            return new Number(d);
        }

        public static implicit operator Number(long d)
        {
            return new Number(d);
        }

        public static implicit operator Number(float d)
        {
            return new Number(d);
        }

        public static implicit operator Number(double d)
        {
            return new Number(d);
        }

        public static implicit operator Number(decimal d)
        {
            return new Number(d);
        }

        public static implicit operator double(Number n)
        {
            return n._value;
        }
    }
}
