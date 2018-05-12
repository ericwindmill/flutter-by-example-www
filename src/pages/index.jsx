import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import config from '../../data/SiteConfig'
import ExampleListing from '../components/ExampleList'
import SiteHeader from '../components/SiteHeader'
import CtaButton from '../components/CtaButton'

export default class HomePage extends React.Component {
  render() {
    const examples = this.props.data.allMarkdownRemark.edges
    return (
      <HomePageContainer>
        <Helmet title={config.siteTitle} />
        <BodyContainer>
          <SiteHeader />
          <img
            className={'hero'}
            src="http://res.cloudinary.com/ericwindmill/image/upload/v1525634840/flutter_by_example/hero-image-fbe.png"
            alt=""
          />
          <div className="main-copy">
            <div className="words">
              <p>
                Flutter By Example is a collection of example tutorials that
                will help you master Flutter by coding real apps.
              </p>
              <p>
                Whether you've been writing software for years and want to pick
                up Flutter quickly, of this is your first go at building an
                application, this is for you.
              </p>
              <p>
                We encourage you to get involved, contribute and teach what you
                know about Dart and Flutter.
              </p>
              <div className="button-row">
                <CtaButton isExternalLink>
                  <a href="https://github.com/ericwindmill/flutter_by_example_apps">
                    Example Apps Github
                  </a>
                </CtaButton>
                <CtaButton to={'/about'}>About FbE</CtaButton>
                <CtaButton to={'contributors'}>Contribute</CtaButton>
              </div>
            </div>
          </div>
          <ExampleList>
            <h2>Examples</h2>
            <ExampleListing postEdges={examples} />
          </ExampleList>
        </BodyContainer>
      </HomePageContainer>
    )
  }
}

const HomePageContainer = styled.div``

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

  .button-row {
    display: flex;
    justify-content: center;
    div {
      margin-right: 15px;
    }
  }

  .hero {
    box-shadow: ${props => props.theme.matShadow};
    border-radius: 5px;
    margin: auto;
    display: block;
    width: 100%;
    margin-top: ${props => props.theme.spacingUnit(3)};
  }

  .main-copy {
    display: flex;
    margin: 25px 0;
    .words {
      padding-right: 25px;
    }
  }
`

const ExampleList = styled.div``

export const pageQuery = graphql`
  query NuggetsQuery {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "example" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            order
            title
            image
            description
            exampleUrl
            type
          }
          html
        }
      }
    }
  }
`
