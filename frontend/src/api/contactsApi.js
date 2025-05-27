import api from "./axios";

export const sendFeedbackRequest = async (
  firstname,
  lastname,
  email,
  message,
) => {
  return api.post("/contacts/sendFeedback", {
    firstname,
    lastname,
    email,
    message,
  });
};
