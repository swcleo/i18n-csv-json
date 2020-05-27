(function () {
  var $input_file = $("#csv_file");
  var $btn_submit = $("#btn_submit");
  var $upload_message = $("#upload_message");

  $btn_submit.on("click", function () {
    $upload_message.text("");
    var upload_file = $input_file[0].files[0];

    if (upload_file) {
      var formData = new FormData();
      formData.append("csv_file", upload_file);

      fetch("/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          $upload_message.text(data.message);

          data.files.forEach((file) => {
            var a = document.createElement('a');
            a.href = file.url;
            a.download = file.name;
            document.body.append(a);
            a.click();
            a.remove();
          });
        });
    }
  });
})();
