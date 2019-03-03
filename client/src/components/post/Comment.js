import React, { Component } from "react";
import { connect } from "react-redux";

import { getSinglePost } from "../../actions/postActions";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    };
    this.props.getSinglePost(
      this.props.location.pathname.substring("/feed/post/".length)
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      this.setState({ post: nextProps.post.post });
    }
  }
  render() {
    return (
      <>
        <div className="post">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {/* <!-- Post Item --> */}
                <div className="card card-body mb-3">
                  <div className="row">
                    <div className="col-md-2">
                      <a href="profile.html">
                        <img
                          className="rounded-circle d-none d-md-block"
                          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                          alt=""
                        />
                      </a>
                      <br />
                      <p className="text-center">John Doe</p>
                    </div>
                    <div className="col-md-10">
                      <p className="lead">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sint possimus corporis sunt necessitatibus! Minus
                        nesciunt soluta suscipit nobis. Amet accusamus
                        distinctio cupiditate blanditiis dolor? Illo perferendis
                        eveniet cum cupiditate aliquam?
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- Comment Form --> */}
                <div className="post-form mb-3">
                  <div className="card card-info">
                    <div className="card-header bg-info text-white">
                      Say Somthing...
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <textarea
                            className="form-control form-control-lg"
                            placeholder="Create a post"
                          />
                        </div>
                        <button type="submit" className="btn btn-dark">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                {/* <!-- Comment Feed --> */}
                <div className="comments">
                  {/* <!-- Comment Item --> */}
                  <div className="card card-body mb-3">
                    <div className="row">
                      <div className="col-md-2">
                        <a href="profile.html">
                          <img
                            className="rounded-circle d-none d-md-block"
                            src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                            alt=""
                          />
                        </a>
                        <br />
                        <p className="text-center">Kevin Smith</p>
                      </div>
                      <div className="col-md-10">
                        <p className="lead">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Sint possimus corporis sunt necessitatibus!
                          Minus nesciunt soluta suscipit nobis.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card card-body mb-3">
                    <div className="row">
                      <div className="col-md-2">
                        <a href="profile.html">
                          <img
                            className="rounded-circle d-none d-md-block"
                            src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                            alt=""
                          />
                        </a>
                        <br />
                        <p className="text-center">Karen Johnson</p>
                      </div>
                      <div className="col-md-10">
                        <p className="lead">
                          {" "}
                          Amet accusamus distinctio cupiditate blanditiis dolor?
                          Illo perferendis eveniet cum cupiditate aliquam?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getSinglePost }
)(Comment);
