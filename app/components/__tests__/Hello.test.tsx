import { render, screen, waitFor } from "@testing-library/react";
import Hello from "@/app/components/Hello";

describe("Hello tests suite", () => {
  const name = "Worlds";
  const regExp = new RegExp(`Hello ${name}`, "i");
  const exactText = (text: string) => `Hello ${text}!`;

  it("renders a greeting using exact text", async () => {
    render(<Hello name={name} />);
    await waitFor(() => {
      const greetingElement = screen.queryByText(exactText(name));
      expect(greetingElement).toBeInTheDocument();
    });
  });

  test("renders a greeting using RegExp with queryByText", async () => {
    render(<Hello name={name} />);
    await waitFor(() => {
      const greetingElement = screen.queryByText(regExp);
      expect(greetingElement).toBeInTheDocument();
    });
  });

  test("renders a greeting using RegExp with getByText", async () => {
    render(<Hello name={name} />);
    await waitFor(() => {
      const greetingElement = screen.getByText(regExp);
      expect(greetingElement).toBeInTheDocument();
    });
  });
});
