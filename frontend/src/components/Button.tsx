import React from "react";

export enum ButtonSize {
  xs = 1,
  sm = 2,
  md = 3,
  lg = 4,
  xl = 5,
  xxl = 6,
}
export enum ButtonRoundedness {
  none = "rounded-none",
  sm = "rounded-sm",
  md = "rounded-default",
  lg = "rounded-lg",
  xl = "rounded-xl",
  xxl = "rounded-2xl",
  xxxl = "rounded-3xl",
  full = "rounded-full",
}

export enum ButtonColor {
  primary = "bg-primary-500 hover:bg-primary-400 focus:bg-primary-700",
  secondary = "bg-gray-200 hover:bg-gray-300 text-black",
  tertiary = "bg-gray-400 hover:bg-gray-500 text-white dark:bg-gray-600",
  success = "bg-emerald-500 hover:bg-emerald-600 text-white",
  gradientGreenBlue = "bg-gradient-to-l from-blue-400 dark:from-blue-600 to-emerald-300 dark:to-emerald-500 text-white hover:ring-4 duration-300",
  gradientBlue = "bg-gradient-to-l from-blue-400 dark:from-blue-600 to-blue-300 dark:to-blue-500 text-white hover:ring-4 duration-300",
  gradientBluePurple = "bg-gradient-to-l from-blue-400 dark:from-blue-600 to-purple-300 dark:to-purple-500 text-white hover:ring-4 duration-300",
  gradientPurple = "bg-gradient-to-l from-purple-400 dark:from-purple-600 to-purple-300 dark:to-purple-500 text-white hover:ring-4 duration-300",
  gradientRed = "bg-gradient-to-r from-pink-400 to-red-300 text-white hover:ring-4 duration-300",
  gradientRedOrange = "bg-gradient-to-r from-red-400 to-orange-300 text-white hover:ring-4 duration-300",
  gradientOrange = "bg-gradient-to-r from-orange-400 to-orange-300 text-white hover:ring-4 duration-300",
  gradientYellow = "bg-gradient-to-r from-yellow-400 to-yellow-300 text-white hover:ring-4 duration-300",
  gradientYellowGreen = "bg-gradient-to-r from-yellow-400 to-emerald-300 text-white hover:ring-4 duration-300",
  gradientGreen = "bg-gradient-to-r from-emerald-400 to-emerald-500 text-white hover:ring-4 duration-300 ",
  danger = "bg-red-600 hover:bg-red-500 text-white",
  warning = "bg-yellow-500 hover:bg-yellow-600 text-white",
  info = "bg-blue-500 hover:bg-blue-600 text-white",
  light = "bg-gray-100 hover:bg-gray-200 text-black",
  dark = "bg-gray-900 hover:bg-gray-700 text-white",
  outline = "border border-gray-500 hover:border-gray-600 text-gray-500 hover:text-gray-600",
  transparent = "bg-transparent dark:hover:bg-gray-700 dark:hover:bg-opacity-40 hover:bg-gray-400 hover:bg-opacity-20 dark:text-white text-gray-600",
  ringTransparentInfo = "bg-transparent border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white",
  ringSemiTransparentInfo = "text-blue-500 hover:text-gray-100 bg-blue-500 bg-opacity-10 border border-blue-500 hover:bg-opacity-80 font-semibold",
  ringTransparentSuccess = "bg-transparent border border-emerald-500 hover:bg-emerald-500 text-emerald-500 hover:text-gray-100 ",
  ringSemiTransparentSuccess = "text-emerald-500 hover:text-gray-100 bg-emerald-500 bg-opacity-10 border border-emerald-500 hover:bg-opacity-80 font-semibold",
  ringTransparentWarning = "bg-transparent border border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-gray-100 ",
  ringSemiTransparentWarning = "text-yellow-500 hover:text-gray-100 bg-yellow-500 bg-opacity-10 border border-yellow-500 hover:bg-opacity-80 font-semibold",
  ringTransparentDanger = "bg-transparent border border-red-500 hover:bg-red-500 text-red-500 hover:text-gray-100 ",
  ringSemiTransparentDanger = "text-red-500 hover:text-gray-100 bg-red-500 bg-opacity-10 border border-red-500 hover:bg-opacity-80 font-semibold",
  ringTransparentPrimary = "bg-transparent border border-primary-500 hover:bg-primary-500 text-primary-500 hover:text-gray-100 ",
  ringSemiTransparentPrimary = "text-primary-500 hover:text-gray-100 bg-primary-500 bg-opacity-10 border border-primary-500 hover:bg-opacity-80 font-semibold",
  ringTransparentPink = "bg-transparent border border-primary-500 hover:bg-pink-400",
  ringSemiTransparentPink = "text-red-400 hover:text-gray-100 bg-red-400 bg-opacity-10 border border-red-400 hover:bg-opacity-80 font-semibold",
}
export enum ButtonHover {
  shadowOnHoverSm = "hover:shadow-sm",
  shadowOnHoverMd = "hover:shadow-md",
  shadowOnHoverLg = "hover:shadow-2xl",
  shadowOnHoverNone = "hover:shadow-none",
}

type ButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
  size?: ButtonSize;
  roundedNess?: ButtonRoundedness;
  color?: ButtonColor | string;
  shadowOnHover?: ButtonHover;
  overrideClasses?: string;
  id?: string;
};
export const Button = (props: ButtonProps) => {
  let classset1 = [
    "",
    "text-xs p-1 px-2 ",
    "text-sm p-1 px-2",
    "text-base p-1 px-4",
    "text-lg p-2 px-6",
    "text-xl p-2 px-8",
    "text-2xl p-3 px-10",
  ][props.size || 0];
  return (
    <button
      className={`${props.overrideClasses}
      ${props.color || ButtonColor.primary}
      ${props.shadowOnHover || ButtonHover.shadowOnHoverNone}
      ${props.roundedNess || ButtonRoundedness.md}
      ${classset1}
      transition-all disabled:opacity-50 cursor-pointer`}
      onClick={props.onClick}
      disabled={props.disabled}
      id={props.id}
    >
      {props.children}
    </button>
  );
};

export default Button;
