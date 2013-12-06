#NOTE: This code sucks!!  I hacked it together it like crazy

######  CONFIG  ######
$inpath = ".\"
$outFolder = "Scripts"

$outputDeclaration = "endgate.d.ts"

$outputDeclarationPath = $outFolder + "\" + $outputDeclaration

# Since TypeScript will not push imports into declaration files I need to append the alias via the build step
Add-Content $outputDeclarationPath "import eg = EndGate;"
Write-Host "done" -ForegroundColor Green