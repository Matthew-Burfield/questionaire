import "../src/bootstrap";

import React, { Fragment, useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { QUESTIONS_QUERY } from "./QuestionList";

export const NEW_QUESTION_MUTATION = gql`
  mutation NEW_QUESTION_MUTATION($question: String!) {
    createQuestion(question: $question) {
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
`;

export default () => {
  const [question, setValue] = useState("");
  const update = (cache, { data: { addQuestion } }) => {
    const data = cache.readQuery({ query: QUESTIONS_QUERY });
    const questions = [...data.questions, addQuestion];
    setValue("");
    cache.writeQuery({
      query: QUESTIONS_QUERY,
      data: {
        questions
      }
    });
  };
  const handleChange = e => {
    setValue(e.currentTarget.value);
  };
  return (
    <Fragment>
      <h2>Enter a new question</h2>
      <Mutation
        mutation={NEW_QUESTION_MUTATION}
        variables={{ question }}
        update={update}
      >
        {(addQuestion, { loading, error }) => {
          if (error) {
            return <div>Error: {error}</div>;
          }
          if (loading) {
            return <div>Loading...</div>;
          }
          return (
            <StyledForm
              data-test="form"
              onSubmit={async e => {
                e.preventDefault();
                const response = await addQuestion();
              }}
            >
              <TextField
                id="question"
                label="Question"
                value={question}
                onChange={handleChange}
                margin="normal"
              />
              <Button type="submit">Submit</Button>
            </StyledForm>
          );
        }}
      </Mutation>
    </Fragment>
  );
};
