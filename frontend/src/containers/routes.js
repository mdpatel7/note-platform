import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage/LoginPage';
import Register from '../components/RegisterPage/Register';
import DashBoard from '../components/DashBoard/DashBoard';
//import ColorPicker from '../components/ColorPicker/ColorPicker';
import TagInput from '../components/NotesPopup/TagInput';
import Demo from '../components/Note/Demo';
import Note from '../components/Note/Note';
import ProfilePage from "../components/ProfilePage/ProfilePage";
import CheatSheet from "../components/CheatSheet/CheatSheet";


const AppRoutes = () => (
	<div>
		<Switch>
			<Route exact path="/" component={LoginPage}/>
			<Route path="/register" component={Register}/>
			<Route path="/dashboard" component={DashBoard}/>
			<Route path="/tags" component={TagInput}/>
			<Route path="/demo/:note_id" component={Note}/>
			<Route path="/demo" component={Demo}/>
            <Route path="/profile" component={ProfilePage}/>
            <Route path="/cheatsheet" component={CheatSheet}/>


		</Switch>
	</div>
);

export default AppRoutes;
