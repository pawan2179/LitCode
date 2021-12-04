const express = require("express");
const cors = require("cors");
const app = express();

const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.set("view engine", "ejs");

let output="";
let code="";

app.get('/', (req, res) => {
    // output = output.trim();
    // code = code.trim();
    res.render("index", {outputText: output, codeText: code});
    //res.sendFile(__dirname+"/index.html");
});


/*

const codeArea = document.getElementById("code")
const shareBtn = document.getElementsByClassName("share");
//const run = runBtn[0];

function getCode() {
    
}

document.getElementById("runBtn").onclick= function() {
    var code = codeArea.value;
    console.log(code);
    if(code === undefined || code.length === 0) {
        alert("Invalid Attempt!!");
    }
    else {
        
    }
}
*/

app.post('/', async(req, res) => {

    // const { language = "cpp", code } = req.body.codeText; 
    const language = "cpp";
    code = req.body.codeText;

    //console.log(code);

    if(code === undefined) {
        return res.status(400).json({ success: false, error : "Empty code body" });
    }

    //Generate cpp file
    const filePath = await generateFile(language, code);
    // Run the file and send the response
    //console.log(filePath);
    output = await executeCpp(filePath);

    
    res.redirect('/');
    //return res.json({filePath: filePath, output: output});
});

app.listen(5000, () => {
    console.log("Server Running");
});