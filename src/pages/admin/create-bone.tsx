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
import { API, Storage } from "aws-amplify";
import LoadingSpinner from "components/common/LoadingSpinner";
import { AdminLayout } from "components/layouts/AdminLayout";
import { FormikProvider, useFormik } from "formik";
import { createBone } from "graphql/mutations";
import { ChangeEventHandler, FunctionComponent, useState } from "react";
import { toast } from "react-hot-toast";
import { CreateBoneInput } from "types/API";
import { BoneBodyPart, BoneCategory } from "types/bone";
import getErrorProps from "utils/getErrorProps";
import * as Yup from "yup";

interface IProps {}

const initialCreateBoneFormikState = {
  name: "",
  image: "",
  bodyPart: BoneBodyPart.HEAD,
  category: BoneCategory.FLAT_BONE,
};

const CreateBone: FunctionComponent<IProps> = () => {
  // ~~~~~ Redux state ~~~~~

  // ~~~~~ Hooks ~~~~~
  const createBoneFormik = useFormik<CreateBoneInput>({
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please enter a bone name"),
      category: Yup.string().required("Please select a bone category"),
      bodyPart: Yup.string().required("Please select a body part"),
      image: Yup.string().required("Please select a bone image"),
    }),
    initialValues: { ...initialCreateBoneFormikState },
    onSubmit(values) {
      createBoneFormik.setFieldTouched("image", true);
      setIsBoneCreating(true);

      (async () => {
        try {
          await API.graphql({
            query: createBone,
            variables: {
              input: values,
            },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });
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
              `${process.env.BUCKET}/public/${key}`
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
    createBoneFormik.setFieldValue(
      "bodyPart",
      initialCreateBoneFormikState.bodyPart
    );
    createBoneFormik.setFieldValue("name", initialCreateBoneFormikState.name);
    createBoneFormik.setFieldValue("image", initialCreateBoneFormikState.image);
    createBoneFormik.setFieldTouched("image", false);
    createBoneFormik.setFieldTouched("name", false);
    createBoneFormik.setFieldTouched("category", false);
    createBoneFormik.setFieldTouched("bodyPart", false);
  };

  // ~~~~~~~~~~ Vars ~~~~~~~~~~~

  return (
    <FormikProvider value={createBoneFormik}>
      <AdminLayout>
        <Box mt={4} maxWidth={400}>
          <Typography variant="h2" data-testid={`page-title`}>
            Create bone
          </Typography>
          <TextField
            data-testid={`inp-bone-name`}
            {...createBoneFormik.getFieldProps("name")}
            {...getErrorProps(createBoneFormik, "name")}
            fullWidth
            label="Bone name"
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
            <InputLabel>Body part</InputLabel>
            <Select
              data-testid={`select-body-part`}
              name="category"
              value={createBoneFormik.values.bodyPart}
              label="Body part"
              onChange={(e) => {
                createBoneFormik.setFieldValue("bodyPart", e.target.value);
              }}
            >
              {Object.values(BoneBodyPart).map((val, idx) => (
                <MenuItem
                  data-testid={`menu-item-${val}`}
                  value={val}
                  key={idx}
                >
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 2 }} fullWidth>
            <InputLabel>Bone category</InputLabel>
            <Select
              data-testid={`select-bone-category`}
              name="category"
              value={createBoneFormik.values.category}
              label="Bone category"
              onChange={(e) => {
                createBoneFormik.setFieldValue("category", e.target.value);
              }}
            >
              {Object.values(BoneCategory).map((val, idx) => (
                <MenuItem
                  data-testid={`menu-item-${val}`}
                  value={val}
                  key={idx}
                >
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box data-testid={`bone-image-container`}>
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
              <input
                data-testid={`inp-upload-bone-image`}
                type={"file"}
                onChange={handlUploadBoneImage}
              />
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
              data-testid={`submit-create-bone`}
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
