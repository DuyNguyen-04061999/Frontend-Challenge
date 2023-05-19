import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const UploadImage = forwardRef(({ children }, ref) => {
  const [imagePreviewLink, setImagePreviewLink] = useState();
  const fileRef = useRef();

  const onPreview = () => {
    if (fileRef.current?.files?.length > 0) {
      const file = fileRef.current?.files[0]; //this is an object not array
      const reader = new FileReader();
      reader.onload = (event) => {
        fileRef.current.src = event.target.result;
        setImagePreviewLink(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => setImagePreviewLink();

  useEffect(() => {
    //====
    return () => removeImage();
  }, []);

  const trigger = () => {
    fileRef.current.click();
  };

  useImperativeHandle(ref, () => imagePreviewLink, [imagePreviewLink]);
  return (
    <>
      <input
        accept="image/*"
        type="file"
        hidden
        ref={fileRef}
        onChange={onPreview} //first step
      />
      {children(imagePreviewLink, trigger)}
    </>
  );
});

export default UploadImage;
