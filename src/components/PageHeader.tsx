import classNames from "classnames";
import UggButton from "./champions/UggButton";

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
          "mb-2 text-center font-header  text-5xl font-medium lg:hidden",
          {
            "cursor-pointer": hasModal,
          }
        )}
        onClick={() => hasModal && setModalOpen(true)}
      >
        {name}
      </h2>

      <div className="mb-4 flex w-full flex-col items-center lg:flex-row lg:items-start ">
        <div
          className={classNames("h-[256px] w-[256px] flex-shrink-0 lg:mr-4", {
            "cursor-pointer": hasModal,
          })}
          onClick={() => hasModal && setModalOpen(true)}
        >
          <img
            src={`/images/${type}s/${
              type === "champion" ? "tiles/" : ""
            }256/${id}.webp`}
            style={{
              width: "256px",
              height: "256px",
              minHeight: "256px",
              minWidth: "256px",
            }}
            alt="Image"
          />
        </div>

        <div className="flex w-full flex-col">
          <div className="flex items-end justify-between">
            <h2
              className={classNames(
                "hidden font-header text-5xl font-medium lg:block",
                {
                  "cursor-pointer": hasModal,
                }
              )}
              onClick={() => hasModal && setModalOpen(true)}
            >
              {name}
            </h2>
            {type === "champion" && <UggButton name={name} />}
          </div>

          <p
            className={classNames(
              `mb-3 max-h-[50px] cursor-pointer overflow-hidden overflow-ellipsis text-left font-header text-gray-600 dark:text-gray-400`,
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
