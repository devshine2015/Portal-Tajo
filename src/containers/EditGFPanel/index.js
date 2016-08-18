import React from 'react';
import pure from 'recompose/pure';
import GFEditor from './GFEditor';
import styles from './styles.css';

class GFEditorContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     selectedItemId: undefined,
  //   };
  // }

  // onSelect(hookId, id) {
  //   // if(this.state.selectedItemId === id) {
  //   //   return;
  //   // }
  //   this.props.hooks(hookId, id);
  //   this.setState({ selectedItemId: id });
  // }

  render() {
    return (
    <div className={styles.EditorContainer}>
      <GFEditor
        hooks={this.props.hooks}
        setUpHooks={this.props.setUpHooks}
        subjectContext={this.props.subjectContext}
      />
    </div>
    );
  }
}

GFEditorContainer.propTypes = {
  hooks: React.PropTypes.func.isRequired,
  setUpHooks: React.PropTypes.func.isRequired,
  subjectContext: React.PropTypes.object.isRequired,
};

export default pure(GFEditorContainer);
