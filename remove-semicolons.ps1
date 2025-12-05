# Remove semicolons from all JS/JSX files
Get-ChildItem -Path "frontend/src" -Recurse -Include *.js,*.jsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    # Remove semicolons at end of lines (but keep them in for loops)
    $newContent = $content -replace '([^;])\s*;\s*$', '$1' -replace '([^;])\s*;\s*(\r?\n)', '$1$2'
    # Remove semicolons before comments
    $newContent = $newContent -replace ';\s*\/\/', ' //' -replace ';\s*\/\*', ' /*'
    # Remove standalone semicolons on their own line
    $newContent = $newContent -replace '^\s*;\s*$', ''
    # Remove semicolons at end of statements (but be careful with for loops)
    $newContent = $newContent -replace '([^=<>!+\-*/&|?:;])\s*;\s*([^=<>!+\-*/&|?:;])', '$1$2'
    # More specific: remove semicolons after closing braces, parentheses, etc.
    $newContent = $newContent -replace '([})\]])\s*;\s*', '$1 '
    # Remove semicolons after return statements
    $newContent = $newContent -replace 'return\s+([^;]+)\s*;', 'return $1'
    # Remove semicolons after variable declarations
    $newContent = $newContent -replace '(\w+)\s*=\s*([^;]+)\s*;', '$1 = $2'
    # Remove semicolons after const/let/var
    $newContent = $newContent -replace '(const|let|var)\s+(\w+)\s*=\s*([^;]+)\s*;', '$1 $2 = $3'
    
    Set-Content -Path $_.FullName -Value $newContent -NoNewline
    Write-Host "Processed: $($_.Name)"
}

