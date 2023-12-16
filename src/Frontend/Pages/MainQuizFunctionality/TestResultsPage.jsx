
import { useLocation } from 'react-router-dom';



const TestResultsPage = () => {

    // Explicitly use the useLocation hook
  const location = useLocation();

      // Check if location is defined and has a state property
  if (!location || !location.state) {
    // Handle the case where location or location.state is undefined
    return <div>Error: Missing location or location.state</div>;
  }

      // Access counts from location state
  const {
    answeredCount,
    notAnsweredCount,
    markedForReviewCount,
    answeredmarkedForReviewCount,
    VisitedCount,
  } = location.state;

  const totalQuestions =
  answeredCount +
  notAnsweredCount +
  markedForReviewCount +
  answeredmarkedForReviewCount +
  VisitedCount;

  
    return (
      <div className='otsMainPages'>
        <h1 className='Coures_-otsTitels'>You have completed you exam</h1>
        <h2>Test Results</h2>
        <p>Answered Questions: {answeredCount}</p>
        <p>Not Answered Questions: {notAnsweredCount}</p>
        <p>Marked for Review: {markedForReviewCount}</p>
        <p>Answered but Marked for Review: {answeredmarkedForReviewCount}</p>
        <p>Not Visited Questions: {VisitedCount}</p>
  
        {answeredCount === totalQuestions && (
          <p>Congratulations! You answered all questions.</p>
        )}
        {/* Other result details */}
      </div>
    );
  };
  
  export default TestResultsPage;