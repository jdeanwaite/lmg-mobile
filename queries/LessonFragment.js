import gql from 'graphql-tag';

export default gql`
  fragment FullLesson on Lesson {
    id
    name
    principles {
      id
      lessonId
      name
      doctrineMarkdown
      teachingMarkdown
      pointsToTeachMarkdown
      reflectPrompts
      scriptureGroups {
        id
        title
        scriptures {
          id
          text
          link
        }
      }
      videoRefs {
        id
        title
        link
      }
    }
  }
`
