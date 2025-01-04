const projectName = 'random-quote-machine';
let quotesData;

const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

let currentQuote = '';
let currentAuthor = '';

/**
 * Fetches quotes data from the provided URL.
 * @returns {Promise} Resolves with the parsed quotes data.
 */
const getQuotes = () => {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: (jsonQuotes) => {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log('Quotes Data:', quotesData);
      }
    }
  });
};

/**
 * Gets a random quote from the fetched quotes data.
 * @returns {Object} A random quote object containing `quote` and `author`.
 */
const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotesData.quotes.length);
  return quotesData.quotes[randomIndex];
};

/**
 * Updates the DOM with a new random quote and applies animations and color changes.
 */
const getQuote = () => {
  const randomQuote = getRandomQuote();
  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  // Update social media share links
  $('#tweet-quote').attr(
    'href',
    `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
      `"${currentQuote}" - ${currentAuthor}`
    )}`
  );

  $('#tumblr-quote').attr(
    'href',
    `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(
      currentAuthor
    )}&content=${encodeURIComponent(
      currentQuote
    )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`
  );

  // Animate quote and author text
  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(currentQuote);
  });

  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(currentAuthor);
  });

  // Apply random color to background and buttons
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  $('html body').animate(
    {
      backgroundColor: randomColor,
      color: randomColor
    },
    1000
  );
  $('.button').animate(
    {
      backgroundColor: randomColor
    },
    1000
  );
};

// Document ready function
$(document).ready(() => {
  getQuotes().then(() => {
    getQuote();
  });

  // Event listener for generating a new quote
  $('#new-quote').on('click', getQuote);
});
