<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.Client.JS.Samples.Samples.AudioHandling.Default" %>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <ul class="breadcrumb">
        <li><a href="<%: ResolveUrl("~/") %>">EndGate JavaScript Samples</a> <span class="divider">/</span></li>
        <li class="active">Audio Handling</li>
    </ul>

    <div class="page-header">
        <h2>Audio Handling</h2>
        <p>Demonstrates how to play audio.</p>
    </div>    

    <p class="row ">You should hear a fire crackling noise on the start of the page and then clicking on the game area will play a separate noise.</p>

    <div class="row">        
        <div id="gameHolder" class="form-vertical well" style="height:400px;">
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="assetsAudioHandling.js"></script>
    <script src="mainAudioHandling.js"></script>
</asp:Content>
