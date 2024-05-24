import { useContext } from "react";
import { AuthContext } from "../contexts/ContextAuth";

export function useAuth() {
  const value = useContext(AuthContext);

  return value;
}
