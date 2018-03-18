import React, {Component} from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import config from '../../data/SiteConfig'
import OptInForm from '../components/OptInForm'
import UserProfile from '../components/UserProfile'
import thanksLinks from '../../data/thanks'

class AboutPage extends Component {
  render() {
    return (
      <AboutPageContainer>
        <BodyContainer>
          <h1>About Flutter By Example</h1>
          <img src={config.siteLogo} width="200px" style={{float: 'right'}}/>
          <p>Flutter By Example is looking for more contributors!</p>
          <h3>Contribute to Flutter By Example</h3>
          <p>
            I'm hopeful that more Flutter developers will help make this
            resource rock solid. If you'd like to help, do so on
            <a href="https://github.com/ericwindmill/flutter_by_example_docs/contributing.md">
              Github
            </a>
            or <a href="mailto:ericwindmill@gamil.com">email me</a>.
          </p>
          <p>
            I'd like this resource to be like a choose-your-own-adventure book.
            Each feature section (i.e. adding a 'Post to Twitter' functionality)
            could stand alone as a tutorial for that specific aspect, but if
            someone wanted to they could follow all the lessons for one complete
            app. Of course, a foundation of architecture must be consistent (in
            this case, using Redux and Firebase).
          </p>
          <p>
            That said, I encourage you to add a whole new section, improve one
            that exists, or just fix errors.
          </p>
          <p>
            Contributors will be featured and acknowldged on the Flutter By
            Example <Link to={'/'}>Homepage</Link>.
          </p>
          <div style={{height: '50px'}}/>
          <h3>Get Updates</h3>
          <p>
            Flutter by Example (and my helper resource: Dart for JavaScript
            Developers), are both being updated all the time. Get free updates
            to your inbox when more lessons are published on Flutter By Example
            or{' '}
            <a href="https://dartforwebdevelopers.com">
              Dart for Web Developers
            </a>.
          </p>
          <OptInForm/>
          <h3>Contributors</h3>
          <UserProfile
            avatarUrl={config.userAvatar}
            username={'Eric Windmill'}
            mainLink={'https://ericwindmill.com'}
          >
            <p>
              Dart and Flutter dev by day. JS and CSS on the side. Founder of
              this project.
            </p>
          </UserProfile>
          <UserProfile
            avatarUrl={''}
            username={'Your name here!'}
            mainLink={'/'}
          >
            <p>
              Contributors will be featured here, as well as on the page they
              contributed to.
            </p>
          </UserProfile>
          <h3>Special Thanks</h3>
          <p>These technologies and resources are used in this tutorial:</p>
          <ul>
            {Object.keys(thanksLinks).map(key => (
              <li>
                <a href={thanksLinks[key]}>{key}</a>
              </li>
            ))}
          </ul>
        </BodyContainer>
      </AboutPageContainer>
    )
  }
}

export default AboutPage

const AboutPageContainer = styled.div``
const BodyContainer = styled.div`
  overflow: scroll;
  justify-self: center;
  width: 100%;
  padding: ${props => props.theme.sitePadding};
  @media screen and (max-width: 600px) {
    order: 2;
  }

  max-width: 850px;
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
    background: ${props => props.theme.brandLightend};
  }

  ul {
    margin-left: 50px;
  }
  h3 {
    color: ${props => props.theme.redAccent};
  }
`
