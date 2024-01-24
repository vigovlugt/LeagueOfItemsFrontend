import { ArrowRightIcon } from "@heroicons/react/solid";
import { ComponentProps } from "react";

export function GameBoostRectangleSm({
    className,
    hd = false,
    ...props
}: ComponentProps<"a"> & {
    hd?: boolean;
}) {
    return (
        <a
            href="https://gameboost.com/league-of-legends?ref=leagueofitems"
            target="_blank"
            rel="noreferrer"
            {...props}
            className={
                "rounded-xl ring-1 bg-[hsl(220_20%_9%)] flex flex-col gap-1 p-4 " +
                className
            }
            style={{
                backgroundImage: `linear-gradient(hsl(200, 20%, 9%, 75%), hsl(200, 20%, 9%, 75%)), url(${
                    hd
                        ? "/images/sponsors/gameboost-bg.webp"
                        : "/images/sponsors/gameboost-bg-300.webp"
                })`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center 10%",
                fontFamily: "'Red Hat Display', sans-serif",
            }}
            onClick={(e) => {
                (window as any).gtag(
                    "send",
                    "event",
                    "outbound",
                    "click",
                    e.currentTarget.href,
                    {
                        transport: "beacon",
                    }
                );
            }}
        >
            {/* <img
                className="dark:hidden"
                width={128}
                src="/images/sponsors/gameboost.svg"
                alt="GameBoost logo"
            /> */}
            <img
                width={96}
                src="/images/sponsors/gameboost-dark.svg"
                alt="GameBoost logo"
                className="self-start"
            />

            <span className="text-3xl font-bold tracking-wide text-white my-2 leading-8">
                Reach your{" "}
                <span className="text-[#0c6cfb] text-3xl">dream rank</span>
            </span>

            <span
                className="px-4 py-1.5 bg-[#0c6cfb] text-white rounded-md text-sm font-semibold tracking-wide block mt-1"
                style={{
                    fontFamily: "'Red Hat Display', sans-serif;",
                }}
            >
                Boosting, accounts and more{" "}
                <ArrowRightIcon className="inline-block w-4 h-4 -mt-1" />
            </span>
        </a>
    );
}

