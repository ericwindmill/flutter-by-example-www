import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

const leftArrangement = {
  gridTemplateAreas: "'coverImage title' 'coverImage description'",
  gridTemplateColumns: '200px 1fr',
}

const rightArrangement = {
  gridTemplateAreas: "'title coverImage' 'description coverImage'",
  gridTemplateColumns: '1fr 200px',
}

class CardContainer extends Component {
  render() {
    const { title, image, children, arrangement, exampleUrl } = this.props
    const internal = /^\/(?!\/)/.test(exampleUrl);
    if (internal) {
      return (
        <ExampleCardContainer>
          <Link to={`${exampleUrl}`}>
            <Card
              className={'hover-div'}
              style={
                arrangement === 'rightArrangement'
                  ? leftArrangement
                  : leftArrangement
              }
            >
              <h2>{title}</h2>
              <img src={image} alt={'project logo'} width={'200px'} />
              {children}
            </Card>
          </Link>
        </ExampleCardContainer>
      )
    } else {
      return (
        <ExampleCardContainer>
          <a href={exampleUrl}>
            <Card
              className={'hover-div'}
              style={
                arrangement === 'rightArrangement'
                  ? leftArrangement
                  : leftArrangement
              }
            >
              <h2>{title}</h2>
              <img src={image} alt={'project logo'} width={'200px'} />
              {children}
            </Card>
          </a>
        </ExampleCardContainer>
      )
    }

  }
}

export default CardContainer

const ExampleCardContainer = styled.div`
  a {
    color: black;
    text-decoration: none;
    &:hover {
      .hover-div {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2),
          0 3px 1px 2px rgba(0, 0, 0, 0.12), -2px 1px 1px 0 rgba(0, 0, 0, 0.12);
        cursor: pointer;
      }
    }
  }
`

const Card = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-column-gap: 50px;

  margin: 25px 0;
  padding: 20px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 1px -2px rgba(0, 0, 0, 0.12),
    -2px 1px 5px 0 rgba(0, 0, 0, 0.12);
  transition: all 300ms ease;
  border-radius: 5px;

  img {
    grid-area: coverImage;
    margin-bottom: 0;
  }
  p {
    grid-area: description;
  }
  p:last-child {
    margin-bottom: 0;
  }
  h2 {
    grid-area: title;
    margin-top: 0px;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: row;
    list-style: circle inside;
    margin: 0;
    > li {
      margin: 3px 0;
    }
  }
`
