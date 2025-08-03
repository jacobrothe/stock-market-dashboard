# Create a package.json file for easier development (optional but helpful)
package_json = '''{
  "name": "stock-market-dashboard",
  "version": "1.0.0",
  "description": "Interactive dashboard analyzing historical stock market corrections and bear markets",
  "main": "index.html",
  "scripts": {
    "start": "python -m http.server 8000",
    "serve": "python -m http.server 8000",
    "dev": "python -m http.server 8000"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/stock-market-dashboard.git"
  },
  "keywords": [
    "stock-market",
    "bear-market",
    "financial-dashboard",
    "market-analysis",
    "investing",
    "data-visualization"
  ],
  "author": "Jacob Rothe",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/yourusername/stock-market-dashboard/issues"
  },
  "homepage": "https://github.com/yourusername/stock-market-dashboard#readme"
}'''

# Save the package.json file
with open('package.json', 'w', encoding='utf-8') as f:
    f.write(package_json)

print("✅ package.json created successfully")

# Create a .gitignore file
gitignore_content = '''# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Editor files
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Optional npm cache directory
.npm

# Node modules (if using npm in future)
node_modules/

# Build files (if using build tools in future)
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local'''

# Save the .gitignore file
with open('.gitignore', 'w', encoding='utf-8') as f:
    f.write(gitignore_content)

print("✅ .gitignore created successfully")

# List all created files
import os
files = [f for f in os.listdir('.') if f.endswith(('.html', '.css', '.js', '.md', '.json')) and not f.startswith('.')]
print(f"\n🎉 Dashboard complete! Created {len(files)} files:")
for file in sorted(files):
    print(f"   • {file}")

print("\n📋 Next steps:")
print("1. Create a new GitHub repository")
print("2. Upload these files to your repo")  
print("3. Enable GitHub Pages in Settings > Pages")
print("4. Your dashboard will be live at: https://yourusername.github.io/repository-name")
print("\n💡 Pro tip: You can also run locally with: python -m http.server 8000")