import AllProviders from "@/cypress/utils/AllProviders";
import { API } from "@aws-amplify/api";
import { menu } from "components/layouts/UserHeader/menu";
import Bone from "pages/bones/[body_part]/[id]";
import { IBone } from "types/bone";

describe("Bone", () => {
  beforeEach(() => {
    cy.fixture("bones").as("bones");
  });
  context("Bone exists", () => {
    beforeEach(() => {
      cy.get<IBone[]>("@bones").then((bones) => {
        const headBones = bones.filter((bone) => bone.bodyPart === "Head");

        cy.stub(API, "graphql").resolves({
          data: {
            listBones: {
              items: [headBones[1]],
            },
            getBone: headBones[0],
          },
        });

        cy.mount(
          <AllProviders
            router={{
              pathname: `/bones/head/${headBones[0].id}`,
              query: {
                body_part: "head",
                id: headBones[0].id,
              },
            }}
          >
            <Bone />
          </AllProviders>
        );
      });
    });

    it("should render title", () => {
      cy.get<IBone[]>("@bones").then((bones) => {
        const headBones = bones.filter((bone) => bone.bodyPart === "Head");
        cy.getByTestId("page-title").contains(headBones[0].name);
      });
    });
    it("should render bone image", () => {
      cy.get<IBone[]>("@bones").then((bones) => {
        const headBones = bones.filter((bone) => bone.bodyPart === "Head");
        cy.getByTestId("bone-image")
          .should("have.attr", "src")
          .and(
            "eq",
            `/_next/image?url=${encodeURIComponent(
              headBones[0].image
            )}&w=640&q=75`
          );

        cy.getByTestId("bone-image")
          .should("have.attr", "srcset")
          .and(
            "eq",
            `/_next/image?url=${encodeURIComponent(
              headBones[0].image
            )}&w=384&q=75 1x, /_next/image?url=${encodeURIComponent(
              headBones[0].image
            )}&w=640&q=75 2x`
          );
      });
    });
    it("should render bone fields", () => {
      cy.get<IBone[]>("@bones").then((bones) => {
        const headBones = bones.filter((bone) => bone.bodyPart === "Head");
        cy.getByTestId("bone-category").contains(
          `Category: ${headBones[0].category}`
        );
        cy.getByTestId("bone-body-part").contains(
          `Body part: ${headBones[0].bodyPart}`
        );
      });
    });

    it("should render similar bones", () => {
      cy.get<IBone[]>("@bones").then((bones) => {
        const headBones = bones.filter((bone) => bone.bodyPart === "Head");

        cy.getByTestId("similar-bones").contains("Similar bones");

        cy.getByTestId("swiper-slide").then(($slides) => {
          $slides.each((_, $slide) => {
            cy.wrap($slide)
              .findByTestId("swiper-bone-name")
              .contains(headBones[1].name);

            cy.wrap($slide)
              .findByTestId("swiper-bone-image")
              .should("have.attr", "src")
              .and(
                "eq",
                `/_next/image?url=${encodeURIComponent(
                  headBones[1].image
                )}&w=384&q=75`
              );

            cy.wrap($slide)
              .findByTestId("swiper-bone-image")
              .should("have.attr", "srcset")
              .and(
                "eq",
                `/_next/image?url=${encodeURIComponent(
                  headBones[1].image
                )}&w=256&q=75 1x, /_next/image?url=${encodeURIComponent(
                  headBones[1].image
                )}&w=384&q=75 2x`
              );
          });
        });
      });
    });

    it("should open specific bone page", () => {
      cy.get<IBone[]>("@bones").then((bones) => {
        cy.getByTestId("swiper-bone-link").first().click({ force: true });
        cy.location("pathname").should(
          "eq",
          `/bones/head/${
            bones.filter((bone) => bone.bodyPart === "Head")[1].id
          }`
        );
      });
    });
  });
  context("Bone does not exists", () => {
    beforeEach(() => {
      cy.stub(API, "graphql").resolves({
        data: {
          getBone: null,
          listBones: {
            items: [],
          },
        },
      });

      cy.mount(
        <AllProviders
          router={{
            pathname: "/bones/head/0",
            query: {
              body_part: "head",
              id: "0",
            },
          }}
        >
          <Bone />
        </AllProviders>
      );
    });

    it("should redirect to body part when no bone found", () => {
      cy.location("pathname").should("eq", "/bones/head");
    });
  });
  context("Similar bones not found", () => {
    beforeEach(() => {
      cy.get<IBone[]>("@bones").then((bones) => {
        const headBones = bones.filter((bone) => bone.bodyPart === "Head");

        cy.stub(API, "graphql").resolves({
          data: {
            listBones: {
              items: [],
            },
            getBone: headBones[0],
          },
        });

        cy.mount(
          <AllProviders
            router={{
              pathname: "/bones/head/0",
              query: {
                body_part: "head",
                id: "0",
              },
            }}
          >
            <Bone />
          </AllProviders>
        );
      });
    });

    it("should not render similar bones", () => {
      cy.getByTestId("similar-bones-container").should("not.exist");
    });
  });
  context("Bone is loading", () => {
    beforeEach(() => {
      cy.stub(API, "graphql").resolves(
        new Promise((_) => {
          //
        })
      );

      cy.mount(
        <AllProviders
          router={{
            pathname: "/bones/head/0",
            query: {
              body_part: "head",
              id: "0",
            },
          }}
        >
          <Bone />
        </AllProviders>
      );
    });

    it("should render loading spinner", () => {
      cy.getByTestId("loading-spinner");
    });
  });

  context("User header", () => {
    beforeEach(() => {
      cy.get<IBone[]>("@bones").then((bones) => {
        const headBones = bones.filter((bone) => bone.bodyPart === "Head");

        cy.stub(API, "graphql").resolves({
          data: {
            listBones: {
              items: [headBones[1]],
            },
            getBone: headBones[0],
          },
        });

        cy.mount(
          <AllProviders
            router={{
              pathname: `/bones/head/${headBones[0].id}`,
              query: {
                body_part: "head",
                id: headBones[0].id,
              },
            }}
          >
            <Bone />
          </AllProviders>
        );
      });
    });

    it("should render logo", () => {
      cy.getByTestId("logo").should("have.attr", "href").and("eq", "/");
    });

    it("should render nav items", () => {
      menu.forEach(({ title }) => {
        cy.getByTestId(`link-${title}`).contains(title);
      });
    });

    context("Mobile drawer", () => {
      beforeEach(() => {
        cy.viewport(599, 599);
      });

      it("Should render logo", () => {
        cy.getByTestId("toggle-mobile-header-drawer").click();
        cy.getByTestId("logo").should("have.attr", "href").and("eq", "/");
      });

      it("should render nav items", () => {
        cy.getByTestId("toggle-mobile-header-drawer").click();

        menu.forEach(({ title }) => {
          cy.getByTestId(`link-${title}`).contains(title);
        });
      });

      it("should toggle mobile haeder drawer", () => {
        cy.getByTestId("mobile-header-drawer").should("not.be.visible");
        cy.getByTestId("toggle-mobile-header-drawer").click();
        cy.getByTestId("mobile-header-drawer").should("be.visible");
        cy.getByTestId("close-mobile-header-drawer").click();
        cy.getByTestId("mobile-header-drawer").should("not.be.visible");
      });
    });
  });
});
