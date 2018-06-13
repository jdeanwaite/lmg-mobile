import gql from "graphql-tag";
import LessonFragment from "./LessonFragment";
export default gql`
  query LessonQuery($id: ID!) {
    lesson(id: $id) {
      ...FullLesson
    }
  }
  ${LessonFragment}
`;
