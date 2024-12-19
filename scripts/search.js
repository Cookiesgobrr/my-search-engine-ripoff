// scripts/search.js

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    var query = document.getElementById('query').value; // Get the search query
    if (query) {
        // Perform the search using DuckDuckGo API
        fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`)
            .then(response => response.json()) // Parse the response as JSON
            .then(data => {
                // Process search results here
                const resultsDiv = document.getElementById('results');
                resultsDiv.innerHTML = ''; // Clear previous results

                // Check if we have any related topics (search results)
                const results = data.RelatedTopics;
                if (results.length === 0) {
                    resultsDiv.innerHTML = '<p>No results found.</p>';
                    return;
                }

                // Display each search result
                results.forEach(result => {
                    if (result.FirstURL && result.Text) {
                        const resultElement = document.createElement('div');
                        resultElement.classList.add('result');

                        resultElement.innerHTML = `
                            <a href="${result.FirstURL}" target="_blank">${result.Text}</a>
                            <p>${result.Result ? result.Result : ''}</p>
                        `;
                        resultsDiv.appendChild(resultElement);
                    }
                });
            })
            .catch(error => {
                console.error("Error fetching search results:", error);
                document.getElementById('results').innerHTML = '<p>There was an error fetching results.</p>';
            });
    }
});
