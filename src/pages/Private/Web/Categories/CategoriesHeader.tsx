import { useContext } from "react";
import { CategoriesContext } from "../../../../context/Web/CategoriesContext";
import { classNames } from "../../../../utilities";

export default function CategoriesHeader() {
    const {categoryMenu, setCategoryMenu, menuItems} = useContext(CategoriesContext)
  return (
    <ul className="menu">
      {menuItems.map((item) => (
        <li
          key={item.id}
          className={classNames(
            "item",
            categoryMenu === item.title ? "selected" : ""
          )}
          onClick={() => {
            setCategoryMenu(item.title);
          }}
        >
          <item.icon className="item-icon" />
          <span className="item-label">{item.label}</span>
          <div className="selectedbar" />
        </li>
      ))}
    </ul>
  );
}
