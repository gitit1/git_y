import { Card, CardContent, Typography, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React, { useState } from 'react';
import './UrlShareBox.scss';

interface UrlShareBoxProps {
    url: string;
}

const UrlShareBox: React.FC<UrlShareBoxProps> = ({ url }) => {
    const [copiedUrl, setCopiedUrl] = useState(false);

    const handleCopyUrl = () => {
        if (navigator.clipboard && window.isSecureContext) { // not working on my insecure srver.
            navigator.clipboard.writeText(url).then(() => {
                setCopiedUrl(true);
                setTimeout(() => setCopiedUrl(false), 2000);
            }).catch(err => console.error("Clipboard copy failed:", err));
        } else { 
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopiedUrl(true);
                setTimeout(() => setCopiedUrl(false), 2000);
            } catch (err) {
                console.error("execCommand copy failed:", err);
            }
            document.body.removeChild(textArea);
        }
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