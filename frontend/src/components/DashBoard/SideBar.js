import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';

import Avatar from '@material-ui/core/Avatar';
import AccountIcon from '@material-ui/icons/AccountCircle';
import LogOutIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
// import NoteIcon from '@material-ui/icons/Description';
import NoteIcon from '@material-ui/icons/Note';
import CheetSheetIcon from '@material-ui/icons/Receipt';
import GroupIcon from '@material-ui/icons/Group';
import TrendIcon from '@material-ui/icons/TrendingUp';
import Popover from '@material-ui/core/Popover';

import MainNotes from './MainNotes';
import { SideNav } from '../CustomComponents/SideNav';

import './SideBar.css';

// const CustomLinkComponent = props => {
//   return (
//     <Route
//       path={props.to}
//       children={() => (
//         <div>
//           {props.children}
//           <Link to={props.to}>{props.label}</Link>
//         </div>
//       )}
//     />
//   );
// }

class SideBar extends Component {
  state = {
    show: false,
    anchorEl: null,
  }

  setSideBarWidth = () => {
    this.setState((prevState) => ({
      show: !prevState.show
    }));
  }

  getSelectedChild = (path) => {
    let child = null;
    switch(path){
      case "dashboard":
        child = 0;
        break;
      case "cheatsheet":
        child = 1;
        break;
      case "recommendednotes":
        child = 2;
        break;
      case "groupnotes":
        child = 3;
        break;
      default:
        child = 0;
    }
    return child;
  }

  render(){
    const path = this.props.match.path.split("/")[1];
    const child = this.getSelectedChild(path);
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    console.log(child);
    return (
      <Router>
        <div className="container">
          <nav className={"app-nav"}> 
            <div className="menu-icon" onClick={() => { this.setSideBarWidth() }}>
              <MenuIcon style={{color: "#0052cc"}}  />
            </div>
            <div className="app-name-div">Note Platform</div>
            <Avatar className="avatar" onClick={(e) => {this.setState({ anchorEl: e.currentTarget });}}>U</Avatar>
            <Popover
              id="render-props-popover"
              open={open}
              anchorEl={anchorEl}
              onClose={() => {
                this.setState({
                  anchorEl: null,
                });
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <div>
                <div className="avatar-div">
                  <AccountIcon style={{color: "#2196f3"}}/> <Link to="/profile">Profile</Link>
                </div>
                <div className="avatar-div">
                  <LogOutIcon style={{color: "#2196f3"}}/> <a href="#">Logout</a>
                </div>
              </div>
            </Popover>
          </nav>
          <div className="sub-container">
            <div style={{width: "17%", height: "97%", marginTop: "1%"}}>
              <SideNav show={this.state.show} child={child}>
                {/* <CustomLinkComponent label="My Notes" className="menu-item" to ="/dashboard">
                  <NoteIcon style={{marginLeft: "5px", color: "#2196f3"}} />
                </CustomLinkComponent> */}
                <div>
                  <NoteIcon style={{marginLeft: "5px", color: "#2196f3"}} />
                  <Link to ="/dashboard">My Notes</Link>
                </div>
                <div>
                  <CheetSheetIcon style={{marginLeft: "5px", color: "#2196f3"}} />
                  <Link to = "/cheatsheet">Cheat Sheets</Link>
                </div>
                <div>
                  <TrendIcon style={{marginLeft: "5px", color: "#2196f3"}} />
                  <Link to = '/recommendednotes'>Recommended Notes</Link>
                </div>
                <div>
                  <GroupIcon style={{marginLeft: "5px", color: "#2196f3"}} />
                  <Link to = '/groupnotes'>Collaborative Notes</Link>
                </div>
              </SideNav>
            </div>
            <div style={{width: "83%"}}>
              <div className="pages-container">
                <Route path={"/dashboard"} exact={true} component={MainNotes}/>  
              </div>
            </div>  
          </div>
        </div>
      </Router>
      
    );  
  }  
}

export default withRouter(SideBar);