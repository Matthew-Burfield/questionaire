import React, { Fragment, useState } from "react";
import Input from "@material-ui/core/Input";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { QUESTIONS_QUERY } from "./QuestionList";

const NEW_QUESTION_MUTATION = gql`
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
    console.warn("UPDATE!");
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
            console.error(`ERROR: ${error}`);
          }
          if (loading) {
            console.log("loading...");
          }
          return (
            <form
              data-test="form"
              onSubmit={async e => {
                e.preventDefault();
                const response = await addQuestion();
              }}
            >
              <Input
                fullWidth
                multiline
                onChange={e => setValue(e.currentTarget.value)}
                placeholder="Type your question here"
                value={question}
              />
              <button type="submit">Submit</button>
            </form>
          );
        }}
      </Mutation>
    </Fragment>
  );
};
