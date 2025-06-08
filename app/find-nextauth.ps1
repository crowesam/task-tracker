# PowerShell script to find all NextAuth usage in your project

Write-Host "🔍 Finding all NextAuth usage in your project..." -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

Write-Host "`n📁 Files importing from 'next-auth':" -ForegroundColor Yellow
Get-ChildItem -Path . -Include *.ts,*.tsx,*.js,*.jsx -Recurse | 
    Where-Object { $_.FullName -notmatch "node_modules|\.next" } |
    Select-String -Pattern "from ['""]next-auth" |
    Select-Object -Unique Path, LineNumber, Line

Write-Host "`n📁 Files importing from 'next-auth/react':" -ForegroundColor Yellow
Get-ChildItem -Path . -Include *.ts,*.tsx,*.js,*.jsx -Recurse | 
    Where-Object { $_.FullName -notmatch "node_modules|\.next" } |
    Select-String -Pattern "from ['""]next-auth/react" |
    Select-Object -Unique Path, LineNumber, Line

Write-Host "`n📁 Files using useSession:" -ForegroundColor Yellow
Get-ChildItem -Path . -Include *.ts,*.tsx,*.js,*.jsx -Recurse | 
    Where-Object { $_.FullName -notmatch "node_modules|\.next" } |
    Select-String -Pattern "useSession" |
    Select-Object -Unique Path, LineNumber, Line

Write-Host "`n📁 Files using SessionProvider:" -ForegroundColor Yellow
Get-ChildItem -Path . -Include *.ts,*.tsx,*.js,*.jsx -Recurse | 
    Where-Object { $_.FullName -notmatch "node_modules|\.next" } |
    Select-String -Pattern "SessionProvider" |
    Select-Object -Unique Path, LineNumber, Line

Write-Host "`n📁 Files using signIn or signOut:" -ForegroundColor Yellow
Get-ChildItem -Path . -Include *.ts,*.tsx,*.js,*.jsx -Recurse | 
    Where-Object { $_.FullName -notmatch "node_modules|\.next" } |
    Select-String -Pattern "signIn|signOut" |
    Select-Object -Unique Path, LineNumber, Line

Write-Host "`n📁 Files using getServerSession:" -ForegroundColor Yellow
Get-ChildItem -Path . -Include *.ts,*.tsx,*.js,*.jsx -Recurse | 
    Where-Object { $_.FullName -notmatch "node_modules|\.next" } |
    Select-String -Pattern "getServerSession" |
    Select-Object -Unique Path, LineNumber, Line

Write-Host "`n📁 NextAuth API routes:" -ForegroundColor Yellow
Get-ChildItem -Path . -Filter "*nextauth*" -Recurse | 
    Where-Object { $_.FullName -match "api[/\\]auth" -and $_.FullName -notmatch "node_modules|\.next" } |
    Select-Object FullName

Write-Host "`n📁 Files with NEXTAUTH environment variables:" -ForegroundColor Yellow
Get-ChildItem -Path . -Filter ".env*" | 
    Select-String -Pattern "NEXTAUTH" |
    Select-Object -Unique Path, LineNumber, Line

Write-Host "`n=============================================" -ForegroundColor Cyan
Write-Host "✅ Scan complete! Update all these files to use Stack Auth." -ForegroundColor Green