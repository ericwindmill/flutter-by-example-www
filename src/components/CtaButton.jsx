import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

class CtaButton extends Component {
  render() {
    const { children, isExternalLink } = this.props

    if (isExternalLink) {
      return <ButtonContainer>{children}</ButtonContainer>
    }
    return (
      <Link style={{ border: 'none' }} to={this.props.to}>
        <ButtonContainer>{children}</ButtonContainer>
      </Link>
    )
  }
}

export default CtaButton

const ButtonContainer = styled.div`
  border: 1px solid ${props => props.theme.brand};
  border-radius: 3px;
  padding: 10px;
  font-size: 1.6rem;
  color: ${props => props.theme.brand};
  display: inline-block;
  transition: all 0.3s ease;

  &:hover {
    color: white;
    background: ${props => props.theme.brandLight};
    border: 1px solid ${props => props.theme.brandLight};
  }
`
