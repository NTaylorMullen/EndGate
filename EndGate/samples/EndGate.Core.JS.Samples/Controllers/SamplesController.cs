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

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AnimatedSprites()
        {
            return View();
        }

        public ActionResult AudioHandling()
        {
            return View();
        }

        public ActionResult Camera()
        {
            return View();
        }

        public ActionResult CollisionDetection()
        {
            return View();
        }

        public ActionResult CollisionInspector()
        {
            return View();
        }

        public ActionResult InputControllers()
        {
            return View();
        }

        public ActionResult KeyboardInput()
        {
            return View();
        }

        public ActionResult Layering()
        {
            return View();
        }

        public ActionResult MapCreator()
        {
            return View();
        }

        public ActionResult MapLoading()
        {
            return View();
        }

        public ActionResult MouseInput()
        {
            return View();
        }

        public ActionResult MovementControllers()
        {
            return View();
        }

        public ActionResult RawRPG()
        {
            return View();
        }

        public ActionResult Shapes()
        {
            return View();
        }

        public ActionResult Sprites()
        {
            return View();
        }

        public ActionResult Text()
        {
            return View();
        }

        public ActionResult Tweening()
        {
            return View();
        }
    }
}
