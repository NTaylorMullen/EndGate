<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.JS.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.JS.Samples.Samples.AnimatedSprites.Default" %>

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

    <p class="row">Image <a href="images/attribution.txt" target="_blank">attribution</a>.</p>

    <script typescript="true" src="Animation.js"></script>
    <script typescript="true" src="ElectricPulse.js"></script>
    <script typescript="true" src="FireExplosion.js"></script>
    <script typescript="true" src="ElectricPulseManager.js"></script>
    <script typescript="true" src="FireExplosionManager.js"></script>
    <script typescript="true" src="AnimatedSprites.js"></script>
    <script typescript="true" src="Main.js"></script>

</asp:Content>
