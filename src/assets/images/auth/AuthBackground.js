// material-ui
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Ekara from "../ekara.webp";
// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
    const theme = useTheme();
    return (
        <Box sx={{ position: 'absolute', filter: 'blur(18px)', zIndex: -1, bottom: 0, backgroundImage: `url(${Ekara})` }}>
            {/* <Ekara /> */}
        </Box>
    );
};

export default AuthBackground;
