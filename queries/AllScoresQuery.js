import gql from 'graphql-tag';

export default gql`
  query AllScores {
    allScores { 
      id
      principleId
      updatedAt
      value
    }
  }
`
