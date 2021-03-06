import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import { setSearchField } from '../../actions/sessionActions';
import SearchBox from './SearchBox';
import Avatar from '@material-ui/core/Avatar';
import AccountIcon from '@material-ui/icons/AccountCircle';
import LogOutIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
// import NoteIcon from '@material-ui/icons/Description';
import NoteIcon from '@material-ui/icons/Note';
import CheetSheetIcon from '@material-ui/icons/Receipt';
import GroupIcon from '@material-ui/icons/Group';
import TrendIcon from '@material-ui/icons/TrendingUp';
import ChartIcon from '@material-ui/icons/BarChart';
import Popover from '@material-ui/core/Popover';

import LoginPage from '../LoginPage/LoginPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import MainNotes from './MainNotes';
import GroupNotes from '../GroupNotes/GroupNotes';
import RecommendedNotes from '../RecommendedNotes/RecommendedNotes';
import CheatSheets from '../Cheatsheets/CheatSheet';
import AuthenticateUser from '../../containers/AuthenticateUser';

import { SideNav } from '../CustomComponents/SideNav';

import './SideBar.css';
import VizLineChart from "../Viz/VizLineChart";

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
    console.log(path);
    const child = this.getSelectedChild(path)+1;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { setSearchField, onSearchChange } = this.props;
    return (
      <Router>
        <div className="container">
          <nav className={"app-nav"}> 
            <div className="menu-icon" onClick={() => { this.setSideBarWidth() }}>
              <MenuIcon style={{color: "#0052cc"}}  />
            </div>
            <div className="app-name-div">LearnHub</div>
            <SearchBox searchChange={setSearchField}/>

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
              className="sidebar-popup"
            >
              <div style={{width: "135px"}}>
                <div className="avatar-div">
                  <AccountIcon style={{color: "#0052cc"}}/> <Link to="/profile">Profile</Link>
                </div>
                <div className="avatar-div" onClick={() => this.props.history.push("/")}>
                  <LogOutIcon style={{color: "#0052cc"}}/> <a >Logout</a>
                </div>
              </div>
            </Popover>
          </nav>
          <div className="sub-container">
            <div style={{width: "17%", height: "97%", marginTop: "1%"}}>
              <SideNav show={this.state.show} child={child}>
                <div>
                  <NoteIcon style={{marginLeft: "5px", color: "#0052cc"}} />
                  <Link to ="/dashboard">My Notes</Link>
                </div>
                <div>
                  <CheetSheetIcon style={{marginLeft: "5px", color: "#0052cc"}} />
                  <Link to = "/cheatsheet">Cheat Sheets</Link>
                </div>
                <div>
                  <TrendIcon style={{marginLeft: "5px", color: "#0052cc"}} />
                  <Link to = '/recommendednotes'>Recommended Notes</Link>
                </div>
                <div>
                  <GroupIcon style={{marginLeft: "5px", color: "#0052cc"}} />
                  <Link to = '/groupnotes'>Group Notes</Link>
                </div>
                  <div>
                      <ChartIcon style={{marginLeft: "5px", color: "#0052cc"}} />
                      <Link to = '/viz'>Visualization</Link>
                  </div>
              </SideNav>
            </div>
            <div style={{width: "83%"}}>
              <div className="pages-container">
                <Route path={"/dashboard"} exact={true} component={MainNotes}/>  
                <Route path={"/cheatsheet"} exact={true} component={CheatSheets}/>  
                <Route path={"/groupnotes"} exact={true} component={GroupNotes}/>  
                <Route path={"/recommendednotes"} exact={true} component={RecommendedNotes}/>
                <Route path={"/viz"} exact={true} component={VizLineChart}/>
                <Route path={"/profile"} exact={true} component={ProfilePage}/>  
              </div>
            </div>  
          </div>
        </div>
      </Router>
      
    );  
  }  
}

function mapStateToProps(state){
  return {
    searchField: state.session.searchField
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ setSearchField }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));