import { ReactNode } from "react";

export default interface ModalWindowHelper {
  Children?: ReactNode;

  IsOpen: boolean;
  
  SwitchState: () => void;

  ClassName: string;
}