const MAX_LENGTH = 28;

export const cutQuestionAttachmentName = (
  attachmentName: string | undefined
): string => {
  if (!attachmentName) return "file";
  const attachmentLength = attachmentName.length;
  if (attachmentLength <= MAX_LENGTH) return attachmentName;

  const splitFileName = attachmentName.split(".");
  const fileExtension = splitFileName.pop();
  const fileExtensionLen = !fileExtension ? 0 : fileExtension.length + 1;
  const fileName = splitFileName.join();
  const freeSymbols = MAX_LENGTH - fileExtensionLen - 3;
  const firstPart = `${fileName.slice(0, Math.floor(freeSymbols / 2))}`;
  const secondPart = `${fileName.slice(
    fileName.length - firstPart.length,
    fileName.length
  )}`;
  return `${firstPart}...${secondPart}.${fileExtension}`;
};
