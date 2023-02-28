import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const UploadImage = forwardRef(({ children }, ref) => {
  const [imagePreview, setImagePreview] = useState();
  const fileRef = useRef();

  const onPreview = () => {
    if (fileRef.current?.files?.length > 0) {
      const file = fileRef.current?.files[0];
      const previewLink = file && URL.createObjectURL(file);
      setImagePreview(previewLink);
    }
  };
  
  const removeImage = () => setImagePreview();

  useEffect(() => {
    //====
    return () => removeImage();
  }, []);

  const trigger = () => {
    fileRef.current.click();
  };

  useImperativeHandle(ref, () => fileRef.current.files[0], [imagePreview]);
  return (
    <>
      <input
        accept="image/*"
        type="file"
        hidden
        ref={fileRef}
        onChange={onPreview}
      />
      {children(imagePreview, trigger)}
    </>
  );
});

export default UploadImage;
