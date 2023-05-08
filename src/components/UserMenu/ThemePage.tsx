import { useContext } from "react";
import { AppContext, ThemeColors } from "../../context/AppContext";
import { ThemeColor } from "../Button";

export default function ThemePage() {
  const { setTheme } = useContext(AppContext);
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
