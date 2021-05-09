import Image from "next/image";
import classNames from "classnames";

export default function PageHeader({
  id,
  type,
  name,
  description,
  children,
  setModalOpen = null,
  hasModal = false,
}) {
  return (
    <>
      <h2
        className={classNames(
          "text-5xl font-header font-medium  lg:hidden text-center mb-2",
          {
            "cursor-pointer": hasModal,
          }
        )}
        onClick={() => hasModal && setModalOpen(true)}
      >
        {name}
      </h2>

      <div className="flex mb-4 w-full flex-col items-center lg:items-start lg:flex-row ">
        <div
          className={classNames("w-[256px] h-[256px] lg:mr-4 flex-shrink-0", {
            "cursor-pointer": hasModal,
          })}
          onClick={() => hasModal && setModalOpen(true)}
        >
          <Image
            src={`/images/${type}s/${
              type === "champion" ? "tiles/" : ""
            }${id}.${type === "champion" ? "jpg" : "png"}`}
            width={256}
            height={256}
            quality={100}
          />
        </div>

        <div className="flex flex-col w-full">
          <h2
            className={classNames(
              "text-5xl font-header font-medium hidden lg:block",
              {
                "cursor-pointer": hasModal,
              }
            )}
            onClick={() => hasModal && setModalOpen(true)}
          >
            {name}
          </h2>
          <p
            className={classNames(
              `text-lg font-header mb-4 text-center lg:text-left lg:overflow-ellipsis lg:overflow-hidden lg:max-h-[56px] cursor-pointer text-gray-600 dark:text-gray-400`,
              {
                "cursor-pointer": hasModal,
              }
            )}
            onClick={() => hasModal && setModalOpen(true)}
          >
            {description}
          </p>
          {children}
        </div>
      </div>
    </>
  );
}
