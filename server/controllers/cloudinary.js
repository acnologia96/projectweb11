const cloudinary = require("cloudinary");


cloudinary.config({ 
  cloud_name: 'dymzkvb9s', 
  api_key: '784964719232179', 
  api_secret: 'Y11mWbhsanO2bJ2-1vsRaG6v9BI' 
});

exports.createImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: Date.now(),
      resource_type: "auto",
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Upload Error!!");
  }
};

exports.removeImage = async (req, res) => {
  try {
    const image_id = req.body.public_id;
    cloudinary.uploader.destroy(image_id, (result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Remove Error!!");
  }
};
