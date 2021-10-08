function toggleLoadingConvertBtn() {
  const spinner = `<div id="convert-btn-loading" class="spinner-border spinner-border-sm m-0 p-0" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;

  let loading = $("#convertBtn").attr("data-loading");

  if (loading === "false") {
    $("#convertBtn").html(
      `<div class="d-flex align-items-center justify-content-center">${spinner} <span style="padding-left: 5px">Converting...</span></div>`
    );
    $("#convertBtn").attr("disabled", "true");
    $("#convertBtn").attr("data-loading", "true");
  } else {
    $("#convertBtn").html("Convert");
    $("#convert-btn-loading").remove();
    $("#convertBtn").attr("disabled", null);
    $("#convertBtn").attr("data-loading", "false");
  }
}

function toggleLoadingCompressBtn() {
  const spinner = `<div id="compress-btn-loading" class="spinner-border spinner-border-sm" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;

  let loading = $("#compressBtn").attr("data-loading");

  if (loading === "false") {
    $("#compressBtn").html(
      `<div class="d-flex align-items-center justify-content-center">${spinner} <span style="padding-left: 5px">Compressing...</span></div>`
    );
    $("#compressBtn").attr("disabled", "true");
  } else {
    $("#compressBtn").html("Compress");
    $("#compress-btn-loading").remove();
    $("#compressBtn").attr("disabled", null);
    $("#compressBtn").attr("data-loading", "false");
  }
}

function removeImage() {
  image = null;
  $("#display-img-container").hide();
  $("#image-selector").value = null;
}

function convertImage() {
  if (image) {
    toggleLoadingConvertBtn();
  } else {
    alertToast("Select image first!");
  }
}

function compressImage() {
  if (image) {
    toggleLoadingCompressBtn();
  } else {
    alertToast("Select image first!");
  }
}

let image = null;
const defaultSpinner = `<div class="spinner-border" role="status">
<span class="visually-hidden">Loading...</span>
</div>`;

$("#image-selector").on("change", (e) => {
  try {
    $("#display-img-container").show();
    $("#display-img-div").html(
      `<div class="text-center">${defaultSpinner}</div>`
    );

    image = e.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(image[0]);

    let name = image[0].name;
    let size = Math.round((image[0].size / (1024 * 1024)) * 100) / 100;
    let type = image[0].type.split("/")[1];

    reader.addEventListener("load", () => {
      $("#display-img-div").html(
        `<div class="row">
          <div class="col-sm-6">
            <img id="display-img" src="${reader.result}" style="width: 100%; margin-bottom: 5px" alt="display" />
          </div>
          <div class="col-sm-6">
            <div class="container vertical-center" style="height: 100%">
              <div>
                <strong>Name:</strong> <small>${name}</small>
                <br />
                <strong>Size:</strong> <small>${size} MB</small>
                <br />
                <strong>Type:</strong> <small>${type}</small>
                <br />
                <br />
                <div class="text-center">
                  <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeImage()">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>`
      );
    });
  } catch (err) {
    console.log(err);
    removeImage();
  }
});
