<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.JS.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.JS.Samples.Samples.Text.Default" %>

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

        #gameHolder {
            position: relative;
        }

        .control-holder {
            position: absolute;
            top: 0;
            left: 0;
            z-index:1000;
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

        select {
            margin-bottom: 0px!important;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <ul class="breadcrumb">
        <li><a href="<%: ResolveUrl("~/") %>">EndGate JavaScript Samples</a> <span class="divider">/</span></li>
        <li class="active">Text</li>
    </ul>

    <div class="page-header">
        <h2>Text</h2>
        <p>Demonstrates how to use the Text2d object within the graphics library.</p>
    </div>

    <div class="row well ui-widget-content">
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
            <h4 class="text-center">Font Size</h4>
            <div id="fontSizeSlider" class="slider-horizontal"></div>
        </div>
        <div class="span2 well text-center" style="margin-bottom: 0px; height: 148px;">
            <h4 class="text-center">Animate</h4>
            <p>
                <button animation="Position" class="textAnimator btn" style="width: 100%;">Position</button>
            </p>
            <p>
                <button animation="Rotation" class="textAnimator btn" style="width: 100%;">Rotation</button>
            </p>
            <p>
                <button animation="Size" class="textAnimator btn" style="width: 45%;">Size</button>
                <button animation="Opacity" class="textAnimator btn" style="width: 45%;">Opac</button>
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
            <div class="controls control-holder">
                <p>
                    <select id="fontFamilySelect">
                        <option value="">-Font Family-</option>
                    </select>
                </p>
                <p>
                    <select id="fontStyleSelect">
                        <option value="">-Font Style-</option>
                    </select>
                </p>
                <p>
                    <select id="fontWeightSelect">
                        <option value="">-Font Weight-</option>
                        <option value="normal">normal</option>
                        <option value="bold">bold</option>
                        <option value="bolder">bolder</option>
                        <option value="lighter">lighter</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                    </select>
                </p>
            </div>
        </div>
    </div>
    
    <script src="../../Scripts/jquery-ui-1.10.2.js"></script>
    <script typescript="true" src="assetsText.js"></script>
    <script typescript="true" src="mainText.js"></script>
</asp:Content>

