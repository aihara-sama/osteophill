import AllProviders from "@/cypress/utils/AllProviders";
import { API } from "@aws-amplify/api";
import { GraphQLOptions } from "@aws-amplify/api-graphql";
import { SearchableBoneFilterInput } from "API";
import { isMatch } from "matcher";
import BodyPart from "pages/bones/[body_part]";
import { IBone } from "types/bone";

import { menu } from "components/layouts/UserHeader/menu";

describe("BodyPart", () => {
  beforeEach(() => {
    cy.viewport(1960, 1280);
  });

  context("With bones data", () => {
    beforeEach(() => {
      cy.fixture("bones").as("bones");

      cy.get<IBone[]>("@bones").then((bones) => {
        cy.stub(API, "graphql").callsFake((options: GraphQLOptions) => {
          const variables = options.variables as {
            filter: SearchableBoneFilterInput;
          };

          return {
            data: {
              searchBones: {
                items: bones.filter(
                  (bone) =>
                    isMatch(bone.name, variables.filter.name.wildcard) &&
                    bone.bodyPart === variables.filter.bodyPart.eq
                ),
                nextToken: null,
              },
            },
          };
        });
      });

      cy.mount(
        <AllProviders
          router={{
            pathname: "/bones/head",
            query: {
              body_part: "head",
            },
          }}
        >
          <BodyPart />
        </AllProviders>
      );
    });

    it("should render title", () => {
      cy.getByTestId("page=title").contains("Head bones");
    });

    it("should render bones", () => {
      cy.get<IBone[]>("@bones").then((bones) => {
        const headBones = bones.filter((bone) => bone.bodyPart === "Head");

        cy.getByTestId("bone-card")
          .first()
          .findByTestId("bone-link")
          .should("have.attr", "href")
          .and("eq", `/bones/head/${headBones[0].id}`);

        cy.getByTestId("bone-card")
          .first()
          .findByTestId("bone-name")
          .contains(headBones[0].name);

        cy.getByTestId("bone-card")
          .first()
          .findByTestId("bone-image")
          .should("have.attr", "src")
          .and(
            "eq",
            `/_next/image?url=${encodeURIComponent(
              headBones[0].image
            )}&w=256&q=75`
          );

        cy.getByTestId("bone-card")
          .first()
          .findByTestId("bone-image")
          .should("have.attr", "srcset")
          .and(
            "eq",
            `/_next/image?url=${encodeURIComponent(
              headBones[0].image
            )}&w=96&q=75 1x, /_next/image?url=${encodeURIComponent(
              headBones[0].image
            )}&w=256&q=75 2x`
          );
      });
    });

    it("should render searched bones", () => {
      cy.get<IBone[]>("@bones").then((bones) => {
        cy.getByTestId("search-bones").type(
          bones.filter((bone) => bone.bodyPart === "Head")[0].name
        );
        cy.getByTestId("bone-card").should("have.length", 1);
      });
    });

    it("should open specific bone page", () => {
      cy.get<IBone[]>("@bones").then((bones) => {
        cy.getByTestId("bone-link").first().click();
        cy.location("pathname").should(
          "eq",
          `/bones/head/${
            bones.filter((bone) => bone.bodyPart === "Head")[0].id
          }`
        );
      });
    });
  });

  context("Without bones data", () => {
    beforeEach(() => {
      cy.stub(API, "graphql").resolves({
        data: {
          searchBones: {
            items: [],
            nextToken: null,
          },
        },
      });

      cy.mount(
        <AllProviders
          router={{
            pathname: "/bones/head",
            query: {
              body_part: "head",
            },
          }}
        >
          <BodyPart />
        </AllProviders>
      );
    });

    it("should render no bones data", () => {
      cy.getByTestId("bone-card").should("not.exist");
      cy.getByTestId("no-data").contains("No data");
    });
  });

  context("User header", () => {
    beforeEach(() => {
      cy.stub(API, "graphql").resolves({
        data: {
          searchBones: {
            items: [],
            nextToken: null,
          },
        },
      });

      cy.mount(
        <AllProviders
          router={{
            pathname: "/bones/head",
            query: {
              body_part: "head",
            },
          }}
        >
          <BodyPart />
        </AllProviders>
      );
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
