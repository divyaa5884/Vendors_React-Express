export default function TransitionsModal( { showModal, handleModal } ) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="payment-modal"
        open={ showModal }
        onClose={ () => { handleModal(false) } }
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >