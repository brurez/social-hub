import { useCurrentUser } from "./hooks/useCurrentUser.js";
import { useEffect } from "react";
import CoreApi from "./lib/CoreApi.js";

// This component is used to initialize or clear the current user on first render
export function UserInitializer() {
  const { isLoggedIn, setCurrentUser, clearCurrentUser } = useCurrentUser();

  useEffect(() => {
    if (!isLoggedIn) {
      // tries to get the current user from the server
      CoreApi.build()
        .getCurrentUser()
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            clearCurrentUser();
          }
        });
    }
  }, []);

  return [];
}
