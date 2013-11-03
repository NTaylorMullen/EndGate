######  CONFIG  ######
$outFolder = "Scripts"

$outputDeclaration = "endgate.d.ts"

$outputDeclarationPath = $outFolder + "\" + $outputDeclaration

Add-Content $outputDeclarationPath "<reference path='typings/pixi/pixi.d.ts' />"
# Since TypeScript will not push imports into declaration files I need to append the alias via the build step
Add-Content $outputDeclarationPath "import eg = EndGate;"
Write-Host "done" -ForegroundColor Green