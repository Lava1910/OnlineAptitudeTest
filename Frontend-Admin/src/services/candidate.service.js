import api from "./api";

export const getAll = async () => {
    const url = "ManageCandidate/getAll";
    try {
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return {};
    }
}

export const createCandidate = async (formData) => {
    const url = "ManageCandidate/create";
    try {
        const rs = await api.post(url,formData);
        return rs.data;
    } catch (error) {
        return {};
    }
}

export const getCandidateTest = async (candidateId) => {
    const url = `ManageCandidate/getCandidateTest?candidateId=${candidateId}`;
    try {
      const rs =  await api.get(url);
      return rs.data;
    } catch(error) {
      return {};
    }
}