import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './CheckServerConnection.scss';

const CheckServerConnection: React.FC = () => {
    const [serverStatus, setServerStatus] = useState({ text: 'Checking server...', color: '#f1c40f' });

    useEffect(() => {
        fetch('http://localhost:3031')
            .then(response => {
                return response.text();
            })
            .then(() => {
                setServerStatus({ text: 'Server is Online.', color: '#00720f' });
            })
            .catch(() => setServerStatus({ text: 'Server is Offline.', color: '#af0606' }));
    }, []);

    return (
        <Box className="server_status">
            <FiberManualRecordIcon className={`blink`} style={{ color: serverStatus.color, fill: serverStatus.color }} />
            <Typography component="span">
                {serverStatus.text}
            </Typography>
        </Box>
    );
};

export default CheckServerConnection;