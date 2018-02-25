import React, { Component } from 'react'
import styled from 'styled-components'
import config from '../../data/SiteConfig'
import UserLinks from './UserLinks'

class UserProfile extends Component {
  render() {
    const {
      twitter,
      github,
      messenger,
      email,
      instagram,
      children,
      avatarUrl,
      username,
      mainLink
    } = this.props
    return (
      <UserProfileContainer>
        <div
          id="profile-img"
          style={{ backgroundImage: `url(${avatarUrl})` }}
        />
        <UserInfo>
          <h5>
            <a href={mainLink}>{username}</a>
          </h5>
          <p>{children}</p>
          <UserLinks
            github={github}
            twitter={twitter}
            messenger={messenger}
            email={email}
            instagram={instagram}
          />
        </UserInfo>
      </UserProfileContainer>
    )
  }
}

export default UserProfile

const UserProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 75px 1fr;
  grid-column-gap: 20px;
  margin-bottom: 50px;

  #profile-img {
    background-color: #5e6165;
    width: 75px;
    height: 75px;
    background-size: contain;
    border-radius: 50%;
  }
`

const UserInfo = styled.div`
  h5,
  h5 > a {
    background: transparent;
    font-size: 2rem;
    margin: 0;
  }

  p {
    margin: 3px 0 10px 0;
  }
`
