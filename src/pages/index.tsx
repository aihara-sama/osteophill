import { Box } from "@mui/material";
import { UserLayout } from "components/layouts/UserLayout";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { OrganizationJsonLd } from "next-seo";

const Index = () => {
  return (
    <UserLayout>
      <OrganizationJsonLd
        type="Corporation"
        id="https://osteophill.com"
        logo="https://osteophill.com/static/media/logo.59447da9.png"
        legalName="Osteophill Private Limited"
        name="osteophill"
        address={{
          streetAddress: "Plot no 8, Parmanand Colony, Block B, Sector 12",
          addressLocality: "Dwarka",
          addressRegion: "Delhi",
          postalCode: "110078",
          addressCountry: "IN",
        }}
        contactPoint={[
          {
            telephone: "+37369763951",
            contactType: "query",
            email: "john@osteophill.com",
            areaServed: "MD",
            availableLanguage: ["English"],
          },
        ]}
        sameAs={["https://osteophill.com"]}
        url="https://osteophill.com"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      ></Box>
    </UserLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en")),
  },
});

export default Index;
