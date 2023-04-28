import "./forms.scss";
import { ICategory } from "../../models";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { InputImageField, InputTextField, TextAreaField } from "./Input";
import { SecondaryButton } from "../Button";
import { TypeButton } from "../Button/SecondaryButton";
import { useContext, useState } from "react";
import { CategoriesContext } from "../../context/Web/CategoriesContext";
import { v4 } from "uuid";
import { uploadTempFile } from "../../services/firebase/ImageController";

export default function CategoryForm({ onClose }: { onClose: () => void }) {
  const [urlsReady, setUrlsReady] = useState(false)
  const { newCategory } = useContext(CategoriesContext);
  const [urls, setUrls] = useState<string[]>([]);

  const initialValues: ICategory = {
    id: "",
    title: "",
    description: "",
    image: "",
    subCategories: [],
    url: "",
  };

  const categorySchema = Yup.object().shape({
    title: Yup.string()
      .required("Titulo requerido")
      .min(8, "Debe tener al menos 8 caracteres")
      .max(30, "No debe tener mas de 30 caracteres")
      .lowercase(),
    description: Yup.string()
      .required("Se requiere una descripcion para la categoria")
      .min(8)
      .max(255),
    image: Yup.string().url(),
  });

  const getUrls =  async (files: File[]) => {
    const urls = await uploadTempFile(files)
    setUrls(urls);
    setUrlsReady(true)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={categorySchema}
      onSubmit={(values, { resetForm }) => {
        const category: ICategory = {
          id: v4(),
          title: values.title,
          description: values.description,
          image: urls[0] || '',
          subCategories: [],
          url: `/categories/${values.title.toLowerCase()}`,
        };
        resetForm();
        newCategory(category);
        onClose()
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="category-form">
          <InputTextField name="title" label="Nombre de la categoria" />
          {errors && touched && <ErrorMessage name="title" className="error" />}
          <TextAreaField
            name="description"
            label="Descripción de la categoría"
          />
          <ErrorMessage name="description" />
          <InputImageField name="image" label="" multiple={false} getUrls={getUrls} />
          <SecondaryButton
            typeButton={TypeButton.SUBMIT}
            title="Agregar Categoria"
            disabled={!urlsReady || isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
}
