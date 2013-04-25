<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.Client.JS.Samples.Samples.Sprites.Default" %>

<asp:Content ID="Content4" ContentPlaceHolderID="HeadContent" runat="server">
    <link href="../../Content/themes/base/jquery-ui.css" rel="stylesheet" />
    <style>
        .slider-horizontal {
            float: left;
            width: 125px;
            height: 10px;
            margin: 7px;
            font-size: 12px;
        }

        .ui-slider-handle {
            border-color: #317eac;
        }

        .redColorPicker .ui-slider-range {
            background: #ef2929;
        }

        .redColorPicker .ui-slider-handle {
            border-color: #ef2929;
        }

        .greenColorPicker .ui-slider-range {
            background: #8ae234;
        }

        .greenColorPicker .ui-slider-handle {
            border-color: #8ae234;
        }

        .blueColorPicker .ui-slider-range {
            background: #729fcf;
        }

        .blueColorPicker .ui-slider-handle {
            border-color: #729fcf;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <ul class="breadcrumb">
        <li><a href="<%: ResolveUrl("~/") %>">EndGate JavaScript Samples</a> <span class="divider">/</span></li>
        <li class="active">Sprites</li>
    </ul>

    <div class="page-header">
        <h2>Sprites</h2>
        <p>Demonstrates how to use the sprites (images) graphics library.</p>
    </div>

    <div class="row well ui-widget-content span8" style="margin-left:0">
        <div class="span2 well" style="margin-bottom: 0px; height: 148px;">
            <h4 class="text-center">Rotation</h4>
            <div id="rotationSlider" class="slider-horizontal"></div>
            <h4 class="text-center">Position</h4>
            <div id="positionXSlider" class="slider-horizontal"></div>
            <div id="positionYSlider" class="slider-horizontal"></div>
        </div>
        <div class="span2 well" style="margin-bottom: 0px; height: 148px;">
            <h4 class="text-center">Opacity</h4>
            <div id="opacitySlider" class="slider-horizontal"></div>
            <h4 class="text-center">Size</h4>
            <div id="widthSlider" class="slider-horizontal"></div>
            <div id="heightSlider" class="slider-horizontal"></div>
        </div>
        <div class="span2 well text-center" style="margin-bottom: 0px; height: 148px;">
            <h4 class="text-center">Animate</h4>
            <p>
                <button animation="Position" class="spriteAnimator btn" style="width: 100%;">Position</button>
                </p>
            <p>
                <button animation="Rotation" class="spriteAnimator btn" style="width: 100%;">Rotation</button>
            </p>
            <p>
                <button animation="Size" class="spriteAnimator btn" style="width: 45%;">Size</button>
                <button animation="Opacity" class="spriteAnimator btn" style="width: 45%;">Opac</button>
            </p>
        </div>
    </div>

    <div class="row">        
        <div id="gameHolder" class="well span8" style="height: 400px;">
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="../../Scripts/jquery-ui-1.10.2.js"></script>
    <script src="assetsSprites.js"></script>
    <script src="mainSprites.js"></script>
</asp:Content>
