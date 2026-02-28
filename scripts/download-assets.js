const fs = require('fs');
const path = require('path');
const https = require('https');

const characters = [
    { name: 'johnny.png', url: 'https://static.wikia.nocookie.net/cyberpunk/images/6/6e/Johnny_Silverhand_Infobox_CP2077.png' },
    { name: 'judy.png', url: 'https://static.wikia.nocookie.net/cyberpunk/images/2/23/Judy_Alvarez_Infobox_CP2077.png' },
    { name: 'jackie.png', url: 'https://static.wikia.nocookie.net/cyberpunk/images/9/9c/Jackie_Welles_Infobox_CP2077.png' },
    { name: 'panam.png', url: 'https://static.wikia.nocookie.net/cyberpunk/images/1/14/Panam_Palmer_Infobox_CP2077.png' }
];

const targetDir = path.join(__dirname, '../public/characters');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

characters.forEach(char => {
    const file = fs.createWriteStream(path.join(targetDir, char.name));
    const urlObj = new URL(char.url);

    const options = {
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://cyberpunk.fandom.com/',
            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        }
    };

    https.get(options, function (response) {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', function () {
                file.close(() => console.log(`Downloaded ${char.name} (${response.headers['content-length']} bytes)`));
            });
        } else {
            console.error(`Failed to download ${char.name}: Status ${response.statusCode}`);
            fs.unlink(path.join(targetDir, char.name), () => { });
        }
    }).on('error', function (err) {
        fs.unlink(path.join(targetDir, char.name), () => { });
        console.error(`Error downloading ${char.name}: ${err.message}`);
    });
});
