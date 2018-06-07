import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deleteNote, addLike, removeLike } from "../../actions/noteActions";

class NoteItem extends Component {
  onDeleteClick(id) {
    this.props.deleteNote(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { note, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={note.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{note.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{note.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, note._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(note.likes)
                    })}
                  />
                  <span className="badge badge-light">{note.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, note._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/note/${note._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {note.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, note._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

NoteItem.defaultProps = {
  showActions: true
};

NoteItem.propTypes = {
  deleteNote: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteNote, addLike, removeLike }
)(NoteItem);
