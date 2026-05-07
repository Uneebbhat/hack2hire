"use client";

import useFormHandler from "@/hooks/useFormhandler";
import { HandleOnSubmit } from "@/types/form-types";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { login } from "../../services/auth-service";
// import { useRouter } from "next/navigation";

export interface ILoginFormData {
  email: string;
  password: string;
}

const useLogin = () => {
  // const router = useRouter();
  const { formData, setFormData, loading, setLoading, handleOnChange } =
    useFormHandler<ILoginFormData>({
      email: "",
      password: "",
    });

  const handleOnSubmit = async (e: HandleOnSubmit) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    const sanitizedData = {
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    if (!sanitizedData.email || !sanitizedData.password) {
      toast.error("All fields are required");
      return setLoading(false);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(sanitizedData.email)) {
      toast.error("Please enter a valid email address");
      return setLoading(false);
    }

    if (sanitizedData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return setLoading(false);
    }

    try {
      const data = await login(sanitizedData);
      toast.success(data.message);

      console.log(data);

      setFormData({
        email: "",
        password: "",
      });

      // router.push("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error || error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleOnChange,
    handleOnSubmit,
  };
};

export default useLogin;
