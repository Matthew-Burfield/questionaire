import React from "react";
import QuestionList from "../components/QuestionList";
import NewQuestion from "../components/NewQuestion";

export default () => {
  return (
    <div>
      <h1>Topic name</h1>
      <QuestionList />
      <NewQuestion />
    </div>
  );
};
