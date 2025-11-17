document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and insert HTML content
    const loadComponent = (selector, url) => {
        const element = document.querySelector(selector);
        if (element) {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load ${url}: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(data => {
                    element.innerHTML = data;
                })
                .catch(error => console.error(`Error loading component for ${selector}:`, error));
        }
    };

    // Load header and footer
    loadComponent("header", "header.html");
    loadComponent("footer", "footer.html");
});