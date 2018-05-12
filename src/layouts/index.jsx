import React from 'react'
import Helmet from 'react-helmet'
import { MdMenu } from 'react-icons/lib/md'
import styled, { ThemeProvider } from 'styled-components'
import config from '../../data/SiteConfig'
import './css/index.css'
import './css/prism-okaidia.css'
import theme from './theme'
import TableOfContents from '../components/TableOfContents'
import SEO from '../components/SEO'

const iconStyle = {
  width: '35px',
  height: '35px',
}

export default class MainLayout extends React.Component {
  getLocalTitle() {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const pathPrefix = config.pathPrefix ? config.pathPrefix : '/'
    const currentPath = this.props.location.pathname
      .replace(pathPrefix, '')
      .replace('/', '')
    let title = ''
    if (currentPath === '') {
      title = 'Home'
    } else if (currentPath === 'tags/') {
      title = 'Tags'
    } else if (currentPath === 'categories/') {
      title = 'Categories'
    } else if (currentPath === 'about/') {
      title = 'About'
    } else if (currentPath.includes('posts')) {
      title = 'Article'
    } else if (currentPath.includes('tags/')) {
      const tag = currentPath
        .replace('tags/', '')
        .replace('/', '')
        .replace('-', ' ')
      title = `Tagged in ${capitalize(tag)}`
    } else if (currentPath.includes('categories/')) {
      const category = currentPath
        .replace('categories/', '')
        .replace('/', '')
        .replace('-', ' ')
      title = `${capitalize(category)}`
    }
    return title
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <Helmet>
          <title>{`${config.siteTitle} |  ${this.getLocalTitle()}`}</title>
          <meta name="description" content={config.siteDescription} />
          <SEO postEdges={this.props.data.allPosts} />
        </Helmet>
        <ThemeProvider theme={theme}>
          <BodyGrid id="body-grid">
            <ToCContainer id="table-of-contents">
              <TableOfContents
                chapters={this.props.data.tableOfContents.chapters}
              />
            </ToCContainer>
            <MainContentContainer id="main-content">
              <HideMenuButton id="menu-button" className="white">
                <MdMenu
                  id="close-button"
                  onClick={this.handleHideMenu}
                  style={iconStyle}
                />
                <MdMenu
                  id="open-button"
                  onClick={this.handleShowMenu}
                  style={iconStyle}
                />
              </HideMenuButton>
              {children()}
            </MainContentContainer>
          </BodyGrid>
        </ThemeProvider>
      </div>
    )
  }

  handleHideMenu() {
    const menu = document.querySelector('#table-of-contents')
    const bodyGrid = document.querySelector('#body-grid')
    const closeMenu = document.querySelector('#close-button')
    const openMenu = document.querySelector('#open-button')
    const mainContent = document.querySelector('#main-content')

    menu.style.left = '-500px'
    bodyGrid.style.gridTemplateColumns = '1px 1fr'
    closeMenu.style.opacity = '0'
    closeMenu.style.zIndex = '2'
    openMenu.style.opacity = '1'
    openMenu.style.zIndex = '3'
    mainContent.style.left = '0'
    mainContent.style.width = '100vw'
  }

  handleShowMenu() {
    const menu = document.querySelector('#table-of-contents')
    const bodyGrid = document.querySelector('#body-grid')
    const closeMenu = document.querySelector('#close-button')
    const openMenu = document.querySelector('#open-button')
    const mainContent = document.querySelector('#main-content')

    menu.style.left = '0px'
    bodyGrid.style.gridTemplateColumns = '350px 1fr'
    closeMenu.style.opacity = '1'
    closeMenu.style.zIndex = '3'
    openMenu.style.opacity = '0'
    openMenu.style.zIndex = '2'
    mainContent.style.left = '350px'
    mainContent.style.width = 'calc(100vw - 350px)'
  }
}

const MainContentContainer = styled.div`
  position: absolute;
  left: 350px;
  transition: 1s ease all;
  overflow: scroll;
  height: 100vh;
  width: calc(100vw - 350px);
  padding-left: 40px;
`

const BodyGrid = styled.div`
  height: 100vh;
  display: flex;
  transition: 500ms ease all;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    height: inherit;
  }
`

const ToCContainer = styled.div`
  position: relative;
  left: 0;
  background: ${props => props.theme.greyBackground};
  overflow: scroll;
  transition: 1s ease all;
  width: 350px;
  height: 100vh;

  @media screen and (max-width: 600px) {
    order: 3;
    overflow: inherit;
  }
`

const HideMenuButton = styled.div`
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 1;
  color: ${props => props.theme.brandLight};
  transition: 1s all ease;

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.brand};
  }

  #open-button {
    position: absolute;
    opacity: 0;
    z-index: 2;
    transition: 500ms all ease;
  }

  #close-button {
    position: absolute;
    opacity: 1;
    z-index: 3;
    transition: 500ms all ease;
  }
`

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query rootQuery {
    allPosts: allMarkdownRemark(limit: 2000) {
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
    tableOfContents: lessonsJson {
      id
      chapters {
        title
        entries {
          entry {
            id
            childMarkdownRemark {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    }
  }
`
