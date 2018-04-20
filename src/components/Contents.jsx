import React from "react"
import Link from 'gatsby-link'
import styled from 'styled-components'
import UserLinks from "./UserLinks";
import DropdownButton from "./DropdownButton";


class TableOfContents extends React.Component {
  constructor() {
    super();
    this.nodeListItemsToRender = [];
    this.currentLevel = 0;
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e, node) {
    const list = document.querySelector(`#list${node}`)
    if (list.style.display === 'inherit') {
      list.style.display = 'none'
    } else {
      list.style.display = 'inherit'
    }
  }

  formatChapterTitle(title) {
    return title.split('_').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
  }

  addSubchapterJSX(node) {
    this.nodeListItemsToRender.push(
      <DropdownButton
        key={node.id}
        className="buttonSection"
        buttonId={`chapter${node}`}
        dropdownCallback={(event) => this.handleClick(event, node)}
      >
        <SubchapterLIContainer
          className={'sub-chapter'}
        >
          <h5>
            {this.formatChapterTitle(node)}
          </h5>
        </SubchapterLIContainer>
      </DropdownButton>
    );
  }

  addChapterJSX(node) {
    this.nodeListItemsToRender.push(
      <ChapterLIContainer
        className={'section-titles'}
        key={node}
      >
        <h5>
          {this.formatChapterTitle(node)}
        </h5>
      </ChapterLIContainer>
    )
  }

  buildLessonItemNodes(nodeArray, nodeKey) {
    const lessonLis = [];
    nodeArray.forEach(node => {
      lessonLis.push(
        <LessonLIContainer key={node.id}>
          <Link to={node.post.childMarkdownRemark.fields.slug}>
            <li>
              <h6>{node.post.childMarkdownRemark.frontmatter.title}</h6>
            </li>
          </Link>
        </LessonLIContainer>
      )
    })
    this.nodeListItemsToRender.push(
      <LessonSectionUl
        key={nodeArray.id}
        id={`list${nodeKey}`}
      >
        {lessonLis}
      </LessonSectionUl>
    );
  }

  buildChapterNodes(node) {
    // If this is a Chapter (and not a subchapter)
    if (this.currentLevel === 0) {
      this.addChapterJSX(node);
      // Else it's a SubChapter
    } else {
      this.addSubchapterJSX(node);
    }
  }

  buildNodes(nodes) {
    function getNextNode(postNodes, node) {
      const keys = Object.keys(nodes);
      const nextIndex = keys.indexOf(node) + 1;
      return keys[nextIndex];
    }

    Object.keys(nodes).forEach(node => {
      const nextNode = getNextNode(nodes, node);
      if (Array.isArray(nodes[node])) {
        // Add the Lowest Level Chapter Name (Title of Array):
        this.buildChapterNodes(node);
        this.buildLessonItemNodes(nodes[node], node);
        if (nextNode === undefined) {
          this.currentLevel -= 1;
        }
      } else {
        this.buildChapterNodes(node)
        this.currentLevel += 1;
        this.buildNodes(nodes[node])
      }
    });
  }

  render() {
    const posts = this.props.posts.chapters;
    this.nodeListItemsToRender = [];
    this.buildNodes(posts);
    return (
      <TableOfContentsContainer>
        <Contents>
          <Link to={'/'}>
            <h1>Flutter By Example</h1>
          </Link>
          <h3>How to build a Flutter app from scratch.</h3>
          <ul>
            {this.nodeListItemsToRender}
          </ul>
        </Contents>
        <FooterSection>
          <Link to={'/about'}>
            <h5 className="github-cta">Contribute Lessons via Github</h5>
          </Link>
          <div className={'me-info'}>
            <h5>
              <a href="https://ericwindmill.com">2018 Eric Windmill</a>
            </h5>
            <h5 style={{color: 'white'}}>|</h5>
            <UserLinks/>
          </div>
        </FooterSection>
      </TableOfContentsContainer>
    )
  }
}

const TableOfContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  transition: all 500ms ease;
  padding: ${props => props.theme.sitePadding};
`

const Contents = styled.div`
  a:hover {
    cursor: pointer;
  }
 
  h1 {
    color: white;
    line-height: 1;
    font-size: 5rem;
    border: 2px solid transparent;
    transition: all 200ms ease;
  }

  h1:hover {
    border-bottom: 2px solid white;
  }

  h3 {
    color: ${props => props.theme.brandDarkened};
    line-height: 1;
    margin: 10px 0 50px 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`

const LessonLIContainer = styled.div`
  margin: 0 5px 0 5px;
  li {
    h6, p {
      background: inherit;
      color: white !important;
      font-weight: 400 !important;
      margin: 0;
      padding: 0 0 5px;
      border-bottom: 1px solid transparent;
      transition: all 200ms ease-in-out;
    }
  }
  &:hover {
  cursor: pointer;
    li {
      h6 {
        border-bottom: 1px solid white;
      }
    }
  }
  
`

const LessonSectionUl = styled.ul`
    display: none;
    transition: all 300ms ease;
    list-style: none;
    padding: 10px !important;
    border-radius: 5px !important; 
    background: ${props => props.theme.brandSlightLight};
`

const ChapterLIContainer = styled.li`
     margin: 20px 0 0; 
  h5 {
     font-size: 2.8rem;
     font-weight: 400;
     color: ${props => props.theme.accent};
     margin: 0;
  }

`

const SubchapterLIContainer = styled.li`
  margin: 0;
  h5 {
     color: white;
     margin: 0 0 5px;
     font-weight: 400;
  }
`

const FooterSection = styled.div`
  margin-top:50px;

  h5 {
    margin: 0 0 10px 0;
    color: white;
    font-weight: 300;
  }

  .me-info {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    color: white;
  }
  
  .github-cta {
    margin: 10px 0;
    font-weight: 200;
    font-size: 2rem;
    color: ${props => props.theme.accent};

    &:hover {
      cursor: pointer;
      background: rgba(173, 210, 235, 0.2);
      border: none;
    }
  }
`

export default TableOfContents

