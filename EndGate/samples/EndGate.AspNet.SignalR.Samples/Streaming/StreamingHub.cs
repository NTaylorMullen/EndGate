using Microsoft.AspNet.SignalR;

namespace EndGate.AspNet.SignalR.Samples
{
    public class StreamingHub : Hub
    {
        private static Streamer _streamer = new Streamer(GlobalHost.ConnectionManager.GetHubContext<StreamingHub>());
    }
}