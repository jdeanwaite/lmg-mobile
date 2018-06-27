import gql from "graphql-tag";

export default gql`
  mutation UpdateScore(
    $principleId: ID!
    $updatedAt: String!
  ) {
    updateScore(
      principleId: $principleId
      updatedAt: $updatedAt
    ) {
      id
      principleId
      updatedAt
      value
    }
  }
`;
