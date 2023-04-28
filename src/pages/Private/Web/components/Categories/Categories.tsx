import "./categories.scss";
import ConfigAside from "../ConfigAside/ConfigAside";
import { classNames } from "../../../../../utilities";
import { useContext, useState } from "react";
import { WebContext } from "../../../../../context/Web/WebContext";
import { TbLayoutGridAdd, TbPlaylistAdd } from "react-icons/tb";
import { CategoryForm, SubCategoryForm } from "../../../../../components/forms";
import { ComplementaryButton, Select } from "../../../../../components";
import { VscAdd, VscClose } from "react-icons/vsc";
import { CategoriesContext } from "../../../../../context/Web/CategoriesContext";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../../redux/store";
import { Card } from "../Card";
import { ICategory } from "../../../../../models";

export default function Categories() {
  const { isOpen, setIsOpen, isFormVisible, setIsFormVisible } =
    useContext(WebContext);
  const { deleteCategory, deleteSubcategory } = useContext(CategoriesContext);
  const [category, setCategory] = useState("categories");
  const categories = useSelector((state: AppStore) => state.category.data);

  const CategoriesHeader = () => {
    const menuItems = [
      {
        id: 0,
        title: "categories",
        label: "Categorias",
        icon: TbLayoutGridAdd,
      },
      {
        id: 1,
        title: "subcategories",
        label: "SubCategorias",
        icon: TbPlaylistAdd,
      },
    ];

    return (
      <ul className="menu">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={classNames(
              "item",
              category === item.title ? "selected" : ""
            )}
            onClick={() => {
              setCategory(item.title);
              setIsFormVisible(false);
            }}
          >
            <item.icon className="item-icon" />
            <span className="item-label">{item.label}</span>
            <div className="selectedbar" />
          </li>
        ))}
      </ul>
    );
  };

  const CategoriesMain = () => {
    return (
      <>
        <ComplementaryButton
          icon={isFormVisible ? <VscClose /> : <VscAdd />}
          title={isFormVisible ? "Cerrar" : "Nueva Categoria"}
          handle={() => setIsFormVisible(!isFormVisible)}
        />

        {isFormVisible && (
          <CategoryForm onClose={() => setIsFormVisible(false)} />
        )}
        <div className="cards">
          {categories.map((category) => (
            <Card
              key={category.id}
              title={category.title}
              description={category.description}
              image={category.image}
              handleRemove={() => deleteCategory(category)}
            />
          ))}
        </div>
      </>
    );
  };

  const SubCategoriesMain = () => {
    const [category, setCategory] = useState<ICategory>(categories[0]);

    const handleCategoryChange = (value: ICategory) => {
      setCategory(value);
      setIsFormVisible(false);
    };

    return (
      <>
        {category !== undefined ? (
          <>
            <Select<ICategory>
              name="categories"
              label="Categorias"
              options={categories}
              onChange={handleCategoryChange}
            />
            <ComplementaryButton
              icon={isFormVisible ? <VscClose /> : <VscAdd />}
              title={isFormVisible ? "Cerrar" : "Nueva SubCategoria"}
              handle={() => setIsFormVisible(!isFormVisible)}
            />
            {isFormVisible && (
              <SubCategoryForm
                category={category}
                onClose={() => setIsFormVisible(false)}
              />
            )}
          </>
        ) : (
          <p>Agrega una categoria</p>
        )}
        <div className="cards">
          {category !== undefined &&category.subCategories.map((subCategory) => (
            <Card
              key={subCategory.id}
              title={subCategory.title}
              description={subCategory.description}
              image={subCategory.image}
              handleRemove={() => deleteSubcategory(subCategory)}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={classNames("web-container", isOpen ? "collapsed" : "")}>
      <ConfigAside
        header={<CategoriesHeader />}
        headerTitle="Categorias"
        main={
          category === "categories" ? <CategoriesMain /> : <SubCategoriesMain />
        }
      />
      <div className="preview-container" onClick={() => setIsOpen(false)}>
        <section className="preview">
          {categories.map((category) => (
            <div key={category.id} className="category">
              <div className="category-container">
                <div className="category-title">{category.title}</div>
                <div
                  className="categpry-background"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="category-bg">
                  <div className="category-description">
                    {category.description}
                  </div>
                  <div
                    className="category-background"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                </div>
              </div>
              <div className="category-buttons"></div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
