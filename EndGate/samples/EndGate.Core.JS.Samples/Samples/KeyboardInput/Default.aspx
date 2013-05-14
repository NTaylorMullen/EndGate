<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.JS.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.JS.Samples.Samples.KeyboardInput.Default" %>

<asp:Content ID="Content4" ContentPlaceHolderID="HeadContent" runat="server">
    <style>
        canvas {
            border: 1px solid black;
        }

        .keyboard-controller {
            height:35px;
        }

        .keyboard-controller button {
            margin-top: -8px;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <ul class="breadcrumb">
        <li><a href="<%: ResolveUrl("~/") %>">EndGate JavaScript Samples</a> <span class="divider">/</span></li>
        <li class="active">Keyboard Input</li>
    </ul>

    <div class="page-header">
        <h2>Keyboard Input</h2>
        <p>Demonstrates how to use a games keyboard input handler.</p>
    </div>

    <p class="row "><em>Start hitting keys and see the game handle the inputs.  Handles multiple special keys such as Up, Right, Down, Left, esc, tab, space, enter, backspace, insert, home, delete, end, f1-f12.  Also modifiers are placed in front of key command such as "shift+up" or "shift+alt+p"</em></p>
    <div class="row">
        <div class="keyboard-controller">
            <p class="pull-left">Bind To:
                <input type="text" placeholder="Binding command..." id="commandToBind" />
                Result:
                <input type="text" placeholder="Text to show..." id="commandResult" />
                <button class="btn" id="bindKeyboardInput">Bind</button></p>
            <p class="pull-right">
            <button class="btn" id="unbindKeyboardInput">Unbind</button><select id="commandList"></select></p>
        </div>

        <div id="gameHolder" class="form-vertical well" style="height: 400px;">
        </div>
    </div>
    
    <script typescript="true" src="assetsKeyboardInput.js"></script>
    <script typescript="true" src="mainKeyboardInput.js"></script>
</asp:Content>