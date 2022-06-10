const fs = require('fs')

let strings = ['', '']
let paths = ['./components/index.js', './../docs/.vitepress/data.json']
const links = []

const directiveClimber = (path) => {
    fs.readdir(path, (error, files) => {
        files.forEach(file => {
            if (!file.includes('.')) {
                directiveClimber(path + `/${file}`)
            }
            if (file.includes('.vue')) {
                componentValidator(files)
                strings[0] += `\nexport { default as ${file.substring(0, file.length - 4)} } from '.${path.substring(12)}/${file}';`;
                const filename = file.substring(0, file.length - 4) + '.md'
                copyDocumentationFiles(`${path}/${filename}`, filename)

                links.push({
                    text: `${file.substring(0, file.length - 4)}`,
                    link: `/components/${file.substring(0, file.length - 3)}md`
                })
            }
        })
    })
}

const componentValidator = (array) => {
    const currentFile = array[0].substring(0, array[0].indexOf('.'))
    if (!array.join().includes('.md')) throw new DocumentationFileError("documentation file missing in component: " + currentFile)
    if (!array.join().includes('.cy')) throw new TestFileError("Test file missing in component: " + currentFile)
    return true
}

directiveClimber('./components')
setTimeout(() => {
    strings[1] = JSON.stringify(Array.from(links))
    writeToFile()
    console.log("Done!")
}, 500)

const writeToFile = () => {
    for (let i = 0; i < strings.length; i++) {
        fs.writeFile(paths[i], strings[i], err => {
            if (err) console.error(err)
        });
    }
}

const copyDocumentationFiles = (url, fileName) => {
    try {
        fs.readFileSync(url, 'utf8')
    } catch (error) {
        console.error(error)
    }

    fs.copyFile(url, `./../docs/components/${fileName}`, (error) => {
        if (error) {
            console.error(error)
        }
    })
}

class TestFileError {
    constructor(message) {
        this.message = message
    }
}

class DocumentationFileError {
    constructor(message) {
        this.message = message
    }
}