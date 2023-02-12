import * as UIModule from "@aws-amplify/ui";
import { AuthenticatorServiceFacade } from "@aws-amplify/ui";
import { UseAuthenticator } from "@aws-amplify/ui-react";
import { render, screen } from "@testing-library/react";
import CreateBone from "pages/admin/create-bone";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "/admin/create-bone",
      query: {},
    };
  },
}));
// jest.mock("@aws-amplify/ui-react", () => ({
//   useAuthenticator() {
//     return {
//       route: "authenticated",
//     };
//   },
// }));

const mockServiceFacade: AuthenticatorServiceFacade = {
  authStatus: "authenticated",
  codeDeliveryDetails: {} as UseAuthenticator["codeDeliveryDetails"],
  error: undefined as unknown as UseAuthenticator["error"],
  hasValidationErrors: false,
  isPending: false,
  route: "authenticated",
  socialProviders: [],
  unverifiedContactMethods: { email: "test#example.com" },
  user: {} as UseAuthenticator["user"],
  validationErrors:
    undefined as unknown as UseAuthenticator["validationErrors"],
  initializeMachine: jest.fn(),
  resendCode: jest.fn(),
  signOut: jest.fn(),
  submitForm: jest.fn(),
  updateForm: jest.fn(),
  updateBlur: jest.fn(),
  toFederatedSignIn: jest.fn(),
  toResetPassword: jest.fn(),
  toSignIn: jest.fn(),
  toSignUp: jest.fn(),
  skipVerification: jest.fn(),
};

describe("Create bone", () => {
  beforeEach(() => {
    jest.spyOn(UIModule, "getServiceFacade").mockReturnValue(mockServiceFacade);
  });

  test("should show title", () => {
    render(<CreateBone />);
    expect(screen.getByTestId("page-title")).toHaveTextContent("Create bone");
  });
});
