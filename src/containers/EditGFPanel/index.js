import React from 'react';
import pure from 'recompose/pure';
import GFEditor from './GFEditor';
import styles from './styles.css';

class GFEditorContainer extends React.Component {
  render() {
    return (
    <div className={styles.EditorContainer}>
      <GFEditor
        eventDispatcher={this.props.eventDispatcher}
        subjectContext={this.props.subjectContext}
      />
    </div>
    );
  }
}

GFEditorContainer.propTypes = {
  eventDispatcher: React.PropTypes.object.isRequired,
  subjectContext: React.PropTypes.object.isRequired,
};

export default pure(GFEditorContainer);
