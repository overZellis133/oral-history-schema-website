# GitHub Setup Instructions

## Option 1: Create Repository on GitHub First

1. Go to https://github.com/new
2. Repository name: `oral-history-schema-website` (or your preferred name)
3. Description: "Interactive website for Oral History Metadata Schema"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Option 2: Use GitHub CLI (if installed)

```bash
gh repo create oral-history-schema-website --public --source=. --remote=origin --push
```

## After Creating the Repository

Once you have the repository URL, run:

```bash
# Add the remote (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/oral-history-schema-website.git

# Or if using SSH:
git remote add origin git@github.com:YOUR_USERNAME/oral-history-schema-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Verify

```bash
git remote -v
```

You should see your remote listed.

