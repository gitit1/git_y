import React, { RefObject, useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import YButton from 'components/Shared/Button';
import { AlertTypes, UploadStatus } from 'components/ShareImage/ShareImage.types';
import './BtnsPanel.scss';
import { Alert } from '@mui/material';

interface BtnsPanelProps {
  fileInputRef: RefObject<HTMLInputElement>;
  expirationDate: any;
  selectedFile: File | null;
  uploadStatus: UploadStatus;
  fileMessage: { type: AlertTypes; text: string } | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (date: any) => void;
  handleUploadFile: () => void;
  handleRestart: () => void;
}

const BtnsPanel: React.FC<BtnsPanelProps> = ({
  fileInputRef,
  expirationDate,
  selectedFile,
  uploadStatus,
  fileMessage,
  handleFileChange,
  handleDateChange,
  handleUploadFile,
  handleRestart,
}) => {

  const [minDate] = useState<Dayjs>(dayjs());
  const [maxDate] = useState<Dayjs>(minDate.add(2, 'month'));


  if (uploadStatus === UploadStatus.Success) {
    return (
      <div className="btns-panel">
        <YButton
          label="Upload Annother Image"
          color="secondary"
          fullWidth
          onClick={handleRestart}
        />
      </div>
    );
  }

  return (
    <div className="btns-panel">
      <YButton
        label="Add Image"
        color="primary"
        fullWidth
        startIcon={<FileUploadIcon />}
        component="label"
        inputProps={{
          type: 'file',
          accept: 'image/*',
          onChange: handleFileChange
        }}
        inputRef={fileInputRef}
      />

      {fileMessage && (
        <Alert severity={fileMessage.type} sx={{ mt: 1 }}>
          {fileMessage.text}
        </Alert>
      )}


      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Set Expiration Date"
          value={expirationDate}
          onChange={handleDateChange}
          minDate={minDate}
          maxDate={maxDate}
          slotProps={{ textField: { fullWidth: true, variant: 'outlined' } }}
        />
      </LocalizationProvider>

      <YButton
        label="Upload"
        color="success"
        fullWidth
        disabled={!selectedFile || !expirationDate}
        onClick={handleUploadFile}
      />
    </div>
  );
};

export default BtnsPanel;