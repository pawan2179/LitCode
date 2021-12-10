const express = require("express");
const cors = require("cors");
const app = express();
const axios = require('axios');

const { response } = require("express");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.set("view engine", "ejs");

let output="";
let code="";
let inputData= "";

app.get('/', (req, res) => {
    res.render("index", {outputText: output, codeText: code, inputText: inputData});
});


app.post('/', async(req, res) => {

    const language = "cpp";
    code = req.body.codeText;

    inputData = req.body.inputText

    if(code === undefined) {
        return res.status(400).json({ success: false, error : "Empty code body" });
    }

    var data = JSON.stringify({
        "code": code,
        "language":language,
        "input": inputData
        });

    var config = {
        method: 'post',
        url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
          //console.log(`${response.data.output}`)
          output = response.data.output
          res.redirect('/')
      })
      .catch(function (error) {
          //console.log(`${error}`)
          output = error
          res.redirect('/')
      });

    
    //res.redirect('/');
    //return res.json({filePath: filePath, output: output});
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server Running");
});