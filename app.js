const arguments = require('yargs').argv;
const chalk = require('chalk');
const fs =require('fs')

const operation = arguments._[0];
const title = arguments.title;
const description = arguments.description;
const { getData , addTodo , removeTodo , getTodo} = require('./todo.js')

switch (operation) {
  case 'add':
    if(title && description){
      addTodo(title,description)
    } else {
      console.log(chalk.yellowBright("Please Enter valid Title and Description"))
    }
    break;

  case 'delete':
    if(title){
      removeTodo(title)
    } else {
      console.log(chalk.yellowBright("Please Enter valid Title to delete"))
    }
    break;

  case 'list':
    if(fs.existsSync('./data.json')){
      const list = getData();
      if(list == {}){
        console.log(chalk.bgWhite.redBright("Empty List"))
      } else {
        Object.values(list).map((item,index) => {
          console.log(chalk.bgGreen.whiteBright(`${index+1}.. Title : ${item.title}`) ,chalk.bgWhiteBright.green(` Description : ${item.description}\n`));
        })
      }
    } else {
      console.log(chalk.red.underline("File not available : Please Add task first"))
    }
    break;

  case 'todo':
    if(fs.existsSync('./data.json')){
      if(title){
        getTodo(title)
      } else {
        console.log(chalk.yellowBright("Please Enter valid Title"))
      }
    } else {
      console.log(chalk.red.underline("File not available : Please Add task first"))
    }
    break;
  default:
  console.log(chalk.red.underline('Invalid arguments'))
}
