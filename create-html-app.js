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



function htmlFileContent(title, css = null, script = null, bootstrap = null){
    return `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            ${css ? addLinkTag(css) : null}
            ${bootstrap ? addBootstrap() : null}
        </head>
        <body>
            ${script ? addScriptTag(script) : null}
        </body>
        </html>`
}

function addScriptTag(source){
    return `<script src="./js/${source}"></script>`
}

function addLinkTag(fileLocation){
    return `<link rel="stylesheet" href="./css/${fileLocation}" />`
}

function addBootstrap(){
    return `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>`
}

function createFolder(folderName, fileName){
    fs.mkdir(`./${folderName}`, (err) => {
        if(err){
            console.log(err);
        }
        console.log(`\nFolder ${folderName} added!`);
        createFile(folderName, fileName)
    })
}

// function addContent(projectName, folderName){
//     switch (folderName) {
//         case projectName:
//             htmlFileContent(projectName)
//             break;
        
//         case "css":
//             htmlFileContent(projectName, )

//         default:
//             break;
//     }
    
// }

function createFile(projectName, folderName = null, fileName){
    fs.writeFile(`./${projectName}/${folderName ? `${folderName}/` : null}${fileName}`, htmlFileContent(projectName), () => {
            console.log(`${fileName} file created inside the folder ${projectName}.`)
        })
}


function addFiles() {
    console.clear()
    reader.question(`\nDo you want to add files? (y/n): `, function(addFile){

        if(addFile === 'y'){
            console.log(`\nAdd Css file: Press 1\nAdd JS file: Press 2\nAdd Bootstrap file: Press 3`);

            reader.question(`Enter your choice: `, function(fileType){

                switch (fileType) {

                    case '1':
                            reader.question(`Enter your CSS filename with extension: `, function(fileName){
                                createFolder("css", fileName)
                            })
                            addFiles()
                            break;
                    
                    case '2':
                            reader.question(`Enter your JS filename with extension: `, function(fileName){
                                createFolder("js", fileName)
                            })
                            addFiles()
                            break;

                    case '3':
                            console.log(`\nBootstrap CDNs Added!`);
                            addFiles()
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
}

function createFileSystem(){
    console.clear()
    console.log("Welcome to your File-System.\nYou can add CSS and JavaScript files.\nYou can include Bootstap.");

    reader.question('\nEnter your Project name: ', function(projectName){
        createFolder(projectName, "index.html")
        addFiles()
    })
}

createFileSystem()

reader.on('close', function(){
    console.log('\nBye !!!\n');
    process.exit(0);
})


