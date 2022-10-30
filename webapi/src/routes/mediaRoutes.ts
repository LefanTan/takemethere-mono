import express from "express";
import multer from "multer";
import { Storage } from "@google-cloud/storage";
import sharp from "sharp";

import authenticateJWT from "src/middlewares/auth";
import { AuthorizedRequest } from "src/types/request";

const storage = new Storage();
const mediaRoutes = express();

// Multer stuff
const multerStorage = multer.memoryStorage();
const upload = multer({
  storage: multerStorage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype.split("/")[0] === "image") {
      callback(null, true);
    } else {
      callback(new Error("Only images are allowed!"));
    }
  },
});

const bucketName = "takeme-public-assets";
const publicUrl = `https://storage.googleapis.com/${bucketName}`;

const bucket = storage.bucket(bucketName);

/**
 * Folder name for user is keyed by uid
 **/
mediaRoutes.post(
  "/addProfilePicture",
  authenticateJWT,
  upload.single("profilePicture"),
  async (req: AuthorizedRequest, res) => {
    // #swagger.summary = 'Upload a picture to the users folder'
    // #swagger.consumes = ['multipart/form-data']
    // #swagger.tags = ['Medias']
    /* 
    #swagger.parameters['profilePicture'] = {
        in: 'formData',
        type: 'file',
        required: 'true',
        description: 'Profile Picture',
    }
    */

    const file = req.file;

    if (!file) return res.status(400).json({ message: "no file lmao!" });

    const filePath = `${req.uid}/${file.originalname.split(".")[0]}.webp`;
    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream();

    const convertedBuffer = await sharp(file.buffer)
      .resize(125, 125)
      .toFormat("webp")
      .toBuffer();

    blobStream.on("finish", () => {
      return res.json(`${publicUrl}/${filePath}`);
    });

    blobStream.end(convertedBuffer);
  }
);

/**
 * Delete a file from the user's folder
 */
mediaRoutes.delete(
  "/:filename",
  authenticateJWT,
  async (req: AuthorizedRequest, res) => {
    // #swagger.summary = 'Delete a file from the user's folder'
    // #swagger.tags = ['Medias']

    try {
      await storage
        .bucket(bucketName)
        .file(`${req.uid}/${req.params.filename}`)
        .delete();

      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
);

export default mediaRoutes;
