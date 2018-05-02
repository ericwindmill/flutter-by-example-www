import React, { Component } from "react";
import styled from "styled-components";

class BlockquoteWAttrib extends Component {
  render() {
    const quote = this.props.children[0];
    const attribution = this.props.children[1];
    return (
      <BlockquoteWAttribContainer>
        <div className="blockquote">
          <div className="quote">{quote}</div>
          <div className="attribution">--{attribution}</div>
        </div>
      </BlockquoteWAttribContainer>
    );
  }
}

export default BlockquoteWAttrib;

const BlockquoteWAttribContainer = styled.div`
  .blockquote {
    padding: 15px 20px 15px 45px;
    margin: 0 0 20px;
    position: relative;
    background: #e8e8ea;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    /*Font*/
    font-size: 2rem;
    line-height: 1.2;
    text-align: justify;

    /*Borders - (Optional)*/
    border-left: 15px solid #ff6666;
  }

  .blockquote::before {
    content: "\\201C"; /*Unicode for Left Double Quote*/

    /*Font*/
    font-family: Georgia, serif;
    font-size: 60px;
    font-weight: bold;

    /*Positioning*/
    position: absolute;
    left: 10px;
    top: 5px;
  }

  .blockquote::after {
    /*Reset to make sure*/
    content: "";
  }

  .quote {
    margin-bottom: 10px;
  }

  a {
    background: transparent;
  }
`;
