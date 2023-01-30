import { Box } from "@mui/material";
import { Layout } from "components/layouts/Layout";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { OrganizationJsonLd } from "next-seo";

const Index = () => {
  return (
    <Layout>
      <OrganizationJsonLd
        type="Corporation"
        id="https://example.com"
        logo="https://example.com/static/media/logo.59447da9.png"
        legalName="example Private Limited"
        name="example"
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
            email: "john@example.com",
            areaServed: "MD",
            availableLanguage: ["English"],
          },
        ]}
        sameAs={["https://example.com"]}
        url="https://example.com"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      ></Box>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en")),
  },
});

export default Index;
