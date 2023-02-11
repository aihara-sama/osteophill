import { render, screen } from "@testing-library/react";
import BodyPart from "pages/bones/[body_part]";
import MockApp from "../__mocks__/next/_app";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: {
        body_part: "head",
      },
    };
  },
}));
describe("Body part", () => {
  test("should show page title", () => {
    render(
      <MockApp>
        <BodyPart />
      </MockApp>
    );

    screen.getByTestId("page-title");
  });
});
