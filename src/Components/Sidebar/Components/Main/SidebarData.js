import React from "react";
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
//orders
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
//users
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
//request
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
//boxes
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
export const SidebarData = [
  {
    title: "Dashboard",
     iconHover: <DashboardOutlinedIcon style={{fill: "black"}} />,
     icon: <DashboardOutlinedIcon style={{fill: "grey"}} />,
    subNav: [],
  },
  {
    title: "Requests",
    iconHover: <ViewAgendaOutlinedIcon style={{fill: "black"}} />,
    icon: <ViewAgendaOutlinedIcon style={{fill: "grey"}} />,
    subNav: [
      {
        title: "Pending"
      },
      {
        title: "Confirmed"
      },
      {
          title:"All Requests"
      }
    ],
  },
  {
    title: "Users",
    iconHover: <PersonOutlineIcon style={{fill: "black"}} />,
    icon: <PersonOutlineIcon style={{fill: "grey"}} />,
    subNav: [
      {
        title: "Customers"
      },
      {
        title: "Admins"
      },
      ,
      {
        title: "Ordering"
      },
      ,
      {
        title: "Warehouse"
      },
      ,
      {
        title: "Accounting"
      },
    ],
  },
  {
    title: "Boxes",
    iconHover: <InboxOutlinedIcon style={{fill: "black"}} />,
    icon: <InboxOutlinedIcon style={{fill: "grey"}} />,
    subNav: [] ,
  },
  {
    title: "Orders",
    iconHover: <ChatBubbleOutlineIcon style={{fill: "black"}} />,
    icon: <ChatBubbleOutlineIcon style={{fill: "grey"}} />,
    subNav: [
      {
        title: "Pending"
      },
      {
        title: "Confirmed"
      },
      {
        title: "All Orders"
      },
    ],
  }
];
