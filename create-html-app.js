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

function createFileSystem(){
    reader.question('Enter your Project name: ', function(projectName){
        fs.mkdir(`./${projectName}`, (err) => {
            if(err){
                console.log(err);
            }
            console.log('\nProject name added!');
            fs.writeFile(`./${projectName}/index.html`, `<html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${projectName}</title>
            </head>
            <body>
                
            </body>
            </html>`, () => {
                console.log('and index.html file created inside it.')
            })
        })
    })
}

createFileSystem()

reader.on('close', function(){
    console.log('\nBye !!!\n');
    process.exit(0);
})


