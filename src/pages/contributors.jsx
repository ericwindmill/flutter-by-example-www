import React from 'react'
import styled from 'styled-components'
import config from '../../data/SiteConfig'
import UserProfile from '../components/UserProfile'
import SiteHeader from '../components/SiteHeader'
import bios from '../../data/contributors'

export default class Contributors extends React.Component {
  getContributors() {
    return Object.keys(bios).map(name => (
      <UserProfile
        avatarUrl={bios[name].avatarUrl}
        username={name}
        mainLink={bios[name].portfolio}
        messenger={bios[name].messenger}
        email={bios[name].email}
        instagram={bios[name].instagram}
        twitter={bios[name].twitter}
        github={bios[name].github}
      >
        <p>{bios[name].bio}</p>
      </UserProfile>
    ))
  }

  render() {
    return (
      <ContributorsContainer>
        <SiteHeader />
        <h3>Contributors</h3>
        <p>Flutter By Example is looking for more contributors!</p>
        <p>
          I'm hopeful that more Flutter developers will help make this resource
          rock solid. If you'd like to help, do so on
          <a href="https://github.com/ericwindmill/flutter_by_example_docs/contributing.md">
            Github
          </a>
          or <a href="mailto:eric@ericwindmill.com">email me</a>.
        </p>
        <div style={{ height: '50px' }} />
        {this.getContributors()}
      </ContributorsContainer>
    )
  }
}

const ContributorsContainer = styled.div`
  overflow: scroll;
  justify-self: center;
  width: 100%;
  padding: ${props => props.theme.sitePadding};
  @media screen and (max-width: 600px) {
    order: 2;
  }

  max-width: ${props => props.theme.contentWidthLaptop};
  margin: auto;

  a {
    color: black;
    background: ${props => props.theme.linkBackground};
    border-bottom: 2px solid ${props => props.theme.brand};
    text-decoration: none;
    transition: 500ms all ease;
    padding: 0 5px;
  }
  a:hover {
    border-bottom: 2px solid ${props => props.theme.brand};
    background: ${props => props.theme.brandLightest};
  }

  ul {
    margin-left: 50px;
  }
`
