import GuestGuard from "components/auth/GuestGuard";
import { Login } from "components/auth/Login";
import { UserLayout } from "components/layouts/UserLayout";
import type { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const LoginPage: NextPage = () => {
  return (
    <GuestGuard>
      <UserLayout>
        <Head>
          <title>Login</title>
        </Head>
        <Login />
      </UserLayout>
    </GuestGuard>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en")),
  },
});

export default LoginPage;
