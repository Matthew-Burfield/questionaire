import { render, wait, queryByText } from "react-testing-library";
import { MockedProvider } from "react-apollo/test-utils";
import QuestionList, { QUESTIONS_QUERY } from "../components/QuestionList";

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
    const questions = container.querySelectorAll("li");
    const [question1, question2, question3] = questions;
    expect(questions).toHaveLength(3);
    expect(question1.innerHTML).toBe("Question 1");
    expect(question2.innerHTML).toBe("Question 2");
    expect(question3.innerHTML).toBe("Question 3");
  });
});
