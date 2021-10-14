# Variables

$fileLocation = "C:\CODE\PS"
$FileName = "SettingsSlice.json"
$SavetoFile = "$FileLocation\$FileName"

# there should be no need to update the script beyond this point


# Delete any previous versions of the report for in case

If (Test-Path $SavetoFile){
	# Remove-Item $SavetoFile
}

# Open the content
$json = ''

$resources = Get-AzResource | select ResourceType -Unique

foreach ($resource in $resources){

$name = $resource.ResourceType


$json += @"
`n{ `n "type":"$name", `n "icon":"/assets/img/azure/original/$name.svg" `n}`n,
"@
    
 }


$json = "$json"
write-output $json

$json >> $SavetoFile