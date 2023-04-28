import { useContext } from "react";
import { PageContext, ThemeColors } from "../../context/PageContext";
import { ThemeColor } from "../Button";

export default function ThemePage() {
  const { setTheme } = useContext(PageContext);
  return (
    <div className="themes">
      <ThemeColor
        type={ThemeColors.LIGHT}
        handle={() => setTheme(ThemeColors.LIGHT)}
      />
      <ThemeColor
        type={ThemeColors.DARK}
        handle={() => setTheme(ThemeColors.DARK)}
      />
    </div>
  );
}
