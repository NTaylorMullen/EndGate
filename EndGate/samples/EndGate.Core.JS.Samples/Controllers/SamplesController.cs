using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EndGate.Core.JS.Samples.Controllers
{
    [OutputCache(CacheProfile = "controllerCaching")]
    public class SamplesController : Controller
    {
        //
        // GET: /Samples/
        private const string Path = "~/Views/Samples/{0}.cshtml";

        public ActionResult Index(string sample)
        {
            var path = string.Format(Path, sample);
            return View(path);
        }

    }
}
