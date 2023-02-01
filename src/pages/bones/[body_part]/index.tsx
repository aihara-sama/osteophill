import { API, graphqlOperation } from "@aws-amplify/api";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Link as MuiLink, TextField, Typography } from "@mui/material";
import LoadingSpinner from "components/common/LoadingSpinner";
import { UserLayout } from "components/layouts/UserLayout";
import { listBones } from "graphql/queries";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IBone } from "types/bone";
import { kebabCaseToCapitalize } from "utils/kebab-case-to-capitalize";

interface IProps {}

const BodyPart: FunctionComponent<IProps> = () => {
  // ~~~~~ Redux state ~~~~~

  // ~~~~~ Hooks ~~~~~

  // ~~~~~ Cmp state ~~~~~
  const { query } = useRouter();
  const [bones, setBones] = useState<IBone[]>([]);

  const [searchText, setSearchText] = useState("");
  const [isBonesLoading, setIsBonesLoading] = useState(false);

  // ~~~~~ Refs ~~~~~

  // ~~~~~ Effects ~~~~~
  useEffect(() => {
    query.body_part && handleGetBones(query.body_part as string, searchText);

    return () => {
      setBones([]);
    };
  }, [query.body_part, searchText]);

  // ~~~~~ Handlers ~~~~~
  const handleGetBones = (bodyPart: string, name: string = "") => {
    (async () => {
      setIsBonesLoading(true);
      try {
        const result = (await API.graphql(
          graphqlOperation(listBones, {
            filter: {
              bodyPart: { eq: kebabCaseToCapitalize(bodyPart) },
              name: { contains: name },
            },
          })
        )) as { data: { listBones: { items: IBone[] } } };

        setBones(result.data.listBones.items);
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        setIsBonesLoading(false);
      }
    })();
  };

  return (
    <UserLayout>
      <Box mt={5}>
        <Typography variant="h1" color="text.secondary" textAlign={"center"}>
          {kebabCaseToCapitalize(query.body_part as string)} bones
        </Typography>
      </Box>

      <Box mt={5} maxWidth={300}>
        <TextField
          fullWidth
          placeholder="Search bones..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            endAdornment: !!searchText.length && (
              <ClearIcon onClick={(_) => setSearchText("")} cursor="pointer" />
            ),
          }}
        />
      </Box>
      {isBonesLoading && <LoadingSpinner />}
      {!isBonesLoading && (
        <Box mt={3} display="flex" gap={2}>
          {bones.map((bone, idx) => (
            <MuiLink
              component={Link}
              key={idx}
              href={`/bones/${query.body_part}/${bone.id}`}
              underline="none"
              color={"text.secondary"}
              title={bone.name}
            >
              <Box
                sx={{
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                  py: 1,
                  width: 150,
                  height: 150,
                  borderRadius: 4,
                }}
              >
                <Typography
                  textAlign={"center"}
                  sx={{ textDecoration: "none" }}
                >
                  {bone.name.substring(0, 10)}
                  {bone.name.length >= 10 && "..."}
                </Typography>
                <Image
                  width={84}
                  height={84}
                  src={bone.image}
                  alt={bone.name}
                />
              </Box>
            </MuiLink>
          ))}
        </Box>
      )}
      {!bones.length && !isBonesLoading && (
        <Typography color="text.secondary" variant="h3">
          No data
        </Typography>
      )}
    </UserLayout>
  );
};

export default BodyPart;
