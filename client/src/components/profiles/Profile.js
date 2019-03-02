import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as moment from "moment";
import axios from "axios";

import { getHandleProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.props.getHandleProfile(
      this.props.location.pathname.substring("/profile/".length)
    );
    this.state = {
      username: "lcycug",
      clientId: "631ed56a6bbe89c1bfba",
      clientSecret: "62f8d22d02394e8b9d4f151fc26fb6edbfb46b6a",
      loading: true,
      profile: null,
      repos: []
    };
  }
  componentDidMount() {
    const { username, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?sort=created&per_page=5&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => {
        debugger;
        console.log(res);
        this.setState({
          repos: res
        });
      })
      .catch(err => console.log(err));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      this.setState({
        loading: nextProps.profile.loading,
        profile: nextProps.profile.profile
      });
    }
  }
  render() {
    let profileContent;
    const { profile, loading } = this.state;
    if (loading || profile === null) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <>
          {/* <!-- Profile Header --> */}
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-info text-white mb-3">
                <div className="row">
                  <div className="col-4 col-md-3 m-auto">
                    <img
                      className="rounded-circle"
                      src={profile.user.avatar}
                      alt=""
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="display-4 text-center">{profile.user.name}</h1>
                  <p className="lead text-center">{profile.status}</p>
                  <p>{profile.location}</p>
                  <p>
                    <a className="text-white p-2" href={profile.website}>
                      <i className="fas fa-globe fa-2x" />
                    </a>
                    {profile.social &&
                      Object.keys(profile.social).length &&
                      Object.keys(profile.social).map(social => (
                        <a
                          className="text-white p-2"
                          href={profile.social[social]}
                        >
                          <i className={`fab fa-${social} fa-2x`} />
                        </a>
                      ))}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Profile About --> */}
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-light mb-3">
                {profile.bio ? (
                  <>
                    <h3 className="text-center text-info">
                      {profile.user.name}'s Bio
                    </h3>
                    <p className="lead">{profile.bio}</p>
                    <hr />
                  </>
                ) : null}
                <h3 className="text-center text-info">Skill Set</h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {profile.skills &&
                      profile.skills.length &&
                      profile.skills.map(skill => (
                        <div className="p-3">
                          <i className="fa fa-check" /> {skill}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Profile Creds --> */}
          <div className="row">
            <div className="col-md-6">
              <h3 className="text-center text-info">Experience</h3>
              <ul className="list-group">
                {profile.experience &&
                  profile.experience.length &&
                  profile.experience.map(exp => (
                    <>
                      <li className="list-group-item">
                        <h4>{exp.company}</h4>
                        <p>
                          {moment(exp.from).format("MMM YYYY")} -{" "}
                          {exp.current
                            ? "Now"
                            : moment(exp.to).format("MMM YYYY")}
                        </p>
                        <p>
                          <strong>Position:</strong> {exp.title}
                        </p>
                        <p>
                          <strong>Description:</strong> {exp.description}
                        </p>
                      </li>
                    </>
                  ))}
              </ul>
            </div>
            <div className="col-md-6">
              <h3 className="text-center text-info">Education</h3>
              <ul className="list-group">
                {profile.education &&
                  profile.education.length &&
                  profile.education.map(edu => (
                    <>
                      <li className="list-group-item">
                        <h4>{edu.school}</h4>
                        <p>
                          {moment(edu.from).format("MMM YYYY")} -{" "}
                          {edu.current
                            ? "Now"
                            : moment(edu.to).format("MMM YYYY")}
                        </p>
                        <p>
                          <strong>Degree: </strong>
                          {edu.degree}
                        </p>
                        <p>
                          <strong>Field Of Study: </strong>
                          {edu.fieldofstudy}
                        </p>
                        <p>
                          <strong>Description: </strong>
                          {edu.description}
                        </p>
                      </li>
                    </>
                  ))}
              </ul>
            </div>
          </div>

          {/* <!-- Profile Github --> */}
          <div ref="myRef">
            <hr />
            <h3 className="mb-4">Latest Github Repos</h3>
            <div className="card card-body mb-2">
              <div className="row">
                <div className="col-md-6">
                  <h4>
                    <a href="/" className="text-info" target="_blank">
                      {" "}
                      Repository One
                    </a>
                  </h4>
                  <p>Repository description</p>
                </div>
                <div className="col-md-6">
                  <span className="badge badge-info mr-1">Stars: 44</span>
                  <span className="badge badge-secondary mr-1">
                    Watchers: 21
                  </span>
                  <span className="badge badge-success">Forks: 122</span>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="profile">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-6">
                    <Link
                      to="/profiles"
                      className="btn btn-light mb-3 float-left"
                    >
                      Back To Profiles
                    </Link>
                  </div>
                  <div className="col-6" />
                </div>
                {profileContent}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getHandleProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getHandleProfile }
)(Profile);