export function GameBoostVertical({
    className,
    ...props
}: ComponentProps<"a">) {
    return (
        <a
            href="https://gameboost.com/league-of-legends?ref=leagueofitems"
            target="_blank"
            rel="noreferrer"
            {...props}
            className={
                "rounded-xl ring-1 bg-[hsl(220_20%_9%)] flex flex-col gap-1 p-4 w-[300px] min-w-[300px] " +
                className
            }
            style={{
                backgroundImage: `linear-gradient(hsl(200, 20%, 9%, 75%), hsl(200, 20%, 9%, 75%)), url(/images/sponsors/gameboost-bg.webp)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center 10%",
                fontFamily: "'Red Hat Display', sans-serif",
            }}
            onClick={(e) => {
                (window as any).gtag(
                    "send",
                    "event",
                    "outbound",
                    "click",
                    e.currentTarget.href,
                    {
                        transport: "beacon",
                    }
                );
            }}
        >
            {/* <img
                className="dark:hidden"
                width={128}
                src="/images/sponsors/gameboost.svg"
                alt="GameBoost logo"
            /> */}
            <img
                width={96}
                src="/images/sponsors/gameboost-dark.svg"
                alt="GameBoost logo"
                className="self-start"
            />

            <span className="text-lg font-bold tracking-wide text-white my-3 block leading-tight">
                The fastest way to climb
            </span>

            <span className="flex flex-col items-center my-8">
                <FaRocketLaunch className="w-12 h-12 text-[#749ddc] mb-1" />
                <span className="mb-6">Boosting</span>
                <FaHelmetBattle className="w-12 h-12 text-[#749ddc] mb-1" />
                <span className="mb-6">Accounts</span>
                <FaHandFist className="w-12 h-12 text-[#749ddc] mb-1" />
                <span className="mb-6">Smurfs</span>
                <FaGraduationCap className="w-12 h-12 text-[#749ddc] mb-1" />
                <span>Coaching</span>
            </span>

            <span
                className="px-4 py-1.5 bg-[#0c6cfb] text-white rounded-md text-sm font-semibold tracking-wide block w-min whitespace-nowrap self-center"
                style={{
                    fontFamily: "'Red Hat Display', sans-serif;",
                }}
            >
                Climb now{" "}
                <ArrowRightIcon className="inline-block w-4 h-4 -mt-1" />
            </span>
        </a>
    );
}

export function FaRocketLaunch({ ...props }: ComponentProps<"svg">) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            {...props}
        >
            <path
                d="M51.997 154.5L2.5 253.25C1 256.625 0.125 260.25 0 264C0 277.25 10.749 288 23.999 288H109.316C155.954 208.557 181.467 163.514 196.847 136.545C198.368 133.732 199.618 130.779 201.194 128H94.87C78.496 128 59.247 139.875 51.997 154.5ZM375.521 314.857C348.596 330.252 303.554 355.816 223.988 402.625V488C223.988 501.25 234.737 512 247.986 512C251.736 511.875 255.361 511 258.736 509.5L357.48 460.125C372.105 452.75 383.979 433.625 383.979 417.25V310.537C381.227 312.104 378.306 313.346 375.521 314.857ZM35.623 352.125C9.874 377.875 -3 442.625 0.625 511.375C69.746 515 134.243 502 159.991 476.25C200.239 436 202.864 382.375 166.241 345.75C129.618 309.25 75.996 311.75 35.623 352.125ZM117.369 436.125C108.744 444.625 87.245 449 64.246 447.75C62.997 424.875 67.246 403.25 75.871 394.75C89.37 381.25 107.244 380.375 119.368 392.625C131.618 404.75 130.743 422.625 117.369 436.125Z"
                style={{ opacity: 0.4 }}
                fill="currentColor"
            />
            <path
                d="M505.181 19.662C503.952 13.979 497.908 7.957 492.219 6.752C460.379 0 435.288 0 410.321 0C332.888 0 278.726 31.078 236.975 77.309C209.539 107.686 222.554 95.061 109.285 288H109.38C172.674 288 223.983 339.312 223.983 402.609C416.918 289.111 404.108 302.221 434.499 274.729C480.71 232.93 511.94 178.736 511.94 101.75C512.065 76.641 512.065 51.533 505.181 19.662ZM383.947 168C361.947 168 343.949 150.125 343.949 128S361.947 88 383.947 88C406.071 88 423.945 105.875 423.945 128S406.071 168 383.947 168ZM75.839 394.75C67.215 403.25 62.965 424.875 64.215 447.75C87.213 449 108.712 444.625 117.337 436.125C130.711 422.625 131.586 404.75 119.337 392.625C107.212 380.375 89.338 381.25 75.839 394.75Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function FaHelmetBattle({ ...props }: ComponentProps<"svg">) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            {...props}
        >
            <path
                d="M479.98 210.875C479.98 90.375 287.975 0 287.975 0S95.97 90.375 95.97 210.875C95.97 293.625 73.095 356.75 64.845 391.5C61.469 406 68.47 420.875 81.22 426.75L255.974 512V256L159.972 224V192H415.978V224L319.976 256V512L494.855 426.75C507.481 420.875 514.606 406 511.106 391.5C502.856 356.75 479.98 293.625 479.98 210.875Z"
                style={{ opacity: 0.4 }}
                fill="currentColor"
            />
            <path
                d="M31.994 256C49.619 256 63.994 243.5 63.994 228V0L0.993 221.125C-4.132 238.875 11.243 256 31.994 256ZM575.007 221.125L512.006 0V228C512.006 243.5 526.381 256 544.006 256C564.757 256 580.132 238.875 575.007 221.125ZM159.997 192V224L255.999 256V512H320.001V256L416.003 224V192H159.997Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function FaHandFist({ ...props }: ComponentProps<"svg">) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            {...props}
        >
            <path
                d="M350.867 246.15C338.438 238.502 328.928 226.84 323.984 212.9C313.727 219.893 301.348 224 288 224C280.359 224 273.135 222.436 266.342 219.98C269.984 228.594 272 238.061 272 248C272 287.766 239.75 320 200 320H128C119.164 320 112 312.836 112 304C112 295.162 119.164 288 128 288H200C222.094 288 240 270.094 240 248S222.094 208 200 208H72C49.906 208 32 225.906 32 248V311.406C32 344.531 48 375.969 74.812 395.531L128 434.201V512H352V426.908C390.301 402.822 416 360.484 416 312V247.121C406.553 252.619 395.717 256 384 256C371.732 256 360.545 252.188 350.867 246.15Z"
                style={{ opacity: 0.4 }}
                fill="currentColor"
            />
            <path
                d="M192 0C174.312 0 160 14.328 160 32V176H200C208.459 176 216.459 177.729 224 180.41V32C224 14.328 209.688 0 192 0ZM96 32C78.312 32 64 46.328 64 64V176.807C66.66 176.508 69.26 176 72 176H128V64C128 46.328 113.688 32 96 32ZM288 32C270.312 32 256 46.328 256 64V160C256 177.672 270.312 192 288 192S320 177.672 320 160V64C320 46.328 305.688 32 288 32ZM384 96C366.312 96 352 110.328 352 128V192C352 209.672 366.312 224 384 224S416 209.672 416 192V128C416 110.328 401.688 96 384 96Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function FaGraduationCap({ ...props }: ComponentProps<"svg">) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            {...props}
        >
            <path
                d="M323.991 143.516L161.116 184.234C121.749 194.09 92.515 225.01 83.393 263.113L83.393 263.113C90.942 268.969 96.116 277.707 96.116 288C96.116 297.953 91.302 306.488 84.177 312.359L109.011 461.367C110.636 471.121 103.116 480 93.229 480H35.003C25.116 480 17.597 471.121 19.222 461.367L44.056 312.359C36.931 306.488 32.116 297.953 32.116 288C32.116 274.758 40.163 263.395 51.634 258.531L51.634 258.531C62.657 207.693 101.216 166.248 153.366 153.203L316.241 112.484C324.679 110.234 333.522 115.531 335.647 124.125C337.772 132.688 332.585 141.375 323.991 143.516Z"
                style={{ opacity: 0.4 }}
                fill="currentColor"
            />
            <path
                d="M640 160C640 170.383 633.562 179.648 623.953 183.086L341.215 284.316C327.482 289.227 312.518 289.227 298.785 284.316L108.234 216.092C121.963 200.908 139.961 189.502 161 184.234L323.875 143.516C332.469 141.375 337.656 132.688 335.531 124.125C333.406 115.531 324.563 110.234 316.125 112.484L153.25 153.203C121.406 161.168 94.732 179.807 76.199 204.623L16.047 183.086C6.438 179.648 0 170.383 0 160S6.438 140.352 16.047 136.914L298.785 35.684C312.518 30.773 327.482 30.773 341.215 35.684L623.953 136.914C633.562 140.352 640 149.617 640 160ZM351.988 314.449C341.688 318.133 330.926 320 320 320C309.076 320 298.312 318.133 287.998 314.445L142.781 262.453L128 405.328C128 446.602 213.999 480 320 480C425.999 480 512 446.602 512 405.328L497.219 262.453L351.988 314.449Z"
                fill="currentColor"
            />
        </svg>
    );
}
