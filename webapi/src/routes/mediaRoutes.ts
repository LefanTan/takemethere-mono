import express from "express";
import multer from "multer";
import { Storage } from "@google-cloud/storage";
import sharp from "sharp";

import { authenticateJWT } from "src/middlewares/auth";
import { AuthorizedRequest } from "src/types/request";

const storage = new Storage();
const mediaRoutes = express();

// Multer stuff
const multerStorage = multer.memoryStorage();
const upload = multer({
  storage: multerStorage,
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
    const enlargeFilePath = `${req.uid}/${
      file.originalname.split(".")[0]
    }-large.webp`;

    // Create a larger version of the image
    const [resultPath] = await Promise.all([
      uploadOptimizedImageToGoogle(file, filePath, 125, 125),
      uploadOptimizedImageToGoogle(file, enlargeFilePath, 500, 500),
    ]);

    return res.json(resultPath);
  }
);

/**
 * Upload a picture to review
 */
mediaRoutes.post(
  "/addToReview/:reviewId",
  authenticateJWT,
  upload.single("media"),
  async (req: AuthorizedRequest, res) => {
    // #swagger.summary = 'Upload a picture to review'
    // #swagger.consumes = ['multipart/form-data']
    // #swagger.tags = ['Medias']
    /* 
    #swagger.parameters['media'] = {
        in: 'formData',
        type: 'file',
        required: 'true',
        description: 'Media to attach to review',
    }
    */

    const file = req.file;

    if (!file) return res.status(400).json({ message: "no file lmao!" });

    const filePath = `${req.uid}/${req.params.reviewId}/${
      file.originalname.split(".")[0]
    }.webp`;
    const resultPath = await uploadOptimizedImageToGoogle(
      file,
      filePath,
      300,
      300
    );

    return res.json(resultPath);
  }
);

/**
 * Upload a picture to link
 */
mediaRoutes.post(
  "/addToLink/:linkId",
  authenticateJWT,
  upload.single("media"),
  async (req: AuthorizedRequest, res) => {
    // #swagger.summary = 'Upload a picture to link'
    // #swagger.consumes = ['multipart/form-data']
    // #swagger.tags = ['Medias']
    /* 
    #swagger.parameters['media'] = {
        in: 'formData',
        type: 'file',
        required: 'true',
        description: 'Media to attach to link',
    }
    */

    const file = req.file;

    if (!file) return res.status(400).json({ message: "no file lmao!" });

    const filePath = `${req.uid}/${req.params.linkId}/${
      file.originalname.split(".")[0]
    }.webp`;
    const resultPath = await uploadOptimizedImageToGoogle(
      file,
      filePath,
      80,
      80
    );

    return res.json(resultPath);
  }
);

/**
 * Upload a picture to user's blog
 */
mediaRoutes.post(
  "/addToBlog/:blogId",
  authenticateJWT,
  upload.single("media"),
  async (req: AuthorizedRequest, res) => {
    // #swagger.summary = 'Upload a picture to blog'
    // #swagger.consumes = ['multipart/form-data']
    // #swagger.tags = ['Medias']
    /* 
    #swagger.parameters['media'] = {
        in: 'formData',
        type: 'file',
        required: 'true',
        description: 'Media to attach to link',
    }
    */

    const file = req.file;

    if (!file) return res.status(400).json({ message: "no file lmao!" });

    const filePath = `${req.uid}/${req.params.blogId}/${
      file.originalname.split(".")[0]
    }.webp`;
    const resultPath = await uploadOptimizedImageToGoogle(file, filePath);

    return res.json(resultPath);
  }
);

/**
 * Upload a sound clip to user's audio snippet
 */
mediaRoutes.post(
  "/addToAudio/:audioSnippetId",
  authenticateJWT,
  upload.single("media"),
  async (req: AuthorizedRequest, res) => {
    // #swagger.summary = 'Upload a sound clip to user's audio snippet'
    // #swagger.consumes = ['multipart/form-data']
    // #swagger.tags = ['Medias']
    /* 
    #swagger.parameters['media'] = {
        in: 'formData',
        type: 'file',
        required: 'true',
        description: 'Media to attach to link',
    }
    */

    const file = req.file;

    if (!file) return res.status(400).json({ message: "no file lmao!" });

    const filePath = `${req.uid}/${req.params.audioSnippetId}/${file.originalname}`;

    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream({
      metadata: {
        // Browser cache for 3 hours
        cacheControl: "public, max-age=180",
      },
    });

    blobStream.on("finish", () => {
      return res.json(`${publicUrl}/${filePath}`);
    });

    blobStream.end(file.buffer);
  }
);

/**
 * Delete a file from the user's folder
 */
mediaRoutes.delete(
  "/",
  authenticateJWT,
  async (req: AuthorizedRequest, res) => {
    // #swagger.summary = 'Delete a file from the user\'s folder'
    /*  #swagger.parameters['filePath'] = {
            in: 'query',
            description: 'File path to delete',
    } */
    // #swagger.tags = ['Medias']

    try {
      await storage.bucket(bucketName).file(`${req.query.filePath}`).delete();

      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
);

async function uploadOptimizedImageToGoogle(
  file: Express.Multer.File,
  filePath: string,
  width?: number,
  height?: number
) {
  const blob = bucket.file(filePath);
  const blobStream = blob.createWriteStream({
    metadata: {
      // Browser cache for 3 hours
      cacheControl: "public, max-age=180",
    },
  });

  const convertedBuffer = await sharp(file.buffer)
    .resize(width, height, { fit: sharp.fit.contain })
    .webp({ quality: 60, nearLossless: true, force: true })
    .toFormat("webp")
    .toBuffer();

  const result = new Promise<string>((resolve, reject) => {
    blobStream.on("finish", () => {
      return resolve(`${publicUrl}/${filePath}` as string);
    });
  });

  blobStream.end(convertedBuffer);

  return result;
}

export default mediaRoutes;
