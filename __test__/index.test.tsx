import { render, wait } from "react-testing-library";
import userEvent from "user-event";
import { MockedProvider } from "react-apollo/test-utils";
import Index from "../pages/index";
import { QUESTIONS_QUERY } from "../components/QuestionList";
import { NEW_QUESTION_MUTATION } from "../components/NewQuestion";

const question = "Is this the meaning of life?";
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
  },
  {
    request: {
      query: NEW_QUESTION_MUTATION,
      variables: {
        question
      }
    },
    result: {
      data: {
        addQuestion: {
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

describe("<index />", () => {
  test("should add a new question to the list", async () => {
    const { debug, container, getByTestId, getByText, getByLabelText } = render(
      <MockedProvider mocks={mocks}>
        <Index />
      </MockedProvider>
    );
    await wait();
    const questions = container.querySelectorAll("span");
    expect(questions).toHaveLength(3);

    userEvent.type(getByLabelText("Question"), question);
    userEvent.click(getByText("Submit"));
    await wait();

    const newQuestions = container.querySelectorAll("span");
    expect(newQuestions).toHaveLength(4);
    const newQuestion = getByText(question);
    expect(newQuestion).toBeDefined();

    // Make sure new question is added to the end of the list
    expect(newQuestions[3].innerHTML).toBe(question);
  });
});
