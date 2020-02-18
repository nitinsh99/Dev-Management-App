import React from 'react';
import UserSearch from './User-Section/index';
import ProjectSearch from './Project-Section/index';
import { Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { WithSpinner } from 'components';
const Search = props => {
  const { searchuserdata, searchprojectdata, authdata } = props;
  const UserSearchLoaded = searchuserdata.loaded;
  const ProjectSearchLoaded = searchprojectdata.loaded;
  return (
    <Switch>
      <Route
        component={WithSpinner(UserSearch, UserSearchLoaded)}
        path="/search/user"
      />
      <Route
        component={WithSpinner(ProjectSearch, ProjectSearchLoaded)}
        path="/search/project"
      />
      {authdata.isAuth === false && authdata.loaded === false ? (
        <Redirect to="/" />
      ) : null}
    </Switch>
  );
};
const mapStateToProps = state => state;
export default connect(mapStateToProps)(Search);
