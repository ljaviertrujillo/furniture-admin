import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { ICategory, ISubCategory } from "../../models";
import { useContext, useState } from "react";
import { CategoriesContext } from "../../context/Web/CategoriesContext";
import { SecondaryButton } from "../Button";
import { InputImageField, InputTextField, TextAreaField } from "./Input";
import { TypeButton } from "../Button/SecondaryButton";
import { uploadTempFile } from "../../services/firebase/ImageController";
import { v4 } from "uuid";

export default function SubCategoryForm({
  category,
  onClose,
}: {
  category: ICategory | null;
  onClose: () => void;
}) {
  const { newSubCategory } = useContext(CategoriesContext);
  const [urlsReady, setUrlsReady] = useState(false);
  const [urls, setUrls] = useState<string[]>([]);
  const initialValues: ISubCategory = {
    id: "",
    title: "",
    description: "",
    image: "",
    products: [],
    categoryId: "",
  };

  const subCategorySchema = Yup.object().shape({
    title: Yup.string()
      .required("Campo requerido")
      .min(4, "Debe contener un mínimo 4 caracteres")
      .max(20, "Debe contener un máximo de 20 caracteres"),
    description: Yup.string()
      .required("Campo requerido")
      .min(8, "Debe contener un mínimo 8 caracteres")
      .max(128, "Debe contener un máximo de 128 caracteres"),
    image: Yup.string().url(),
  });

  const getUrls = async (files: File[]) => {
    const urls = await uploadTempFile(files);
    setUrls(urls);
    setUrlsReady(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={subCategorySchema}
      onSubmit={(values, { resetForm }) => {
        const subCategory: ISubCategory = {
          id: v4(),
          title: values.title,
          description: values.description,
          image: urls[0] || "",
          products: [],
          categoryId: category?.id || "",
        };
        resetForm();
        newSubCategory(subCategory);
        onClose();
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form className="category-form">
          <InputTextField
            name="title"
            label="Nombre de la subcategoria"
            error={!!errors.title}
          />
          <ErrorMessage
            name="title"
            render={(msg) => <div className="error">{msg}</div>}
          />
          <TextAreaField
            name="description"
            label="Descripción de la subcategoría"
            error={!!errors.description}
          />
          <ErrorMessage
            name="description"
            render={(msg) => <div className="error">{msg}</div>}
          />
          <InputImageField
            name="image"
            label=""
            multiple={false}
            getUrls={getUrls}
          />
          <SecondaryButton
            typeButton={TypeButton.SUBMIT}
            title="Agregar SubCategoria"
            disabled={!urlsReady || isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
}
