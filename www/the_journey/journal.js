document.addEventListener('DOMContentLoaded', function() {
    // 1. Parse the URL to get the entry ID (e.g. entry.html?id=inception)
    const urlParams = new URLSearchParams(window.location.search);
    const entryId = urlParams.get('id');

    const titleEl = document.getElementById('entry-title');
    const dateEl = document.getElementById('entry-date');
    const bodyEl = document.getElementById('entry-body');

    // Simple security check for injection attempts
    if (entryId && !/^[a-zA-Z0-9_-]+$/.test(entryId)) {
        titleEl.textContent = 'Nice Try';
        bodyEl.innerHTML = "<p>This isn't the vulnerability you're looking for.</p>";
        return;
    }

    // 2. Fetch the data from the JSON file
    fetch('entries.json')
        .then(response => response.json())
        .then(data => {
            let entryIndex = -1;
            if (entryId) {
                entryIndex = data.findIndex(item => item.id === entryId);
            } else if (data.length > 0) {
                entryIndex = 0;
            }

            const entry = entryIndex >= 0 ? data[entryIndex] : null;

            if (entry) {
                document.title = `${entry.title} - The Journey`;
                titleEl.textContent = entry.title;
                dateEl.textContent = entry.date;
                bodyEl.innerHTML = entry.body; // Renders HTML content safely

                // Navigation Logic
                // Data is sorted Oldest (0) -> Newest (N)
                const prevLink = document.getElementById('nav-prev');
                const nextLink = document.getElementById('nav-next');

                // Previous Post (Older) = index - 1
                if (entryIndex > 0) {
                    const prevEntry = data[entryIndex - 1];
                    prevLink.href = `entry.html?id=${prevEntry.id}`;
                    prevLink.textContent = `← ${prevEntry.title}`;
                    prevLink.style.display = 'inline';
                }

                // Next Post (Newer) = index + 1
                if (entryIndex < data.length - 1) {
                    const nextEntry = data[entryIndex + 1];
                    nextLink.href = `entry.html?id=${nextEntry.id}`;
                    nextLink.textContent = `${nextEntry.title} →`;
                    nextLink.style.display = 'inline';
                }

            } else {
                titleEl.textContent = 'Entry Not Found';
                bodyEl.innerHTML = '<p>The requested journal entry does not exist.</p>';
            }
        })
        .catch(error => {
            console.error('Error loading journal entries:', error);
            titleEl.textContent = 'Error';
            bodyEl.innerHTML = '<p>Unable to load content. Please try again later.</p>';
        });
});