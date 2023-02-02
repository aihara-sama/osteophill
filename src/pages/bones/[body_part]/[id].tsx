import { Box, Typography } from "@mui/material";
import { API } from "aws-amplify";
import BonesSwiper from "components/common/BonesSwiper";
import LoadingSpinner from "components/common/LoadingSpinner";
import { UserLayout } from "components/layouts/UserLayout";
import { getBone, listBones } from "graphql/queries";
import Image from "next/image";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IBone } from "types/bone";
import { kebabCaseToCapitalize } from "utils/kebab-case-to-capitalize";

interface IProps {}

const Bone: FunctionComponent<IProps> = () => {
  // ~~~~~ Redux state ~~~~~

  // ~~~~~ Hooks ~~~~~
  const router = useRouter();

  // ~~~~~ Cmp state ~~~~~
  const [isBoneLoading, setIsBoneLoading] = useState(false);
  const [bone, setBone] = useState<IBone>();
  const [similarBones, setsimilarBones] = useState<IBone[]>([]);

  // ~~~~~ Refs ~~~~~

  // ~~~~~ Effects ~~~~~
  useEffect(() => {
    if (router.query.id) {
      handleGetBone();
      handleGetSimilarBones();
    }
  }, [router.query.id]);

  // ~~~~~ Handlers ~~~~~
  const handleGetBone = () => {
    (async () => {
      setIsBoneLoading(true);
      try {
        const result = (await API.graphql({
          query: getBone,
          variables: {
            id: router.query.id,
          },
          authMode: "AWS_IAM",
        })) as { data: { getBone: IBone } };
        setBone(result.data.getBone);
      } catch (error) {
        toast.error("Something went wrong!");
        console.error(error);
      } finally {
        setIsBoneLoading(false);
      }
    })();
  };
  // ~~~~~ Handlers ~~~~~
  const handleGetSimilarBones = () => {
    (async () => {
      try {
        const result = (await API.graphql({
          query: listBones,
          variables: {
            filter: {
              bodyPart: {
                eq: kebabCaseToCapitalize(router.query.body_part as string),
              },
              id: { ne: router.query.id },
            },
          },
          authMode: "AWS_IAM",
        })) as { data: { listBones: { items: IBone[] } } };

        setsimilarBones(result.data.listBones.items);
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
      }
    })();
  };

  return (
    <UserLayout>
      {isBoneLoading && <LoadingSpinner />}
      {!isBoneLoading && bone && (
        <Box mt={5}>
          <Typography
            textAlign={{
              xs: "center",
              sm: "start",
            }}
            mb={2}
            variant="h2"
            color="text.secondary"
          >
            {bone.name}
          </Typography>
          <Box display={"flex"} justifyContent={{ xs: "center", sm: "start" }}>
            <Box
              flexDirection={{
                xs: "column",
                sm: "row",
              }}
              gap={2}
              sx={{
                "& >img": {
                  borderRadius: 4,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  p: 3,
                },
                display: "flex",
                alignItems: {
                  xs: "start",
                },
              }}
            >
              <Image
                src={bone.image}
                alt={bone.name}
                width={300}
                height={300}
              />
              <Box>
                <Typography>
                  Category:{" "}
                  <Typography fontWeight={600} component={"span"}>
                    {bone.category}
                  </Typography>
                </Typography>
                <Typography>
                  Body part:{" "}
                  <Typography fontWeight={600} component={"span"}>
                    {bone.bodyPart}
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Box>

          {!!similarBones.length && (
            <Box mt={10}>
              <Typography variant="h4">Similar Bones</Typography>
              <BonesSwiper bones={similarBones} />
            </Box>
          )}
        </Box>
      )}
    </UserLayout>
  );
};

export default Bone;
