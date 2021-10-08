function alertToast(message, callback = null) {
  let alertModal = new bootstrap.Modal(document.getElementById("alert-modal"));

  $("#alert-modal-body").html(message);

  alertModal.show();

  if (callback) callback();
}

function alert(message) {
  const alertElement = `<div
  id="myAlert"
  class="alert show alert-primary alert-dismissible fade"
  role="alert"
>
  ${message}
  <button
    type="button"
    class="btn-close"
    data-bs-dismiss="alert"
    aria-label="Close"
  ></button>
</div>`;

  $("#custom-alert").append(alertElement);
}
