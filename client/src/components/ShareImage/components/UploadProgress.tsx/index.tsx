import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { UploadStatus } from 'components/ShareImage/ShareImage.types';
import './UploadProgress.scss';

interface UploadProgressProps {
    status: UploadStatus;
}

const UploadProgress = ({ status }: UploadProgressProps) => {
    const { Loading, Idle, Success, Error } = UploadStatus;
    if (status === Idle) return null;

    const progressValue: number =
        status === Loading ? 50 :
            status === Success ? 100 :
                0;

    const progressColor: 'error' | 'success' | 'warning' =
        status === Loading ? 'warning' :
            status === Success ? 'success' :
                'error';

    return (
        <Box className="upload-progress">
            <LinearProgress className="progress-bar" variant="determinate" value={progressValue} color={progressColor} />
            <Typography className="status-text" color={status === Error ? 'error' : 'text.primary'}>
                {status === Loading && 'Uploading...'}
                {status === Success && 'Upload Successful!'}
                {status === Error && 'Upload Failed!'}
            </Typography>
        </Box>
    );
};

export default UploadProgress;