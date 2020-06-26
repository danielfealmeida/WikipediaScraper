const Algorithmia = require("algorithmia");
const express = require("express");
const app = express();

const authenticated = Algorithmia.client("simj7eYoAOE9g24OER5M1UF08Bl1");

app.listen(process.env.PORT || 3000, () => console.log(`> Server listening.`))
app.use(express.static('public'));

app.use(express.json());

let input = {
    "articleName": "Jair Bolsonaro",
    "lang": "pt"
};

app.post("/wiki", async (req, res) => {
    let data = req.body;

    console.log(data);

    input = {
        "articleName": data.message,
        "lang": "pt"
    }

    res.json(await getWikiData());
})

let inputURL = "https://www.infoescola.com/estados-unidos/pentagono-eua/";

async function getWikiData() {
    const algorithm = authenticated.algo("web/WikipediaParser/0.1.2?timeout=300");
    const wikiResponse = await algorithm.pipe(input);
    const wikiData = wikiResponse.get();

    //console.log(wikiData);
    return sanitizedWikiContent(wikiData.content);
}

async function sanitizedWikiContent(content) {
    const algorithm = authenticated.algo("nlp/Summarizer/0.1.8?timeout=300"); 
    const sumResponse = await algorithm.pipe(content);
    const sumData = sumResponse.get();

    console.log('\033[36m' + sumData);
    console.log(" ");

    return sumData;
    //getSanitizedContentURL(inputURL);
}

/* async function getSanitizedContentURL(URL) {
    const algorithm = authenticated.algo("nlp/SummarizeURL/0.1.4?timeout=300"); 
    const URLResponse = await algorithm.pipe(URL);
    const URLData = URLResponse.get();

    console.log('\033[33m' + URLData);
    console.log('\033[0m');
} */
