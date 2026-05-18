"use client";
import useFormHandler from "@/hooks/useFormhandler";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { signup } from "../../services/auth-service";
// import { useRouter } from "next/navigation";
import { HandleOnSubmit } from "@/types/form-types";

export interface ICompanySignupFormData {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  website: string;
  password: string;
}

const useCompanySignup = () => {
  // const router = useRouter();
  const { formData, setFormData, loading, setLoading, handleOnChange } =
    useFormHandler<ICompanySignupFormData>({
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      website: "",
      password: "",
    });

  const handleOnSubmit = async (e: HandleOnSubmit) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    const sanitizedData = {
      companyName: formData.companyName.trim(),
      companyEmail: formData.companyEmail.trim(),
      companyPhone: formData.companyPhone.trim(),
      website: formData.website.trim(),
      password: formData.password.trim(),
    };

    if (
      !sanitizedData.companyName ||
      !sanitizedData.companyEmail ||
      !sanitizedData.companyPhone ||
      !sanitizedData.website ||
      !sanitizedData.password
    ) {
      toast.error("All fields are required");
      return setLoading(false);
    }

    if (sanitizedData.companyName.length < 3) {
      toast.error("Name must be at least 3 characters long");
      return setLoading(false);
    }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if (!emailRegex.test(sanitizedData.companyEmail)) {
    //   toast.error("Please enter a valid email address");
    //   return setLoading(false);
    // }

    if (sanitizedData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return setLoading(false);
    }

    try {
      const data = await signup(sanitizedData);
      toast.success(data.message);

      console.log(data.message);

      setFormData({
        companyName: "",
        companyEmail: "",
        companyPhone: "",
        website: "",
        password: "",
      });

      // router.push("/company/dashboard");
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

export default useCompanySignup;
