import { API } from "aws-amplify";
import { BoneBodyPart, BoneCategory } from "types/bone";

describe("CreateBone", () => {
  beforeEach(() => {
    cy.stub(API, "graphql").resolves({
      data: {
        createBone: {},
      },
    });

    // cy.stub(obj, "useAuthenticator").returns({
    //   route: "authenticated",
    // });

    // cy.mount(
    //   <AllProviders
    //     router={{
    //       pathname: "/admin/create-bone",
    //     }}
    //   >
    //     <CreateBone />
    //   </AllProviders>
    // );
  });

  it.only("should render page title", () => {
    cy.visit("/admin/create-bone");
    cy.getByTestId("page-title").contains("Create bone");
  });

  it("should create bone", () => {
    cy.getByTestId("inp-bone-name").type("Fromtal bone");

    cy.getByTestId("select-body-part").click();
    cy.getByTestId("select-body-part")
      .findByTestId(`menu-item-${BoneBodyPart.VERTEBRAL_COLUMN}`)
      .click();

    cy.getByTestId("select-bone-category").click();
    cy.getByTestId("select-bone-category")
      .findByTestId(`menu-item-${BoneCategory.IRREGULAR_BONE}`)
      .click();

    cy.getByTestId("inp-upload-bone-image").selectFile(
      "cypress/fixtures/images/frontal-bone.jpg"
    );
  });
});
