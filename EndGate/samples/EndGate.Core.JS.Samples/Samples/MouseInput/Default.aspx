<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.JS.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.JS.Samples.Samples.MouseInput.Default" %>

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
        <li class="active">Mouse Input</li>
    </ul>

    <div class="page-header">
        <h2>Mouse Input</h2>
        <p>Demonstrates how to use a games mouse input handler.</p>
    </div>

    <p class="row "><em>Left click, middle click, right click, double click, all of the prior with mouse down/mouse up and lastly scroll all directions.</em></p>
    <p class="row "><strong>Last event: </strong><span id="lastMouseEvent"></span></p>

    <div class="row">        
        <div id="gameHolder" class="form-vertical well" style="height:400px;">
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="assetsMouseInput.js"></script>
    <script src="mainMouseInput.js"></script>
</asp:Content>
