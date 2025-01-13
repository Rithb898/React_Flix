document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById('searchButton');
  const resultDiv = document.getElementById('result');

  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  async function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    try {
      resultDiv.innerHTML = '<div class="loading">Searching for movies...</div>';
      const response = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      displayResults(data);
    } catch (error) {
      console.error('Error:', error);
      resultDiv.innerHTML = '<div class="error">An error occurred while searching</div>';
    }
  }

  function displayResults(results) {
    if (!results.length) {
      resultDiv.innerHTML = '<div class="no-results">No movies found</div>';
      return;
    }

    const resultsHTML = results.map(item => `
      <div class="result-item">
        <div class="result-header">
          <h3>${item.title || item.text}</h3>
        </div>
        <button class="view-chapters" data-url="${item.href}">
          <i class="fas fa-list"></i> View Available Options
        </button>
        <div class="chapters-container"></div>
      </div>
    `).join('');

    resultDiv.innerHTML = `
      <div class="results-container">
        <h2>Search Results</h2>
        ${resultsHTML}
      </div>
    `;

    addChapterHandlers();
  }

  function addChapterHandlers() {
    document.querySelectorAll('.view-chapters').forEach(button => {
      button.addEventListener('click', async (e) => {
        const url = e.target.dataset.url;
        const resultItem = e.target.closest('.result-item');
        const chaptersContainer = resultItem.querySelector('.chapters-container');
        
        if (chaptersContainer.innerHTML === '') {
          await fetchChapters(url, chaptersContainer);
        } else {
          chaptersContainer.innerHTML = '';
        }
      });
    });
  }

  async function fetchChapters(url, container) {
    try {
      container.innerHTML = '<div class="loading">Loading options...</div>';
      
      const response = await fetch(`http://localhost:3000/chapters?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error('Failed to fetch options');

      const chapters = await response.json();
      displayChapters(chapters, container);
    } catch (error) {
      console.error('Error:', error);
      container.innerHTML = '<div class="error">Error loading options</div>';
    }
  }

  function displayChapters(chapters, container) {
    if (!chapters.length) {
      container.innerHTML = '<div class="no-chapters">No options available</div>';
      return;
    }

    const chaptersHTML = chapters.map(chapter => `
      <div class="chapter-item">
        <div class="chapter-header">
          <span>${chapter.title || chapter.text}</span>
          <button class="view-downloads" data-url="${chapter.href}">
            View Downloads
          </button>
        </div>
        <div class="download-container"></div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="chapters-list">
        ${chaptersHTML}
      </div>
    `;

    addDownloadHandlers(container);
  }

  function addDownloadHandlers(container) {
    container.querySelectorAll('.view-downloads').forEach(button => {
      button.addEventListener('click', async (e) => {
        const url = e.target.dataset.url;
        const chapterItem = e.target.closest('.chapter-item');
        const downloadContainer = chapterItem.querySelector('.download-container');
        
        if (downloadContainer.innerHTML === '') {
          await fetchDownloadLinks(url, downloadContainer);
        } else {
          downloadContainer.innerHTML = '';
        }
      });
    });
  }

  async function fetchDownloadLinks(url, container) {
    try {
      container.innerHTML = '<div class="loading">Loading download links...</div>';
      
      const response = await fetch(`http://localhost:3000/download-links?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error('Failed to fetch download links');

      const links = await response.json();
      displayDownloadLinks(links, container);
    } catch (error) {
      console.error('Error:', error);
      container.innerHTML = '<div class="error">Error loading download links</div>';
    }
  }

  function displayDownloadLinks(links, container) {
    if (!links.length) {
      container.innerHTML = '<div class="no-downloads">No download links available</div>';
      return;
    }

    const linksHTML = links.map(link => `
      <div class="download-item">
        <a href="${link.href}" target="_blank" class="download-link">
          <span style="color: ${link.fontColor}">${link.text}</span>
        </a>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="downloads-list">
        ${linksHTML}
      </div>
    `;
  }
});
