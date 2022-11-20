import { useEffect, useState } from "react";

export default function Join({ props }) {
  const { state } = useLocation();

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getUsers();
  }, []);

  return <div></div>;
}
