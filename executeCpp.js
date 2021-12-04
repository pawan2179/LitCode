const { exec } = require("child_process");
const path = require('path');
const fs = require('fs');

const outputPath = path.join(__dirname, "outputs");

if(!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filePath) =>  {
    //console.log(filePath);
    const jobId = path.basename(filePath).split(".")[0];
    //console.log(jobId);
    const outputFile = path.join(outputPath, `${jobId}.out`);

    return new Promise(async (resolve, reject) => {
        await exec(`g++ ${filePath} -o ${outputFile} && cd ${outputPath} && ./${jobId}.out`, 
            (error, stdout, stderr) => {
                if(error) {
                    reject( {error, stderr} );
                }
                if(stderr) {
                    reject(stderr);
                }
                resolve(stdout);
              });
    })
    
    .catch(err=> {
        //console.log(err)
        return err.stderr;
    });
}

module.exports = {
    executeCpp,
}