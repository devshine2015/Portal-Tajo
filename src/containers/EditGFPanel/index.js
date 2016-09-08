import React from 'react';
import pure from 'recompose/pure';
import GFEditor from './GFEditor';
import styles from './styles.css';

class GFEditorContainer extends React.Component {
  render() {
    return (
    <div className={styles.EditorContainer}>
      <GFEditor />
    </div>
    );
  }
}

export default pure(GFEditorContainer);
