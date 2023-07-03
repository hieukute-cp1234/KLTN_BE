import messageModule from "../modules/messages.js";
import taskModule from "../modules/task.js";

export const updateMessageToDatabase = async (value) => {
  try {
    const { text, type, createByUser, taskId, files } = value;
    const currentMessage = { text, type, files, createByUser: createByUser.id };

    const newMessage = await messageModule.create(currentMessage);

    const currentTask = await taskModule.findOne({ _id: taskId });

    await taskModule.findByIdAndUpdate(taskId, {
      messages: [...currentTask.messages, newMessage.id],
    });
    return { ...value, id: newMessage.id };
  } catch (error) {
    console.log(">>>", error);
  }
};
