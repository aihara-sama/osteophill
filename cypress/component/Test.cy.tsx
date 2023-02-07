import Test from "pages/test";
import AllProviders from "../utils/AllProviders";

describe("Test", () => {
  beforeEach(() => {
    cy.mount(
      <AllProviders
        router={{
          pathname: "/test",
        }}
      >
        <Test />
      </AllProviders>
    );
  });

  it("Test", () => {
    cy.log("hello");
  });
});
