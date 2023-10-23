import api from "./api";

export const candidate_login = async (user) => {
    const url = "User/candidateLogin";
    try {
        const rs = await api.post(url,{userName:user.userName,password:user.password});
        return rs.data;
    } catch (error) {
        alert("UserName or Password is wrong!!!");
        return {};
    }
}