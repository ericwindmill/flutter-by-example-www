import React, { Component } from 'react'
import { FaGithubAlt, FaTwitter } from 'react-icons/lib/fa'
import { MdMessage, MdEmail } from 'react-icons/lib/md'
import styled from 'styled-components'
import config from '../../data/SiteConfig'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-width: 100%;
`
const UserIcon = styled.a`
  margin-left: 10px;
  color: white;
  background: transparent !important;
  border-bottom: none !important;

  &:hover {
    color: rgba(0, 0, 0, 0.2);
    border-bottom: none;
  }

  &:first-child {
    margin-left: 0;
  }
`
const iconStyle = {
  width: '20px',
  height: '20px',
  background: 'transparent'
}

class UserLinks extends Component {
  render() {
    const { twitter, github, messenger, email, instagram } = this.props
    return (
      <Container className="user-links">
        <UserIcon href={github ? github : config.github}>
          <FaGithubAlt style={iconStyle} />
        </UserIcon>
        <UserIcon href={twitter ? twitter : config.twitter}>
          <FaTwitter style={iconStyle} />
        </UserIcon>
        <UserIcon href={messenger ? messenger : config.messenger}>
          <MdMessage style={iconStyle} />
        </UserIcon>
        <UserIcon href={email ? email : config.email}>
          <MdEmail style={iconStyle} />
        </UserIcon>
      </Container>
    )
  }
}

export default UserLinks
