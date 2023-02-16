import * as UIModule from "@aws-amplify/ui";
import { AuthenticatorServiceFacade } from "@aws-amplify/ui";
import { UseAuthenticator } from "@aws-amplify/ui-react";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { API, Storage } from "aws-amplify";
import CreateBone from "pages/admin/create-bone";
import { BoneBodyPart, BoneCategory } from "types/bone";
import { render } from "utils/test-utils";
const user = userEvent.setup();

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "/admin/create-bone",
      query: {},
    };
  },
}));

jest.mock("@aws-amplify/api");

jest.mocked(API.graphql).mockRejectedValueOnce(new Error("Server error"));

jest.mocked(API.graphql).mockImplementation(() => {
  return new Promise((res) => {
    setTimeout(() => {
      res({});
    }, 100);
  });
});

const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

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

const mockStoragePut = {
  key: "file",
};

describe("Create bone", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(<CreateBone />);
    });
  });

  beforeAll(() => {
    jest.spyOn(UIModule, "getServiceFacade").mockReturnValue(mockServiceFacade);
    jest.spyOn(Storage, "put").mockImplementation(() => {
      return new Promise((res) => {
        setTimeout(() => {
          res(mockStoragePut);
        }, 100);
      });
    });
  });

  test("should submit form with server failure", async () => {
    const input = within(screen.getByTestId("inp-bone-name")).getByRole(
      "textbox"
    );
    await userEvent.type(input, "Frontal bone");

    const file = new File(["frontal-bone"], "frontal-bone.png", {
      type: "text/plain",
    });

    const uploadInput = screen.getByTestId<HTMLInputElement>(
      "inp-upload-bone-image"
    );

    await user.upload(uploadInput, file);

    await waitFor(() => {
      expect(screen.getByTestId("select-image")).toHaveTextContent(
        "frontal-bone.png"
      );
    });

    await user.click(screen.getByTestId("submit-create-bone"));

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(new Error("Server error"));
      expect(screen.getByText("Error: Server error")).toBeInTheDocument();
    });
  });

  test("should show title", () => {
    expect(screen.getByTestId("page-title")).toHaveTextContent("Create bone");
  });

  test("should submit form with success", async () => {
    const input = within(screen.getByTestId("inp-bone-name")).getByRole(
      "textbox"
    );
    await userEvent.type(input, "Frontal bone");

    const selectBodyPart = screen.getByTestId("select-body-part");
    expect(within(selectBodyPart).getByRole("button")).toHaveTextContent(
      BoneBodyPart.HEAD
    );

    await user.pointer({
      keys: "[MouseLeft]",
      target: within(selectBodyPart).getByRole("button"),
    });

    const selectBodyPartOption = screen.getByTestId(
      `menu-item-${BoneBodyPart.VERTEBRAL_COLUMN}`
    );
    await user.click(selectBodyPartOption);

    expect(within(selectBodyPart).getByRole("button")).toHaveTextContent(
      BoneBodyPart.VERTEBRAL_COLUMN
    );

    const selectBoneCategory = screen.getByTestId("select-bone-category");
    expect(within(selectBoneCategory).getByRole("button")).toHaveTextContent(
      BoneCategory.FLAT_BONE
    );

    await user.pointer({
      keys: "[MouseLeft]",
      target: within(selectBoneCategory).getByRole("button"),
    });

    const selectBoneCategoryOption = screen.getByTestId(
      `menu-item-${BoneCategory.IRREGULAR_BONE}`
    );
    await user.click(selectBoneCategoryOption);

    expect(within(selectBoneCategory).getByRole("button")).toHaveTextContent(
      BoneCategory.IRREGULAR_BONE
    );

    expect(screen.getByTestId("select-image")).toHaveTextContent(
      "Select image"
    );

    const file = new File(["frontal-bone"], "frontal-bone.png", {
      type: "text/plain",
    });

    const uploadInput = screen.getByTestId<HTMLInputElement>(
      "inp-upload-bone-image"
    );

    await user.upload(uploadInput, file);
    expect(uploadInput.files[0]).toBe(file);

    expect(
      within(screen.getByTestId("bone-image-container")).getByTestId(
        "loading-spinner"
      )
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("select-image")).toHaveTextContent(
        "frontal-bone.png"
      );
      expect(
        within(screen.getByTestId("bone-image-container")).queryByTestId(
          "loading-spinner"
        )
      ).not.toBeInTheDocument();
    });

    const submitBtn = screen.getByTestId("submit-create-bone");
    expect(submitBtn).toHaveTextContent("Create bone");

    await user.click(submitBtn);
    await waitFor(() => {
      within(submitBtn).getByTestId("loading-spinner");
      expect(submitBtn).not.toHaveTextContent("Create bone");
    });

    await waitFor(() => {
      expect(screen.getByText("Bone created successfully")).toBeInTheDocument();
      expect(within(selectBodyPart).getByRole("button")).toHaveTextContent(
        BoneBodyPart.HEAD
      );
      expect(within(selectBoneCategory).getByRole("button")).toHaveTextContent(
        BoneCategory.FLAT_BONE
      );

      expect(input).toHaveDisplayValue("");
      expect(screen.getByTestId("select-image")).toHaveTextContent(
        "Select image"
      );
      expect(submitBtn).toHaveTextContent("Create bone");
    });
  });

  test("should show bone name field error", async () => {
    await user.click(screen.getByTestId("submit-create-bone"));
    expect(
      within(screen.getByTestId("inp-bone-name")).getByText(
        "Please enter a bone name"
      )
    ).toBeInTheDocument();
  });
  test("should show bone image field error", async () => {
    await user.click(screen.getByTestId("submit-create-bone"));
    expect(screen.getByTestId("bone-image-error")).toHaveTextContent(
      "Please select a bone image"
    );
  });
});
