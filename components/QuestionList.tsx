import "../src/bootstrap";

import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "@emotion/styled";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
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

const StyledThumbsUp = styled(ThumbUpIcon)`
  && {
    &:hover {
      color: blue;
      cursor: pointer;
    }
  }
`;

const StyledThumbsDown = styled(ThumbDownIcon)`
  && {
    &:hover {
      color: ${(props, context) => "red"};
      cursor: pointer;
    }
  }
`;

const QuestionList = props => (
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
                <StyledThumbsUp
                  onClick={() =>
                    console.warn("thumbs up clicked for ", question)
                  }
                />
                <StyledThumbsDown
                  onClick={() =>
                    console.warn("thumbs down clicked for ", question)
                  }
                />
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
