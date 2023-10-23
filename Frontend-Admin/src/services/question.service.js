import api from "./api";

export const getAll = async () => {
    const url = "ManageQuestion/getAll";
    try {
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return {};
    }
}

export const createQuestion = async (formData) => {
    const url = "ManageQuestion/create";
    try {
        const rs = await api.post(url,formData);
        return rs.data;
    } catch (error) {
        return {};
    }
}

export const deleteQuestion = async (questionId) => {
    const url = `ManageQuestion/delete?id=${questionId}`;
    try {
        const rs = await api.delete(url);
        return rs.data;
    } catch (error) {
        return error;
    }
}

export const searching = async (search,topicId,typeId,difficultyLevel) => {
    let url = `ManageQuestion/searching`;
    if(search){
        url += `?Search=${search}`;
    }
    if (topicId) {
        url += `${search ? '&' : '?'}TopicId=${topicId}`;
    }

    if (typeId) {
        url += `${search || topicId ? '&' : '?'}TypeId=${typeId}`;
    }

    if (difficultyLevel) {
        url += `${search || topicId || typeId ? '&' : '?'}DifficultyLevel=${difficultyLevel}`;
    }
    try {
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return error;
    }
}
