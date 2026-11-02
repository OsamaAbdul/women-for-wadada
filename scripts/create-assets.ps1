Add-Type -AssemblyName System.Drawing

$logoPath = Join-Path $PSScriptRoot "..\public\logo.png"
$icoPath = Join-Path $PSScriptRoot "..\public\favicon.ico"
$appleTouchPath = Join-Path $PSScriptRoot "..\public\apple-touch-icon.png"
$fav32Path = Join-Path $PSScriptRoot "..\public\favicon-32x32.png"
$fav16Path = Join-Path $PSScriptRoot "..\public\favicon-16x16.png"
$ogImagePath = Join-Path $PSScriptRoot "..\public\og-image.png"

$src = [System.Drawing.Bitmap]::FromFile($logoPath)

function Resize-Bitmap($source, $targetWidth, $targetHeight) {
    $target = New-Object System.Drawing.Bitmap $targetWidth, $targetHeight
    $g = [System.Drawing.Graphics]::FromImage($target)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($source, 0, 0, $targetWidth, $targetHeight)
    $g.Dispose()
    return $target
}

# 1. Create apple-touch-icon (180x180)
$appleTouch = Resize-Bitmap $src 180 180
$appleTouch.Save($appleTouchPath, [System.Drawing.Imaging.ImageFormat]::Png)
$appleTouch.Dispose()

# 2. Create favicon-32x32
$fav32 = Resize-Bitmap $src 32 32
$fav32.Save($fav32Path, [System.Drawing.Imaging.ImageFormat]::Png)
$fav32.Dispose()

# 3. Create favicon-16x16
$fav16 = Resize-Bitmap $src 16 16
$fav16.Save($fav16Path, [System.Drawing.Imaging.ImageFormat]::Png)
$fav16.Dispose()

# 4. Create 256x256 PNG for favicon.ico
$icoBmp = Resize-Bitmap $src 256 256
$ms = New-Object System.IO.MemoryStream
$icoBmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
$pngBytes = $ms.ToArray()
$ms.Dispose()
$icoBmp.Dispose()

$icoMs = New-Object System.IO.MemoryStream
$bw = New-Object System.IO.BinaryWriter $icoMs

$bw.Write([UInt16]0) # Reserved
$bw.Write([UInt16]1) # Type: ICO
$bw.Write([UInt16]1) # Number of images

# Directory entry (16 bytes)
$bw.Write([Byte]0)   # Width: 0 = 256
$bw.Write([Byte]0)   # Height: 0 = 256
$bw.Write([Byte]0)   # Colors
$bw.Write([Byte]0)   # Reserved
$bw.Write([UInt16]1) # Color planes
$bw.Write([UInt16]32)# Bits per pixel
$bw.Write([UInt32]$pngBytes.Length) # Image size in bytes
$bw.Write([UInt32]22) # Offset of image data (6 header + 16 entry = 22)

# Write PNG bytes
$bw.Write($pngBytes)
$bw.Flush()

[System.IO.File]::WriteAllBytes($icoPath, $icoMs.ToArray())
$bw.Dispose()
$icoMs.Dispose()

# 5. Create rich 1200x630 OpenGraph / Twitter Social Media Preview Card (og-image.png)
$ogWidth = 1200
$ogHeight = 630
$ogBmp = New-Object System.Drawing.Bitmap $ogWidth, $ogHeight
$g = [System.Drawing.Graphics]::FromImage($ogBmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# Background gradient: Deep rich purple to dark violet
$rect = New-Object System.Drawing.Rectangle 0, 0, $ogWidth, $ogHeight
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $rect,
    [System.Drawing.Color]::FromArgb(255, 30, 7, 36),   # Deep plum / dark violet
    [System.Drawing.Color]::FromArgb(255, 15, 3, 20),   # Near-black plum
    [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal
)
$g.FillRectangle($bgBrush, $rect)
$bgBrush.Dispose()

# Accent glow / decorative card panel
$cardRect = New-Object System.Drawing.Rectangle 40, 40, ($ogWidth - 80), ($ogHeight - 80)
$cardBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(240, 255, 255, 255))
$g.FillRectangle($cardBrush, $cardRect)
$cardBrush.Dispose()

# Border around card
$borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 188, 0, 186), 4)
$g.DrawRectangle($borderPen, $cardRect)
$borderPen.Dispose()

# Draw Logo on the left (e.g. 380x380)
$logoSize = 420
$logoX = 80
$logoY = [int](($ogHeight - $logoSize) / 2)
$g.DrawImage($src, $logoX, $logoY, $logoSize, $logoSize)

# Text setup on the right
$fontFamily = New-Object System.Drawing.FontFamily("Arial")
$badgeFont = New-Object System.Drawing.Font($fontFamily, 14, [System.Drawing.FontStyle]::Bold)
$titleFont = New-Object System.Drawing.Font($fontFamily, 28, [System.Drawing.FontStyle]::Bold)
$themeFont = New-Object System.Drawing.Font($fontFamily, 18, [System.Drawing.FontStyle]::Regular)
$callFont = New-Object System.Drawing.Font($fontFamily, 15, [System.Drawing.FontStyle]::Bold)

$purpleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 188, 0, 186))
$darkBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 25, 25, 35))
$mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 80, 80, 95))

$textX = 520

$bullet = [char]0x2022
# Badge
$g.DrawString("ALL PROGRESSIVES CONGRESS (APC) $bullet NASARAWA STATE", $badgeFont, $purpleBrush, $textX, 100)

# Main Title
$titleRect = New-Object System.Drawing.RectangleF $textX, 135, 600, 120
$g.DrawString("NASARAWA PROGRESSIVE YOUNG WOMEN (NAS-PYW)", $titleFont, $darkBrush, $titleRect)

# Theme line
$themeTitleFont = New-Object System.Drawing.Font($fontFamily, 14, [System.Drawing.FontStyle]::Bold)
$g.DrawString("THEME:", $themeTitleFont, $purpleBrush, $textX, 275)

$themeRect = New-Object System.Drawing.RectangleF $textX, 305, 590, 110
$g.DrawString("Mobilising Nasarawa Young Women for Inclusive Leadership and Democratic Participation across all 13 LGAs.", $themeFont, $mutedBrush, $themeRect)

# Decorative bottom bar
$barPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 220, 220, 230), 2)
$g.DrawLine($barPen, $textX, 440, ($ogWidth - 80), 440)
$barPen.Dispose()

# Our Call
$g.DrawString("VOTE $bullet LEAD $bullet SPEAK UP $bullet SERVE", $callFont, $purpleBrush, $textX, 460)

$footerNoteFont = New-Object System.Drawing.Font($fontFamily, 12, [System.Drawing.FontStyle]::Regular)
$g.DrawString("Connecting young women in politics, governance & public service", $footerNoteFont, $mutedBrush, $textX, 495)

$g.Dispose()
$ogBmp.Save($ogImagePath, [System.Drawing.Imaging.ImageFormat]::Png)
$ogBmp.Dispose()
$src.Dispose()

Write-Host "All assets created successfully: favicon.ico, favicon-32x32.png, favicon-16x16.png, apple-touch-icon.png, og-image.png"
