import { Dialog } from "@headlessui/react";
import { useRef } from "react";
import { XIcon } from "@heroicons/react/solid";

export default function ChampionModal({ setIsOpen, isOpen, champion }) {
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

                <div
                    className="z-30 mx-auto flex h-[717px] w-[1215px] flex-col justify-between bg-black p-4 text-white"
                    style={{
                        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.533) 0%, rgba(255, 255, 255, 0) 50%),
            url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.riotId}_0.jpg)`,
                        backgroundPosition: "center",
                    }}
                >
                    <div className="flex justify-end">
                        <button
                            ref={cancelButtonRef}
                            className="-m-4 p-4 focus:outline-none"
                            onClick={() => setIsOpen(false)}
                        >
                            <XIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <div>
                        <Dialog.Title className="font-header text-5xl font-medium">
                            {champion.name}
                        </Dialog.Title>
                        <Dialog.Description className="text-md font-header tracking-wide text-gray-100">
                            {champion.lore}
                        </Dialog.Description>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
