<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.JS.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.JS.Samples.Samples.MovementControllers.Default" %>

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
        <li class="active">Movement Controllers</li>
    </ul>

    <div class="page-header">
        <h2>Movement Controllers</h2>
        <p>Demonstrates how to use Movement Controllers to make moving objects easy.</p>
    </div>

    <p class="row">Move the box with <em>w/a/s/d or up/left/right/down.</em></p>
    <p class="row">This show cases the LinearMovementController.  More MovementControllers will be added in the future.</p>

    <div class="row">        
        <div id="gameHolder" class="form-vertical well" style="height:400px;">
        </div>
    </div>
    
    <script typescript="true" src="MovementControllerGame.js"></script>
    <script typescript="true" src="Main.js"></script>
</asp:Content>
