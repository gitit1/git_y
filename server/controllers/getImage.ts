import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import Image from '../models/imageModel';
import config from '../config';

export const getImage = async (req: Request, res: Response): Promise<void> => {
    console.log('|getImage| - RUNNING');
    try {
        const { imageID } = req.params;
        const image = await Image.findOne({ fileName: imageID });

        if (!image) {
            console.log(`|getImage| - ${imageID} Not Found on DB`);
            res.status(404).json({ message: 'Image not found' });
            return;
        }

        const filePath = path.join(config.images_folder, image.fileName);

        if (!fs.existsSync(filePath)) {
            console.log(`|getImage| - ${imageID} Not Found on Server`);
            res.status(404).json({ message: 'Image not found on server' });
        }

        console.log(`|getImage| - Success`);
        res.sendFile(filePath);
    } catch (error) {
        console.log(`|getImage| - error`, error);
        res.status(500).json({ message: 'Server error', error });
    }
};