# Push local repository to remote GitHub repo (PowerShell)
# This script assumes you have git installed and are running from the repository root.
# It will:
#  - check for git repo
#  - add remote named "origin" if not present
#  - create/rename current branch to 'main'
#  - stage and commit any uncommitted changes (with a default message)
#  - push to origin main

$remoteUrl = 'https://github.com/techsupport-png/Admin-.git'
$remoteName = 'origin'
$branch = 'main'

function ExitWith($msg, $code=1) {
  Write-Host $msg -ForegroundColor Red
  exit $code
}

# Ensure script runs from repository root (where .git exists)
if (-not (Test-Path .git)) {
  ExitWith "No .git directory found. Run this script from the repository root."
}

# Ensure git is available
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  ExitWith "git not found in PATH. Install git and try again."
}

# Add remote if not exists
$existing = git remote get-url $remoteName 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Adding remote $remoteName -> $remoteUrl"
  git remote add $remoteName $remoteUrl
} else {
  Write-Host "Remote '$remoteName' already set to: $existing"
}

# Ensure we're on a branch (not detached HEAD)
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -eq 'HEAD') {
  ExitWith "Detached HEAD state detected. Please checkout a branch first."
}

# Rename current branch to main if needed
if ($currentBranch -ne $branch) {
  Write-Host "Renaming branch $currentBranch -> $branch"
  git branch -M $branch
}

# Stage all changes
git add -A

# Commit if there are staged changes
$diffIndex = git diff --cached --name-only
if ($diffIndex) {
  $defaultMsg = "chore: add project files"
  Write-Host "Creating commit with message: $defaultMsg"
  git commit -m $defaultMsg
} else {
  Write-Host "No changes to commit"
}

# Push to remote
Write-Host "Pushing $branch to $remoteName ($remoteUrl)"
# Use -u to set upstream
git push -u $remoteName $branch

if ($LASTEXITCODE -ne 0) {
  ExitWith "Push failed. Inspect git output above for details." 1
}

Write-Host "Push completed successfully." -ForegroundColor Green
Write-Host "You can now visit the GitHub repo and create a Pull Request or verify files are present."