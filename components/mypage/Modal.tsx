import { ReactNode } from 'react';
import Button from '@/components/common/Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 px-4">
      <div className="bg-yg-white rounded-[50px] p-10 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
        {children}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="gray"
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant="primary"
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}