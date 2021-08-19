const readline = require('readline')
const fs = require('fs')

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function htmlFileContent(title, css = null, script = null){
    return `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            ${css ? `<link rel="stylesheet" href="${css}" />` : ``}
        </head>
        <body>
            ${script ? `<script src="${script}"></script>` : ``}
        </body>
        </html>`
}

function createFileSystem(){
    console.clear()
    console.log(
`Create HTML App
=================`);
    reader.question('\nEnter your project name: ', function(projectName) {
        fs.mkdir(`./${projectName}`, () => {
            fs.writeFile(`./${projectName}/index.html`, htmlFileContent(projectName), () => {
                reader.question('\nDo you need a css file? (y/n): ', function(ifcss){
                    if(ifcss === 'y'){
                        fs.writeFile(`./${projectName}/index.html`, htmlFileContent(projectName, "./css/styles.css"), () => {
                            fs.mkdir(`./${projectName}/css`, () => {
                                fs.writeFile(`./${projectName}/css/styles.css`, `/* Add Css Here. */`, () =>{
                                    reader.question('\nDo you need a js file? (y/n): ', function(ifJs){
                                        if(ifJs === "y"){
                                            fs.writeFile(`./${projectName}/index.html`, htmlFileContent(projectName, "./css/styles.css", "./js/index.js"), () => {
                                                fs.mkdir(`./${projectName}/js`, () =>{
                                                    fs.writeFile(`./${projectName}/js/index.js`, `/* Add JS Here. */`, () => {
                                                        console.log('Project Created!');
                                                        reader.close()
                                                    })
                                                })
                                            })
                                        }
                                        else{
                                            console.log('Project Created!');
                                            reader.close()
                                        }
                                    })
                                })
                            })
                            
                        })
                    }
                    else{
                        reader.question('\nDo you need a js file? (y/n): ', function(ifJs){
                            if(ifJs === "y"){
                                fs.writeFile(`./${projectName}/index.html`, htmlFileContent(projectName,null, "./js/index.js"), () => {
                                    fs.mkdir(`./${projectName}/js`, () =>{
                                        fs.writeFile(`./${projectName}/js/index.js`, `/* Add JS Here. */`, () => {
                                            console.log('Project Created!');
                                            reader.close()
                                        })
                                    })
                                })
                            }
                            else{
                                console.log('Project Created!');
                                reader.close()
                            }
                        })
                    }
                })
            })
        })
        
    })
}

createFileSystem()

reader.on('close', function(){
    console.log('\nBye\n');
    process.exit(0)
})
