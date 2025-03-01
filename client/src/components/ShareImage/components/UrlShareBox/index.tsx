import { Card, CardContent, Typography, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React from 'react';
import './UrlShareBox.scss';

interface UrlShareBoxProps {
    url: string;
}

const UrlShareBox: React.FC<UrlShareBoxProps> = ({ url }) => {
    if (!url) return null;

    return (
        <Card variant="outlined" className="box-url-share">
            <CardContent>
                <Typography variant="h6" className="title">Your Link Is Ready!</Typography>
                <Typography variant="body2" className="url">{url}
                    <IconButton onClick={() => navigator.clipboard.writeText(url)}>
                        <ContentCopyIcon />
                    </IconButton>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default UrlShareBox;