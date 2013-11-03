using System.Web;
using System.Web.Optimization;

namespace EndGate.Core.JS.Samples.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery")
                .Include("~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/codemirrorjs")
                        .Include("~/CodeMirror/codemirror.js")
                        .Include("~/CodeMirror/javascript.js")
                        .Include("~/CodeMirror/codeloader.js"));

            bundles.Add(new ScriptBundle("~/bundles/mainjs")
                        .Include("~/Bootstrap/bootstrap.js")
                        .Include("~/Scripts/pixi-1.3.0.js")
                        .Include("~/Scripts/endgate.js"));

            bundles.Add(new StyleBundle("~/bundles/codemirrorcss")
                        .Include("~/CodeMirror/codemirror.css"));

            bundles.Add(new StyleBundle("~/bundles/maincss")
                        .Include("~/Styles/common.css")
                        .Include("~/Bootstrap/bootstrap.css"));
        }
    }
}