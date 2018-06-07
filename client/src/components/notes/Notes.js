import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NoteForm from "./NoteForm";
import NoteFeed from "./NoteFeed";
import Spinner from "../common/Spinner";
import { getNotes } from "../../actions/noteActions";

class Notes extends Component {
  componentDidMount() {
    this.props.getNotes();
  }

  render() {
    const { notes, loading } = this.props.note;
    let noteContent;

    if (notes === null || loading) {
      noteContent = <Spinner />;
    } else {
      noteContent = <NoteFeed notes={notes} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <NoteForm />
              {noteContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Notes.propTypes = {
  getNotes: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  note: state.note
});

export default connect(
  mapStateToProps,
  { getNotes }
)(Notes);
