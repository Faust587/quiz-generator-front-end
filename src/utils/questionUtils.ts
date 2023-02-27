export const cutQuestionAttachmentName = (attachmentName: string | undefined): string => {
  if (!attachmentName) return 'file';
  if (attachmentName.length > 10) {
    const fileExtension = attachmentName.split('.').pop();
    const shortAttachmentName = `${attachmentName.slice(0, 4)}...${attachmentName.slice(8, 12)}`;
    return `${shortAttachmentName}.${fileExtension !== undefined ? fileExtension : ''}`;
  }
  return attachmentName;
};
