import React, { Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";

type Question = {
  id: number;
  sessionId: number;
  question: string;
  thumbsUpCount: number;
  thumbsDownCount: number;
  hasBeenAsked: boolean;
  hasBeenApproved: boolean;
};

type Props = {
  questions: [Question];
};

const QuestionList = (props: Props) => (
  <Fragment>
    <h2>List of questions</h2>
    <List dense={false}>
      {props.questions.map(question => (
        <ListItem key={question.id}>
          <ListItemText primary={question.question} />
        </ListItem>
      ))}
    </List>
  </Fragment>
);

QuestionList.defaultProps = {
  questions: []
};

export default QuestionList;
