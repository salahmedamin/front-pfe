import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// material-ui
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// assets
import {
    DeleteOutlined,
    EditOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import { useSelector } from "react-redux";

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
  const theme = useTheme();
  const { user } = useSelector((e) => e.auth);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    return () => {
      setSelectedIndex(-1);
    };
  }, []);

  return (
    <List
      component="nav"
      sx={{
        p: 0,
        "& .MuiListItemIcon-root": {
          minWidth: 32,
          color: theme.palette.grey[500],
        },
      }}
    >
      <ListItemButton
        selected={selectedIndex === 4}
        onClick={(event) => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Update Details" />
      </ListItemButton>
      {!user.image ? null : (
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <DeleteOutlined />
          </ListItemIcon>
          <ListItemText primary="Remove Image" />
        </ListItemButton>
      )}
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Edit Image" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func,
};

export default ProfileTab;
