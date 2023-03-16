const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const saveFile = function(fileName, data){
  checkFolder(`./download/`, data, fileName);
};

const checkFolder = function(path, body, fileName) {
  fs.access(path, (error) => {
    if (error) {
      createFolder(path, fileName, body);
    }
    checkFile(path + fileName, body);
  });
};

const createFolder = function(dir, fileName, body) {
  fs.mkdir(dir, { recursive: true }, (error) => {
    if(error) {
      console.log("Something went wrong while trying to make the directory.");
      console.error(error);
      process.exit();
    }
    checkFile(dir + fileName, body);
  });
};


const checkFile = function(path, body) {
  fs.access(path, (error) => {
    if (!error) {
      fileExists(path, body);
      return;
    }
    writeData(path, body);
  });
};

const writeData = function(path, body) {
  fs.writeFile(path, body, error => {
    if (error) {
      console.error(error);
      process.exit();
    }
    console.log(`Downloaded file to ${path}`);
    process.exit();
  });
};

const fileExists = function(path, data) {
  rl.question("File by this path already exists. Overwrite? Y/N", answer => {
    overWriteHandler(answer, data, path);
    rl.close();
  });
};

const overWriteHandler = function(answer, data, path) {
  if (answer.toLowerCase() === "y") {
    writeData(path, data);
  }
};

module.exports = saveFile;