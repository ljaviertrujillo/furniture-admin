import { useState } from "react";
import "./input.scss";
import { InputProps } from "./models/input.model";
import { classNames } from "../../../utilities";
import { VscFolderOpened } from "react-icons/vsc";
import { Field, FieldProps } from "formik";
import { BsDownload } from "react-icons/bs";

interface ImageFileProps extends InputProps {
  multiple: boolean;
  onChange?: () => void;
  getUrls: (files: File[]) => void
}

export default function InputImageField({
  ...props
}: ImageFileProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState(
    "No hay archivos seleccionados"
  );

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const files = Array.from(event.dataTransfer.files) as File[];
    const thumbnailPromises = files.map((file) => createThumbnail(file));
    Promise.all(thumbnailPromises).then((thumbnails) => {
      setThumbnails(thumbnails as string[]);
      if (files.length === 0) {
        setSelectedFile("No hay archivos seleccionados");
      } else if (files.length > 1) {
        setSelectedFile(`${files.length} archivos seleccionados`);
      } else {
        setSelectedFile(files[0].name);
      }
    });
    props.getUrls(files)
  };

  const handleInputChange = async (event: any) => {
    const files = Array.from(event.target.files) as File[];
    const thumbnailPromises = files.map((file) => createThumbnail(file));
    Promise.all(thumbnailPromises).then((thumbnails) => {
      setThumbnails(thumbnails as string[]);
      if (files.length === 0) {
        setSelectedFile("No hay archivos seleccionados");
      } else if (files.length > 1) {
        setSelectedFile(`${files.length} archivos seleccionados`);
      } else {
        setSelectedFile(files[0].name);
      }
    });
    props.getUrls(files)
  };

  const createThumbnail = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const thumbnail = reader.result;
        resolve(thumbnail);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <Field name={props.name}>
      {({ field }: FieldProps) => (
        <div className="files">
          <div
            className={classNames(
              "dragover",
              thumbnails.length > 0 ? "thumbnail" : ""
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragOver(false)
            }}
            onDrop={handleDrop}
          >
            {thumbnails.length > 0 ? null : (
              <div className="label">
                <BsDownload className="icon" />
                Arrastra y suelta tu{props.multiple ? "s" : null} archivo
                {props.multiple ? "s" : null} aquí.
              </div>
            )}
            {thumbnails.map((thumbnail) => (
              <img key={thumbnail} src={thumbnail} />
            ))}
          </div>
          <label htmlFor={props.name} className="form-floating">
            <span className="button">
              <VscFolderOpened />
              Explorar{" "}
            </span>
            <span className="selected">{selectedFile}</span>
            <input
              type="file"
              className="file-input"
              id={props.name}
              multiple={props.multiple}
              accept=".jpg, .jpeg, .png"
              onChange={handleInputChange}
            />
          </label>
        </div>
      )}
    </Field>
  );
}
