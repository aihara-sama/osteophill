import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { API, graphqlOperation, Storage } from "aws-amplify";
import LoadingSpinner from "components/common/LoadingSpinner";
import { AdminLayout } from "components/layouts/AdminLayout";
import { FormikProvider, useFormik } from "formik";
import { createBone } from "graphql/mutations";
import { ChangeEventHandler, FunctionComponent, useState } from "react";
import { toast } from "react-hot-toast";
import { CreateBoneInput } from "types/API";
import { BoneCategory } from "types/bone";
import getErrorProps from "utils/getErrorProps";
import * as Yup from "yup";

interface IProps {}

const initialCreateBoneFormikState = {
  name: "",
  image: "",
  category: BoneCategory.FLAT_BONE,
};

const CreateBone: FunctionComponent<IProps> = () => {
  // ~~~~~ Redux state ~~~~~

  // ~~~~~ Hooks ~~~~~
  const createBoneFormik = useFormik<CreateBoneInput>({
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please enter a bone name"),
      category: Yup.string().required("Please select a bone category"),
      image: Yup.string().required("Please select a bone image"),
    }),
    initialValues: { ...initialCreateBoneFormikState },
    onSubmit(values) {
      createBoneFormik.setFieldTouched("image", true);
      setIsBoneCreating(true);

      (async () => {
        try {
          await API.graphql(
            graphqlOperation(createBone, {
              input: values,
            })
          );
          clearForm();
          toast.success("Bone created successfully");
        } catch (error: any) {
          toast.error(error.toString());
        } finally {
          setIsBoneCreating(false);
        }
      })();
    },
  });

  // ~~~~~ Cmp state ~~~~~
  const [isBoneImageUploading, setIsBoneImageUploading] = useState(false);
  const [boneImageName, setBoneImageName] = useState("");
  const [isBoneCreating, setIsBoneCreating] = useState(false);

  // ~~~~~ Refs ~~~~~

  // ~~~~~ Effects ~~~~~

  // ~~~~~ Handlers ~~~~~
  const handlUploadBoneImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const fileList = e.target.files;
    if (fileList) {
      const file = fileList[0];
      if (file) {
        (async () => {
          setBoneImageName(file.name);
          setIsBoneImageUploading(true);
          try {
            const { key } = await Storage.put(file.name, file);
            createBoneFormik.setFieldValue(
              "image",
              `${process.env.AWS_BUCKET}/public/${key}`
            );
          } catch (error: any) {
            toast.error(error.toString());
          } finally {
            setIsBoneImageUploading(false);
          }
        })();
      }
    }
  };

  const clearForm = () => {
    setBoneImageName("");
    createBoneFormik.setFieldValue(
      "category",
      initialCreateBoneFormikState.category
    );
    createBoneFormik.setFieldValue("name", initialCreateBoneFormikState.name);
    createBoneFormik.setFieldValue("image", initialCreateBoneFormikState.image);
    createBoneFormik.setFieldTouched("image", false);
    createBoneFormik.setFieldTouched("name", false);
    createBoneFormik.setFieldTouched("category", false);
  };

  // ~~~~~~~~~~ Vars ~~~~~~~~~~~

  return (
    <FormikProvider value={createBoneFormik}>
      <AdminLayout>
        <Box mt={4} maxWidth={400}>
          <Typography variant="h2">Create Bone</Typography>
          <TextField
            {...createBoneFormik.getFieldProps("name")}
            {...getErrorProps(createBoneFormik, "name")}
            fullWidth
            label="Bone name"
            size="small"
            sx={{
              mt: 2,
            }}
            InputProps={{
              endAdornment: !!createBoneFormik.values.name.length && (
                <ClearIcon
                  cursor={"pointer"}
                  onClick={(_) => createBoneFormik.setFieldValue("name", "")}
                />
              ),
            }}
          />
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel>Bone category</InputLabel>
            <Select
              size="small"
              name="category"
              value={createBoneFormik.values.category}
              label="Bone category"
              onChange={(e) => {
                createBoneFormik.setFieldValue("category", e.target.value);
              }}
            >
              {Object.values(BoneCategory).map((val, idx) => (
                <MenuItem value={val} key={idx}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box>
            <Box
              mt={2}
              component={"label"}
              height={45}
              display="flex"
              justifyContent={"center"}
              alignItems="center"
              sx={{
                cursor: "pointer",
                border: (theme) =>
                  `1px solid ${
                    createBoneFormik.touched["image"] &&
                    createBoneFormik.errors.image
                      ? theme.palette.error.main
                      : theme.palette.divider
                  }`,
                borderRadius: 1.2,
                "& > input": {
                  display: "none",
                },
              }}
            >
              <Box>
                {isBoneImageUploading && (
                  <LoadingSpinner height={32} width={32} />
                )}
                <Typography
                  {...(createBoneFormik.touched["image"] &&
                    createBoneFormik.errors.image && { color: "error" })}
                >
                  {!isBoneImageUploading &&
                    (`${boneImageName.substring(0, 30)}${
                      boneImageName.length >= 30 ? "..." : ""
                    }` ||
                      "Select image")}
                </Typography>
              </Box>
              <input type={"file"} onChange={handlUploadBoneImage} />
            </Box>
            {createBoneFormik.touched["image"] &&
              createBoneFormik.errors.image && (
                <Typography fontSize={"small"} color="error">
                  {createBoneFormik.errors.image}
                </Typography>
              )}
          </Box>
          <Box mt={2}>
            <Button
              sx={{
                py: 1,
                fontSize: 16,
              }}
              fullWidth
              onClick={createBoneFormik.submitForm}
            >
              {isBoneCreating && <LoadingSpinner height={28} width={28} />}
              {!isBoneCreating && "Create bone"}
            </Button>
          </Box>
        </Box>
      </AdminLayout>
    </FormikProvider>
  );
};

export default CreateBone;
