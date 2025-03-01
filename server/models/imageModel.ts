import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IImage extends Document {
    fileName: string;
    uploadTime: Date;
    expirationDate: Date;
  }

  const imageSchema: Schema<IImage> = new Schema({
    fileName: { type: String, required: true },
    uploadTime: { type: Schema.Types.Date, default: Date.now },
    expirationDate: { type: Schema.Types.Date, required: true }
});

const Image: Model<IImage> = mongoose.model<IImage>('Image', imageSchema);

export default Image;