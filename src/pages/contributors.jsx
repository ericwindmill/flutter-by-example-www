import React from 'react'
import styled from 'styled-components'
import config from '../../data/SiteConfig'
import UserProfile from '../components/UserProfile'
import SiteHeader from '../components/SiteHeader'

export default class Contributors extends React.Component {
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
          or <a href="mailto:ericwindmill@gamil.com">email me</a>.
        </p>
        <div style={{ height: '50px' }} />
        <UserProfile
          avatarUrl={config.userAvatar}
          username={'Eric Windmill'}
          mainLink={'https://ericwindmill.com'}
        >
          <p>
            Dart and Flutter dev by day. JS and CSS on the side. Founder of this
            project.
          </p>
        </UserProfile>
        <UserProfile avatarUrl={''} username={'Your name here!'} mainLink={'/'}>
          <p>
            Contributors will be featured here, as well as on the page they
            contributed to.
          </p>
        </UserProfile>
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
