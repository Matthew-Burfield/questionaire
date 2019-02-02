// import { mount } from "enzyme";
// import toJSON from "enzyme-to-json";
import { render, wait, queryByText } from "react-testing-library";
import { MockedProvider } from "react-apollo/test-utils";
import QuestionList, { QUESTIONS_QUERY } from "../components/QuestionList";

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

const mocks = [
  {
    request: {
      query: QUESTIONS_QUERY
    },
    result: {
      data: {
        questions: [
          {
            hasBeenApproved: false,
            hasBeenAsked: false,
            id: "1",
            question: "Question 1",
            sessionId: "1",
            thumbsDownCount: 0,
            thumbsUpCount: 0,
            __typename: "Question"
          },
          {
            hasBeenApproved: false,
            hasBeenAsked: false,
            id: "2",
            question: "Question 2",
            sessionId: "1",
            thumbsDownCount: 0,
            thumbsUpCount: 0,
            __typename: "Question"
          },
          {
            hasBeenApproved: false,
            hasBeenAsked: false,
            id: "3",
            question: "Question 3",
            sessionId: "1",
            thumbsDownCount: 0,
            thumbsUpCount: 0,
            __typename: "Question"
          }
        ]
      }
    }
  }
];

describe("<QuestionList />", () => {
  test("should render", async () => {
    const { debug, container, getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <QuestionList />
      </MockedProvider>
    );
    await wait();
    const questions = container.querySelectorAll("span");
    expect(questions).toHaveLength(3);
    expect(questions[0].innerHTML).toBe("Question 1");
    expect(questions[1].innerHTML).toBe("Question 2");
    expect(questions[2].innerHTML).toBe("Question 3");
  });

  // it("Should add a new question", () => {
  //   const wrapper = render(
  //     <MockedProvider mocks={mocks}>
  //       <NewQuestion />
  //     </MockedProvider>
  //   );
  //   console.log(wrapper.debug());
  // });

  // it("should upload an image", () => {
  //   console.log("hi");
  //   const wrapper = mount(
  //     <MockedProvider mocks={mocks}>
  //       <CreateItem />
  //     </MockedProvider>
  //   );
  //   console.log("here");
  //   const fileInput = wrapper.find('input[type="file"]');
  //   console.log(fileInput.debug());
  // });
});
