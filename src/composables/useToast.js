function success(message) {
  show("success", message);
}

function error(message) {
  show("error", message);
}

function info(message) {
  show("info", message);
}

function show(type, message) {
  if (!document.body.contains(document.querySelector(".ui-toast-block"))) {
    const toastBlock = document.createElement("div");
    toastBlock.classList.add("ui-toast-block");
    document.body.append(toastBlock);
  }

  const toast = document.createElement("div");
  toast.classList.add("ui-toast", `ui-toast-${type}`);
  toast.innerHTML = message;

  document.querySelector(".ui-toast-block").append(toast);

  setTimeout(() => toast.classList.add("opacity-100"), 200);
  setTimeout(() => toast.classList.remove("opacity-100"), 2800);

  setTimeout(() => {
    toast.remove();
    if (!document.body.contains(document.querySelector(".ui-toast"))) {
      document.querySelector(".ui-toast-block").remove();
    }
  }, 3000);
}

const toast = { success, error, info };

export default toast;
