const cheerio = require('cheerio');

async function getToken(api, path) {
  const res = await api.get(path);
  const html = await res.text();

  const $ = cheerio.load(html);
  return $('input[name="__RequestVerificationToken"]').val();
}

module.exports = { getToken };