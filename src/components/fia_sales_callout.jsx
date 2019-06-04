import React, {Component} from 'react';
import styled from 'styled-components';
import CalloutCard from "./callout_card";
import CtaButton from "../components/CtaButton";


class FiaSalesCallout extends Component {
  render() {
    return (
      <CalloutCard>
        <Container>
          <h1>Now Finished: Flutter in Action</h1>
          <h2>A full-length Flutter book.</h2>
          <p>Written specifically for those who are learning Flutter for the first
             time.</p>
          <ul>
            <li>Bloc Pattern state management</li>
            <li>Dart Streams and Stream Builders</li>
            <li>Slivers and Infinite Lists</li>
            <li>Animations</li>
            <li>Forms</li>
            <li>Routing</li>
            <li>Testing</li>
            <li>More...</li>
          </ul>

          <p>The book is <b>up to date</b> and contains what I learned from a years worth
             of new Flutter experience. Most of this site is out-of-date.</p>

          <p>This is a <b>tutorial style</b> book, and I recommend it to anyone who's
             learning Flutter for the first time.</p>

          <p>See everything that's covered by clicking the link below to see everything
             that's covered.</p>

          <ButtonContainer style={{margin: "auto"}}>
            <a href='https://www.manning.com/books/flutter-in-action'>
              Go to Table of Contents
            </a>
          </ButtonContainer>
        </Container>
      </CalloutCard>
    );
  }
}

const ButtonContainer = styled.div`
  border: 1px solid ${props => props.theme.elixirRed};
  border-radius: 3px;
  padding: 10px;
  
  color: ${props => props.theme.elixirRed};
  display: inline-block;
  transition: all 0.3s ease;
  
  a {
  font-size: 3rem;
  }

  &:hover {
    color: white;
    background: ${props => props.theme.elixirRed};
    border: 1px solid ${props => props.theme.elixirRed};
  }
`

const Container = styled.div`
display: flex;
flex-flow: column;
  h2, h1 {
    color: black;
    text-align: center;
  }
  
  h2 {
    margin-bottom: 40px;
  }

  p {
  
  }
  
  ul {
  list-style: circle;
  display: flex;
  flex-flow: column wrap;
  height: 200px;
  }
  
  li, p {
    font-size: 2.5rem;
  }
 
`

export default FiaSalesCallout;