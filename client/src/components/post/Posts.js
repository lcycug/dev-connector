import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";

import { getPosts } from "../../actions/postActions";
import Spinner from "../common/Spinner";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.props.getPosts();
    this.state = {
      posts: null,
      loading: true
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      this.setState({
        posts: nextProps.post.post,
        loading: false
      });
    }
  }
  render() {
    const { posts, loading } = this.state;
    let postsContent;
    if (loading || posts === null) {
      //Loading data
      postsContent = <Spinner />;
    } else {
      postsContent = (
        <>
          {/* <!-- Post Feed --> */}
          <div className="posts">
            {/* <!-- Post Item --> */}
            {Array.isArray(posts) &&
              posts.length > 0 &&
              posts.map(post => (
                <Fragment key={post._id}>
                  <div className="card card-body mb-3">
                    <div className="row">
                      <div className="col-md-2">
                        <a href="profile.html">
                          <img
                            className="rounded-circle d-none d-md-block"
                            src={post.avatar}
                            alt={post.name}
                          />
                        </a>
                        <br />
                        <p className="text-center">{post.name}</p>
                      </div>
                      <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                        <button type="button" className="btn btn-light mr-1">
                          <i
                            className={classnames("fas fa-thumbs-up", {
                              "text-info":
                                post.likes.filter(id => id === post.likes.user)
                                  .length > 0,
                              "text-secondary":
                                post.likes.filter(id => id === post.likes.user)
                                  .length === 0
                            })}
                          />
                          <span className="badge badge-light">
                            {post.likes && post.likes.length}
                          </span>
                        </button>
                        <Link to="/feed/post" className="btn btn-info mr-1">
                          Comments
                        </Link>
                        {/* <button type="button" className="btn btn-danger mr-1">
                          <i className="fas fa-times" />
                        </button> */}
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
          </div>
        </>
      );
    }
    return postsContent;
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});
export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
