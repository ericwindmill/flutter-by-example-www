import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import DropdownButton from './DropdownButton'
import UserLinks from './UserLinks'

class TableOfContents extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const { id } = e.target
    const idNum = id[id.length - 1]
    const list = document.querySelector(`#list${idNum}`)
    if (list.style.display === 'inherit') {
      list.style.display = 'none'
    } else {
      list.style.display = 'inherit'
    }
  }

  buildNodes() {
    const { posts } = this.props
    const type = this.props.contentsType
    const postNodes = []
    posts.forEach(post => {
      if (post.node.frontmatter.type === type) {
        const postNode = {
          title: post.node.frontmatter.title,
          path: post.node.fields.slug,
          lessonNumber: post.node.frontmatter.lesson,
          chapter: post.node.frontmatter.chapter
        }
        postNodes.push(postNode)
      }
    })

    const postNodeChapters = []
    postNodes.forEach(post => {
      if (postNodeChapters[post.chapter]) {
        postNodeChapters[post.chapter].push(post)
      } else {
        postNodeChapters[post.chapter] = [post]
      }
    })

    postNodeChapters.forEach(chapter => {
      chapter.sort((a, b) => a.lessonNumber > b.lessonNumber)
    })
    return postNodeChapters
  }

  nodeListItems() {
    const postNodeChapters = this.buildNodes()
    const listItems = []
    const chapterTitles = this.props.chapterTitles
    postNodeChapters.forEach((chapter, idx) => {
      const chapterLessons = []
      chapter.forEach(node => {
        chapterLessons.push(
          <LessonContainer>
            <Link to={node.path}>
              <li>
                <span>
                  <p>{node.lessonNumber}.&nbsp;&nbsp; </p>
                  <h5>{node.title}</h5>
                </span>
              </li>
            </Link>
          </LessonContainer>
        )
      })
      listItems.push(
        <div className="chapter">
          <DropdownButton
            className="buttonSection"
            buttonId={`chapter${idx}`}
            dropdownCallback={this.handleClick}
          >
            <h5 className="tocHeading">{chapterTitles[idx]}</h5>
          </DropdownButton>
          <ul className="chapterItems" id={`list${idx}`}>
            {chapterLessons}
          </ul>
        </div>
      )
    })
    return listItems
  }

  render() {
    return (
      <TableOfContentsContainer>
        <div>
          <Link to={'/'}>
            <h1>Flutter By Example</h1>
          </Link>
          <h3>How to build a Flutter app from scratch.</h3>
          <ul>{this.nodeListItems()}</ul>
        </div>
        <FooterSection>
          <Link to={'/about'}>
            <h5 className="github-cta">Contribute Lessons via Github</h5>
          </Link>
          <div className={'me-info'}>
            <h5>
              <a href="https://ericwindmill.com">2018 Eric Windmill</a>
            </h5>
            <h5 style={{ color: 'white' }}>|</h5>
            <UserLinks />
          </div>
        </FooterSection>
      </TableOfContentsContainer>
    )
  }
}
const TableOfContentsContainer = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  transition: all 500ms ease;

  li {
    list-style: none;
  }

  h5 {
    a {
      color: white;
    }
    a:hover {
      border-bottom: 1px solid white;
    }
  }
  h1 {
    color: white;
    line-height: 1;
    font-size: 6rem;
    border: 2px solid transparent;
    transition: all 300ms ease;
  }

  h1:hover {
    border-bottom: 2px solid white;
  }

  h3 {
    color: ${props => props.theme.brandDarkened};
    line-height: 1;
  }

  .chapter {
    margin-bottom: 15px;
  }

  .chapterItems {
    display: none;
    transition: all 300ms ease;
    list-style: none;
    margin-left: ${props => props.theme.spacingUnit};
  }

  & > ul,
  .chapterItems {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  p,
  h5 {
    display: inline-block;
    font-weight: 200;
    margin: 0;
  }

  .github-cta {
    margin: 10px 0;
    font-weight: 200;
    font-size: 2rem;
    color: ${props => props.theme.accent};

    &:hover {
      background: rgba(173, 210, 235, 0.2);
      border: none;
    }
  }
`

const FooterSection = styled.div`
  h5 {
    margin: 0 0 10px 0;
  }

  .me-info {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
  }
`

const LessonContainer = styled.div`
  h5,
  p {
    color: white !important;
    margin: 0;
    line-height: 1.5;
    transition: all 300ms ease-in-out;
  }
  li {
    margin: 5px 0 5px 15px;
  }
  &:hover {
    li {
      span {
        border-bottom: 1px solid white;
      }
    }
  }
`

export default TableOfContents
