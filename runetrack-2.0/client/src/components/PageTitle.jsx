import { useEffect } from "react";

export default function PageTitle({ title, children }) {
  useEffect(() => {
    document.title = `${title} - RuneTrack 2.0`;
    return () => {
      document.title = "RuneTrack 2.0";
    };
  }, [title]);

  return children;
}
