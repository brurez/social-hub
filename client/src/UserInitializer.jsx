import {useCurrentUser} from "./hooks/useCurrentUser.js";
import {useEffect} from "react";
import CoreApi from "./lib/CoreApi.js";

export function UserInitializer() {
  const {isLoggedIn, setCurrentUser, clearCurrentUser} = useCurrentUser()

  useEffect(() => {
    if (!isLoggedIn) {
      CoreApi.build().getCurrentUser().then(res => {
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