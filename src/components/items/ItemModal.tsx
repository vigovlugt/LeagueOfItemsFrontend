import { Dialog } from "@headlessui/react";
import { useRef } from "react";
import { XIcon } from "@heroicons/react/solid";

export default function ItemModal({ setIsOpen, isOpen, item }) {
  const cancelButtonRef = useRef();

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={"fixed z-20 inset-0 overflow-y-auto"}
      initialFocus={cancelButtonRef}
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-90" />

        <div className="z-30 p-4 mx-auto text-white bg-black w-[512px] h-[512px] flex flex-col justify-between relative">
          <img
            src={`/images/items/512/${item.id}.webp`}
            style={{
              width: "512px",
              height: "512px",
              minHeight: "512px",
              minWidth: "512px",
            }}
            className="absolute inset-0"
            alt="Item image"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.533) 0%, rgba(255, 255, 255, 0) 50%)`,
            }}
          />
          <div className="flex justify-end z-40">
            <button
              ref={cancelButtonRef}
              className="-m-4 p-4 focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="z-40">
            <Dialog.Title className="text-5xl font-header font-medium">
              {item.name}
            </Dialog.Title>
            <Dialog.Description className="text-md tracking-wide font-header text-gray-100">
              {item.plaintext}
            </Dialog.Description>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
