// make a server that will listen to the port 3000 and when i hit the /search endpoint with a query parameter q, it will return the data in json format and the data will be the result of the search query

import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';

const app = express();
const port = 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

app.get('/search', async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.oomoye.life/search.php?q=${encodeURIComponent(q)}`);

    // Get all details from the catList elements
    const results = await page.evaluate(() => {
      const items = document.querySelectorAll('.catList');
      return Array.from(items).map(el => {
        const link = el.querySelector('a');
        return {
          href: link ? link.href : '',
          title: link ? link.getAttribute('title') : '',
          text: link ? link.textContent.trim() : ''
        };
      });
    });

    await browser.close();
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'An error occurred during search' });
  }
});

app.get('/chapters', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Get all catList items before the first <br> tag
    const chapters = await page.evaluate(() => {
      const items = [];
      const elements = document.querySelectorAll('.catList');
      
      for (const el of elements) {
        if (el.nextElementSibling && el.nextElementSibling.tagName === 'BR') {
          break;
        }
        const link = el.querySelector('a');
        if (link) {
          items.push({
            href: link.href,
            title: link.getAttribute('title'),
            text: link.textContent.trim()
          });
        }
      }
      return items;
    });

    await browser.close();
    res.json(chapters);
  } catch (error) {
    console.error('Chapters error:', error);
    res.status(500).json({ error: 'An error occurred while fetching chapters' });
  }
});

app.get('/download-links', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // First, go to the initial page to get the first fastdl link
    await page.goto(url);
    
    // Get the first fastdl link
    const firstFastdlLink = await page.evaluate(() => {
      const fastdl = document.querySelector('.fastdl a');
      return fastdl ? fastdl.href : null;
    });

    if (!firstFastdlLink) {
      await browser.close();
      return res.json([]);
    }

    // Now navigate to the fastdl link page
    await page.goto(firstFastdlLink);

    // Get all fastdl links from the new page
    const downloadLinks = await page.evaluate(() => {
      const items = document.querySelectorAll('.fastdl');
      return Array.from(items).map(el => {
        const link = el.querySelector('a');
        const font = el.querySelector('font');
        return {
          href: link ? link.href : '',
          text: font ? font.textContent.trim() : '',
          fontColor: font ? font.getAttribute('color') : ''
        };
      });
    });

    await browser.close();
    res.json(downloadLinks);
  } catch (error) {
    console.error('Download links error:', error);
    res.status(500).json({ error: 'An error occurred while fetching download links' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
