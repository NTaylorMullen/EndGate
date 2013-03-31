using System;
using System.Threading;
using EndGate.Core.Interfaces;
using EndGate.Core.Utilities;

namespace EndGate.Core
{
    public abstract class Game : IUpdateable, IDisposable
    {
        private GameTime _gameTime;

        public GameConfiguration Configuration;

        internal static long GameIDs = 0;
        internal long ID = 0;

        public Game()
        {
            ID = Interlocked.Increment(ref GameIDs);
            _gameTime = new GameTime();
            Configuration = new GameConfiguration(GameRunner.Instance.Register(this));
        }

        internal void PrepareUpdate()
        {
            _gameTime.Update();
            Update(_gameTime);
        }

        public virtual void Update(GameTime gameTime)
        {
        }

        public virtual void Dispose()
        {
            GameRunner.Instance.Unregister(this);
        }
    }
}
