<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.JS.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.JS.Samples.Samples.AudioHandling.Default" %>

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
    <p class="row">Image <a href="images/attribution.txt" target="_blank">attribution</a>.  Sound <a href="sounds/attribution.txt" target="_blank">attribution</a>.</p>
    
    <script typescript="true" src="Animation.js"></script>
    <script typescript="true" src="BurningFlame.js"></script>
    <script typescript="true" src="SmokePoof.js"></script>
    <script typescript="true" src="SmokePoofManager.js"></script>
    <script typescript="true" src="AudioHandling.js"></script>
    <script typescript="true" src="Main.js"></script>
</asp:Content>