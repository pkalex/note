import React, { Component } from "react";
import PropTypes from "prop-types";
import NoteItem from "./NoteItem";

class PostFeed extends Component {
  render() {
    const { notes } = this.props;

    return notes.map(note => <NoteItem key={note._id} note={note} />);
  }
}

PostFeed.propTypes = {
  notes: PropTypes.array.isRequired
};

export default PostFeed;
