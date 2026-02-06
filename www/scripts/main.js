document.addEventListener("DOMContentLoaded", function () {
  const scriptTag = document.querySelector('script[src*="scripts/main.js"]');
  const scriptUrl = scriptTag
    ? new URL(scriptTag.getAttribute("src"), window.location.href)
    : new URL("./scripts/main.js", window.location.href);
  const siteRoot = new URL("..", scriptUrl);

  // Function to fetch and insert HTML content
  const loadComponent = (selector, url) => {
    const element = document.querySelector(selector);
    if (element) {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.statusText}`);
          }
          return response.text();
        })
        .then((data) => {
          element.innerHTML = data;
        })
        .catch((error) =>
          console.error(`Error loading component for ${selector}:`, error),
        );
    }
  };

  // Load header and footer
  loadComponent("header", new URL("header.html", siteRoot).href);
  loadComponent("footer", new URL("footer.html", siteRoot).href);

  if (window.location.protocol === "file:") {
    console.warn(
      "Header/footer includes require a local web server. Open this page via http://localhost instead of file://",
    );
  }
});
