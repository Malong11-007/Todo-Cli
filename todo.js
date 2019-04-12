const fs = require('fs');
const chalk = require('chalk');

const getData = () => {
  if(fs.existsSync('./data.json')){
    const todo = fs.readFileSync('./data.json');
    if(todo !== null) {
      return JSON.parse(todo);
    } else {
      return {}
    }
  } else {
    return {}
  }
}

const addTodo = (title,desc) => {
  const todoS = getData();
  if(!todoS.hasOwnProperty(title)){
    const newTodo = {
        "title" : title,
        "description" : desc
    }
    todoS[title] = newTodo;
    fs.writeFileSync('./data.json',JSON.stringify(todoS,null,2));
    console.log(chalk.greenBright("Successfully added"))
  } else {
    console.log(chalk.yellow("Task Already exits"))
  }
}

const removeTodo = (title) => {
  const todoS = getData();
  if(todoS.hasOwnProperty(title)){
    delete todoS[title];
    console.log(chalk.greenBright(title + " : Task Successfully Deleted"))
    fs.writeFileSync('./data.json',JSON.stringify(todoS,null,2));
  } else {
    console.log(chalk.yellow(chalk.bold(`${title}`) + ` : Task doesn't exist`))
  }
}

const getTodo = (title) => {
  const todoS = getData();
  if(todoS.hasOwnProperty(title)){
    console.log(chalk.bgMagenta.whiteBright(`Title : ${todoS[title].title}`) ,chalk.bgWhiteBright.magentaBright(`\n Description : ${todoS[title].description}`))
  } else {
    console.log(chalk.yellow(chalk.bold(`${title}`) + ` : Task doesn't exist`))
  }
}


module.exports = {
  getData,
  addTodo,
  removeTodo,
  getTodo
}
