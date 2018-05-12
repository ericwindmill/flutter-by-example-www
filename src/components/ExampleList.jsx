import React, { Component } from 'react'
import styled from 'styled-components'
import CardContainer from './Card'

class ExampleListing extends Component {
  buildProjectCards() {
    const cards = new Array(this.props.postEdges.length)
    this.props.postEdges.forEach((post, i) => {
      cards[post.node.frontmatter.order] = (
        <CardContainer
          arrangement={i % 2 === 1 ? 'leftArrangement' : 'rightArrangement'}
          title={post.node.frontmatter.title}
          image={post.node.frontmatter.image}
          description={post.node.frontmatter.description}
          exampleUrl={post.node.frontmatter.exampleUrl}
        >
          <div dangerouslySetInnerHTML={{ __html: post.node.html }} />
        </CardContainer>
      )
    })
    return cards
  }

  render() {
    return (
      <ExampleListingContainer>
        {this.buildProjectCards()}
      </ExampleListingContainer>
    )
  }
}

export default ExampleListing

const ExampleListingContainer = styled.div``
