<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.JS.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.JS.Samples.Samples.CollisionDetection.Default" %>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <ul class="breadcrumb">
        <li><a href="<%: ResolveUrl("~/") %>">EndGate JavaScript Samples</a> <span class="divider">/</span></li>
        <li class="active">Collision Detection</li>
    </ul>

    <div class="page-header">
        <h2>Collision Detection</h2>
        <p>Demonstrates how to use the client to detect collisions.</p>
    </div>

    <div class="row form-search well">
        <input type="text" class="input-medium" placeholder="# of Rectangles" id="numOfRectangles"/>
        <input type="text" class="input-medium" placeholder="# of Circles" id="numOfCircles"/>
        <button class="btn" id="addItems">Add</button>
        <button class="btn pull-right" id="clearItems">Clear</button>
    </div>

    <div class="row">        
        <div id="gameHolder" class="form-vertical well" style="height:400px;">
        </div>
    </div>
    
    <script typescript="true" src="assetsCollisionDetection.js"></script>
    <script typescript="true" src="mainCollisionDetection.js"></script>
</asp:Content>