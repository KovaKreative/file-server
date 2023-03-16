const fs = require('fs');

const getFile = function(file, sendError, sendFile, client) {
  const path = `./files/${file}`;
  console.log(`Checking ${path}`);
  fs.access(path, (error) => {
    if (!error) {
      console.log("File found");
      fs.readFile(path, 'utf8', (err, data) => {
        console.log("File accessed, sending contents to user");
        sendFile(data, client);
      });
      return;
    }
    sendError(client);
  });
};

module.exports = getFile;