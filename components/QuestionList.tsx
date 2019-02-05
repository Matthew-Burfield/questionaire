import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import NewQuestion from "./NewQuestion";

type Question = {
  id: number;
  sessionId: number;
  question: string;
  thumbsUpCount: number;
  thumbsDownCount: number;
  hasBeenAsked: boolean;
  hasBeenApproved: boolean;
};

export const QUESTIONS_QUERY = gql`
  query QUESTIONS_QUERY {
    questions {
      id
      sessionId
      question
      thumbsUpCount
      thumbsDownCount
      hasBeenAsked
      hasBeenApproved
    }
  }
`;

const QuestionList = () => (
  <Fragment>
    <h2>List of questions</h2>
    <Query query={QUESTIONS_QUERY}>
      {({ data, error, loading }) => {
        if (error) {
          console.error(error);
        }
        if (loading) {
          console.log("loading...");
        }
        const questions = data && data.questions ? data.questions : [];
        return (
          <div>
            {questions.map(question => (
              <li key={question.id} data-testid="question">
                {question.question}
              </li>
            ))}
          </div>
        );
      }}
    </Query>
  </Fragment>
);

export default QuestionList;
