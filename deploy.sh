
#!/bin/sh

if [ -z "$WEBSITEROOT" ]; then
  echo "Error: WEBSITEROOT environment variable is not set." >&2
  echo "Set WEBSITEROOT to the full path to the directory containing 'www', 'images' 'scripts' etc"
  echo "example: export WEBSITEROOT=\"/home/flipmcf/projects/flipmcf.com\"  No trailing slash"
  exit 1
fi

#only mention directories that belong on the website. If unsure, don't add it.
rsync -av $WEBSITEROOT/www flipmcf@flipmcf.com:/data/www
rsync -av $WEBSITEROOT/images flipmcf@flipmcf.com:/data/images
