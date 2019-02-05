import React, { Fragment, useState } from "react";
import { TextInputField } from "evergreen-ui";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { QUESTIONS_QUERY } from "./QuestionList";

export const NEW_QUESTION_MUTATION = gql`
  mutation NEW_QUESTION_MUTATION($question: String!) {
    addQuestion(question: $question) {
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
            <form
              data-test="form"
              onSubmit={async e => {
                e.preventDefault();
                const response = await addQuestion();
              }}
            >
              <TextInputField
                id="question"
                label="Question"
                value={question}
                onChange={handleChange}
              />
              <button type="submit">Submit</button>
            </form>
          );
        }}
      </Mutation>
    </Fragment>
  );
};
