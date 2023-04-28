import * as Yup from "yup";
import { Formik, Form } from "formik";
import { ICategory, ISubCategory } from "../../models";
import { useContext, useState } from "react";
import { CategoriesContext } from "../../context/Web/CategoriesContext";
import { SecondaryButton } from "../Button";
import {
  InputImageField,
  InputTextField,
  TextAreaField,
} from "./Input";
import { TypeButton } from "../Button/SecondaryButton";
import { WebContext } from "../../context/Web/WebContext";
import { uploadTempFile } from "../../services/firebase/ImageController";
import { v4 } from "uuid";

export default function SubCategoryForm({ category, onClose }: { category: ICategory, onClose: () => void }) {

  const { newSubCategory } = useContext(CategoriesContext);
  const [urlsReady, setUrlsReady] = useState(false)
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
      .required("Titulo para  sub categoria requerido")
      .max(20),
    description: Yup.string()
      .required("Descripcion para sub categpria requerida")
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
      validationSchema={subCategorySchema}
      onSubmit={(values, { resetForm }) => {
        const subCategory: ISubCategory = {
          id: v4(),
          title: values.title,
          description: values.description,
          image: urls[0] || '',
          products: [],
          categoryId: category.id || "",
        };
        resetForm();
        newSubCategory(subCategory);
        onClose()
      }}
    >
      {({isSubmitting}) => (
        <Form className="category-form">
          <InputTextField name="title" label="Nombre de la subcategoria" />
          <TextAreaField
            name="description"
            label="Descripción de la subcategoría"
          />
          <InputImageField name="image" label="" multiple={false} getUrls={getUrls} />
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
