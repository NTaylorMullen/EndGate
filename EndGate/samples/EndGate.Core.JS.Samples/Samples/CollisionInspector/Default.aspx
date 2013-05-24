<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.JS.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.JS.Samples.Samples.CollisionInspector.Default" %>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <ul class="breadcrumb">
        <li><a href="<%: ResolveUrl("~/") %>">EndGate JavaScript Samples</a> <span class="divider">/</span></li>
        <li class="active">Collision Inspector</li>
    </ul>

    <div class="page-header">
        <h2>Collision Inspector</h2>
        <p>Allows the dragging and rotating of shapes to inspect collisions closely.</p>
    </div>

    <p class="row ">Drag the shapes around to see how they collide with each other.<br />Dragging with left button moves the shape, clicking and holding with right button rotates shape.</p>

    <div class="row">        
        <div id="gameHolder" class="form-vertical well" style="height:400px;">
        </div>
    </div>
    
    <script data-typescript="true" src="CollidableShape.js"></script>
    <script data-typescript="true" src="Game.js"></script>
    <script data-typescript="true" src="Main.js"></script>
</asp:Content>