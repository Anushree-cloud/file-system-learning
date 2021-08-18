/* Okk now File management nia akta task
==========================

You have create an cli tool like create-react-app (sort of)

create another file create-html-app.js

then it will be executed like node create-html-app.js


Main features
=========

App will prompt these questions

Project name : < Project title > [create a folder with that project name]

Do you need css (y/n) : y [create /css folder & style.css file inside it, and have to link that css file into the index.html]

Do you need bootstrap (y/n) : y [this will add the bootstrap's cdns into index.html file]

Do you need javascript (y/n) : y [create /js folder & main.js file inside it, and have to link that js file into the index.html]

After all these

create an index.html file, index.html e title thakbe oi project name, and options wise sob link hobe oi html data gulo bosbe

it will generate a folder with the project_name, like this

project_name/
----------------/css (if choosen)
------------------styles.css (if choosen)
----------------/js (if choosen)
------------------main.js (if choosen)
-----------index.html

*/

const readline = require('readline')
const fs = require('fs')

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})



function htmlFileContent(title, css, script){
    let content = `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            
        </head>
        <body>
            
        </body>
        </html>`
}

function addScriptTag(source){
    return `<script src="${source}"></script>`
}

function addLinkTag(fileLocation){
    return `<link rel="stylesheet" src="${fileLocation}" />`
}

function createFolder(folderName, fileName = null){
    fs.mkdir(`./${folderName}`, (err) => {
        if(err){
            console.log(err);
        }
        if(filename !== null){
            createFile(folderName, fileName)
        }
        console.log(`\nFolder ${folderName} added!`);
    })
}

function createFile(projectName, fileName){
    fs.writeFile(`./${projectName}/${fileName}`, htmlFileContent(projectName), () => {
            console.log(`${fileName} file created inside the folder ${projectName}.`)
        })
}

function toContinue() {
    reader.question('\nDo you want to continue (y/n): ', function(toQuit) {
        switch (toQuit) {
            case 'y':
                todoApp()
                break;
            case 'n':
                reader.close()
            default:
                console.log('\nInvalid entry!');
                todoApp()
                break;
        }
    })
}


function createFileSystem(){
    reader.question('\nEnter your Project name: ', function(projectName){
        createFolder(projectName)

        console.log(`Welcome to your File-System.\nYou can add CSS and JavaScript files.\nYou can include Bootstap.`); 
        reader.question(`\nDo you want to add files? (y/n): `, function(addFile){
            if(addFile === 'y'){
                console.log(`\nAdd Css file: Press 1\nAdd JS file: Press 2\nAdd Bootstrap file: Press 3`);
                reader.question(`Enter your choice: `, function(fileType){
                    switch (fileType) {
                        case '1':
                                reader.question(`Enter your CSS folder name: `, function(folderName = projectName){
                                    reader.question(`Enter your CSS filename with extension`, function(fileName){
                                        createFolder(folderName, fileName)
                                    })
                                })
                                break;
                        
                        case '2':
                                reader.question(`Enter your JS folder name: `, function(folderName = projectName){
                                    reader.question(`Enter your JS filename with extension`, function(fileName){
                                        createFolder(folderName, fileName)
                                    })
                                })
                                break;

                        case '3':
                                console.log(`\nBootstrap CDNs Added!`);
                                toContinue()
                                break;

                        default:
                            break;
                    }
                    
                })
            }
            else{
                reader.close()
            }
        })
        toContinue()
    })
}

createFileSystem()

reader.on('close', function(){
    console.log('\nBye !!!\n');
    process.exit(0);
})


