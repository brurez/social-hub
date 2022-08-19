import {useCurrentUser} from "./hooks/useCurrentUser.js";
import {useEffect} from "react";
import Models from "./lib/Models.js";

export function UserInitializer() {
  const {isLoggedIn, setCurrentUser, clearCurrentUser} = useCurrentUser()

  useEffect(() => {
    if (!isLoggedIn) {
      Models.build().getCurrentUser().then(res => {
        setCurrentUser(res.data)
      }).catch(err => {
        if (err.response.status === 401) {
          clearCurrentUser()
        }
      })
    }
  }, [])

  return [];
}