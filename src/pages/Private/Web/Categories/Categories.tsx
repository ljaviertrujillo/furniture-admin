import "./categories.scss";
import ConfigAside from "../components/ConfigAside/ConfigAside";
import { classNames } from "../../../../utilities";
import { useContext } from "react";
import { WebContext } from "../../../../context/Web/WebContext";
import { CategoriesContext } from "../../../../context/Web/CategoriesContext";
import NextBackButton, {
  NextButtonType,
} from "../../../../components/Button/NextBackButton";
import { CategoriesHeader, CategoriesMain, SubCategoriesMain } from ".";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";

export default function Categories() {
  const { isOpen, setIsOpen } = useContext(WebContext);
  const { categoryMenu, menuItems, categoryIndex, setCategoryIndex } =
    useContext(CategoriesContext);
  const categories = useSelector((state: AppStore) => state.category.data);
  const subCategories = useSelector(
    (state: AppStore) => state.subCategory.data
  );

  return (
    <div className={classNames("web-container", isOpen ? "collapsed" : "")}>
      <ConfigAside
        header={<CategoriesHeader />}
        headerTitle="Categorias"
        main={
          categoryMenu === menuItems[0].title ? (
            <CategoriesMain />
          ) : (
            <SubCategoriesMain />
          )
        }
      />
      <div className="preview-container" onClick={() => setIsOpen(false)}>
        <section className="preview">
          {categories.length > 0 ? (
            <div className="category">
              <div className="category-container">
                <div className="category-title">
                  {categories[categoryIndex].title}
                </div>
                <div
                  className="category-background"
                  style={{
                    backgroundImage: `url(${categories[categoryIndex].image})`,
                  }}
                />
                <div className="category-bg">
                  <div className="category-description">
                    {categories && categories[categoryIndex].description}
                  </div>
                  <div
                    className="category-background"
                    style={{
                      backgroundImage: `url(${
                        categories && categories[categoryIndex].image
                      })`,
                    }}
                  />
                </div>
              </div>
              <div className="subcategories">
                {subCategories
                  .filter(
                    (subCategory) => subCategory.categoryId === categories[categoryIndex].id
                  )
                  .map((subCategory) => (
                    <div className="subcategory" key={subCategory.id}>
                      <div
                        className="subcategory-image"
                        style={{ backgroundImage: `url(${subCategory.image})` }}
                      />
                      <span className="subcategory-title">
                        {subCategory.title}
                      </span>
                    </div>
                  ))}
              </div>
              <div className="background-"></div>
              <div className="category-buttons">
                <NextBackButton
                  type={NextButtonType.BACK}
                  handle={() =>
                    setCategoryIndex(
                      (categoryIndex - 1 + categories.length) %
                        categories.length
                    )
                  }
                />
                <NextBackButton
                  type={NextButtonType.NEXT}
                  handle={() =>
                    setCategoryIndex((categoryIndex + 1) % categories.length)
                  }
                />
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
