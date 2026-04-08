import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { useAppDispatch } from "./app/hooks";
import { setUserFromStorage } from "./features/auth/authSlice";
import { setAuthToken } from "./lib/axios";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUserFromStorage());
    const token = localStorage.getItem("token");
    setAuthToken(token);
  }, [dispatch]);

  return <AppRouter />;
}

export default App;