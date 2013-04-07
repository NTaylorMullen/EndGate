using EndGate.Core;
using Microsoft.AspNet.SignalR;

namespace EndGate.AspNet.SignalR.Samples
{
    public class Streamer : Game
    {
        IHubContext _hubContext;

        public Streamer(IHubContext hubContext)
        {
            _hubContext = hubContext;

            // Update 1 time per second
            Configuration.UpdateRate = 1;
        }

        public override void Update(GameTime gameTime)
        {
            _hubContext.Clients.All.update(gameTime.Now.ToString());
        }
    }
}