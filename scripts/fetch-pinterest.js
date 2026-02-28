const https = require('https');

const url = "https://www.pinterest.com/ideas/cyberpunk-2077-characters/935944294616/";

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    }
};

https.get(url, options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        // Look for i.pinimg.com/origins/ or /originals/ or /564x/
        // We want high quality, usually /originals/ or /736x/
        const regex = /https:\/\/i\.pinimg\.com\/\d+x\/[^"']+\.jpg/g;
        const matches = data.match(regex);

        if (matches) {
            // Filter distinct URLs and take up to 4
            const unique = [...new Set(matches)].slice(0, 4);
            console.log("FOUND_URLS:");
            unique.forEach(u => console.log(u));
        } else {
            console.log("NO_MATCHES");
        }
    });

}).on('error', (err) => {
    console.log("Error: " + err.message);
});
