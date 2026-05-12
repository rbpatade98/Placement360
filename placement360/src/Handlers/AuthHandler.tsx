import { db } from "@/config/firebase.config";
import { LoaderPage } from "@/routes/LoaderPage";
import type { User } from "@/types";
import { useAuth, useUser } from "@clerk/clerk-react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const AuthHandler = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storeUserData = async () => {
      if (isSignedIn && user) {
        setLoading(true);
        try {
          const userSnap = await getDoc(doc(db, "users", user.id));
          const userData: Partial<User> = {
            id: user.id,
            name: user.fullName || user.firstName || "Anonymous",
            email: user.primaryEmailAddress?.emailAddress || "N/A",
            imageUrl: user.imageUrl || "",
            updatedAt: serverTimestamp(),
          };

          if (!userSnap.exists()) {
            userData.createdAt = serverTimestamp();
          }

          await setDoc(doc(db, "users", user.id), userData, { merge: true });
        } catch (error) {
          console.log("Error on storing the user data : ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    storeUserData();
  }, [isSignedIn, user]);

  if (loading) {
    return <LoaderPage />;
  }

  return null;
};

export default AuthHandler;