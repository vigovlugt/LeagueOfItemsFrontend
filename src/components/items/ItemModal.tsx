import { Dialog } from "@headlessui/react";
import { useRef } from "react";
import { XIcon } from "@heroicons/react/solid";

export default function ItemModal({ setIsOpen, isOpen, item }) {
    const cancelButtonRef = useRef(undefined);

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className={"fixed inset-0 z-20 overflow-y-auto"}
            initialFocus={cancelButtonRef}
        >
            <div className="flex min-h-screen items-center justify-center">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-90" />

                <div className="relative z-30 mx-auto flex h-[512px] w-[512px] flex-col justify-between bg-black p-4 text-white">
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
                            backgroundPosition: "center",
                        }}
                    />
                    <div className="z-40 flex justify-end">
                        <button
                            ref={cancelButtonRef}
                            className="-m-4 p-4 focus:outline-none"
                            onClick={() => setIsOpen(false)}
                        >
                            <XIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="z-40">
                        <Dialog.Title className="font-header text-5xl font-medium">
                            {item.name}
                        </Dialog.Title>
                        <Dialog.Description className="text-md font-header tracking-wide text-gray-100">
                            {item.plaintext}
                        </Dialog.Description>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
