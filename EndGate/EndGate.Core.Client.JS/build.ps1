#NOTE: This code sucks!!  I hacked it together it like crazy

$inpath = ".\"

$outputFile = "endGate.core.client.ts"

$outputFilePath = "Scripts\" + $outputFile

$allFiles = Get-ChildItem -path $inpath -recurse |?{ ! $_.PSIsContainer } |?{($_.name).contains(".ts")} |?{!($_.name).Contains($outputFile)}

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

Foreach($file in $allFiles)
{
    AddDependencies ($file) ($dependencyArray);
}

# Files in the order they must be combined
$files = $dependencyArray;

Write-Host "Dependencies resolved as order: " + $dependencyArray

$referenceReplacer = "^/// <reference( )+?path.*$"

Write-Host "outputFile " $outputFilePath "... " -NoNewline -ForegroundColor Yellow
Remove-Item $outputFilePath -Force -ErrorAction SilentlyContinue
foreach ($file in $files) {
    if ($file)
    {        
        Add-Content -Path $outputFilePath -Value "/* $file.Name */"
        Get-Content -Path $file.FullName | Foreach-Object {$_ -replace $referenceReplacer, ""} | Add-Content -Path $outputFilePath
    }
}
Write-Host "done" -ForegroundColor Green