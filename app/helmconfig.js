import chromecon from 'file!images/favicons/chrome-icon-192x192.png';
import applecon from 'file!images/favicons/apple-icon-152x152.png';
import mscon from 'file!images/favicons/ms-icon-144x144.png';
import favicon from 'file!images/favicons/favicon-16x16.png';


export default {
  link: [
    // Add to homescreen for Chrome on Android
    {'rel': 'icon', 'href': favicon },
    { 'rel': 'icon', 'sizes': '192x192', 'href': chromecon },
    // Add to homescreen for Safari on IOS
    { 'rel': 'apple-touch-icon', 'sizes': '152x152', applecon },
    { 'rel': 'stylesheet', 'href': 'https://fonts.googleapis.com/css?family=Roboto+Condensed', 'type': 'text/css' },
    { 'rel': 'stylesheet', 'href': '/assets/styles/main.css' }
    // { 'rel': 'canonical', 'href': 'http://www.example.com/' }
  ],
  meta: [
    { 'charset': 'utf-8' },
    // Setting IE=edge tells Internet Explorer to use the latest engine to render the page and execute Javascript
    { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' },
    //  Meta descriptions are commonly used on search engine result pages to display preview snippets for a given page.
    { 'name': 'description', 'content': 'MoneyTapp Web UI' },
    // Mobile Safari introduced this tag to let web developers control the viewport's size and scale
    // The width property controls the size of the viewport, the initial-scale property controls
    // the zoom level when the page is first loaded
    { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1' },
    // Add to homescreen for Chrome on Android
    { 'name': 'mobile-web-app-capable', 'content': 'yes' },
    // Add to homescreen for Safari on IOS
    { 'name': 'apple-mobile-web-app-capable', 'content': 'yes' },
    { 'name': 'apple-mobile-web-app-status-bar-style', 'content': 'black' },
    { 'name': 'apple-mobile-web-app-title', 'content': 'React Webpack Node' },
    // Tile icon for Win8 (144x144 + tile color)
    { 'name': 'msapplication-TileImage', 'content': mscon },
    { 'name': 'msapplication-TileColor', 'content': '#3372DF' }
  ]
};
