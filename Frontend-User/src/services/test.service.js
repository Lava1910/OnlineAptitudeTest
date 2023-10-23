import api from "./api";

export const getQuestions = async (user) => {
  const url = "Test/get-questions";
  try {
      const rs = await api.get(url);
      return rs.data;
  } catch (error) {
      return {};
  }
}

export const savePoint = async (userId, totalPoint, testCode) => {
  const url = `Test/savePoint?userId=${userId}&totalScore=${totalPoint}&testCode=${testCode}`;
  try {
    const rs =  await api.post(url);
    return rs.data;
  } catch(error) {
    return {};
  }
}

export const saveCandidateTest = async (formData) => {
  const url = `Test/saveCandidateAnswer`;
  try {
    const rs =  await api.post(url,formData);
    return rs.data;
  } catch(error) {
    return {};
  }
}

export const getCandidateTest = async (candidateId) => {
  const url = `Test/getCandidateTest?candidateId=${candidateId}`;
  try {
    const rs =  await api.get(url);
    return rs.data;
  } catch(error) {
    return {};
  }
}