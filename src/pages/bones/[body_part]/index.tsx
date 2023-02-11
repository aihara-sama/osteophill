import { API } from "@aws-amplify/api";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { UserLayout } from "components/layouts/UserLayout";
import { searchBones } from "graphql/queries";
import throttle from "lodash.throttle";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { IBone } from "types/bone";
import { kebabCaseToCapitalize } from "utils/kebab-case-to-capitalize";

interface IProps {}

const BodyPart: FunctionComponent<IProps> = () => {
  // ~~~~~ Redux state ~~~~~

  // ~~~~~ Hooks ~~~~~
  const theme = useTheme();
  const isSmallDown = useMediaQuery(theme.breakpoints.down("sm"));

  // ~~~~~ Cmp state ~~~~~
  const { query } = useRouter();
  const [bones, setBones] = useState<IBone[]>([]);

  const [searchText, setSearchText] = useState("");
  const [isBonesLoading, setIsBonesLoading] = useState(false);

  // Pagination token
  const nextTokenRef = useRef(null);
  const bodyPartRef = useRef<string | undefined>();

  // ~~~~~ Refs ~~~~~

  // ~~~~~ Effects ~~~~~
  useEffect(() => {
    query.body_part && handleGetBones(query.body_part as string, searchText);
  }, [query.body_part, searchText]);

  // on page change
  useEffect(() => {
    setBones([]);
    nextTokenRef.current = null;
  }, [query.body_part]);

  useEffect(() => {
    const search = throttle(
      () => {
        nextTokenRef.current &&
          handleGetBones(bodyPartRef.current, searchText, nextTokenRef.current);
      },
      1000,
      {
        trailing: false,
      }
    );

    const onScroll = () => {
      const lastBoneDOMEl = document.querySelector('[data-last_bone="true"]');
      if (lastBoneDOMEl) {
        const isLastBoneDOMElInVIewport = isElementInViewport(lastBoneDOMEl);

        if (isLastBoneDOMElInVIewport) search();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    bodyPartRef.current = query.body_part as string;
  }, [query.body_part]);

  // ~~~~~ Handlers ~~~~~
  const handleGetBones = (
    bodyPart: string,
    name: string = "",
    nextToken: string | null = null
  ) => {
    (async () => {
      setIsBonesLoading(true);

      try {
        const result = (await API.graphql({
          query: searchBones,
          variables: {
            limit: 30,
            nextToken,
            filter: {
              bodyPart: { eq: kebabCaseToCapitalize(bodyPart) },
              name: { wildcard: `*${name}*` },
            },
          },
          authMode: "API_KEY",
        })) as { data: { searchBones: { items: IBone[]; nextToken: string } } };

        if (nextToken) {
          setBones((bones) => [...bones, ...result.data.searchBones.items]);
        } else {
          setBones(result.data.searchBones.items);
        }

        nextTokenRef.current = result.data.searchBones.nextToken;
      } catch (error) {
        toast.error("Something went wrong!");
        console.error(error);
      } finally {
        setIsBonesLoading(false);
      }
    })();
  };

  const isElementInViewport = (el: Element) => {
    const rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  return (
    <UserLayout>
      <Box mt={5}>
        <Typography
          data-testid={`page-title`}
          variant="h1"
          color="text.secondary"
          textAlign={"center"}
        >
          {kebabCaseToCapitalize(query.body_part as string)} bones
        </Typography>
      </Box>

      <Box mt={5} maxWidth={isSmallDown ? "100%" : 300}>
        <TextField
          data-testid="search-bones"
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
      <Grid pb={5} mt={3} container spacing={2}>
        {bones.map((bone, idx) => (
          <Grid
            data-testid={`bone-card`}
            data-last_bone={idx === bones.length - 1}
            key={idx}
            item
            xs={12}
            sm={6}
            md={3}
            lg={2}
            xl={2}
          >
            <MuiLink
              data-testid={`bone-link`}
              component={Link}
              href={`/bones/${query.body_part}/${bone.id}`}
              underline="none"
              color={"text.secondary"}
              title={bone.name}
              sx={{
                display: "block",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                  borderRadius: 4,
                  p: 1,
                  height: "100%",
                }}
              >
                <Typography
                  data-testid={`bone-name`}
                  textAlign={"center"}
                  sx={{ textDecoration: "none" }}
                >
                  {bone.name}
                </Typography>
                <Image
                  data-testid={`bone-image`}
                  width={84}
                  height={84}
                  src={bone.image}
                  alt={bone.name}
                />
              </Box>
            </MuiLink>
          </Grid>
        ))}
      </Grid>
      {!bones.length && !isBonesLoading && (
        <Typography data-testid={`no-data`} color="text.secondary" variant="h3">
          No data
        </Typography>
      )}
    </UserLayout>
  );
};

export default BodyPart;
