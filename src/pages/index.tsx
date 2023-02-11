import { UserLayout } from "components/layouts/UserLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/bones/head");
  }, []);

  return <UserLayout></UserLayout>;
};

export default Index;
