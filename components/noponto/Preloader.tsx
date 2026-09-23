import { assetPath } from "@/lib/asset-path";
/** The four original paths are taken directly from the official Vector.svg. */
export default function Preloader() {
  return (
    <div className="brand-preloader" aria-hidden="true">
      <div className="brand-preloader-center">
        <div className="brand-preloader-mark">
          <svg
            className="intro-orbit"
            viewBox="0 0 180 180"
            width="180"
            height="180"
            fill="none"
          >
            <circle cx="90" cy="90" r="86" />
            <circle
              className="intro-orbit-draw"
              cx="90"
              cy="90"
              r="86"
              pathLength="1"
            />
          </svg>
          <img
            className="intro-mark-guide"
            src={assetPath("/brand/mark.svg")}
            width="313"
            height="320"
            alt=""
          />
          <svg
            className="intro-mark"
            viewBox="0 0 313 320"
            width="313"
            height="320"
            fill="none"
          >
            <path
              className="intro-piece intro-piece-0"
              d="M174.602 0C253.295 3.49659 311.546 65.5182 313 143.758L230.503 143.714C228.664 131.824 223.699 120.636 216.118 111.291C204.914 97.6221 192.115 91.4796 174.77 89.7856C174.343 60.1104 174.613 29.7237 174.602 0Z"
              fill="#6C41DC"
            />
            <path
              className="intro-piece intro-piece-1"
              d="M129.192 30.3991C131.682 29.9226 132.86 30.0871 135.388 30.2652C138.175 33.455 136.97 82.2714 136.942 90.2976C119.707 92.1382 105.717 96.6973 91.8456 107.55C74.2105 121.332 62.8426 141.607 60.2881 163.835C43.7668 164.066 26.8014 163.878 10.2422 163.888C9.44798 163.905 8.65486 163.913 7.86064 163.91C4.84517 163.892 1.8972 164.227 0.0735702 162.388C-1.2575 139.336 15.7258 101.321 30.5321 83.55C57.4656 51.2216 88.0707 35.3219 129.192 30.3991Z"
              fill="#180C37"
            />
            <path
              className="intro-piece intro-piece-2"
              d="M0.452164 184.781L59.9136 184.831C66.4054 226.621 93.763 251.581 134.93 258.356C135.545 277.841 135.007 299.348 134.892 318.983C102.047 319.359 68.4569 303.809 44.7539 281.519C17.6337 256.494 1.67671 221.651 0.452164 184.781Z"
              fill="#180C37"
            />
            <path
              className="intro-piece intro-piece-3"
              d="M231.929 184.325L290.647 184.606C286.331 239.059 258.2 287.089 206.203 308.5C186.022 315.957 178.769 317.61 157.315 320C157.357 299.667 157.576 279.333 157.975 259.003C201.099 250.631 222.717 226.46 231.929 184.325Z"
              fill="#180C37"
            />
          </svg>
        </div>
        <div className="brand-preloader-track">
          <i />
        </div>
      </div>
    </div>
  );
}
