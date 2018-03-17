import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import styled from 'styled-components'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import SocialLinks from '../components/SocialLinks'
import Disqus from '../components/Disqus'
import OptInForm from '../components/OptInForm'

export default class LessonTemplate extends React.Component {
  // createPaginationLink(postTitle) {
  //   const postTitleList = postTitle.split(' ')
  //   if (postTitleList.length < 1) {
  //     return ''
  //   }
  //   const postTitleListToLink = postTitleList
  //     .map(word =>
  //       word.replace(/[.,\/#!$%\^&\*;:{}=\-\'\"_`~()]/g, '').toLowerCase()
  //     )
  //     .join('-')
  //
  //   return postTitleListToLink
  // }

  render() {
    const { slug } = this.props.pathContext
    const postNode = this.props.data.postBySlug
    const post = postNode.frontmatter

    // const prevLink = this.createPaginationLink(post.prev)
    // const nextLink = this.createPaginationLink(post.next)

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
          <div className={'post-content'}>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          </div>
          <Divider style={{ margin: '100px 0 100px' }} />
          <h5>Share This Page</h5>
          <SocialLinks postNode={postNode} postPath={slug} />
          <div style={{ height: '50px' }} />
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
  grid-column: 2 / 3;
  overflow: scroll;
  justify-self: center;
  width: 100%;
  padding: ${props => props.theme.sitePadding};
  @media screen and (max-width: 600px) {
    order: 2;
  }
  max-width: ${props => props.theme.contentWidthLaptop};
  margin: auto;

  & > h1 {
    color: ${props => props.theme.accentDark};
  }

  .pagination {
    display: flex;
    justify-content: space-between;

    .prev {
      text-align: right;
    }

    & div p {
      font-size: 2rem;
      margin: 0;
    }
    a {
      font-size: 2.2rem !important;
      background: none;
    }
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
    background: ${props => props.theme.brandLightend};
  }

  img {
    max-width: 100%;
    margin: auto;
  }

  p + h6 {
    margin-top: -25px;
  }

  ul,
  ol,
  dl {
    margin-left: 15px;
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
