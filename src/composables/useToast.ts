function success(message: String) {
  show("success", message);
}

function error(message: String) {
  show("error", message);
}

function info(message: String) {
  show("info", message);
}

function show(type: String, message: any) {
  if (!document.body.contains(document.querySelector(".ui-toast-block"))) {
    const toastBlock = document.createElement("div");
    toastBlock.classList.add("ui-toast-block");
    document.body.append(toastBlock);
  }

  const toast = document.createElement("div");
  toast.classList.add("ui-toast", `ui-toast-${type}`);
  toast.innerHTML = message;
  const uiToastBlock = document.querySelector(
    ".ui-toast-block"
  ) as HTMLInputElement | null;
  if (uiToastBlock) {
    uiToastBlock.append(toast);
  }

  setTimeout(() => toast.classList.add("opacity-100"), 200);
  setTimeout(() => toast.classList.remove("opacity-100"), 2800);

  setTimeout(() => {
    toast.remove();
    if (!document.body.contains(document.querySelector(".ui-toast"))) {
      if (uiToastBlock) {
        uiToastBlock.remove();
      }
    }
  }, 3000);
}

const toast = { success, error, info };

export default toast;
