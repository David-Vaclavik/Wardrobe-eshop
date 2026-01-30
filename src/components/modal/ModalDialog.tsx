import { type Ref } from "react";
import { X } from "lucide-react";

type Props = {
  toggleDialog: () => void;
  children: React.ReactNode;
  dialogRef: Ref<HTMLDialogElement>;
};

export function Dialog({ toggleDialog, children, dialogRef }: Props) {
  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => {
        if (e.currentTarget === e.target) toggleDialog();
      }}
    >
      <div className="dialog-content">
        {children}
        <button className="close-dialog" onClick={toggleDialog} aria-label="Close dialog">
          <X size={36} strokeWidth={2.5} />
        </button>
      </div>
    </dialog>
  );
}
