"use client";
import useFormHandler from "@/hooks/useFormhandler";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { signup } from "../../services/auth-service";
// import { useRouter } from "next/navigation";
import { HandleOnSubmit } from "@/types/form-types";

export interface ISignupFormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

const useSignup = () => {
  // const router = useRouter();
  const { formData, setFormData, loading, setLoading, handleOnChange } =
    useFormHandler<ISignupFormData>({
      name: "",
      email: "",
      username: "",
      password: "",
    });

  const handleOnSubmit = async (e: HandleOnSubmit) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    const sanitizedData = {
      name: formData.name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    if (
      !sanitizedData.name ||
      !sanitizedData.username ||
      !sanitizedData.email ||
      !sanitizedData.password
    ) {
      toast.error("All fields are required");
      return setLoading(false);
    }

    if (sanitizedData.name.length < 3) {
      toast.error("Name must be at least 3 characters long");
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
      const data = await signup(sanitizedData);
      toast.success(data.message);

      console.log(data.message);

      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
      });

      // router.push("/onboarding");
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

export default useSignup;
