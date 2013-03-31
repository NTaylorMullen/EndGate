using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EndGate.Core.Utilities;

namespace EndGate.Core
{
    internal class GameRunner
    {
        private static Lazy<GameRunner> _instance = new Lazy<GameRunner>(() => new GameRunner());
        private ConcurrentDictionary<long, LooperCallback> _callbacks;
        private Looper _gameLoop;

        public GameRunner()
        {
            _callbacks = new ConcurrentDictionary<long, LooperCallback>();
        }

        private void TryLoopStart()
        {
            if (_callbacks.Count == 1)
            {
                _gameLoop = new Looper();
                _gameLoop.Start();
            }
        }

        private void TryLoopStop()
        {
            if (_callbacks.Count == 0)
            {
                _gameLoop.Dispose();
                _gameLoop = null;
            }
        }

        public Action<int> Register(Game game)
        {
            // We do not set the FPS initially (it's set to 0) because we want to allow the Game itself to set the UpdateRate(fps)
            var updateCallback = new LooperCallback
            {
                Callback = game.PrepareUpdate
            };

            _callbacks.TryAdd(game.ID, updateCallback);

            TryLoopStart();

            _gameLoop.AddCallback(updateCallback);

            return (updateRate) =>
            {
                updateCallback.Fps = updateRate;
            };
        }

        public void Unregister(Game game)
        {
            LooperCallback updateCallback;
            _callbacks.TryRemove(game.ID, out updateCallback);
            _gameLoop.RemoveCallback(updateCallback);

            TryLoopStop();
        }

        public static GameRunner Instance
        {
            get
            {
                return _instance.Value;
            }
        }
    }
}
