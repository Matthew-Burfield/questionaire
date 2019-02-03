// import { mount } from "enzyme";
// import toJSON from "enzyme-to-json";
import { render, waitForElement } from "react-testing-library";
// import CreateItem, { CREATE_ITEM_MUTATION } from "../components/CreateItem";
import { MockedProvider } from "react-apollo/test-utils";
import NewQuestion, { NEW_QUESTION_MUTATION } from "../components/NewQuestion";

// import React from "react";
// import { render, waitForElement } from "react-testing-library";
// import Hello from "../components/Hello";

// describe("<Hello />", () => {
//   it("renders personalized greeting", async () => {
//     // Render new instance in every test to prevent leaking state
//     const { getByText } = render(<Hello name="Matt" enthusiasmLevel={3} />);

//     await waitForElement(() => getByText("Hello Matt!!!"));
//   });
// });

// const secure_url = "http://www.dogImage.com/dogs.jpeg";

// global.fetch = jest.fn().mockResolvedValue({
//   json: () => ({
//     secure_url,
//     eager: [{ secure_url }]
//   })
// });

const question = "Is this the meaning of life?";
const mocks = [
  {
    request: {
      query: NEW_QUESTION_MUTATION,
      variables: {
        question
      }
    },
    result: {
      data: {
        question: {
          hasBeenApproved: false,
          hasBeenAsked: false,
          id: "10",
          question,
          sessionId: "1",
          thumbsDownCount: 0,
          thumbsUpCount: 0,
          __typename: "Question"
        }
      }
    }
  }
];

describe("<NewQuestion />", () => {
  it("should render", () => {
    render(
      <MockedProvider>
        <NewQuestion />
      </MockedProvider>
    );
  });
});
