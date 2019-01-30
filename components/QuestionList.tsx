import React, { Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Query } from "react-apollo";
import gql from "graphql-tag";

type Question = {
  id: number;
  sessionId: number;
  question: string;
  thumbsUpCount: number;
  thumbsDownCount: number;
  hasBeenAsked: boolean;
  hasBeenApproved: boolean;
};

const QUESTIONS_QUERY = gql`
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
        if (error) console.error(error);
        if (loading) console.log("loading...");
        return (
          <List dense={false}>
            {data.questions.map(question => (
              <ListItem key={question.id}>
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
