const sitemap = require('nextjs-sitemap-generator');
const path = require('path');

sitemap({
  baseUrl: "https://www.example.com",
  pagesDirectory: path.resolve(__dirname, 'App.js'),
  targetDirectory: path.resolve(__dirname, './'),
  ignoredExtensions: ["js", "map", "json", "xml", "png", "jpg", "jpeg", "svg"],
  ignoredPaths: ["[fallback]"],
  allowFileExtensions: true
});