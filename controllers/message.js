import messageModule from "../modules/messages.js";
import taskModule from "../modules/task.js";

export const updateMessageToDatabase = async (message) => {
  try {
    const { text, type, createByUser, taskId } = message;
    const currentMessage = { text, type, createByUser: createByUser.id };

    const newMessage = await messageModule.create(currentMessage);

    const currentTask = await taskModule.findOne({ _id: taskId });

    await taskModule.findByIdAndUpdate(taskId, {
      messages: [...currentTask.messages, newMessage.id],
    });
    return { ...message, id: newMessage.id };
  } catch (error) {
    console.log(error);
  }
};
