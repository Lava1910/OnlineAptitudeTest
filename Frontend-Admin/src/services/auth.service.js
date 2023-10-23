import api from "./api";

export const admin_login = async (user) => {
    const url = "User/adminLogin";
    try {
        const rs = await api.post(url,{userName:user.userName,password:user.password});
        return rs.data;
    } catch (error) {
        return {};
    }
}