import { useContext } from 'react';
import { classNames } from '../../utilities';
import './buttons.scss'
import { MdLightMode, MdNightlight } from "react-icons/md";
import { PageContext, ThemeColors } from '../../context/PageContext';

interface Props {
  type: ThemeColors;
  handle?: () => void
}

export default function ThemeColor({ type, handle }: Props) {
  const { theme } = useContext(PageContext)
  return (
    <button 
      type="button"
      className={classNames("btn-theme", theme === type ? 'active' : '')}
      onClick={handle}
    >
      {type === ThemeColors.LIGHT ? (
        <>
          <MdLightMode />
          {"Claro"}
        </>
      ) : (
        <>
          <MdNightlight />
          {"Oscuro"}
        </>
      )}
    </button>
  );
}
