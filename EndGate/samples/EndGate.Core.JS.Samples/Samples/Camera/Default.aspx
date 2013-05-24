<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.JS.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.JS.Samples.Samples.Camera.Default" %>

<asp:Content ID="Content4" ContentPlaceHolderID="HeadContent" runat="server">
    <style>
        canvas {
            border:1px solid black;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <ul class="breadcrumb">
        <li><a href="<%: ResolveUrl("~/") %>">EndGate JavaScript Samples</a> <span class="divider">/</span></li>
        <li class="active">Camera</li>
    </ul>

    <div class="page-header">
        <h2>Camera</h2>
        <p>Demonstrates how to use the camera's movement and zooming capabilities.</p>
    </div>

    <p class="row">Move the camera with <em>w/a/s/d or up/left/right/down.</em></p>
    <p class="row">Zoom in/Out with <em>r/f</em></p>

    <p class="row text-center"><strong>Position: </strong><span id="cameraPosition"></span> | <strong>Distance: </strong><span id="cameraDistance"></span></p>
    <div class="row">        
        <div id="gameHolder" class="form-vertical well" style="height:400px;">
        </div>
    </div>
    
    <script data-typescript="true" src="World.js"></script>
    <script data-typescript="true" src="MovingDirection.js"></script>
    <script data-typescript="true" src="Game.js"></script>
    <script data-typescript="true" src="Main.js"></script>
</asp:Content>
