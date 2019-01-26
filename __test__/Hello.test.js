import React from "react";
import { render, waitForElement } from "react-testing-library";
import Hello from "../components/Hello";

describe("<Hello />", () => {
  it("renders personalized greeting", async () => {
    // Render new instance in every test to prevent leaking state
    const { getByText } = render(<Hello name="Matt" enthusiasmLevel={3} />);

    await waitForElement(() => getByText("Hello Matt!!!"));
  });
});
