import "../src/bootstrap";

import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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
          return <div>Error: {error}</div>;
        }
        if (loading) {
          return <div>Loading...</div>;
        }
        const questions = data && data.questions ? data.questions : [];
        return (
          <List>
            {questions.map(question => (
              <ListItem key={question.id} data-testid="question">
                <ListItemText primary={question.question} />
              </ListItem>
            ))}
          </List>
        );
      }}
    </Query>
  </Fragment>
);

export default QuestionList;
