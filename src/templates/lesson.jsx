import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import Disqus from '../components/Disqus'
import OptInForm from '../components/OptInForm'
import SiteHeader from '../components/SiteHeader'

export default class LessonTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext
    const postNode = this.props.data.postBySlug
    const post = postNode.frontmatter

    if (!post.id) {
      post.id = slug
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID
    }

    return (
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <BodyContainer>
          <SiteHeader isLesson postNode={postNode} slug={slug} />
          <div className={'post-content'}>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          </div>
          <Divider style={{ margin: '100px 0 100px' }} />
          <h5>Get Updates When New Lessons are Published</h5>
          <OptInForm />
          <div style={{ height: '50px' }} />
          <Disqus postNode={postNode} />
        </BodyContainer>
      </div>
    )
  }
}
const Divider = styled.div`
  border-bottom: 0.5px solid black;
  margin: 100px 0;
`

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

  .post-content {
    margin-top: ${props => props.theme.spacingUnit(3)};
  }

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

  img {
    max-width: 100%;
    margin: auto;
  }

  // This is a hack for Image captions.
  // The Markdown is wrapping images in p tags for some reason?
  p + h6 {
    margin-top: -35px;
  }

  ul,
  ol,
  dl {
    margin-left: ${props => props.theme.spacingUnit(2)};
  }

  hr {
    display: block;
    border: 0.5px solid ${props => props.theme.lightGrey};
  }
`

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query LessonBySlug($slug: String!) {
    postBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`
