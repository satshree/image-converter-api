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
    if (image) {
      let type = image[0].type.split("/")[1];

      if (type === "png") {
        $("#convertBtn").html("Convert to JPG");
      } else {
        $("#convertBtn").html("Convert to PNG");
      }
    } else {
      $("#convertBtn").html("Convert to ...");
    }
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
    $("#compressBtn").attr("data-loading", "true");
  } else {
    $("#compressBtn").html("Compress");
    $("#compress-btn-loading").remove();
    $("#compressBtn").attr("disabled", null);
    $("#compressBtn").attr("data-loading", "false");
  }
}

function removeImage() {
  image = null;
  $("#convertBtn").html("Convert to ...");
  $("#display-img-container").hide();
  $("#image-selector").value = null;
  $("#reset-form-btn").trigger("click");
}

function convertImage() {
  if (image) {
    toggleLoadingConvertBtn();

    let image_name = "";
    let type = image[0].type;
    if (type === "image/png") {
      image_name = `${image[0].name.split(".")[0]}.jpg`;
    } else {
      image_name = `${image[0].name.split(".")[0]}.png`;
    }

    let data = new FormData();
    data.append("image", image[0]);

    $.ajax({
      method: "POST",
      url: "/api/converter/",
      contentType: false,
      processData: false,
      xhr: function () {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 2) {
            if (xhr.status == 200) {
              xhr.responseType = "blob";
            } else {
              xhr.responseType = "text";
            }
          }
        };
        return xhr;
      },
      data,
      success: (resp) => {
        toggleLoadingConvertBtn();

        let blob = new Blob([resp], { type: "text/plain" });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = image_name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        alert("Image converted!");
      },
      error: (err) => {
        toggleLoadingConvertBtn();
        console.log(err);
        alertToast(
          err.responseJSON
            ? err.responseJSON.error || err.responseJSON.message
            : "Something went wrong."
        );
      },
    });
  } else {
    alertToast("Select image first!");
  }
}

function compressImage() {
  if (image) {
    compressModal.show();
  } else {
    alertToast("Select image first!");
  }
}

function submitCompressImage() {
  compressModal.hide();
  toggleLoadingCompressBtn();

  let data = new FormData();

  data.append("compress", 100 - range);
  data.append("image", image[0]);

  $.ajax({
    method: "POST",
    url: "/api/compressor/",
    contentType: false,
    processData: false,
    xhr: function () {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 2) {
          if (xhr.status == 200) {
            xhr.responseType = "blob";
          } else {
            xhr.responseType = "text";
          }
        }
      };
      return xhr;
    },
    data,
    success: (resp) => {
      toggleLoadingCompressBtn();

      let blob = new Blob([resp], { type: "text/plain" });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = image[0].name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      alert("Image compressed!");
    },
    error: (err) => {
      toggleLoadingCompressBtn();
      console.log(err);
      alertToast(
        err.responseJSON
          ? err.responseJSON.error || err.responseJSON.message
          : "Something went wrong."
      );
    },
  });
}

let compressModal = new bootstrap.Modal(
  document.getElementById("compress-image-modal")
);
let image = null;
let range = 50;
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

    if (type === "png") {
      $("#convertBtn").html("Convert to JPG");
    } else {
      $("#convertBtn").html("Convert to PNG");
    }

    reader.addEventListener("load", () => {
      $("#display-img-div").html(
        `<div class="row">
          <div class="col-sm-6">
            <div class="text-center">
              <img id="display-img" src="${reader.result}" style="width: ${
          window.innerWidth < 568 ? "50%" : "100%"
        }; margin-bottom: 5px" alt="display" />
            </div>
          </div>
          <div class="col-sm-6">
            <div class="vertical-center" style="height: 100%">
              <div class="w-100">
                <div>
                  <div class="container">
                    <strong>Name:</strong> <small>${name}</small>
                    <br />
                    <strong>Size:</strong> <small>${size} MB</small>
                    <br />
                    <strong>Type:</strong> <small>${type}</small>
                    <br />
                    <br />
                  </div>
                  <div class="text-center" id="remove-btn-div">
                    <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeImage()" style="width:${
                      window.innerWidth < 568 ? "100%" : "auto"
                    }"">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
      );

      $("#compress-image-modal-img").attr("src", reader.result);
    });
  } catch (err) {
    console.log(err);
    removeImage();
  }
});

$("#compress-range").on("change", (e) => {
  range = e.target.value;

  document.getElementById("compress-range-input").value = range;
});

$("#compress-range-input").on("change", (e) => {
  range = e.target.value;

  document.getElementById("compress-range").value = range;
});
