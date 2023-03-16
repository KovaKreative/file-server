// Connect to server
const file = process.argv[2];
const net = require('net');
const saveFile = require('./downloadManager');


const conn = net.createConnection({
  host: 'localhost',
  port: 3000
});

conn.setEncoding('utf8');

// Request the file (from argv)
conn.on('connect', () => {
  if(!file) {

    // promptUserForFile();
    process.exit();
  }
  setTimeout(requestFile, 500, file);
});

const requestFile = function(file) {
  console.log(`Requesting ${file} from the server`)
  conn.write('req:' + file);
};

// Listen to when server sends data
conn.on('data', (data) => {
  const parseData = data.split(':');
  if(parseData[0] === 'file') {
    console.log(data);
    saveFile(file, parseData[1]);
    return;
  }
  console.log(data);
  if(parseData[0] === 'err'){
    process.exit();
  }
});

