import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { Product, SubCategory } from "../../models";
import { useContext, useState } from "react";
import {
  InputImageField,
  InputNumberField,
  InputTextField,
  InputType,
  TextAreaField,
} from "./Input";
import { SecondaryButton } from "../Button";
import { TypeButton } from "../Button/SecondaryButton";
import { uploadTempFile } from "../../services/firebase/ImageController";
import { ProductContext } from "../../context/Web/ProductsContext";
import { validateID } from "../../utilities";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";

export default function ProductsForm({
  subCategory,
  onClose,
}: {
  subCategory: SubCategory;
  onClose: () => void;
}) {
  const [urls, setUrls] = useState<string[]>([]);
  const [urlsReady, setUrlsReady] = useState(false);
  const { newProduct } = useContext(ProductContext);
  const products = useSelector((state: AppStore) => state.product.data);

  const initialValues: Product = {
    id: "",
    categoryId: "",
    subCategoryId: "",
    title: "",
    description: "",
    dimensions: {
      depth: 0,
      height: 0,
      width: 0,
    },
    images: [],
    price: 0,
    material: {
      metal: [],
      wood: [],
    },
    isNew: true,
    isUpdated: false,
  };

  const productSchema = Yup.object().shape({
    title: Yup.string()
      .required("Campo requerido")
      .min(4, "Debe contener un mínimo 4 caracteres")
      .max(20, "Debe contener un máximo de 20 caracteres"),
    description: Yup.string()
      .required("Campo requerido")
      .min(8, "Debe contener un mínimo 8 caracteres")
      .max(128, "Debe contener un máximo de 128 caracteres"),
    dimensions: Yup.object().shape({
      height: Yup.number().min(0).max(1000),
      width: Yup.number().min(0).max(1000),
      depth: Yup.number().min(0).max(1000),
    }),
    images: Yup.array().of(Yup.string().url()),
    price: Yup.number().required("Precio requerido").min(0),
  });

  const getUrls = async (files: File[]) => {
    const urls = await uploadTempFile(files);
    setUrls(urls);
    setUrlsReady(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productSchema}
      onSubmit={(values, { resetForm }) => {
        const product: Product = {
          id: validateID<Product>({ items: products }),
          categoryId: subCategory.categoryId,
          subCategoryId: subCategory.id || "",
          title: values.title,
          description: values.description,
          dimensions: {
            height: values.dimensions.height,
            width: values.dimensions.width,
            depth: values.dimensions.depth,
          },
          isNew: true,
          isUpdated: false,
          images: urls || [],
          material: {
            metal: [],
            wood: [],
          },
          price: values.price,
        };
        resetForm();
        newProduct(product);
        onClose();
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form className="product-form">
          <InputTextField
            name="title"
            label="Nombre de tu producto"
            error={!!errors.title}
          />
          <ErrorMessage
            name="title"
            render={(msg) => <div className="error">{msg}</div>}
          />
          <TextAreaField
            name="description"
            label="Descripcion de tu producto"
            error={!!errors.description}
          />
          <ErrorMessage
            name="description"
            render={(msg) => <div className="error">{msg}</div>}
          />
          <div className="dimensions">
            <InputNumberField
              name="dimensions.height"
              label="Alto"
              number={InputType.DIMENSION}
            />
            <InputNumberField
              name="dimensions.width"
              label="Ancho"
              number={InputType.DIMENSION}
            />
            <InputNumberField
              name="dimensions.depth"
              label="Profundidad"
              number={InputType.DIMENSION}
            />
          </div>
          <InputNumberField
            name="price"
            label="Precio"
            number={InputType.PRICE}
          />
          <InputImageField
            name="images"
            label=""
            multiple={true}
            getUrls={getUrls}
          />
          <SecondaryButton
            typeButton={TypeButton.SUBMIT}
            title="Agregar producto"
            disabled={!urlsReady || isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
}
