<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.Client.JS.Samples.Samples.RawRPG.Default" %>

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
        <li class="active">Raw RPG</li>
    </ul>

    <div class="page-header">
        <h2>Raw RPG</h2>
        <p>Demonstrates a basic RPG setup with an environment, character, controllers etc.</p>
    </div>

    <p class="row">Move the box with <em>w/a/s/d or up/left/right/down.</em></p>

    <div class="row">        
        <div id="gameHolder" class="form-vertical well" style="height:400px;">
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="Knight.js"></script>
    <script src="Player.js"></script>
    <script src="RPG.js"></script>
    <script src="Main.js"></script>
</asp:Content>
