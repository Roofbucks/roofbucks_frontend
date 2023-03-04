import { DocumentIcon, DownloadIcon, TrashIcon, WarningIcon } from "assets";
import styles from "./styles.module.css";
import { getMegaByte } from "helpers";

interface DocumentProps {
  id: string;
  label?: string;
  file: File | undefined;
  handleChangeDoc: ({ id, e }) => void;
  handleRemoveDoc: ({ id }) => void;
  className?: string;
  uploadedDocClassName?: string;
  error?: string;
}

export const Document: React.FC<DocumentProps> = ({
  id,
  label,
  file,
  handleChangeDoc,
  handleRemoveDoc,
  className,
  error,uploadedDocClassName
}) => {
  return (
    <div className={className}>
      <p className={styles.docName}>{label}</p>
      {!file ? (
        <>
          <label
            className={`${styles.docLabel} ${error ? styles.emptyDoc : ""}`}
            htmlFor={id}
          >
            <DownloadIcon />
            <p>
              Drop your file to upload or <span>Browse</span>
            </p>
            <p className={styles.docNote}>
              Maximum size of image 8MB, PDF, JPG, PNG
            </p>
            <input
              style={{ display: "none" }}
              id={id}
              type={"file"}
              accept=".pdf, .png, .jpg, .jpeg"
              onDrop={(e) => console.log(e, "drop")}
              onChange={(e) => handleChangeDoc({ id, e })}
            />
          </label>
        </>
      ) : (
        <div className={`${styles.uploadedDoc} ${uploadedDocClassName}`}>
          <DocumentIcon className={styles.docIcon} />
          <div className={styles.docInfo}>
            <p>{file.name}</p>
            <p>{getMegaByte(file.size)}MB</p>
          </div>
          <TrashIcon
            onClick={() => handleRemoveDoc({ id })}
            role="button"
            className={styles.docDelete}
          />
        </div>
      )}
      {error && !file && (
        <p className={styles.errorMsg}>
          <WarningIcon /> {error}
        </p>
      )}
    </div>
  );
};
