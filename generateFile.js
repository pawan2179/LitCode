const path = require('path');
const fs = require('fs');

//Import uuid module to generate unique ID's and rename version-4 to uuid for further use in the code
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, "codes");

if(!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, {recursive: true});
}

const generateFile = async (format, content) => {
    const jobId = uuid();
    const filename = `${jobId}.${format}`;
    const filePath = path.join(dirCodes, filename);
    // console.log(filePath);
    // Create the code file
    await fs.writeFileSync(filePath, content);
    return filePath;
};

module.exports = {
    generateFile,
};