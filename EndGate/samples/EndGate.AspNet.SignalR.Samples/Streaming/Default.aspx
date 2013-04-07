<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.AspNet.SignalR.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.AspNet.SignalR.Samples.Broadcasting.Default" %>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <ul class="breadcrumb">
        <li><a href="<%: ResolveUrl("~/") %>">SignalR Compression Samples</a> <span class="divider">/</span></li>
        <li class="active">Streaming</li>
    </ul>

    <div class="page-header">
        <h2>Streaming</h2>
        <p>Demonstrates the server pushing down data continuously to the client.</p>
    </div>
    <div class="row">
        <div id="timeHolder" class="form-vertical well span4">
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="<%: ResolveUrl("~/signalr/hubs") %>"></script>
    <script src="Streaming.js"></script>
</asp:Content>
