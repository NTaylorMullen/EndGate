<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.JS.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.JS.Samples.Samples.Layering.Default" %>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <ul class="breadcrumb">
        <li><a href="<%: ResolveUrl("~/") %>">EndGate JavaScript Samples</a> <span class="divider">/</span></li>
        <li class="active">Layering</li>
    </ul>

    <div class="page-header">
        <h2>Layering</h2>
        <p>Demonstrates how to control the layering of graphics.</p>
    </div>

    <div class="row ">
        <div class="form-search well span3 text-center">
            <fieldset>
                <legend class="text-center">Red Rectangle</legend>
                <p id="redRectController"><button class="btn btn-primary subtractZIndex pull-left">-</button><span class="zindex">0</span><button class="btn btn-inverse addZIndex pull-right">+</button></p>
            </fieldset>
        </div>

        <div class="form-search well span4 text-center">
            <fieldset>
                <legend class="text-center">Green Rectangle</legend>
                <p id="greenRectController"><button class="btn btn-primary subtractZIndex pull-left">-</button><span class="zindex">0</span><button class="btn btn-inverse addZIndex pull-right">+</button></p>
            </fieldset>
        </div>

        <div class="form-search well span3 text-center">
            <fieldset>
                <legend class="text-center">Blue Circle</legend>
                <p id="blueCircleController"><button class="btn btn-primary subtractZIndex pull-left">-</button><span class="zindex">0</span><button class="btn btn-inverse addZIndex pull-right">+</button></p>
            </fieldset>
        </div>
    </div>

    <div class="row">        
        <div id="gameHolder" class="form-vertical well" style="height:400px;">
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="assetsLayering.js"></script>
    <script src="mainLayering.js"></script>
</asp:Content>
