import { useClipboard } from 'use-clipboard-copy';
import { Card, CardContent, Typography, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React, { useState } from 'react';
import './UrlShareBox.scss';

interface UrlShareBoxProps {
    url: string;
}

const UrlShareBox: React.FC<UrlShareBoxProps> = ({ url }) => {
    const [copiedUrl, setCopiedUrl] = useState(false);
    const clipboard = useClipboard();

    const handleCopyUrl = () => {
        clipboard.copy(url);
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
    };

    if (!url) return null;

    return (
        <Card variant="outlined" className="box-url-share">
            <CardContent>
                <Typography variant="h6" className="title">Your Link Is Ready!</Typography>
                <Typography variant="body2" className="url">{url}
                    <Tooltip title={copiedUrl ? "Copied" : "Copy to clipboard"} arrow>
                        <IconButton onClick={handleCopyUrl}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Tooltip>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default UrlShareBox;