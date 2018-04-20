import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Link from 'gatsby-link'

import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import OptInForm from '../components/OptInForm'
import BlockquoteWAttrib from '../components/BlockquoteWAttrib'
import thanksLinks from '../../data/thanks'

class Index extends React.Component {
  render() {
    return (
      <div className="index-container">
        <Helmet title={config.siteTitle}/>
        <BodyContainer>
          <h1>Flutter By Example</h1>
          <img src={config.siteLogo} width="200px" style={{float: 'right'}}/>
          <p>
            Flutter By Example is a complete tutorial for building a mobile
            application with Google's Flutter SDK, inspired by{' '}
            <a href="https://elixirschool.com/en/">Elixir School</a>.
          </p>
          <div style={{height: '25px'}}/>
          <h3>About Flutter</h3>
          <p>
            <a href="https://flutter.io">Flutter</a> is an open-source,
            cross-platform mobile application development SDK created by Google.
            Flutter is written in the Dart Programming Language.
          </p>
          <BlockquoteWAttrib>
            "Flutter makes it easy and fast to build beautiful mobile apps."
            <a href="https://flutter.io">Flutter.io</a>
          </BlockquoteWAttrib>
          <div className="cards">
            <div className="left">
              <h5>Fast Development with Hot Reload</h5>
              <p>
                Flutter's hot reload makes development time extremely fast.
                Changing state and rebuilding your app in development is
                inconsequential.
              </p>
            </div>
            <div className="right">
              <h5>Used by Google in Production</h5>
              <p>Flutter is used by world-class companies in production:</p>
              <ul>
                <li>Google</li>
                <li>AppTree Software</li>
                <li>Hamilton</li>
                <li>Posse</li>
              </ul>
            </div>
          </div>
          <h3>Get Updates</h3>
          <p>
            Get free updates to your inbox when I publish more lessons in
            Flutter By Example or{' '}
            <a href="https://dartforwebdevelopers.com">
              Dart for Web Developers
            </a>.
          </p>
          <OptInForm/>
          <div style={{height: '25px'}}/>
          <h3>Contribute to Flutter By Example</h3>
          <p>
            I'm hopeful that more Flutter developers will help make this
            resource rock solid. If you'd like to help, do so on Github or{' '}
            <a href="mailto:ericwindmill@gamil.com">email me</a>.
          </p>
          <Link to={'/about'}>More about Contributing </Link>
          <div style={{height: '25px'}}/>
          <h3>Special Thanks</h3>
          <p>These technologies and resources are used in this tutorial:</p>
          <ul>
            {Object.keys(thanksLinks).map(key => (
              <li>
                <a href={thanksLinks[key]}>{key}</a>
              </li>
            ))}
          </ul>
          <Link to={'/about'}>More About Technologies Used</Link>
          <div style={{height: '100px'}}/>
        </BodyContainer>
      </div>
    )
  }
}

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

  .cards {
    margin-top: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 25px;
  }
`

export default Index

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          html
          frontmatter {
            title
          }
        }
      }
    }
  }
`
