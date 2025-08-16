#!/bin/bash

# File to track the last logged commit
TRACK_FILE=".last_changelog_commit"

# If the file doesn’t exist, use the first commit as the starting point
if [ ! -f "$TRACK_FILE" ]; then
    echo "No tracking file found. Using first commit as starting point."
    START_COMMIT=$(git rev-list --max-parents=0 HEAD)
else
    START_COMMIT=$(cat $TRACK_FILE)
fi

# Get the latest commit
LATEST_COMMIT=$(git rev-parse HEAD)

# Get new commits since last changelog update
NEW_COMMITS=$(git log $START_COMMIT..$LATEST_COMMIT --pretty=format:"- %h - %s (%an, %ad)" --date=short)

# Only append if there are new commits
if [ -n "$NEW_COMMITS" ]; then
    echo -e "\n## Commits on $(date +%Y-%m-%d)\n$NEW_COMMITS\n" >> CHANGELOG.md
    echo "$LATEST_COMMIT" > $TRACK_FILE
    echo "✅ New commits appended to CHANGELOG.md"
else
    echo "No new commits to add."
fi
