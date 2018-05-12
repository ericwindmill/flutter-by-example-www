import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import config from '../../data/SiteConfig'
import OptInForm from '../components/OptInForm'
import thanksLinks from '../../data/thanks'
import SiteHeader from '../components/SiteHeader'

class AboutPage extends Component {
  render() {
    return (
      <AboutPageContainer>
        <BodyContainer>
          <SiteHeader />
          <h2>Odds and Ends</h2>
          <p>These technologies and resources are used in this tutorial:</p>
          <ul>
            {Object.keys(thanksLinks).map(key => (
              <li>
                <a href={thanksLinks[key]}>{key}</a>
              </li>
            ))}
          </ul>
          <div style={{ height: '50px' }} />
          <h2>Get Updates</h2>
          <p>
            Flutter by Example (and my helper resource: Dart for JavaScript
            Developers), are both being updated all the time. Get free updates
            to your inbox when more lessons are published on Flutter By Example
            or{' '}
            <a href="https://dartforwebdevelopers.com">
              Dart for Web Developers
            </a>.
          </p>
          <p>
            <strong>
              NB: This will show up in your inbox as an email from
              ericwindmill.com.{' '}
              <a href="https://ericwindmill.com/optin">
                Get more information about what you're opting into.
              </a>
            </strong>
          </p>
          <OptInForm />
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
  h3 {
    color: ${props => props.theme.redAccent};
  }
`
