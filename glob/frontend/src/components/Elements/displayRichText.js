import React from "react";
import PropTypes from "prop-types";
import {
  CompositeDecorator,
  convertFromRaw,
  Editor,
  EditorState,
} from "draft-js";

// Following code based on:
// https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/link/link.html
const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a rel="nofollow noreferrer" href={url} target="_blank">
      {props.children}
    </a>
  );
};

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}
const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);
const convertToEditorState = (editorContent) => {
  const content = convertFromRaw(JSON.parse(editorContent));
  const editorState = EditorState.createWithContent(content, decorator);
  return editorState;
};

const PostDisplay = ({ editorContent }) =>
  editorContent && (
    <div className="card feed">
      <div className="card-content">
        <div className="row feed-user"></div>
        <div className="draft-js-editor">
          <Editor editorState={convertToEditorState(editorContent)} readOnly />
        </div>
      </div>
    </div>
  );

PostDisplay.propTypes = {
  userDisplayName: PropTypes.string.isRequired,
  userPic: PropTypes.string.isRequired,
  editorContent: PropTypes.string,
};
PostDisplay.defaultProps = {
  editorContent: null,
};

export default PostDisplay;
