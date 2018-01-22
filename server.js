const Express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = Express();
app.use(bodyParser.json());
const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err, info) {
        if (err) {
            return res.json("Something went wrong!");
        }
        console.log("Info: ", req.files);
        return res.json("File uploaded sucessfully!.");
    });
});

app.listen(2000, function () {
    console.log("Listening to port 2000");
});