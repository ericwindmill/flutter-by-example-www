import React, {Component} from "react";
import styled from "styled-components";

class CalloutCard extends Component {
  render() {
    const {children} = this.props;
    return (
      <CalloutCardContainer>
        {children}
      </CalloutCardContainer>
    );
  }
}

export default CalloutCard;

const CalloutCardContainer = styled.div`
    padding: 40px 40px;
    margin: 50px 0;
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
`;
