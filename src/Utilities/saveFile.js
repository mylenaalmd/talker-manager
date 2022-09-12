const fs = require('fs').promises;
const { join } = require('path');
const data = require('./readFiles.js');

const dataPath = join(__dirname, '../talker.json');

const saveFile = async (item) => {
  const dataFile = await data();
  dataFile.push(item);
  const savedFile = await fs.writeFile(dataPath, JSON.stringify(dataFile));
  try {
    console.log('file saved successfully');
    return savedFile;
  } catch (error) {
    console.log('Error to save file&{dataPath}');
  }
};
module.exports = saveFile;