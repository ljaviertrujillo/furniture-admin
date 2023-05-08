import "./forms.scss";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputImageField, InputTextField, TextAreaField } from "./Input";
import { SecondaryButton } from "../Button";
import { TypeButton } from "../Button/SecondaryButton";
import { useContext, useState } from "react";
import { ProjectContext } from "../../context/Web/ProjectsContext";
import { uploadTempFile } from "../../services/firebase/ImageController";
import { Project } from "../../models";
import { validateID } from "../../utilities";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";

export default function ProjectForm({ onClose }: { onClose: () => void }) {
  const { newProject } = useContext(ProjectContext);
  const [urls, setUrls] = useState<string[]>([]);
  const [urlsReady, setUrlsReady] = useState(false);
  const projects = useSelector((state: AppStore) => state.project.data);

  const initialValues: Project = {
    id: "",
    title: "",
    description: "",
    images: [],
    client: {
      id: "",
      name: "",
      address: "",
      phoneNumber: "",
      logo: "",
      isNew: true,
      isUpdated: false,
    },
    isNew: true,
    isUpdated: false,
  };

  const projectSchema = Yup.object().shape({
    title: Yup.string()
      .required("Campo requerido")
      .min(8, "Debe contener un mínimo 8 caracteres")
      .max(50, "Debe contener un máximo de 50 caracteres"),
    description: Yup.string()
      .required("Campo requerido")
      .min(8, "Debe contener un mínimo 8 caracteres")
      .max(128, "Debe contener un máximo de 128 caracteres"),
    images: Yup.array().of(Yup.string().url()),
  });

  const getUrls = async (files: File[]) => {
    const urls = await uploadTempFile(files);
    setUrls(urls);
    setUrlsReady(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={projectSchema}
      onSubmit={(values, { resetForm }) => {
        const project: Project = {
          id: validateID<Project>({ items: projects }),
          title: values.title,
          description: values.description,
          images: urls || [],
          isNew: true,
          isUpdated: false,
          client: {
            id: "",
            name: "",
            address: "",
            phoneNumber: "",
            logo: "",
            isNew: true,
            isUpdated: false,
          },
        };
        resetForm();
        newProject(project);
        onClose();
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form className="category-form">
          <InputTextField
            name="title"
            label="Nombre del proyecto"
            error={!!errors.title}
          />
          <ErrorMessage
            name="title"
            render={(msg) => <div className="error">{msg}</div>}
          />
          <TextAreaField
            name="description"
            label="Descripcion del proyecto"
            error={!!errors.description}
          />
          <ErrorMessage
            name="description"
            render={(msg) => <div className="error">{msg}</div>}
          />
          <InputImageField
            name="images"
            label=""
            multiple={true}
            getUrls={getUrls}
          />
          <SecondaryButton
            typeButton={TypeButton.SUBMIT}
            title="Agregar proyecto"
            disabled={!urlsReady || isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
}
