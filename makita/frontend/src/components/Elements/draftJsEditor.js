import React from "react";
import PropTypes from "prop-types";
import {
  RichUtils,
  CompositeDecorator,
  ContentBlock,
  ContentState,
  Editor,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";

class HTMLConvertExample extends React.Component {
  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
      {
        strategy: findImageEntities,
        component: Image,
      },
    ]);

    const blocksFromHTML = convertFromHTML(this.props.body);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    this.state = {
      editorState: EditorState.createWithContent(state, decorator),
    };
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        ref="editor"
      />
    );
  }
}

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};

const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return <a href={url}>{props.children}</a>;
};

const findImageEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "IMAGE"
    );
  }, callback);
};

const Image = (props) => {
  const { height, src, width } = props.contentState
    .getEntity(props.entityKey)
    .getData();

  return <img src={src} height={height} width={width} />;
};

export default HTMLConvertExample;
