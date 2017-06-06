const Chromy = require('chromy')
const fs = require('fs-extra')

fs.ensureDirSync('./target');
let chromy = new Chromy()
chromy.chain()
    .goto('http://example.com')
    .screenshot()
    .result(png => fs.writeFileSync('target/before.png', png))
    .evaluate(() => {
        document.querySelector('h1').remove()
    })
    .screenshot()
    .result(png => fs.writeFileSync('target/after.png', png))
    .end()
    .then(_ => chromy.close())
    .catch(e => chromy.close());
