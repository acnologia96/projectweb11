import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";
import { Scrollbar } from "react-scrollbars-custom";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Box, Button, Card, CardActions, CardMedia } from "@mui/material";

const FileUpload = ({ values, setValues, loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(values, "values");

  const handleChageFile = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);
      const fileupload = values.images;
      for (let i = 0; i < files.length; i++) {
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                process.env.REACT_APP_API + "/images",
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                console.log(res.data);
                fileupload.push(res.data);
                console.log("FileUpload", fileupload);
                setValues({ ...values, images: fileupload });
              })
              .catch((err) => {
                setLoading(false);
                console.log(err.response.data);
              });
          },
          "base64"
        );
      }
    }
  };
  const handleRemove = (public_id) => {
    setLoading(true);
    console.log(public_id);
    //const img=values.images
    const { images } = values;
    axios
      .post(
        process.env.REACT_APP_API + "/removeimages",
        { public_id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        let filterImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filterImages });
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      <h4 className="text-center  pt-4 ">
        <b>อัพโหลดรูป</b><hr/>
      </h4>

      <Scrollbar  style={{ maxWidthidth:750, maxHeight: 490, }}>
        <Box   pl={+10}>
          {values.images &&
            values.images.map((c) => (
              <Badge
                onClick={() => handleRemove(c.public_id)}
                style={{ cursor: "pointer" }}
                className="mt-5"
                color="secondary"
                badgeContent="X"
              >
                <Avatar
                  className=" m-2"
                  src={c.url}
                  sx={{ width: "auto", height: 180 }}
                  variant="square"
                />
              </Badge>
            ))}
        </Box>
      </Scrollbar>

      <Box p={+3}>
        <label className="container btn btn-primary ">
          Choose File
          <input
            onChange={handleChageFile}
            className="form-control"
            type="file"
            hidden
            multiple
            accept="images/*"
            name="file"
          />
        </label>
      </Box>
    </>
  );
};

export default FileUpload;
