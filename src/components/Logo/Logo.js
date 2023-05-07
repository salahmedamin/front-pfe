// material-ui
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Ekara from "../../assets/images/ekara.webp";

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Mantis" width="100" />
         *
         */
        <Box style={{
            width: 180,
            height: 60,
            backgroundImage: `url(${Ekara})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
        }} />
    );
};

export default Logo;
