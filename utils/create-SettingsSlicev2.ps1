# Variables

$fileLocation = "C:\CODE\PS"
$FileName = "SettingsSlice.json"
$SavetoFile = "$FileLocation\$FileName"

cd C:\CODE\azure-visual-intelligence\public\assets\img\azure\original
$files = (Get-childitem -Recurse) | where { ! $_.PSIsContainer } | %{ $_.FullName}

$json = ''

$files| %{
$name = $_.Substring(67,($_.Length-71))
$icon = $_.Substring(40);
$json += @"
`n{ `n "type":"$name", `n "icon":"$icon" `n}`n,
"@
}

write-output $json
$json >> $SavetoFile
