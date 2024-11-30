import { useEffect } from "react";

// to maintain dynamic page title
const useTitle = (title = "") => {
  useEffect(() => {
    const site_name = "HRCorp";
    if (title.length > 0) {
      document.title = `${title} - ${site_name}`;
    } else {
      document.title = site_name;
    }
  }, [title]);
};

export default useTitle;
