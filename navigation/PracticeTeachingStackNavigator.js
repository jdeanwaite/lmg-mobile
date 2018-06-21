import { createStackNavigator } from "react-navigation";
import PracticeTeachingRecordScreen from "../screens/PracticeTeachingRecordScreen";
import PracticeTeachingReviewInstructionsScreen from "../screens/PracticeTeachingReviewInstructionsScreen";

export default createStackNavigator({
  PracticeTeachingRecord: PracticeTeachingRecordScreen,
  PracticeTeachingReviewInstructions: PracticeTeachingReviewInstructionsScreen
});
