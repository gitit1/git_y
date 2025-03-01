import fs from 'fs/promises';
import path from 'path';
import Image from '../models/imageModel';
import config from '../config';

export const deleteImages = async (): Promise<void> => {
    console.log('|deleteImages| - RUNNING');
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    try {
        const expiredImages = await Image.find({ expirationDate: { $lt: todayMidnight } });

        if (expiredImages.length === 0) {
            console.log('|deleteImages| - NOTHING TO CLEAR');
        }

        for (const image of expiredImages) {
            const filePath = path.join(config.images_folder, image.fileName);

            try {
                await fs.access(filePath);
                await fs.unlink(filePath);
                console.log(`|deleteImages| - DELETE IMAGE FROM STORAGE: ${image.fileName}`);
            } catch (fileError) {
                console.log(`|deleteImages| - FILE NOT FOUND: ${image.fileName}`);
            }
        }

        await Image.deleteMany({ expirationDate: { $lt: todayMidnight } });
        console.log(`|deleteImages| - DELETE IMAGES FROM DB`);

    } catch (error) {
        console.log(`|deleteImages| - ERROR: ${error}`);
    }
};

