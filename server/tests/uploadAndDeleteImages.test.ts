// tests/uploadAndDeleteImages.test.ts
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import request from 'supertest';
import app from '../server';
import Image from '../models/imageModel';
import { deleteImages } from '../controllers/deleteImages';
import config from '../config';

let mongoServer: MongoMemoryServer;
const imagesFolder = config.images_folder;
const tempImagePath = path.join(__dirname, 'tempImage.jpg');

beforeAll(async () => {
  fs.writeFileSync(tempImagePath, 'dummy image content');

  if (!fs.existsSync(imagesFolder)) {
    fs.mkdirSync(imagesFolder, { recursive: true });
  }

  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  if (fs.existsSync(imagesFolder)) {
    fs.readdirSync(imagesFolder).forEach((file) => {
      try {
        fs.unlinkSync(path.join(imagesFolder, file));
      } catch (err) {
        console.error(`Error deleting file ${file}:`, err);
      }
    });
    fs.rmdirSync(imagesFolder);
  }

  if (fs.existsSync(tempImagePath)) {
    fs.unlinkSync(tempImagePath);
  }

  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Image.deleteMany({});
});

test('Upload expired image and delete it via deleteImages()', async () => {
  // Set expiration to two days ago to avoid timezone issues.
  const expiredDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();

  const expiredResponse = await request(app)
    .post('/v1/images')
    .field('expirationDate', expiredDate)
    .attach('image', tempImagePath);
  expect(expiredResponse.status).toBe(201);

  const expiredFileName = expiredResponse.body.fileName;
  const expiredFilePath = path.join(imagesFolder, expiredFileName);
  expect(fs.existsSync(expiredFilePath)).toBe(true);

  let imageRecord = await Image.findOne({ fileName: expiredFileName });
  expect(imageRecord).not.toBeNull();

  await deleteImages();

  await new Promise((resolve) => setTimeout(resolve, 100));

  imageRecord = await Image.findOne({ fileName: expiredFileName });
  expect(imageRecord).toBeNull();
  expect(fs.existsSync(expiredFilePath)).toBe(false);
});

test('Upload valid image and delete it manually', async () => {
  const validDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const validResponse = await request(app)
    .post('/v1/images')
    .field('expirationDate', validDate)
    .attach('image', tempImagePath);
  expect(validResponse.status).toBe(201);

  const validFileName = validResponse.body.fileName;
  const validFilePath = path.join(imagesFolder, validFileName);
  expect(fs.existsSync(validFilePath)).toBe(true);
  const imageRecord = await Image.findOne({ fileName: validFileName });
  expect(imageRecord).not.toBeNull();

  await fsPromises.unlink(validFilePath);
  await Image.deleteOne({ fileName: validFileName });
  expect(fs.existsSync(validFilePath)).toBe(false);
});
