<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.Client.JS.Samples.Samples.AnimatedSprites.Default" %>

<asp:Content ID="Content4" ContentPlaceHolderID="HeadContent" runat="server">
    <style>
        canvas {
            background-color: black;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <ul class="breadcrumb">
        <li><a href="<%: ResolveUrl("~/") %>">EndGate JavaScript Samples</a> <span class="divider">/</span></li>
        <li class="active">Animated Sprites</li>
    </ul>

    <div class="page-header">
        <h2>Animated Sprites</h2>
        <p>Demonstrates how to animate sprites with sprite sheets.</p>
    </div>    

    <p class="row ">Move your mouse around in the black area and click to see animated images.  Sprite sheets: <a href="images/electric_pulse.png" target="_blank">Electricity</a>, <a href="images/fire_explosion.png" target="_blank">Fire</a></p>

    <div class="row">        
        <div id="gameHolder" class="form-vertical well" style="height:400px;">
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="assetsAnimatedSprites.js"></script>
    <script src="mainAnimatedSprites.js"></script>
</asp:Content>
