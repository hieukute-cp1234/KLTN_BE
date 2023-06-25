import nodemailer from "nodemailer";
import multer from "multer";
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

  const listMailTo = typeof emailTo === "string" ? emailTo : emailTo.join(", ");

  const optionMail = {
    from: `${emailFrom} <hieuvm1@gmail.com>`,
    to: listMailTo,
    subject: "Thông báo từ ứng dụng VNEXT_process",
    html: content,
  };

  await transporter.sendMail(optionMail);
};

export const templateMailAssignTask = (text) =>
  `<div className="template-mail-assign-task">${text}</div>`;

const storage = multer.diskStorage({
  destination: (_req, _file, res) => {
    res(null, "upload");
  },
  filename: (_req, file, res) => {
    const flatName = file.originalname.split(".");
    const newName = `${Date.now()}.${flatName[flatName.length - 1]}`;
    res(null, newName);
  },
});

export const handleUploadfile = multer({ storage: storage });
