import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { API } from "aws-amplify";
import bones from "data/bones.json";
import Bone from "pages/bones/[body_part]/[id]";
import { render } from "utils/test-utils";

const [bone, ...similarBones] = bones.filter(
  (bone) => bone.bodyPart === "Head"
);

const user = userEvent.setup();

jest.mock("@aws-amplify/api");

jest.mocked(API.graphql).mockResolvedValueOnce({
  data: {
    getBone: null,
  },
});
jest.mocked(API.graphql).mockResolvedValueOnce({
  data: {
    getBone: bone,
    listBones: {
      items: [],
      nextToken: null,
    },
  },
});
jest.mocked(API.graphql).mockImplementationOnce(() => {
  return new Promise(() => {
    //
  });
});

jest.mocked(API.graphql).mockResolvedValue({
  data: {
    getBone: bone,
    listBones: { items: similarBones, nextToken: null },
  },
});

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: {
        body_part: "head",
        id: bone.id,
      },
      push(url: string) {
        return new Promise((res) => {
          window.history.pushState({}, "", url);

          res(true);
        });
      },
    };
  },
}));

describe("Bone", () => {
  beforeEach(() => {
    waitFor(() =>
      render(<Bone />, {
        router: {
          pathname: `/bones/head/${bone.id}`,
          query: {
            id: bone.id,
            body_part: "head",
          },
        },
      })
    );
  });

  test("should redirect to body part when no bone found", async () => {
    await waitFor(() => {
      expect(window.location.pathname).toMatch("/bones/head");
    });
  });

  test("should not render similar bones", async () => {
    await waitFor(() => {
      const similarBonesContainer = screen.queryByTestId(
        "similar-bones-container"
      );

      expect(similarBonesContainer).not.toBeInTheDocument();
    });
  });

  test("should show loading state", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });
  });

  test("should render title", async () => {
    const [bone] = bones.filter((bone) => bone.bodyPart === "Head");

    await waitFor(() =>
      expect(screen.getByTestId("page-title")).toHaveTextContent(bone.name)
    );
  });

  test("should render bone image", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("bone-image")).toHaveAttribute(
        "src",
        `/_next/image?url=${encodeURIComponent(bone.image)}&w=640&q=75`
      );

      expect(screen.getByTestId("bone-image")).toHaveAttribute(
        "srcset",
        `/_next/image?url=${encodeURIComponent(
          bone.image
        )}&w=384&q=75 1x, /_next/image?url=${encodeURIComponent(
          bone.image
        )}&w=640&q=75 2x`
      );
    });
  });

  test("should render bone fields", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("bone-category")).toHaveTextContent(
        `Category: ${bone.category}`
      );
      expect(screen.getByTestId("bone-body-part")).toHaveTextContent(
        `Body part: ${bone.bodyPart}`
      );
    });
  });

  test("should render similar bones", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("similar-bones")).toHaveTextContent(
        "Similar bones"
      );
      screen.getAllByTestId("swiper-slide").forEach((slide) => {
        expect(within(slide).getByTestId("swiper-bone-name")).toHaveTextContent(
          similarBones[0].name
        );
        expect(within(slide).getByTestId("swiper-bone-image")).toHaveAttribute(
          "src",
          `/_next/image?url=${encodeURIComponent(
            similarBones[0].image
          )}&w=384&q=75`
        );
        expect(within(slide).getByTestId("swiper-bone-image")).toHaveAttribute(
          "srcset",
          `/_next/image?url=${encodeURIComponent(
            similarBones[0].image
          )}&w=256&q=75 1x, /_next/image?url=${encodeURIComponent(
            similarBones[0].image
          )}&w=384&q=75 2x`
        );
      });
    });
  });

  test("should open specific bone page", async () => {
    await waitFor(async () => {
      const [similarBoneLink] = screen.getAllByTestId("swiper-bone-link");
      await user.click(similarBoneLink);

      expect(window.location.pathname).toMatch(
        `/bones/head/${similarBones[0].id}`
      );
    });
  });
});
