import { useRef, useState } from "react";
import "./Modal.css";
import { Dialog } from "./ModalDialog";
import { SearchBar } from "../SearchBar";
import { Search } from "lucide-react";

export function Modal() {
  const [content, setContent] = useState<React.ReactNode>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);

  // Calculate scrollbar width to add padding when dialog opens
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  const toggleDialog = () => {
    if (!dialogRef.current) {
      return;
    }

    const closeButton = document.querySelector(".close-dialog") as HTMLButtonElement;

    if (dialogRef.current.hasAttribute("open")) {
      dialogRef.current.close();
    } else {
      // Add scrollbar width + padding-right in CSS
      if (closeButton) closeButton.style.paddingRight = `${scrollbarWidth + 8}px`;
      dialogRef.current.showModal();
    }
  };

  return (
    <div className="modal">
      <a
        onClick={() => {
          setContent(<SearchBar onClose={toggleDialog} />);
          toggleDialog();
        }}
      >
        <Search size={36} />
      </a>

      <Dialog toggleDialog={toggleDialog} dialogRef={dialogRef}>
        {content}
      </Dialog>
    </div>
  );
}
