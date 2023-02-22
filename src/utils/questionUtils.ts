export const cutQuestionAttachmentName = (attachmentName: string | undefined) => {
  if (!attachmentName) return attachmentName;
  if (attachmentName.length > 10) {
    const fileExtension = attachmentName.split('.').pop();
    return `${attachmentName.slice(0, 4)}...${attachmentName.slice(8, 12)}.${fileExtension}`
  }
  return attachmentName;
}
