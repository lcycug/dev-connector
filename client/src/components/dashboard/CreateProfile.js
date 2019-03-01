import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Prompt } from "react-router-dom";
import PropTypes from "prop-types";

import { createProfile } from "../../actions/profileActions";

import TextFieldGroup from "../common/TextFieldGroup";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      status: "",
      company: "",
      location: "",
      skills: [],
      githubusername: "",
      website: "",
      bio: "",
      twitter: "",
      youtube: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      errors: {},
      socialAreaExpand: false,
      Blocking: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value, Blocking: true });
  };

  handleSubmit = event => {
    event.preventDefault();
    const profileData = {
      handle: this.state.handle,
      status: this.state.status,
      company: this.state.company,
      location: this.state.location,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      website: this.state.website,
      bio: this.state.bio,
      twitter: this.state.twitter,
      youtube: this.state.youtube,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin
    };
    this.props.createProfile(profileData, this.props.history);
    this.setState({ Blocking: false });
  };

  handleClick = event => {
    event.preventDefault();
    this.setState(preState => ({
      socialAreaExpand: !preState.socialAreaExpand,
      Blocking: true
    }));
  };

  render() {
    const { errors } = this.state;
    const options = [
      {
        label: "Select Professional Status",
        value: 0
      },
      {
        label: "Developer",
        value: "Developer"
      },
      {
        label: "Junior Developer",
        value: "Junior Developer"
      },
      {
        label: "Senior Developer",
        value: "Senior Developer"
      },
      {
        label: "Student or Learning",
        value: "Student or Learning"
      },
      {
        label: "Instructor or Teacher",
        value: "Instructor or Teacher"
      },
      {
        label: "Intern",
        value: "Intern"
      },
      {
        label: "Other",
        value: "Other"
      }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">
                (
                <i
                  className="fas fa-asterisk"
                  style={{ fontSize: "8px", color: "red" }}
                />
                ) Required fields
              </small>
              <form noValidate onSubmit={e => this.handleSubmit(e)}>
                <Prompt
                  when={this.state.Blocking}
                  message={location =>
                    `Are you sure you want to go to ${
                      location.pathname
                    },\nif so, infos here will be gone.`
                  }
                />
                <TextFieldGroup
                  placeholder="Profile handle"
                  name="handle"
                  required="required"
                  info="A unique handle for your profile URL. Your full name,
                company name, nickname, etc (This CAN'T be changed later)"
                  onChange={e => this.handleChange(e)}
                  error={errors.handle}
                />
                <TextFieldGroup
                  group="select"
                  name="status"
                  required="required"
                  info="Give us an idea of where you are at in your career"
                  onChange={e => this.handleChange(e)}
                  error={errors.status}
                  options={options}
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  info="Could be your own company or one you work for"
                  onChange={e => this.handleChange(e)}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  info="Could be your own or a company website"
                  onChange={e => this.handleChange(e)}
                  error={errors.website}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  info="City & state suggested (eg. Boston, MA)"
                  onChange={e => this.handleChange(e)}
                  error={errors.location}
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  required="required"
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
                  onChange={e => this.handleChange(e)}
                  error={errors.skills}
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  info="If you want your latest repos and a Github link, include
                  your username"
                  onChange={e => this.handleChange(e)}
                  error={errors.githubusername}
                />
                <TextFieldGroup
                  group="textarea"
                  placeholder="A short bio of yourself"
                  name="bio"
                  info="Tell us a little about yourself"
                  onChange={e => this.handleChange(e)}
                  error={errors.bio}
                />
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={e => this.handleClick(e)}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                {this.state.socialAreaExpand ? (
                  <>
                    <TextFieldGroup
                      group="icon-input"
                      icon="fab fa-twitter"
                      placeholder="Twitter Profile URL"
                      name="twitter"
                      onChange={e => this.handleChange(e)}
                      error={errors.twitter}
                    />
                    <TextFieldGroup
                      group="icon-input"
                      icon="fab fa-facebook"
                      placeholder="Facebook Page URL"
                      name="facebook"
                      onChange={e => this.handleChange(e)}
                      error={errors.facebook}
                    />
                    <TextFieldGroup
                      group="icon-input"
                      icon="fab fa-linkedin"
                      placeholder="Linkedin Page URL"
                      name="linkedin"
                      onChange={e => this.handleChange(e)}
                      error={errors.linkedin}
                    />
                    <TextFieldGroup
                      group="icon-input"
                      icon="fab fa-youtube"
                      placeholder="YouTube Page URL"
                      name="youtube"
                      onChange={e => this.handleChange(e)}
                      error={errors.youtube}
                    />
                    <TextFieldGroup
                      group="icon-input"
                      icon="fab fa-instagram"
                      placeholder="Instagram Page URL"
                      name="instagram"
                      onChange={e => this.handleChange(e)}
                      error={errors.instagram}
                    />
                  </>
                ) : null}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateTpProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateTpProps,
  { createProfile }
)(CreateProfile);
