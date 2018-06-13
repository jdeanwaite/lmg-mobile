import gql from 'graphql-tag';
import LessonFragment from './LessonFragment'

export default gql`
  query AllLessonsQuery {
    allLessons {
      ...FullLesson
    }   
  }
  
  ${LessonFragment}
`;
