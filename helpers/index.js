import nodemailer from "nodemailer";
import { authSendMail } from "../constants/index.js";

export const response = (data, message) => ({
  data: data,
  message: message,
});

export const sendMail = async ({ emailFrom, emailTo, content }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: authSendMail,
  });

  const listMailTo = typeof emailTo === 'string' ? emailTo : emailTo.join(", ")

  const optionMail = {
    from: emailFrom,
    to: listMailTo,
    subject: "Thông báo từ ứng dụng VNEXT_process",
    html: content,
  };

  await transporter.sendMail(optionMail);
};

export const templateMailAssignTask = (text) =>
  `<div className="template-mail-assign-task">${text}</div>`;
