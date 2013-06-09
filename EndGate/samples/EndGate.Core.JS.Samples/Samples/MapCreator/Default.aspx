<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.JS.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.JS.Samples.Samples.MapBuilder.Default" %>

<asp:Content ID="Content4" ContentPlaceHolderID="HeadContent" runat="server">
    <style>
        canvas {
            border: 1px solid black;
        }

        #builderPane {
            position: absolute;
            width: 100%;
            left: 0;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <ul class="breadcrumb">
        <li><a href="<%: ResolveUrl("~/") %>">EndGate JavaScript Samples</a> <span class="divider">/</span></li>
        <li class="active">Map Creator</li>
    </ul>

    <div class="page-header">
        <h2>Map Creator</h2>
        <p>Demonstrates a accumulation of EndGate assets to help create SquareTileMaps visually.</p>
    </div>

    <div id="setupPane" class="form-horizontal well">
        <h3>Setup</h3>
        <ul class="nav nav-tabs">
            <li class="active">
                <a href="#createNew" data-toggle="tab">Create New</a>
            </li>
            <li class="">
                <a href="#loadSaved" data-toggle="tab">Load Saved</a>
            </li>
        </ul>
        <div class="tabbable">
            <div class="tab-content">
                <div class="tab-pane active" id="createNew">
                    <div class="control-group">
                        <label class="control-label" for="dimensionRows">Map Dimensions: </label>
                        <div class="controls">
                            <input id="dimensionRows" class="input-small" type="text" value="15" placeholder="Rows..." />
                            X
                    <input id="dimensionColumns" class="input-small" type="text" value="15" placeholder="Columns..." />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="tileSizeWidth">Tile Size (Pixels): </label>
                        <div class="controls">
                            <input id="tileSizeWidth" class="input-small" type="text" value="32" placeholder="Width..." />
                            X
                    <input id="tileSizeHeight" class="input-small" type="text" value="32" placeholder="Height..." />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="spriteSheetUrl">Sprite Sheet Url: </label>
                        <div class="controls">
                            <input id="spriteSheetUrl" type="text" class="input-xxlarge" value="http://endgate.azurewebsites.net/Samples/RawRPG/images/wood_tileset_3.png" placeholder="Spritesheet URL..." />
                        </div>
                    </div>
                    <div class="form-actions">
                        <button id="createMap" class="btn btn-primary">Create</button>
                        <button id="resetSetup" class="btn">Reset</button>
                    </div>
                </div>
                <div class="tab-pane" id="loadSaved">
                    <div class="control-group">
                        <label class="control-label" for="savedMaps">Saved Maps: </label>
                        <div class="controls">
                            <select id="savedMaps"></select>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="savedMaps">Load From Text: </label>
                        <div class="controls">
                            <textarea class="input-xlarge" id="loadText" rows="3"></textarea>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button id="loadMap" class="btn btn-primary disabled">Load Saved</button>
                        <button id="loadFromText" class="btn btn-primary">Load Output Text</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="blockWrapper">
        <div id="builderPane" class="hide" style="padding-left: 25px;">
            <p class="row">Press space to click and drag around the map.  Select tiles from the Sprite Sheet viewer on the right (left click) and then fill the map on the left (left click).  Clear selections or tiles with a right click.</p>

            <div class="row">
                <div class="form-vertical well pull-left" id="mapBuilderUtilities">
                    <div class="pull-left">
                        <select id="layers" style="margin-bottom: 0px;">
                            <option value="0">Background</option>
                        </select>

                        <input id="layerName" type="text" class="input-medium" value="" style="margin-left: 30px; margin-bottom: 0px;" placeholder="Layer Name..." />
                        <button id="addLayer" class="btn">Add Layer</button>
                    </div>

                    <div class="pull-left" style="margin-left: 50px;">
                        <select id="outputOptions" style="margin-bottom: 0px">
                            <option value="0">Save Text (Can be loaded by anyone using Map Builder)</option>
                            <option value="1">Code (Creates Square Tile Map, much like Raw RPG)</option>
                            <option value="2">Image (png)</option>
                        </select>
                        <button id="output" class="btn">Output</button>
                    </div>

                    <div class="pull-right">
                        <span id="saveDialog"></span>
                        <input id="saveName" type="text" class="input-medium" value="" style="margin-bottom: 0px;" placeholder="Save Name..." />
                        <button id="save" class="btn">Save</button>
                    </div>
                </div>
            </div>

            <div class="row">
                <div id="mapBuilder" class="form-vertical well pull-left" style="height: 600px;">
                </div>
                <div id="spriteSheetViewer" class="form-vertical well pull-left" style="height: 600px;">
                </div>
            </div>

            <div class="row form-vertical well">
                <fieldset>
                    <legend>Output</legend>
                    <div id="outputPanel"></div>
                </fieldset>
            </div>
        </div>
    </div>

    <script data-typescript="true" src="GridEntry.js"></script>
    <script data-typescript="true" src="LayerManager.js"></script>
    <script data-typescript="true" src="MapBuilder.js"></script>    
    <script data-typescript="true" src="SpriteSheetViewer.js"></script>
    <script data-typescript="true" src="TileHighlighter.js"></script>
    <script data-typescript="true" src="TileFiller.js"></script>
    <script data-typescript="true" src="TileSelector.js"></script>
    <script data-typescript="true" src="CameraDragController.js"></script>
    <script data-typescript="true" src="CameraZoomController.js"></script>
    <script data-typescript="true" src="SetupManager.js"></script>
    <script data-typescript="true" src="PersistenceManager.js"></script>
    <script data-typescript="true" src="OutputHandler.js"></script>
    <script data-typescript="true" src="Main.js"></script>
</asp:Content>
