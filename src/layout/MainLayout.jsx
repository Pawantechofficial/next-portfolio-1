"use client";
import { useEffect, useState } from "react";
import { useUserProfileQuery } from "../provider/redux/query/Auth.query";
import { Provider, useDispatch } from "react-redux";
import { removeUser, setUser } from "../provider/redux/slice/User.slice";
import { usePathname } from "next/navigation";
import { store } from "../provider/redux/store";
import { getCookie } from "../helpers/server.cookie";
// const MainLayout = ({ children }) => {
//   const dispatch = useDispatch();
//   const { data, isError, isFetching, isLoading, status } =
//     useUserProfileQuery();
//   console.log(data);
//   console.log("my error" + isError);
//   const pathName = usePathname();
//   console.log({ data });
//   useEffect(() => {
//     if (data && data.user) {
//       dispatch(setUser(data.user));
//     } else {
//       dispatch(removeUser());
//     }
//   }, [pathName, data]);
//   return children;
// };
// export default MainLayout;
const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const UserData = async () => {
    const cookieAvialble = await getCookie();
    if (cookieAvialble?.value && data && data.user) {
      dispatch(setUser(data.user));
    } else {
      dispatch(removeUser());
    }
  };
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    UserData();
    fetch("/api/auth/profile")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (data && data.user) {
      dispatch(setUser(data.user));
    } else {
      dispatch(removeUser());
    }
  }, [pathName, data]);

  console.log(data);
  return <Provider store={store}>{children}</Provider>;
};

export default MainLayout;
