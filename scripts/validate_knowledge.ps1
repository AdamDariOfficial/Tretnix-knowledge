param(
    [string]$RepositoryRoot = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($RepositoryRoot)) {
    $RepositoryRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
}
$Root = [System.IO.Path]::GetFullPath($RepositoryRoot)
$RootPrefix = $Root.TrimEnd("\") + "\"
$Errors = New-Object System.Collections.Generic.List[string]
$StrictUtf8 = New-Object System.Text.UTF8Encoding -ArgumentList @($false, $true)

$RequiredPaths = @(
    "README.md",
    "AGENTS.md",
    "TRETNIX_MASTER_CONTEXT.md",
    "DEVELOPMENT_STANDARDS.md",
    "DECISIONS.md",
    "REPOSITORY_INDEX.md",
    "CURRENT_STATE.md",
    "SOURCE_ARTIFACT_REGISTER.md",
    "templates\READ_ONLY_AUDIT.md",
    "templates\CONTROLLED_CHANGE_PACKAGE_MANIFEST.md",
    "skills\CONTROLLED_CHANGE_PACKAGE.md",
    "compiled\README.md"
)

$CanonicalMetadataFiles = @(
    "README.md",
    "TRETNIX_MASTER_CONTEXT.md",
    "DEVELOPMENT_STANDARDS.md",
    "DECISIONS.md",
    "REPOSITORY_INDEX.md",
    "HOSPITALITY_FAMILY.md",
    "BEAUTY_WELLNESS_FAMILY.md",
    "PROFESSIONAL_SERVICES_FAMILY.md",
    "HOME_LOCAL_SERVICES_FAMILY.md",
    "PORTFOLIO_AND_VERTICALS.md",
    "CURRENT_STATE.md",
    "CHAT_RETENTION_AND_HANDOFF.md",
    "SOURCE_ARTIFACT_REGISTER.md"
)

function Add-ValidationError([string]$Message) {
    $script:Errors.Add($Message)
}

function Read-Utf8Strict([string]$Path) {
    return [System.IO.File]::ReadAllText($Path, $script:StrictUtf8)
}

function Get-RelativeDisplayPath([string]$Path) {
    $FullPath = [System.IO.Path]::GetFullPath($Path)
    if ($FullPath.StartsWith($script:RootPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
        return $FullPath.Substring($script:RootPrefix.Length).Replace("\", "/")
    }
    return $FullPath.Replace("\", "/")
}

function Get-LfNormalizedBytes([string]$Path) {
    $Bytes = [System.IO.File]::ReadAllBytes($Path)
    $Normalized = New-Object System.Collections.Generic.List[byte]
    for ($Index = 0; $Index -lt $Bytes.Length; $Index++) {
        if ($Bytes[$Index] -eq 13 -and ($Index + 1) -lt $Bytes.Length -and $Bytes[$Index + 1] -eq 10) {
            $Normalized.Add([byte]10)
            $Index++
        }
        else {
            $Normalized.Add($Bytes[$Index])
        }
    }
    return $Normalized.ToArray()
}

function Get-BytesSha256([byte[]]$Bytes) {
    $Sha = [System.Security.Cryptography.SHA256]::Create()
    try {
        return ([System.BitConverter]::ToString($Sha.ComputeHash($Bytes))).Replace("-", "").ToLowerInvariant()
    }
    finally {
        $Sha.Dispose()
    }
}


function Invoke-GitCheck([string[]]$Arguments, [string]$Label) {
    $PreviousPreference = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    try {
        $Output = & git -C $Root @Arguments 2>&1
        $ExitCode = $LASTEXITCODE
    }
    finally {
        $ErrorActionPreference = $PreviousPreference
    }
    $Lines = @($Output | ForEach-Object { $_.ToString() })
    if ($ExitCode -ne 0) {
        Add-ValidationError "$Label failed: $($Lines -join ' | ')"
    }
}

function Test-UntrackedTextWhitespace {
    $TextExtensions = @(
        ".md", ".json", ".py", ".ps1", ".psm1", ".yml", ".yaml",
        ".txt", ".toml", ".ini", ".cfg", ".csv", ".ts", ".tsx",
        ".js", ".jsx", ".css", ".scss", ".html", ".xml"
    )
    $TextNames = @(".gitignore", ".gitattributes", ".editorconfig")

    $PreviousPreference = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    try {
        $Output = & git -C $Root ls-files --others --exclude-standard -z 2>&1
        $ExitCode = $LASTEXITCODE
    }
    finally {
        $ErrorActionPreference = $PreviousPreference
    }
    if ($ExitCode -ne 0) {
        Add-ValidationError "unable to enumerate untracked files: $(@($Output) -join ' | ')"
        return
    }

    $Raw = ($Output | ForEach-Object { $_.ToString() }) -join ""
    foreach ($Relative in @($Raw -split [char]0 | Where-Object { -not [string]::IsNullOrWhiteSpace($_) })) {
        $Path = Join-Path $Root $Relative
        if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) { continue }
        $Name = [System.IO.Path]::GetFileName($Path).ToLowerInvariant()
        $Extension = [System.IO.Path]::GetExtension($Path).ToLowerInvariant()
        if (($TextExtensions -notcontains $Extension) -and ($TextNames -notcontains $Name)) { continue }

        try {
            $Text = Read-Utf8Strict $Path
        }
        catch {
            Add-ValidationError "invalid UTF-8 in untracked text file: $($Relative.Replace('\', '/'))"
            continue
        }

        $Lines = [System.Text.RegularExpressions.Regex]::Split($Text, "\r\n|\n|\r")
        for ($Index = 0; $Index -lt $Lines.Count; $Index++) {
            if ($Lines[$Index] -match '[ \t]+$') {
                Add-ValidationError "trailing whitespace in untracked file: $($Relative.Replace('\', '/')):$($Index + 1)"
            }
        }
    }
}

foreach ($Relative in $RequiredPaths) {
    if (-not (Test-Path -LiteralPath (Join-Path $Root $Relative))) {
        Add-ValidationError "missing required path: $($Relative.Replace('\', '/'))"
    }
}

$MarkdownFiles = @(Get-ChildItem -LiteralPath $Root -Recurse -File -Filter "*.md" -ErrorAction Stop)
foreach ($File in $MarkdownFiles) {
    try {
        [void](Read-Utf8Strict $File.FullName)
    }
    catch {
        Add-ValidationError "invalid UTF-8: $(Get-RelativeDisplayPath $File.FullName) ($($_.Exception.Message))"
    }
}

foreach ($Relative in $CanonicalMetadataFiles) {
    $Path = Join-Path $Root $Relative
    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) { continue }
    try {
        $Text = Read-Utf8Strict $Path
        if ($Text -notmatch '\*\*Versione:\*\*') {
            Add-ValidationError "missing Versione metadata: $Relative"
        }
        if ($Text -notmatch '\*\*Aggiornato:\*\*') {
            Add-ValidationError "missing Aggiornato metadata: $Relative"
        }
    }
    catch {
        # Invalid UTF-8 is already reported above.
    }
}

$LocalLinkRegex = New-Object System.Text.RegularExpressions.Regex -ArgumentList '(?<!!)\[[^\]]*\]\(([^)]+)\)'
foreach ($File in $MarkdownFiles) {
    try { $Text = Read-Utf8Strict $File.FullName }
    catch { continue }

    foreach ($Match in $LocalLinkRegex.Matches($Text)) {
        $RawTarget = $Match.Groups[1].Value.Trim()
        if ($RawTarget.StartsWith("<") -and $RawTarget.EndsWith(">")) {
            $RawTarget = $RawTarget.Substring(1, $RawTarget.Length - 2)
        }
        if ([string]::IsNullOrWhiteSpace($RawTarget)) { continue }
        if ($RawTarget.StartsWith("#") -or
            $RawTarget.StartsWith("http://", [System.StringComparison]::OrdinalIgnoreCase) -or
            $RawTarget.StartsWith("https://", [System.StringComparison]::OrdinalIgnoreCase) -or
            $RawTarget.StartsWith("mailto:", [System.StringComparison]::OrdinalIgnoreCase) -or
            $RawTarget.StartsWith("tel:", [System.StringComparison]::OrdinalIgnoreCase)) {
            continue
        }

        $CleanTarget = ($RawTarget -split '#', 2)[0]
        $CleanTarget = ($CleanTarget -split '\?', 2)[0]
        if ([string]::IsNullOrWhiteSpace($CleanTarget)) { continue }

        try {
            $DecodedTarget = [System.Uri]::UnescapeDataString($CleanTarget)
            $Target = [System.IO.Path]::GetFullPath((Join-Path $File.DirectoryName $DecodedTarget))
        }
        catch {
            Add-ValidationError "invalid local link: $(Get-RelativeDisplayPath $File.FullName) -> $RawTarget"
            continue
        }

        $InsideRoot = $Target.Equals($Root, [System.StringComparison]::OrdinalIgnoreCase) -or
            $Target.StartsWith($RootPrefix, [System.StringComparison]::OrdinalIgnoreCase)
        if (-not $InsideRoot) {
            Add-ValidationError "local link escapes repository: $(Get-RelativeDisplayPath $File.FullName) -> $RawTarget"
            continue
        }
        if (-not (Test-Path -LiteralPath $Target)) {
            Add-ValidationError "broken local link: $(Get-RelativeDisplayPath $File.FullName) -> $RawTarget"
        }
    }
}

$JsonFiles = @(Get-ChildItem -LiteralPath $Root -Recurse -File -Filter "*.json" -ErrorAction Stop)
foreach ($File in $JsonFiles) {
    try {
        $JsonText = Read-Utf8Strict $File.FullName
        [void]($JsonText | ConvertFrom-Json)
    }
    catch {
        Add-ValidationError "invalid JSON: $(Get-RelativeDisplayPath $File.FullName) ($($_.Exception.Message))"
    }
}

$DecisionPath = Join-Path $Root "DECISIONS.md"
if (Test-Path -LiteralPath $DecisionPath -PathType Leaf) {
    try {
        $DecisionText = Read-Utf8Strict $DecisionPath
        $DecisionMatches = [System.Text.RegularExpressions.Regex]::Matches(
            $DecisionText,
            '^## TRX-DEC-(\d{3})\b',
            [System.Text.RegularExpressions.RegexOptions]::Multiline
        )
        $Ids = @($DecisionMatches | ForEach-Object { [int]$_.Groups[1].Value })
        if ($Ids.Count -eq 0) {
            Add-ValidationError "no TRX-DEC identifiers found"
        }
        else {
            $UniqueIds = @($Ids | Sort-Object -Unique)
            if ($UniqueIds.Count -ne $Ids.Count) {
                Add-ValidationError "duplicate TRX-DEC identifier"
            }
            $SortedIds = @($Ids | Sort-Object)
            if (($Ids -join ',') -ne ($SortedIds -join ',')) {
                Add-ValidationError "TRX-DEC identifiers are not ordered"
            }
            $ExpectedIds = @(1..($Ids | Measure-Object -Maximum).Maximum)
            if (($Ids -join ',') -ne ($ExpectedIds -join ',')) {
                $Missing = @($ExpectedIds | Where-Object { $Ids -notcontains $_ })
                Add-ValidationError "TRX-DEC sequence has gaps: [$($Missing -join ', ')]"
            }
        }
    }
    catch {
        # Invalid UTF-8 is already reported above.
    }
}

$FamilyKitsRoot = Join-Path $Root "family-kits"
if (Test-Path -LiteralPath $FamilyKitsRoot -PathType Container) {
    $FamilyManifests = @(Get-ChildItem -LiteralPath $FamilyKitsRoot -Recurse -File -Filter "MANIFEST.json" | Sort-Object FullName)
    foreach ($ManifestFile in $FamilyManifests) {
        try {
            $FamilyManifest = (Read-Utf8Strict $ManifestFile.FullName) | ConvertFrom-Json
        }
        catch {
            continue
        }

        if ($null -eq $FamilyManifest.files -or -not ($FamilyManifest.files -is [System.Array])) {
            Add-ValidationError "manifest files is not a list: $(Get-RelativeDisplayPath $ManifestFile.FullName)"
            continue
        }

        $Seen = @{}
        foreach ($Entry in @($FamilyManifest.files)) {
            if ($null -eq $Entry -or $null -eq $Entry.path -or [string]::IsNullOrWhiteSpace([string]$Entry.path)) {
                Add-ValidationError "manifest entry without path: $(Get-RelativeDisplayPath $ManifestFile.FullName)"
                continue
            }
            $Relative = [string]$Entry.path
            if ($Seen.ContainsKey($Relative)) {
                Add-ValidationError "duplicate manifest path: $(Get-RelativeDisplayPath $ManifestFile.FullName) -> $Relative"
            }
            $Seen[$Relative] = $true
            $Target = Join-Path $ManifestFile.DirectoryName $Relative
            if (-not (Test-Path -LiteralPath $Target -PathType Leaf)) {
                Add-ValidationError "manifest file missing: $(Get-RelativeDisplayPath $Target)"
                continue
            }

            $Normalized = Get-LfNormalizedBytes $Target
            $ExpectedSize = $null
            if ($Entry.PSObject.Properties.Name -contains "size") {
                $ExpectedSize = [long]$Entry.size
            }
            elseif ($Entry.PSObject.Properties.Name -contains "size_bytes") {
                $ExpectedSize = [long]$Entry.size_bytes
            }
            if ($null -ne $ExpectedSize -and $Normalized.Length -ne $ExpectedSize) {
                Add-ValidationError "manifest normalized size mismatch: $(Get-RelativeDisplayPath $Target)"
            }
            if ($Entry.PSObject.Properties.Name -contains "sha256" -and -not [string]::IsNullOrWhiteSpace([string]$Entry.sha256)) {
                $ActualHash = Get-BytesSha256 $Normalized
                if ($ActualHash -ne ([string]$Entry.sha256).ToLowerInvariant()) {
                    Add-ValidationError "manifest normalized SHA-256 mismatch: $(Get-RelativeDisplayPath $Target)"
                }
            }
        }
    }
}

$TrackedFiles = @()
$PreviousPreference = $ErrorActionPreference
$ErrorActionPreference = "Continue"
try {
    $TrackedOutput = & git -C $Root ls-files 2>&1
    $GitExitCode = $LASTEXITCODE
}
finally {
    $ErrorActionPreference = $PreviousPreference
}
if ($GitExitCode -eq 0) {
    $TrackedFiles = @($TrackedOutput | ForEach-Object { $_.ToString() } | Where-Object { -not [string]::IsNullOrWhiteSpace($_) })
}
else {
    $TrackedFiles = @(Get-ChildItem -LiteralPath $Root -Recurse -File -Force |
        Where-Object { $_.FullName -notlike "*\.git\*" } |
        ForEach-Object { Get-RelativeDisplayPath $_.FullName })
}

$SensitiveSuffixes = @(".pem", ".key", ".p12", ".pfx")
foreach ($Relative in $TrackedFiles) {
    $NormalizedRelative = $Relative.Replace("/", "\")
    $Name = [System.IO.Path]::GetFileName($NormalizedRelative).ToLowerInvariant()
    $Extension = [System.IO.Path]::GetExtension($NormalizedRelative).ToLowerInvariant()
    if ($Name -eq ".env" -or $Name.StartsWith(".env.") -or $SensitiveSuffixes -contains $Extension) {
        Add-ValidationError "sensitive file is tracked: $($Relative.Replace('\', '/'))"
    }
    if ($Name.Contains("(2)")) {
        Add-ValidationError "historical duplicate suffix is tracked outside canonical naming: $($Relative.Replace('\', '/'))"
    }
}


Invoke-GitCheck -Arguments @("-c", "core.whitespace=cr-at-eol", "diff", "--check") -Label "git diff --check"
Invoke-GitCheck -Arguments @("-c", "core.whitespace=cr-at-eol", "diff", "--cached", "--check") -Label "git diff --cached --check"
Test-UntrackedTextWhitespace

if ($Errors.Count -gt 0) {
    Write-Host "Tretnix knowledge validation: FAILED" -ForegroundColor Red
    foreach ($ValidationError in $Errors) {
        Write-Host "- $ValidationError" -ForegroundColor Red
    }
    exit 1
}

Write-Host "Tretnix knowledge validation: PASSED" -ForegroundColor Green
Write-Host "Markdown files checked: $($MarkdownFiles.Count)"
Write-Host "JSON files checked: $($JsonFiles.Count)"
Write-Host "Decision sequence, local links, LF-normalized family manifests, sensitive filenames and staged/unstaged/untracked whitespace: valid"
exit 0
