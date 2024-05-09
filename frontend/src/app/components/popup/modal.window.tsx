import React from "react";
import './modal.window.scss';
import ModalWindowHelper from "@/app/interfaces/modal.helper";

export default function ModalWindow(modalWindowHelper: ModalWindowHelper) {
  return (
    <>
      {modalWindowHelper.IsOpen && (
        <div className="modal-overlay">
          <div className={modalWindowHelper.ClassName}>
            {modalWindowHelper.Children}
          </div>
        </div>
      )}
    </>
  );
}