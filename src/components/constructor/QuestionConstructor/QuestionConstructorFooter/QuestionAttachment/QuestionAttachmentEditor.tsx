import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useRef,
  useState,
} from "react";
import styles from "../../QuestionConstructor.module.scss";
import { uploadIcon, trashCanIcon } from "../../../../../assets/";
import {
  deleteQuestionAttachment,
  uploadQuestionAttachment,
} from "../../../../../store/reducer/quizConstructor/quizThunks";
import { useAppDispatch } from "../../../../../hooks/redux";
import { IconButton } from "../../../../../UI/buttonElement";
import { cutQuestionAttachmentName } from "../../../../../utils/questionUtils";

interface PropsTypes {
  attachmentName: string | undefined;
  setAttachmentName: Dispatch<SetStateAction<string | undefined>>;
  quizId: string;
  questionId: string;
  isFileUploaded: boolean;
}

export const QuestionAttachmentEditor: FC<PropsTypes> = ({
  attachmentName,
  setAttachmentName,
  quizId,
  questionId,
  isFileUploaded,
}) => {
  const dispatch = useAppDispatch();
  const inputFile = useRef<HTMLInputElement>(null);
  const [isFileUploading, setIsFileUploading] = useState(false);

  const onFileChanges = async () => {
    if (inputFile.current === null || inputFile.current.files === null) return;
    const file = inputFile?.current.files[0];
    setAttachmentName(cutQuestionAttachmentName(file.name));
    const encodedFileName = encodeURIComponent(file.name);
    const formData = new FormData();
    formData.append("file", file, encodedFileName);
    setIsFileUploading(true);
    dispatch(uploadQuestionAttachment({ quizId, questionId, formData }));
    setIsFileUploading(false);
  };

  const removeAttachment = () => {
    dispatch(deleteQuestionAttachment({ quizId, questionId }));
  };

  const openFileInput = () => {
    if (inputFile.current !== null) inputFile.current.click();
  };

  return (
    <div className={styles.parameterContainer}>
      <input hidden ref={inputFile} onChange={onFileChanges} type="file" />
      {isFileUploaded && !isFileUploading ? (
        <IconButton
          onClick={removeAttachment}
          icon={trashCanIcon}
          alt="remove file"
          hoverColor="red"
          width={40}
          height={40}
        />
      ) : (
        <IconButton
          onClick={openFileInput}
          icon={uploadIcon}
          alt="Upload file"
          hoverColor="yellow"
          width={40}
          height={40}
        />
      )}
      <span className={styles.description} onClick={onFileChanges}>
        {attachmentName && !isFileUploading
          ? cutQuestionAttachmentName(attachmentName)
          : null}
        {!attachmentName && !isFileUploading ? "Upload your file here" : null}
        {isFileUploading ? "uploading..." : null}
      </span>
    </div>
  );
};
