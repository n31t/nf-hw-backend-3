import axios from "axios";
import * as cheerio from "cheerio";
import chrono from 'chrono-node';

const params = {
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
};

const url = 'https://www.olx.kz/elektronika/telefony-i-aksesuary/';

async function fetchData() {
    const response = await axios.get(url, params);
    const $ = cheerio.load(response.data);

    const data = $('div.css-1venxj6').map((i, element) => {
        const title = $(element).find('h6.css-16v5mdi').text();
        const price = $(element).find('p.css-tyui9s').text();
        const locationAndDate = $(element).find('p.css-1a4brun').text();
        const parsedDate = chrono.parseDate(locationAndDate);
        const condition = $(element).find('span.css-3lkihg').text();

        return { title, price, locationAndDate: parsedDate, condition };
    }).get();

    console.log(data);
}

fetchData();
setInterval(fetchData, 60 * 1000);