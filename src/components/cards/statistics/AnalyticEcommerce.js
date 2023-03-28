import PropTypes from "prop-types";

// material-ui
import { Grid, IconButton, Stack, Typography } from "@mui/material";

// project import
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router";
import MainCard from "../../../components/MainCard";

// assets

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({
  color,
  title,
  count,
  percentage,
  isLoss,
  extra,
}) => {
  const nav = useNavigate();
  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary">
          TOTAL {title}S
        </Typography>
        <Grid container alignItems="center">
          <Grid
            item
            justifyContent={"space-between"}
            alignItems="center"
            flexDirection={"row"}
            width={"100%"}
            display="flex"
          >
            <Typography variant="h4" color="inherit">
              {count}
            </Typography>
            <IconButton onClick={() => nav("/manage/" + title.toLowerCase()+"s")}>
              <ArrowBack sx={{ transform: "rotate(180deg)" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Stack>
    </MainCard>
  );
};

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

AnalyticEcommerce.defaultProps = {
  color: "primary",
};

export default AnalyticEcommerce;
