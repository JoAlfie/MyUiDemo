// const usableFileTypes = ["image/png", "image/jpeg", "image/gif"];
export const DocumentFileTypes = {
   pdf: "application/pdf",
   jpeg: "image/jpeg",
   jpg: "image/jpeg", // https://stackoverflow.com/questions/33692835/is-the-mime-type-image-jpg-the-same-as-image-jpeg
   gif: "image/gif",
   png: "image/png",
} as const;
