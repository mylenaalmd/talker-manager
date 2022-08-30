const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../talker.json');

const readFilePeople = async () => {
  try {
    const data = await fs.readFilePeople(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`fail to read this file ${dataPath}`);
  }
};

module.exports = readFilePeople;