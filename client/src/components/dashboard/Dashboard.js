import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Spinner from "../common/Spinner";

import {
  getCurrentProfile,
  setProfileLoading
} from "../../actions/profileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.setProfileLoading();
    this.props.getCurrentProfile();
  }
  render() {
    const { user, idAuthenticated } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      // TODO: user profile display
      dashboardContent = <Spinner />;
    } else {
      // No profile for current user
      dashboardContent = (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              <p className="lead text-muted">Welcome John Doe</p>
              <div className="btn-group mb-4" role="group">
                <Link
                  to="/dashboard/create-new-profile"
                  className="btn btn-info "
                >
                  Create New Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div>{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  setProfileLoading: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, setProfileLoading }
)(Dashboard);
