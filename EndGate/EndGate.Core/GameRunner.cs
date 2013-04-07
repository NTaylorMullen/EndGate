using System;
using System.Collections.Concurrent;
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

        public static GameRunner Instance
        {
            get
            {
                return _instance.Value;
            }
        }

        public Action<int> Register(Game game)
        {
            var updateCallback = CreateAndCacheCallback(game);

            // Try to start the loop prior to adding our games callback.  This callback may be the first, hence the "Try"
            TryLoopStart();

            // Add our callback to the game loop (which is now running), it will now be called on an interval dictated by updateCallback
            _gameLoop.AddCallback(updateCallback);

            // Updating the "updateRate" is an essential element to the game configuration.
            // If a game is running slowly we need to be able to slow down the update rate.
            return CreateUpdateRateSetter(updateCallback);
        }

        public void Unregister(Game game)
        {
            LooperCallback updateCallback;
            _callbacks.TryRemove(game.ID, out updateCallback);
            _gameLoop.RemoveCallback(updateCallback);

            TryLoopStop();
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
            if (_callbacks.Count == 0 && _gameLoop != null)
            {
                _gameLoop.Dispose();
                _gameLoop = null;
            }
        }

        private LooperCallback CreateAndCacheCallback(Game game)
        {
            var updateCallback = new LooperCallback
            {
                Callback = game.PrepareUpdate
            };

            // Add the callback to the callback cache
            _callbacks.TryAdd(game.ID, updateCallback);

            return updateCallback;
        }

        private Action<int> CreateUpdateRateSetter(LooperCallback callback)
        {
            return (updateRate) =>
            {
                callback.Fps = updateRate;
            };
        }
    }
}
