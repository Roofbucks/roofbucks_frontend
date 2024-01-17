export interface optionType {
  label: any
  value: any
}

export interface ModalProps {
  show: boolean;
  closeModal: () => void;
}

export type users = "agent" | "shareholder" | "";
