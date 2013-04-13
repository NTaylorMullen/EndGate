using System;
using System.Threading;
using EndGate.Core.Collision;
using EndGate.Core.Interfaces;

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
            CollisionManager = new CollisionManager();

            Configuration = new GameConfiguration(GameRunner.Instance.Register(this));
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
