import React, { useRef, useState } from 'react';

import { Dayjs } from 'dayjs';
import { Paper } from '@mui/material';

import { uploadImage } from 'lib/axios';
import { AlertTypes, ALLOWED_IMAGE_TYPES, AllowedImageTypes, UploadStatus } from './ShareImage.types';

import BtnsPanel from './components/BtnsPanel';
import UploadProgress from './components/UploadProgress.tsx';
import UrlShareBox from './components/UrlShareBox';

import './ShareImage.scss';

const ShareImage: React.FC = () => {
  const { Loading, Idle, Success, Error } = UploadStatus;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [expirationDate, setExpirationDate] = useState<Dayjs | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(Idle);
  const [imageData, setImageData] = useState<{ name: string; url: string } | null>(null);
  const [fileMessage, setFileMessage] = useState<{ type: AlertTypes; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (date: Dayjs | null) => {
    setExpirationDate(date);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  
    if (file) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type as AllowedImageTypes)) {
        setFileMessage({ type: 'error', text: 'Invalid file type. Please upload an image.' });
        event.target.value = ''; 
        return;
      }
  
      setFileMessage({ type: 'success', text: `Selected: ${file.name}` });
      setSelectedFile(file);
    }
  };

  const handleUploadFile = async () => {
    if (!selectedFile || !expirationDate) return;
    setUploadStatus(Loading);

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('expirationDate', expirationDate.toISOString());

    try {
      const response = await uploadImage(formData);

      setSelectedFile(null);
      setExpirationDate(null);
      setImageData({ name: response.fileName, url: response.imageUrl });
      setUploadStatus(Success);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setUploadStatus(Error);
      console.error('Upload Failed:', error);
    }

  };

  const handleRestart = () => {
    setUploadStatus(Idle);
    setSelectedFile(null);
    setExpirationDate(null);
    setImageData(null);
    setFileMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Paper className='share-image-card' elevation={8}>
      <BtnsPanel
        fileInputRef={fileInputRef}
        expirationDate={expirationDate}
        selectedFile={selectedFile}
        uploadStatus={uploadStatus}
        fileMessage={fileMessage}
        handleFileChange={handleFileChange}
        handleDateChange={handleDateChange}
        handleUploadFile={handleUploadFile}
        handleRestart={handleRestart}
      />
      <UploadProgress status={uploadStatus} />
      {imageData && <UrlShareBox url={imageData.url} />}
    </Paper>
  );
};

export default ShareImage;