import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  FilledInput,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import CloseIcon from "@mui/icons-material/Close";

const CreateItem = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // change title
  useEffect(() => {
    document.title = "Create Product | ARTIMART";
  });

  const initialValues = {
    category: "default",
    price: 0.0,
    itemName: "",
    smallDescription: "",
    longDescription: "",
    images: "",
  };

  const itemSchema = yup.object().shape({
    category: yup.string().required("Category field cannot be empty. "),
    price: yup.number().min(0).required("Price field cannot be empty."),
    itemName: yup.string().required("Product name field cannot be empty."),
    smallDescription: yup
      .string()
      .required("Small description field cannot be empty."),
    longDescription: yup
      .string()
      .required("Long description field cannot be empty."),
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    console.log(selectedFilesArray.length);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  };

  const handleFormSubmit = (values) => {
    console.log(values);
    console.log(selectedImages);
  };

  return (
    <Box m="20px">
      <Box ml="-20px">
        <Header title="Create Product" subtitle="Add a new product" />
      </Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={itemSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            >
              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  gridColumn: "span 1",
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <FormControl sx={{ gridColumn: "span 2" }}>
                  <InputLabel id="category-select" sx={{ lineHeight: 4.5 }}>
                    Category
                  </InputLabel>
                  <Select
                    labelId="category-select"
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category}
                    name="category"
                    error={!!touched.category && !!errors.category}
                    helperText={touched.category && errors.category}
                  >
                    <MenuItem value="default" label="Please select a category">
                      Please select a category
                    </MenuItem>
                    <MenuItem value="decor" label="Home Decor">
                      Home Decor
                    </MenuItem>
                    <MenuItem value="jewelry" label="Jewelry and Accessories">
                      Jewelry and Accessories
                    </MenuItem>
                    <MenuItem value="fashion" label="Fashion and Apparel">
                      Fashion and Apparel
                    </MenuItem>
                    <MenuItem value="gifts" label="Gifts and Souvenirs">
                      Gifts and Souvenirs
                    </MenuItem>
                    <MenuItem
                      value="stationery"
                      label="Stationery and Paper Goods"
                    >
                      Stationery and Paper Goods
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ gridColumn: "span 2" }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-price">
                    Price
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-price"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.price}
                    name="price"
                    error={!!touched.price && !!errors.price}
                    helperText={touched.price && errors.price}
                    startAdornment={
                      <InputAdornment position="start">LKR</InputAdornment>
                    }
                  />
                </FormControl>

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Product Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.itemName}
                  name="itemName"
                  error={!!touched.itemName && !!errors.itemName}
                  helperText={touched.itemName && errors.itemName}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Product Description"
                  multiline
                  rows={8}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.smallDescription}
                  name="smallDescription"
                  error={
                    !!touched.smallDescription && !!errors.smallDescription
                  }
                  helperText={
                    touched.smallDescription && errors.smallDescription
                  }
                  sx={{ gridColumn: "span 4" }}
                />

                <FormControl sx={{ gridColumn: "span 2" }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-quantity">
                    Quantity
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-quantity"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantity}
                    name="quantity"
                    error={!!touched.quantity && !!errors.quantity}
                    helperText={touched.quantity && errors.quantity}
                    startAdornment={
                      <InputAdornment position="start">PCS</InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl sx={{ gridColumn: "span 2" }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-dimension">
                    Dimension (Size)
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-dimension"
                    type="string"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.dimension}
                    name="dimension"
                    error={!!touched.dimension && !!errors.dimension}
                    helperText={touched.dimension && errors.dimension}
                    startAdornment={
                      <InputAdornment position="start">IN</InputAdornment>
                    }
                  />
                </FormControl>

              </Box>

              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                sx={{
                  gridColumn: "span 1",
                  gridRow: "span 4",
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <Box sx={{}}>
                  <label className="img-upload-label">
                    Add Images
                    <br />
                    <span id="image-validation">Add upto 6 images</span>
                    <input
                      type="file"
                      name="images"
                      value={values.images}
                      onChange={onSelectFile}
                      multiple
                      accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                    />
                  </label>
                  <br />

                  {/* {selectedImages.length > 6 && (
                    <p className="error">Maximum Image Limit Reached</p>
                  )} */}

                  <Box
                    display="grid"
                    gap="10px"
                    gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                    className="images"
                  >
                    {selectedImages &&
                      selectedImages.slice(0, 6).map((image) => {
                        return (
                          <Box key={image} className="image-container">
                            <IconButton
                              className="remove-btn"
                              sx={{ position: "absolute" }}
                              color="primary"
                              variant="filled"
                              onClick={() =>
                                setSelectedImages(
                                  selectedImages.filter((e) => e !== image)
                                )
                              }
                            >
                              <CloseIcon />
                            </IconButton>
                            <Box
                              className="image"
                              sx={{
                                gridColumn: "span 1",
                                border: "1px solid grey",
                                borderRadius: "15px",
                              }}
                            >
                              <img src={image} alt="image" />
                            </Box>
                          </Box>
                        );
                      })}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Product
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateItem;