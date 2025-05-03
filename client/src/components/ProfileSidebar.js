import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from 'react-redux';
import {
  AccountCircle as AccountCircleIcon,
  PersonAddAlt1 as PersonAddAlt1Icon,
  Add as AddIcon,
  Storage as StorageIcon,
  Visibility as VisibilityIcon,
  CreditCard as CreditCardIcon,
  ShoppingCart as ShoppingCartIcon,
  Autorenew as AutorenewIcon,
  AccountBalance as AccountBalanceIcon,
  Description as DescriptionIcon,
  DirectionsCarOutlined as DirectionsCarOutlinedIcon,
  PhotoLibraryOutlined as PhotoLibraryOutlinedIcon,
  Feedback as FeedbackIcon,
  Report as ReportIcon,
} from "@mui/icons-material";

import { Lock } from '@mui/icons-material';
import { userTypes } from "../utils.js";

const ProfileSidebar = (props) => {
  const theme = useTheme();
  const [selectedContent, setSelectedContent] = useState("profile");

  const handleItemClick = (content) => {
    props.onItemClick(content);
    setSelectedContent(content);
  };


  return (
    <div
      style={{
        backgroundColor: theme.palette.primary.side,
        height: '100%',
        padding: "20px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Sidebar Content
      </Typography>
      <List>

        <SideBarListItem
          onClick={() => handleItemClick("profile")}
          selected={selectedContent === "profile"}
          primary="Profile"
          icon={<AccountCircleIcon />}
        />

        <SetSideBarLists handleItemClick={handleItemClick} selectedContent={selectedContent} />

        <SideBarListItem
          onClick={() => handleItemClick("feedback")}
          selected={selectedContent === "feedback"}
          primary="Feedback"
          icon={<FeedbackIcon />}
        />

        <SideBarListItem
          onClick={() => handleItemClick("complaint")}
          selected={selectedContent === "complaint"}
          primary="Complaint"
          icon={<ReportIcon />}
        />

        <SideBarListItem
          onClick={() => handleItemClick("auth")}
          selected={selectedContent === "auth"}
          primary="Auhorization"
          icon={<ReportIcon />}
        />

        <SideBarListItem
          onClick={() => handleItemClick("changePassword")}
          selected={selectedContent === "changePassword"}
          primary="Change Password"
          icon={<Lock />}
        />

      </List>
    </div>
  );
};

export default ProfileSidebar;

function SideBarListItem({ onClick, selected, primary, icon }) {

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <ListItem button onClick={onClick} sx={{ backgroundColor: selected ? "rgba(0, 0, 0, 0.08)" : "" }}>
      <ListItemIcon>{icon}</ListItemIcon>
      {isMd && <ListItemText primary={primary} />}
    </ListItem>
  )
};

function SetSideBarLists({ handleItemClick, selectedContent }) {

  const loggedUser = useSelector((state) => state.user);

  switch (loggedUser.userType) {

    case userTypes.ADMIN:
      return (
        <span>

          <SideBarListItem
            onClick={() => handleItemClick("addEmployee")}
            selected={selectedContent === "addEmployee"}
            primary="Add Employee"
            icon={<PersonAddAlt1Icon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("viewEmployee")}
            selected={selectedContent === "viewEmployee"}
            primary="View Employee"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("viewPackage")}
            selected={selectedContent === "viewPackage"}
            primary="Package Details"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("addPackage")}
            selected={selectedContent === "addPackage"}
            primary="Add Package"
            icon={<AddIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("addAddOns")}
            selected={selectedContent === "addAddOns"}
            primary="Add Package Addons"
            icon={<AddIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("viewAddOns")}
            selected={selectedContent === "viewAddOns"}
            primary="View Package Addons"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("addSite")}
            selected={selectedContent === "addSite"}
            primary="Add Site"
            icon={<AddIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("viewSite")}
            selected={selectedContent === "viewSite"}
            primary="View Site"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("StockReq")}
            selected={selectedContent === "StockReq"}
            primary="Request Stock"
            icon={<AutorenewIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("stock")}
            selected={selectedContent === "stock"}
            primary="Stock"
            icon={<StorageIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("buyStock")}
            selected={selectedContent === "buyStock"}
            primary="Stock Replenish"
            icon={<ShoppingCartIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("FleetDetails")}
            selected={selectedContent === "FleetDetails"}
            primary="Trasport Details"
            icon={<DirectionsCarOutlinedIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("AddVehicles")}
            selected={selectedContent === "AddVehicles"}
            primary="Vehicle Details"
            icon={<DirectionsCarOutlinedIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("FleetTablePage")}
            selected={selectedContent === "FleetTablePage"}
            primary="Driver Fleet Details"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("biller")}
            selected={selectedContent === "biller"}
            primary="Biller"
            icon={<AccountBalanceIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("makePayment")}
            selected={selectedContent === "makePayment"}
            primary="Make Transaction"
            icon={<CreditCardIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("financialReport")}
            selected={selectedContent === "financialReport"}
            primary="Financial Report"
            icon={<DescriptionIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("LogReport")}
            selected={selectedContent === "LogReport"}
            primary="Log Report"
            icon={<DescriptionIcon />}
          />
        </span>
      )

    case userTypes.HR_MANAGER:
      return (
        <span>

          <SideBarListItem
            onClick={() => handleItemClick("addEmployee")}
            selected={selectedContent === "addEmployee"}
            primary="Add Employee"
            icon={<PersonAddAlt1Icon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("viewEmployee")}
            selected={selectedContent === "viewEmployee"}
            primary="View Employee"
            icon={<VisibilityIcon />}
          />

        </span>
      )

    case userTypes.STOCK_MANAGER:
      return (
        <span>

          <SideBarListItem
            onClick={() => handleItemClick("stock")}
            selected={selectedContent === "stock"}
            primary="Stock"
            icon={<StorageIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("buyStock")}
            selected={selectedContent === "buyStock"}
            primary="Stock Replenish"
            icon={<AutorenewIcon />}
          />

        </span>
      )

    case userTypes.SITE_MANAGER:
      return (
        <span>

          <SideBarListItem
            onClick={() => handleItemClick("viewPackage")}
            selected={selectedContent === "viewPackage"}
            primary="Package Details"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("addPackage")}
            selected={selectedContent === "addPackage"}
            primary="Add Package"
            icon={<AddIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("addAddOns")}
            selected={selectedContent === "addAddOns"}
            primary="Add Package Addons"
            icon={<AddIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("viewAddOns")}
            selected={selectedContent === "viewAddOns"}
            primary="View Package Addons"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("addSite")}
            selected={selectedContent === "addSite"}
            primary="Add Site"
            icon={<AddIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("viewSite")}
            selected={selectedContent === "viewSite"}
            primary="View Site"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("StockReq")}
            selected={selectedContent === "StockReq"}
            primary="Request Stock"
            icon={<AutorenewIcon />}
          />

        </span>
      )

    case userTypes.FINANCE_MANAGER:
      return (
        <span>

          <SideBarListItem
            onClick={() => handleItemClick("biller")}
            selected={selectedContent === "biller"}
            primary="Biller"
            icon={<AccountBalanceIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("makePayment")}
            selected={selectedContent === "makePayment"}
            primary="Make Transaction"
            icon={<CreditCardIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("financialReport")}
            selected={selectedContent === "financialReport"}
            primary="Financial Report"
            icon={<DescriptionIcon />}
          />

        </span>
      )

    case userTypes.FLEET_MANAGER:
      return (
        <span>

          <SideBarListItem
            onClick={() => handleItemClick("FleetDetails")}
            selected={selectedContent === "FleetDetails"}
            primary="Trasport Details"
            icon={<DirectionsCarOutlinedIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("AddVehicles")}
            selected={selectedContent === "AddVehicles"}
            primary="Vehicle Details"
            icon={<DirectionsCarOutlinedIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("FleetTablePage")}
            selected={selectedContent === "FleetTablePage"}
            primary="Driver Fleet Details"
            icon={<VisibilityIcon />}
          />

        </span>
      )

    case userTypes.CUSTOMER:
      return (
        <span>

          <SideBarListItem
            onClick={() => handleItemClick("viewSite")}
            selected={selectedContent === "viewSite"}
            primary="View Site"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("packageList")}
            selected={selectedContent === "packageList"}
            primary="Package List"
            icon={<PhotoLibraryOutlinedIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("customerInstallment")}
            selected={selectedContent === "customerInstallment"}
            primary="Pay Installement"
            icon={<CreditCardIcon />}
          />

        </span>
      )

    default:
      break;
  }
}