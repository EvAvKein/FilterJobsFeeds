#!/bin/bash

VERSION=$(grep -oP '(?<="version": ")[^"]*' manifest.json)
zip -r ~/Desktop/filterJobsFeeds_$VERSION.zip . -x .git/\*