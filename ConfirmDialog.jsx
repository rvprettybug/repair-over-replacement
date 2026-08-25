import Modal from './Modal'

export default function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirm' }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2 rounded-full text-sm font-medium text-ink-700 hover:bg-ink-900/5 dark:text-cream-200 dark:hover:bg-cream-100/10">
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="px-4 py-2 rounded-full text-sm font-medium bg-clay-500 text-white hover:bg-clay-600"
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <p className="text-sm text-ink-700 dark:text-cream-300">{message}</p>
    </Modal>
  )
}
