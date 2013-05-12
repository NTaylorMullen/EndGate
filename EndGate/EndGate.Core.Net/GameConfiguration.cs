using System;

namespace EndGate.Core.Net
{
    public class GameConfiguration
    {
        private const int DefaultUpdateRate = 40;

        private Action<int> _updateRateSetter;
        private int _savedUpdateRate;

        public GameConfiguration(Action<int> updateRateSetter)
        {
            _updateRateSetter = updateRateSetter;

            UpdateRate = DefaultUpdateRate;
        }

        public int UpdateRate
        {
            get
            {
                return _savedUpdateRate;
            }
            set
            {
                _savedUpdateRate = value;
                _updateRateSetter(_savedUpdateRate);
            }
        }
    }
}
