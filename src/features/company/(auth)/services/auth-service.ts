import axios from "axios";
import { ICompanySignupFormData } from "../signup/hooks/useCompanySignup";
import { ICompanyLoginFormData } from "../login/hooks/useCompanyLogin";

export const signup = async (formData: ICompanySignupFormData) => {
  const { data } = await axios.post(
    "http://localhost:3000/api/company/signup",
    formData,
  );

  return data;
};

export const login = async (formData: ICompanyLoginFormData) => {
  const { data } = await axios.post(
    "http://localhost:3000/api/company/login",
    formData,
  );

  return data;
};

export const logout = async () => {
  const { data } = await axios.post("http://localhost:3000/api/logout");
  return data;
};
