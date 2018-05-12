import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { FaChevronDown } from 'react-icons/lib/fa'
import UserLinks from './UserLinks'
import CtaButton from './CtaButton'

/* eslint react/no-array-index-key: "off" */

function handleClick(event, title) {
  const list = document.getElementById(`list-${title}`)
  const chevron = document.getElementById(`chevron-${title}`)
  if (list.style.display === 'inherit') {
    list.style.display = 'none'
    chevron.style.transform = 'rotate(0deg)'
  } else {
    list.style.display = 'inherit'
    chevron.style.transform = 'rotate(180deg)'
  }
}

const Links = ({ entries }) => (
  <StyledLinkList>
    {entries.map(({ entry }, key) => (
      <EntryListItem key={key}>
        <Link to={entry.childMarkdownRemark.fields.slug}>
          <EntryTitle>{entry.childMarkdownRemark.frontmatter.title}</EntryTitle>
        </Link>
      </EntryListItem>
    ))}
  </StyledLinkList>
)

const ChapterList = ({ chapters, entries, title, level = 0 }) => (
  <StyledChapterList>
    {title && (
      <ChapterListItem
        key={`${title}${level}`}
        className={'head'}
        id={`head-${title}`}
        onClick={event => handleClick(event, title)}
      >
        <ChapterTitle level={level}>{title}</ChapterTitle>
        <FaChevronDown className={'chevron'} id={`chevron-${title}`} />
      </ChapterListItem>
    )}
    <ChapterListItem id={`list-${title}`} style={{ display: 'none' }}>
      {entries && <Links entries={entries} />}
    </ChapterListItem>
    <ChapterListItem id={title}>
      {chapters &&
        chapters.map((chapter, index) => (
          <ChapterList {...chapter} level={level + 1} key={`${index}`} />
        ))}
    </ChapterListItem>
  </StyledChapterList>
)

export default class TableOfContents extends React.Component {
  render() {
    const { chapters } = this.props
    return (
      <TOCWrapper>
        <div className="toc-main">
          <TocHeader>
            <Link to={'/'}>
              <h4>Examples</h4>
            </Link>
          </TocHeader>
          {chapters.map((chapter, index) => (
            <ChapterList {...chapter} key={index} />
          ))}
        </div>
        <div className={'toc-footer'}>
          <CtaButton id={'cta-btn'} isExternalLink>
            <a
              id="src-btn"
              href="https://github.com/ericwindmill/flutter_by_example_apps"
            >
              Example Apps Source Code
            </a>
          </CtaButton>
          <a href="https://ericwindmill.com">
            &copy; 2018 Eric Windmill & Contributors
          </a>
        </div>
      </TOCWrapper>
    )
  }
}

const TOCWrapper = styled.div`
  padding: ${props => props.theme.sitePadding};
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  div:first-child {
    align-self: flex-start;
    margin-bottom: 10px;
  }

  .toc-footer {
    display: flex;
    flex-flow: column;
    a:not(#src-btn) {
      transition: 500ms all ease;
      text-decoration: underline;
    }
    a:hover:not(#src-btn) {
      background: ${props => props.theme.brandLightest};
    }
  }
`

const TocHeader = styled.div`
  border-bottom: 1px solid ${props => props.theme.brandLightest};
  h4 {
    color: ${props => props.theme.ink};
  }

  p {
    margin: 5px 0;
  }
`

const StyledChapterList = styled.ol`
  border-bottom: 1px solid ${props => props.theme.brandLightest};
  list-style: none;
  margin: 0;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
`

const StyledLinkList = styled.ol`
  list-style: none;
`

const EntryTitle = styled.h6`
  display: inline-block;
  font-weight: 200;
  color: black;
  margin: 0;
  line-height: 1.5;
  border-bottom: 1px solid transparent;
  text-decoration: none;
`

const ChapterListItem = styled.li`
  margin: 0;
  transition: all 300ms ease-in-out;

  .chevron {
    height: 15px;
    width: 15px;
    color: ${props => props.theme.gatsbyLight};
    transform: rotate(0deg);
    transition: all 300ms ease-in-out;
  }
`

const EntryListItem = styled.li`
  margin: 0;
  background: transparent;
  a:hover {
    border-bottom: 1px solid black;
  }
`

const ChapterTitle = styled.h5`
  font-weight: ${({ level }) => {
    switch (level % 3) {
      case 1:
        return '600'
      case 2:
        return '400'
      default:
        return '200'
    }
  }};
  font-size: ${({ level }) => {
    switch (level % 3) {
      case 1:
        return '1.8rem'
      case 2:
        return '1.8rem'
      default:
        return '1.8rem'
    }
  }};
  color: ${({ level, theme }) => {
    switch (level % 3) {
      case 1:
        return 'black'
      case 2:
        return theme.accent
      default:
        return theme.brand
    }
  }};
`
