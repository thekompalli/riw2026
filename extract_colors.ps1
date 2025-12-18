Add-Type -AssemblyName System.Drawing

$imagePath = "$PSScriptRoot\src\public\riw-logo.png"

if (-not (Test-Path $imagePath)) {
    Write-Host "Error: Image not found at $imagePath"
    exit 1
}

$bitmap = [System.Drawing.Bitmap]::FromFile($imagePath)
$width = $bitmap.Width
$height = $bitmap.Height

$colors = @{}

# Scan pixels (step 10 to be faster)
for ($x = 0; $x -lt $width; $x += 5) {
    for ($y = 0; $y -lt $height; $y += 5) {
        $pixel = $bitmap.GetPixel($x, $y)
        
        if ($pixel.A -lt 200) { continue } # Skip transparent/semi-transparent

        # Quantize to reduce noise
        $r = [Math]::Round($pixel.R / 10) * 10
        $g = [Math]::Round($pixel.G / 10) * 10
        $b = [Math]::Round($pixel.B / 10) * 10
        
        $key = "$r,$g,$b"
        if ($colors.ContainsKey($key)) {
            $colors[$key]++
        } else {
            $colors[$key] = 1
        }
    }
}

$sortedColors = $colors.GetEnumerator() | Sort-Object -Property Value -Descending | Select-Object -First 5

Write-Host "Top Colors:"
foreach ($color in $sortedColors) {
    $rgb = $color.Key.Split(',')
    $r = [int]$rgb[0]
    $g = [int]$rgb[1]
    $b = [int]$rgb[2]
    $hex = "#{0:X2}{1:X2}{2:X2}" -f $r, $g, $b
    Write-Host "$hex (Count: $($color.Value))"
}

$bitmap.Dispose()
