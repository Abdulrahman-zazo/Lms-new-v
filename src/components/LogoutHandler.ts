export const LogoutHandler = async () => {
  await fetch("/api/logout", {
    method: "POST",
  });

  window.location.href = "/";
};
