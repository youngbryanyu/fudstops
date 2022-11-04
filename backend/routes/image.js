//image-routes
const router = require("express").Router();
const fs = require("fs");
const multer = require("multer");
const imageModel = require("../models/Image");


//save the image data in our computer and then once it is saved here, save it in mongodb
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => { //specify the name of the filename, takes request, file, and callback
        cb(null, file.originalname); //filename will be the og name
    },
});


const upload = multer({ storage: storage }); //ask multer to use this storage

router.post("/:username", upload.single("image"), async (req, res) => {

    const userHasProfilePic = await imageModel.find({ username: req.params.username });
    //console.log("here");
    //console.log(userHasProfilePic);
    if (userHasProfilePic.length == 0) {
        console.log("here");
        const saveImage = imageModel({
            username: req.params.username,
            img: {
                data: fs.readFileSync("uploads/" + req.file.filename),
                contentType: "image/png",
            },
        });
        saveImage
            .save()
            .then((res) => {
                console.log("image is saved");
            })
            .catch((err) => {
                console.log(err, "error has occur");
            });
        res.send(saveImage.img)
    } else {
        if (!req.file.filename) {
            const newImage = await imageModel.updateOne(
                { username: req.params.username },
                {
                    $set: {
                        img: {
                            data: fs.readFileSync("uploads/" + req.file.filename),
                            contentType: "image/png",
                        }

                    }
                }
            );

            res.send(newImage.img)
        }
    }
});

router.get('/:username', async (req, res) => {
    const allData = await imageModel.find({ username: req.params.username })
    res.json(allData)
});

router.delete('/:username', async (req, res) => {
    const userHasProfilePic = await imageModel.find({ username: req.params.username });
    if (userHasProfilePic.length != 0) {
        //console.log("in here");
        try {
            await imageModel.findByIdAndDelete(userHasProfilePic);
            res.status(200).json("profile pic has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    }
});



module.exports = router;

