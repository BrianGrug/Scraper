const { dir } = require('console');
var Scraper = require('images-scraper');
const { url } = require('inspector');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

downloaded = 0;

const google = new Scraper({
    userAgent: 'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0', // the user agent
    puppeteer: {
        headless: true,
      },
});

(async () => {
    const results = await google.scrape('plane', 25);

    console.log("Collected " + results.length + " images successfully")

    for(i = 0; i < results.length; i++) {
        const json = JSON.parse(JSON.stringify(results[i]));
        link = json.url.split('?')[0];
        file = link.split('/')[link.split('/').length - 1];
        extension = file.split('.')[file.split('.').length - 1];

        types = ['png', 'jpg', 'jpeg'];

        if(types.includes(extension.split(".")[extension.split('.').length - 1])) download(link, file);
    }
})();




function download(url, name) {

    http = null;// or 'https' for https:// URLs

    if(url.includes("https://")) {
        http = require('https')
    }else {
        http = require('http')
    }

    const fs = require('fs');


    const file = fs.createWriteStream(name);

    const request = http.get(url, function(response) {
        response.pipe(file);
        console.log("Saved output to " + file.path)
        downloaded++;
        console.log("Successfully downloaded " + downloaded + " images from Google!")
    });
}