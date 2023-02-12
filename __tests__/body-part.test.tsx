import { GraphQLOptions } from "@aws-amplify/api-graphql";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { API } from "aws-amplify";
import bones from "data/bones.json";
import minimatch from "minimatch";
import BodyPart from "pages/bones/[body_part]";
import { SearchableBoneFilterInput } from "types/API";
import { render } from "utils/test-utils";

const user = userEvent.setup();

jest.mock("@aws-amplify/api");

jest.mocked(API.graphql).mockResolvedValueOnce({
  data: {
    searchBones: {
      items: [],
      nextToken: null,
    },
  },
});
jest.mocked(API.graphql).mockImplementation((options: GraphQLOptions) => {
  const variables = options.variables as {
    filter: SearchableBoneFilterInput;
  };

  return Promise.resolve({
    data: {
      searchBones: {
        items: bones.filter(
          (bone) =>
            minimatch(bone.name, variables.filter.name.wildcard) &&
            bone.bodyPart === variables.filter.bodyPart.eq
        ),
        nextToken: null,
      },
    },
  });
});

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
  beforeEach(() => {
    waitFor(() =>
      render(<BodyPart />, {
        router: {
          pathname: "bones/head",
          query: {
            body_part: "head",
          },
        },
      })
    );
  });

  test("should render no bones data", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("no-data")).toHaveTextContent("No data");
      expect(screen.queryByTestId("bone-card")).not.toBeInTheDocument();
    });
  });

  test("should show page title", () => {
    screen.getByRole("heading", {
      level: 1,
      name: "Head bones",
    });
  });

  test("should render bones", async () => {
    const [headBone] = bones.filter((bone) => bone.bodyPart === "Head");
    const [boneCard] = await screen.findAllByTestId("bone-card");
    const boneLink = within(boneCard).getByTestId("bone-link");
    const boneName = within(boneCard).getByTestId("bone-name");
    const boneImage = within(boneCard).getByTestId("bone-image");

    expect(boneLink).toHaveAttribute("href", `/bones/head/${headBone.id}`);
    expect(boneName).toHaveTextContent(headBone.name);
    expect(boneImage).toHaveAttribute(
      "src",
      `/_next/image?url=${encodeURIComponent(headBone.image)}&w=256&q=75`
    );
    expect(boneImage).toHaveAttribute(
      "srcset",
      `/_next/image?url=${encodeURIComponent(
        headBone.image
      )}&w=96&q=75 1x, /_next/image?url=${encodeURIComponent(
        headBone.image
      )}&w=256&q=75 2x`
    );
  });

  test("should render searched bones", async () => {
    const [headBone] = bones.filter((bone) => bone.bodyPart === "Head");

    user.type(
      within(screen.getByTestId("search-bones")).getByRole("textbox"),
      headBone.name
    );

    const boneCards = await screen.findAllByTestId("bone-card");
    waitFor(() => expect(boneCards).toHaveLength(1));
  });

  test("should open specific bone page", async () => {
    const [headBone] = bones.filter((bone) => bone.bodyPart === "Head");
    const [boneCard] = await screen.findAllByTestId("bone-card");
    const boneLink = within(boneCard).getByTestId("bone-link");
    await user.click(boneLink);

    expect(window.location.pathname).toMatch(`/bones/head/${headBone.id}`);
  });
});
