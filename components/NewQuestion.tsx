import React, { Fragment, useState } from "react";
import Input from "@material-ui/core/Input";

export default () => {
  const [value, setValue] = useState("");
  return (
    <Fragment>
      <h2>Enter a new question</h2>
      <Input
        fullWidth
        multiline
        onChange={e => setValue(e.currentTarget.value)}
        placeholder="Type your question here"
        value={value}
      />
    </Fragment>
  );
};
