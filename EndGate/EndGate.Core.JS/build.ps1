#NOTE: This code sucks!!  I hacked it together it like crazy

######  CONFIG  ######
$inpath = ".\"
$outFolder = "Scripts"

$outputJS = "endgate.js"
$outputTS = "endgate.ts"
$outputDeclaration = "endgate.d.ts"

$outputJSPath = $outFolder + "\" + $outputJS
$outputTSPath = $outFolder + "\" + $outputTS
$outputDeclarationPath = $outFolder + "\" + $outputDeclaration

######  DEPENDENCY RESOLUTION  ######
$allFiles = Get-ChildItem -path $inpath -recurse |?{ ! $_.PSIsContainer } |?{($_.name).contains(".ts")} |?{!($_.name).Contains($outputTS)} |?{!($_.name).Contains($outputDeclaration)}

Function GetDependencies($file)
{
    $content = Get-Content $file.FullName
    return $content -match "^/// <reference path=`"(.*)`"" | %{$_.Split("`"")[1]}
}

Function GetFile([string]$filePathName)
{
    $pieces = $filePathName.Split("/");
    $filename;

    if($pieces.Length -gt 1)
    {
        $filename = $pieces[$pieces.Length - 1]
    }
    else
    {
        $filename = $pieces[0];
    }

    Foreach($file in $allFiles)
    {
        if($file.Name.Trim() -eq $filename.Trim())
        {
            return $file;
        }
    }
}

Function DependenciesContainFile($needle, $haystack)
{
    $i = 0

    Foreach($file in $haystack)
    {
        $i++;
        
        if($file.Name -eq $needle.Name)
        {
            return $i;
        }
    }

    return -1;
}

Function AddDependencies($baseFile)
{   
    $location = DependenciesContainFile ($baseFile) ($script:dependencyArray)
    if($location -eq -1)
    {
        $dependencies = GetDependencies($baseFile);
        
        Foreach($dependency in $dependencies)
        {           
            $file = GetFile($dependency)
            $location = DependenciesContainFile($file) ($script:pendingAdditions)
            
            if($location -ne -1)
            {
                continue;
            }

            $script:pendingAdditions += $file
            AddDependencies ($file);
            $script:pendingAdditions = $script:pendingAdditions |? {$_.Name -ne $file.Name}
        }

        $location = DependenciesContainFile ($baseFile) ($script:dependencyArray)
        if($location -eq -1)
        {
            $script:dependencyArray += $baseFile;
        }
    }
}

$dependencyArray = @()
$pendingAdditions = @()

Write-Host "Resolving file dependencies... " -NoNewline -ForegroundColor Yellow
Foreach($file in $allFiles)
{
    AddDependencies ($file) ($dependencyArray);
}
Write-Host "done" -ForegroundColor Green

# Files in the order they must be combined

######  TYPESCRIPT DECLARATION FILE  ######
Write-Host "Building $outputDeclaration... " -NoNewline -ForegroundColor Yellow
$allFilesStr = ""
foreach($file in $dependencyArray)
{
	if($file)
	{
		$allFilesStr += "`"" + $file.FullName + "`" "
	}
}

Clear-Content $outputDeclarationPath

tsc --out $outputDeclarationPath --declaration $allFilesStr

# Since TypeScript will not push imports into declaration files I need to append the alias via the build step
Add-Content $outputDeclarationPath "import eg = EndGate;"
Write-Host "done" -ForegroundColor Green

######  TYPESCRIPT FILE  ######
Write-Host "Building $outputTS... " -NoNewline -ForegroundColor Yellow

$files = $dependencyArray;
$referenceReplacer = "^/// <reference( )+?path.*$"
Remove-Item $outputTSPath -Force -ErrorAction SilentlyContinue
foreach ($file in $files) {
    if ($file)
    {        
        Add-Content -Path $outputTSPath -Value "/* $file */"
        Get-Content -Path $file.FullName | Foreach-Object {$_ -replace $referenceReplacer, ""} | Add-Content -Path $outputTSPath
    }
}
Write-Host "done" -ForegroundColor Green

######  JS FILE  ######
Write-Host "Building $outputJS... " -NoNewline -ForegroundColor Yellow

tsc $outputTSPath

Write-Host "done" -ForegroundColor Green
