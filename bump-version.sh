#!/bin/bash

set -e  # exit on error

echo "Choose version bump type:"
echo "1) patch"
echo "2) minor"
echo "3) major"
echo "4) custom (e.g., 1.2.3-beta.0)"
read -p "Enter choice [1-4]: " choice

case $choice in
  1)
    bump="patch"
    ;;
  2)
    bump="minor"
    ;;
  3)
    bump="major"
    ;;
  4)
    read -p "Enter custom version (e.g. 1.2.3-beta.0): " bump
    ;;
  *)
    echo "Invalid choice"
    exit 1
    ;;
esac

echo "Bumping version: $bump"
npm version $bump

echo "Pushing commits and tags..."
git push
git push --follow-tags

echo "✅ Done! Version bumped and pushed."