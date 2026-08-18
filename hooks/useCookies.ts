import { useEffect, useState } from "react";

function useCookies() {
  const [cookies, setCookie] = useState<{
    [key: string]: string;
  }>({});
  const setCookieValue = (name: string, value: string) => {
    setCookie((prevCookies) => ({
      ...prevCookies,
      [name]: value,
    }));
  };
  const getCookieValue = (name: string) => {
    return cookies[name];
  };
  useEffect(() => {
    cookieStore.getAll().then((cookies) => {
      const cookieObj: { [key: string]: string } = {};
      cookies.forEach(({ name, value }) => {
        if (name && value) cookieObj[name] = value;
      });
      setCookie(cookieObj);
    });
  }, []);
  useEffect(() => {
    cookieStore.addEventListener("change", (event) => {
      const cookieObj: { [key: string]: string } = {};
      event.changed.forEach(({ name, value }) => {
        if (name && value) cookieObj[name] = value;
      });
      setCookie((prevCookies) => ({
        ...prevCookies,
        ...cookieObj,
      }));
    });
    return () => {
      cookieStore.removeEventListener("change", () => {});
    };
  }, []);
  return { cookies, setCookie: setCookieValue, getCookie: getCookieValue };
}
export default useCookies;
