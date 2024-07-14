import Card from "../../../components/Card";
import { MdOutlineFileUpload } from "react-icons/md";
import Button from "../../../components/ui/Button";
import React, { useRef, useState } from "react";
import ImageWidget from "./ImageWidget";


const Diagnostic = () => {
  const TestImagesURLs = [
    'src\\assets\\img\\apple_black_rote.jpg',
    'src\\assets\\img\\corn_leaf_healthy.jpg',
    'src\\assets\\img\\tomato_late_blioght.jpg'
  ]
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileURL, setFileURL] = useState<string>();

  const triggerFileInput = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files) {
      setFileURL(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <>
      <div
        className="flex flex-wrap items-center
            justify-center gap-10 w-full xl:mx-[200px]"
      >
        <div>
          <Card
            className="bg-[#9c9797] w-[450px]
                flex flex-col items-center gap-5 justify-between
                max-h-[530px] card"
          >
            <div className="text-center px-5">
              <h2 className="font-bold text-3xl py-2">
                Plant Disease Detector
              </h2>
              <p
                className="text-lg text-gray-800y"
              >
                Simply upload a photo of your plant and let our AI do the job
              </p>
            </div>
            <div
              className="bg-gray-50 hover:bg-[#ededed] w-[200px] rounded-2xl
                    h-[200px] flex flex-col items-center justify-center cursor-pointer
                    overflow-hidden shadow-md relative"
              onClick={triggerFileInput}
            >
              {fileURL ? (
                <>
                  <img src={fileURL} className="object-cover h-full w-full" />
                  <div
                    className="absolute opacity-0 flex flex-col items-center
                            bg-gray-50 h-full w-full justify-center bg-opacity-0
                            hover:bg-opacity-30 hover:opacity-100 font-bold "
                  >
                    <MdOutlineFileUpload size={36} />
                    <p>Change file</p>
                  </div>
                </>
              ) : (
                <>
                  <MdOutlineFileUpload size={36} />
                  <p className="font-bold">Upload your file</p>
                </>
              )}
            </div>
            <Button
              className="w-[250px]"
              type="button"
              priority="success"
              text={"Diagnostic"}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleChange}
              hidden
            />
            <div
              className="text-center"
            >
              <p
                className="text-sm"
              >No picture on hand? Try with one of these</p>
              <div
                className="flex justify-center gap-2 pt-4"
              >
                {TestImagesURLs.map((imageURL, index) => (
                  <ImageWidget 
                    key={index}
                    imgURL={imageURL}
                    setFileURL={setFileURL}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Diagnostic;
