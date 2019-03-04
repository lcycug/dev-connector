import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { createPost } from "../../actions/postActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Posts from "./Posts";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.createPost({ text: this.state.text });
    // this.setState({ text: "" });
  };
  render() {
    const { errors } = this.state;
    return (
      <>
        <div className="feed">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {/* <!-- Post Form --> */}
                <div className="post-form mb-3">
                  <div className="card card-info">
                    <div className="card-header bg-info text-white">
                      Say Somthing...
                    </div>
                    <div className="card-body">
                      <form onSubmit={e => this.handleSubmit(e)}>
                        <TextFieldGroup
                          group="textarea"
                          name="text"
                          value={this.state.text}
                          placeholder="Create a post"
                          onChange={e => this.handleChange(e)}
                          error={errors.text}
                        />
                        <button type="submit" className="btn btn-dark mt-3">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <Posts />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Feed.propTypes = {
  errors: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createPost }
)(Feed);
