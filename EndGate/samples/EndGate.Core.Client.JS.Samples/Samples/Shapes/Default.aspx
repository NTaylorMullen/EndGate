<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.Client.JS.Samples.Samples.Shapes.Default" %>

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
        <li class="active">Shapes</li>
    </ul>

    <div class="page-header">
        <h2>Shapes</h2>
        <p>Demonstrates how to use the shapes graphics library.</p>
    </div>

    <div class="row well ui-widget-content">
        <div class="span1 well" style="margin: 0px; height: 148px;">
            <h4 class="text-center">Shape</h4>
            <button shape="Rectangle" class="shapeBuilder btn btn-block">Rect</button>
            <button shape="Circle" class="shapeBuilder btn btn-block">Circle</button>
        </div>
        <div class="span2 well" style="margin-bottom: 0px; height: 148px;">
            <h4 class="text-center">Color</h4>
            <div id="redColorPicker" class="slider-horizontal redColorPicker"></div>
            <div id="greenColorPicker" class="slider-horizontal greenColorPicker"></div>
            <div id="blueColorPicker" class="slider-horizontal blueColorPicker"></div>
        </div>
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
                <button animation="Position" class="shapeAnimator btn" style="width: 100%;">Position</button>
                </p>
            <p>
                <button animation="Rotation" class="shapeAnimator btn" style="width: 100%;">Rotation</button>
            </p>
            <p>
                <button animation="Size" class="shapeAnimator btn" style="width: 45%;">Size</button>
                <button animation="Opacity" class="shapeAnimator btn" style="width: 45%;">Opac</button>
            </p>
        </div>
    </div>

    <div class="row">
        <div class="span3 well ui-widget-content" style="margin-left: 0px; height: 446px; width: 180px;">
            <div class="span2 well" style="margin-left: 0px; height: 148px;">
                <h4 class="text-center">Border</h4>
                <div id="borderThickness" class="slider-horizontal"></div>
                <div id="borderRed" class="slider-horizontal redColorPicker"></div>
                <div id="borderGreen" class="slider-horizontal greenColorPicker"></div>
                <div id="borderBlue" class="slider-horizontal blueColorPicker"></div>
            </div>

            <div class="span2 well" style="margin-left: 0px; height: 198px;">
                <h4 class="text-center">Shadow</h4>
                <div id="shadowX" class="slider-horizontal"></div>
                <div id="shadowY" class="slider-horizontal"></div>
                <div id="shadowColorRed" class="slider-horizontal redColorPicker"></div>
                <div id="shadowColorGreen" class="slider-horizontal greenColorPicker"></div>
                <div id="shadowColorBlue" class="slider-horizontal blueColorPicker"></div>
                <div id="shadowBlur" class="slider-horizontal"></div>
            </div>
        </div>
        <div id="gameHolder" class="well span8" style="height: 446px; width: 678px;">
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="../../Scripts/jquery-ui-1.10.2.js"></script>
    <script src="assetsShapes.js"></script>
    <script src="mainShapes.js"></script>
</asp:Content>
