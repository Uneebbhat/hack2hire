"use cliient";

import { useState } from "react";

interface TogglePassword {
  showPassword: boolean;
  handleTogglePassword: () => void;
}

const useTogglePassword = (): TogglePassword => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return { showPassword, handleTogglePassword };
};

export default useTogglePassword;
