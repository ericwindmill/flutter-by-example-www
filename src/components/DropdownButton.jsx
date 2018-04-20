import React, {Component} from 'react'
import styled from 'styled-components'
import {FaChevronDown} from 'react-icons/lib/fa'

const iconStyle = {
  width: '15px',
  height: '15px',
  color: "white",
}

class DropdownButton extends Component {
  render() {
    const {children} = this.props
    return (
      <ButtonContainer
        id={this.props.buttonId}
        onClick={this.props.dropdownCallback}
      >
        {children}
        <FaChevronDown style={iconStyle}/>
      </ButtonContainer>
    )
  }
}

const ButtonContainer = styled.button`
  background-color: inherit;
  color: inherit;
  border: none;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;

  &:hover {
    background: rgba(173, 210, 235, 0.2);
    border-radius: 5px;
    cursor: pointer;
  }

  & > h5 {
    margin: 0;
    font-weight: 200;
    font-size: 2.5rem;
    color: ${props => props.theme.accent};
  }
`

export default DropdownButton
