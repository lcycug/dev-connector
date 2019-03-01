import React, { Component } from "react";
import { connect } from "react-redux";

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
      errors: {}
    };
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("Submitting...");
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
              <a href="dashboard.html" className="btn btn-light">
                Go Back
              </a>
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
              <form action="add-experience.html">
                <TextFieldGroup
                  placeholder="* Profile handle"
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
                  error={errors.company}
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
                  <button type="button" className="btn btn-light">
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

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
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateTpProps = state => ({
  profile: state.profile
});

export default connect(mapStateTpProps)(CreateProfile);
