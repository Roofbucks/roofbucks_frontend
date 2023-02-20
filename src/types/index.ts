export interface optionType {
  label: string | number;
  value: string | number;
}

export interface ModalProps {
  show: boolean;
  closeModal: () => void;
}

export type users = "agent" | "shareholder";
