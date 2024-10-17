import AxiosInstance from "../../helpers/AxiosInstance"

export const getConversationAction = async () => {
    try {
        const response = await AxiosInstance().post('/messages/create-conversation');
        if(response.status) {
            return response.data;
        } else {
            throw new Error('Failed to create conversation');
        }
    } catch (error) {
        throw new Error(error.message);
    }
}


export const getMessagesAction = async (conversationId) => {
    try {
        const response = await AxiosInstance().get('/messages/get-messages/' +conversationId);
        if(response.status) {
            return response.data;
        } else {
            throw new Error('Failed to get messages: ', response.message);
        }
    } catch(e) {
        throw new Error('Failed to get messages2: ', e);
    }
}

export const sendMessageAction = async (conversationId, senderId, text) => {
    try {
        console.log('data: ', {
            conversationId,
            senderId,
            text: text.trim()
        })
        const response = await AxiosInstance().post('/messages/send-message', {
            conversationId,
            senderId,
            text
        })
        console.log('response', response);
        if(response.status) {
            return response.data;
        } else {
            throw new Error('Failed to send message: ', response.message);
        }
    } catch (error) {
        throw new Error('Failed to send message: ', error.message);    
    }
}