using System;
using System.Collections.Generic;
using System.Linq;
using EndGate.Core.Net.Interfaces;

namespace EndGate.Core.Net.Collision
{
    public class CollisionManager : IUpdateable
    {
        private Dictionary<long, Collidable> _collidables;
        private Queue<Collidable> _collidableAdditions;
        private Queue<Collidable> _collidableRemovals;
        private object _collidableAddLock;
        private object _collidableRemoveLock;
        private bool _enabled;

        public CollisionManager()
        {
            _collidables = new Dictionary<long, Collidable>();
            _collidableAdditions = new Queue<Collidable>();
            _collidableRemovals = new Queue<Collidable>();
            _collidableAddLock = new object();
            _collidableRemoveLock = new object();
            _enabled = false;

            OnCollision = (first, second) => { };
        }

        public event Action<Collidable, Collidable> OnCollision;

        public void Monitor(Collidable obj)
        {
            lock (_collidableAddLock)
            {
                _enabled = true;
                _collidableAdditions.Enqueue(obj);
            }
        }

        public void Unmonitor(Collidable obj)
        {
            lock (_collidableRemoveLock)
            {
                _collidableRemovals.Enqueue(obj);
            }
        }

        public void Update(GameTime gameTime)
        {
            if (_enabled)
            {
                DrainAddQueue();
                DrainRemoveQueue();

                List<Collidable> collidables = _collidables.Values.ToList();
                Collidable first, second;

                for (var i = 0; i < collidables.Count; i++)
                {
                    first = collidables[i];

                    for (var j = i + 1; j < collidables.Count; j++)
                    {
                        second = collidables[j];

                        if (first.IsCollidingWith(second))
                        {
                            first.Collided(new CollisionData(first.Bounds.Position.Clone(), second));
                            second.Collided(new CollisionData(second.Bounds.Position.Clone(), first));
                            OnCollision(first, second);
                        }
                    }
                }
            }
        }

        private void DrainAddQueue()
        {
            lock (_collidableAddLock)
            {
                Collidable obj;

                while (_collidableAdditions.Count != 0)
                {
                    obj = _collidableAdditions.Dequeue();

                    obj.OnDisposed += a =>
                    {
                        Unmonitor(a);
                    };

                    _collidables.Add(obj.ID, obj);
                }
            }
        }

        private void DrainRemoveQueue()
        {
            lock (_collidableRemoveLock)
            {
                while (_collidableRemovals.Count != 0)
                {
                    _collidables.Remove(_collidableRemovals.Dequeue().ID);
                }
            }
        }
    }
}
