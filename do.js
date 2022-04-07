
const fs = require('fs');

const htaccess = fs.readFileSync('./htaccess', 'utf8');

const [, indexFile] = /DirectoryIndex (.*)\n/mg.exec(htaccess);
fs.copyFileSync(indexFile, 'index.html');

// var res = /RewriteRule \^([0-9a-z].*)\/\$ (.*?)/g.exec(htaccess);
// var res = htaccess.match(/RewriteRule \^([0-9a-z].*)\/\$ (.*?)/g);
// var res = new RegExp('RewriteRule \^([0-9a-z].*)\/\$ (.*?)', 'g').test(htaccess)

const regexp = /RewriteRule \^([0-9a-z].*)\/\$ (page.*?) /g;

const asd = htaccess
    .split('\n')
    // .filter(line => regexp.test(line))
    .map(line => {
        var data = regexp.exec(line);
        if (!data) {
            return null;
        }
        const [, dirName, fileName] = data;
        // console.log(b);
        // return 1;
        // // var [, dirName, fileName] = regexp.exec(line);
        return {dirName, fileName}
    })
    .filter(line => Boolean(line))
    .forEach(({dirName, fileName}) => {
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        }
        fs.copyFileSync(fileName, `${dirName}/index.html`);
        console.log({dirName, fileName});
    })
    ;

// console.log(asd.length);