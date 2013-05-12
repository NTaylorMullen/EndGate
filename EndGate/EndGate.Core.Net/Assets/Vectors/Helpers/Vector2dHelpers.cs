using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EndGate.Core.Net.Assets
{
    internal static class Vector2dHelpers
    {
        public static MinMax GetMinMaxProjections(Vector2d axis, Vector2d[] vertices)
        {
            double min = vertices[0].ProjectOnto(axis).Dot(axis);
            double max = min;

            for(int i = 1;i < vertices.Length;i++)
            {
                var vertex = vertices[i];
                double value = vertex.ProjectOnto(axis).Dot(axis);

                if (value < min)
                {
                    min = value;
                }
                else if (value > max)
                {
                    max = value;
                }
            }

            return new MinMax(min, max);
        }
    }
}
