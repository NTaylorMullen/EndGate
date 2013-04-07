using System;
using System.Threading;
using EndGate.Core.Collision;
using EndGate.Core.Interfaces;
using EndGate.Core.Utilities;

namespace EndGate.Core
{
    public abstract class Game : IUpdateable, IDisposable
    {
        private GameTime _gameTime;

        public GameConfiguration Configuration;
        public CollisionManager CollisionManager;

        internal static long GameIDs = 0;
        internal long ID = 0;

        public Game()
        {
            _gameTime = new GameTime();
            ID = Interlocked.Increment(ref GameIDs);
            Configuration = new GameConfiguration(GameRunner.Instance.Register(this));
            CollisionManager = new CollisionManager();
        }

        internal void PrepareUpdate()
        {
            _gameTime.Update();

            CollisionManager.Update(_gameTime);
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
