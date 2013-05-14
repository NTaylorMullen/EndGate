<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.JS.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.JS.Samples.Samples.InputControllers.Default" %>

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
        <li class="active">Input Controllers</li>
    </ul>

    <div class="page-header">
        <h2>Input Controllers</h2>
        <p>Demonstrates how to use input controllers to make moving controlling objects dead simple.</p>
    </div>

    <p class="row">Move the box with <em>w/a/s/d or up/left/right/down.</em></p>
    <p class="row">This show cases the DirectionalInputController.  More Input Controllers will be added in the future.</p>
    <p class="row"><strong>Note:</strong> Input controllers are not required, they just make basic controls easier to use.  This Sample is just a shorter sample of the Movement Controller sample</p>

    <div class="row">        
        <div id="gameHolder" class="form-vertical well" style="height:400px;">
        </div>
    </div>
    
    <script typescript="true" src="assetsInputControllers.js"></script>
    <script typescript="true" src="mainInputControllers.js"></script>
</asp:Content>