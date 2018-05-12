import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import UserLinks from './UserLinks'
import SocialLinks from './SocialLinks'

export default class SiteHeader extends React.Component {
  render() {
    const { isLesson, postNode, slug } = this.props
    return (
      <SiteHeaderContainer>
        <Link to={'/'}>
          <h3>Flutter by Example</h3>
        </Link>
        {isLesson && <SocialLinks postNode={postNode} postPath={slug} />}
        {!isLesson && <UserLinks />}
      </SiteHeaderContainer>
    )
  }
}

const SiteHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid ${props => props.theme.brand};

  a {
    background: transparent !important;
    border: none !important;
    &:hover {
      background: none !important;
      border: none !important;
    }
  }

  h3 {
    margin: 0;
  }
`
