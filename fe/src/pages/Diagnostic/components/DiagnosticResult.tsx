import { FaCircleXmark } from "react-icons/fa6";
import Card from "../../../components/Card";
import Button from "../../../components/ui/Button";
import Modal, { ModalBody } from "../../../components/ui/modal/Modal";
import React, { useState } from "react";

const CureItem: React.FC<{title: string, description: string}> = ({
    title, description
}) => {
    return <>
        <div
            className="relative"
        >
            <div className="point bg-gray-800 w-3 h-3
                absolute -left-[23px] top-[9px] rounded-full"></div>
            <h4
                className="text-lg font-bold"
            >{title}</h4>
            <p
                className="text-sm"
            >
                {description}
            </p>
        </div>
    </>
}

const DiagnosticResult = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  

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
            <div className="text-center px-5 relative">
              <img
                className="absolute w-72 h-60 rounded-xl
                -top-32 left-1/2 -translate-x-1/2 shadow-md
                object-cover"
                src="src\\assets\\img\\apple_black_rote.jpg"
              />
              <h2 className="font-bold text-3xl py-2 pt-32">
                Apple Black Rote
              </h2>
              <FaCircleXmark color="#DA2323" className="mx-auto" size={32} />
              <p className="text-lg text-gray-800">
                 Black rot is occasionally a problem on Minnesota apple trees.
                This fungal disease causes leaf spot, fruit rot and cankers on
                branches.
              </p>
            </div>

            <Button
              className="w-[250px]"
              type="button"
              priority="success"
              text={"Explore Cures"}
              action={() => setToggle(true)}
            />
          </Card>
        </div>
      </div>
      <Modal
       className="w-3/4 md:w-2/3 lg:w-2/4 xl:w-1/3"
       isVisible={toggle} 
       setIsVisible={setToggle}
       >
        <ModalBody className="relative overflow-hidden">
          <div className="
            absolute w-[1px] h-full bg-gray-900
            rounded-md left-5 my-2
          "></div>
          <div className="pl-8 py-2 flex flex-col gap-3">
            <div
                className="overflow-y-auto max-h-[500px]"
            >
                <CureItem 
                    title="Copper Fungicide"
                    description="Copper fungicide is commonly used to control fungal diseases in
                    plants. It is effective against a wide range of fungi and is often
                    used on fruit trees, vegetables, and ornamental plants."
                />

            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DiagnosticResult;
