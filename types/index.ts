import { SVGProps } from "react";
export type { User } from "./user";
export { UserRole } from "./roles";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
