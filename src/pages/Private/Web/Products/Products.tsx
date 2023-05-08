import "./products.scss";
import { useContext } from "react";
import ConfigAside from "../ConfigAside/ConfigAside";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../../redux/store";
import { classNames } from "../../../../../utilities";
import { WebContext } from "../../../../../context/Web/WebContext";
import { Card } from "../Card";
import NextBackButton, {
  NextButtonType,
} from "../../../../../components/Button/NextBackButton";
import ProductsMain from "./ProductMain";
import { ProductContext } from "../../../../../context/Web/ProductsContext";
import ProductCard from "./ProductCard";

export default function Products() {
  const categories = useSelector((state: AppStore) => state.category.data);
  const { categoryIndex, subCategoryIndex, setSubCategoryIndex } =
    useContext(ProductContext);
  const { isOpen, setIsOpen } = useContext(WebContext);

  return (
    <div className={classNames("web-container", isOpen ? "collapsed" : "")}>
      <ConfigAside headerTitle="Productos" main={<ProductsMain />} />
      <div className="preview-container" onClick={() => setIsOpen(false)}>
        <section className="preview">
          {categories[categoryIndex] &&
          categories[categoryIndex].subCategories[subCategoryIndex] ? (
            <>
              <div className="products-subcategories">
                <div className="products-category-title">
                  {categories[categoryIndex].title}
                </div>
                <div className="products-subcategories-container">
                  {categories[categoryIndex].subCategories.map(
                    (subcategory, i) => (
                      <div
                        key={subcategory.id}
                        className={classNames(
                          "products-subcategory",
                          i === subCategoryIndex
                            ? "selected"
                            : i ===
                              (subCategoryIndex + 1) %
                                categories[categoryIndex].subCategories.length
                            ? "selected-next"
                            : ""
                        )}
                        style={{
                          backgroundImage: `url(${subcategory.image})`,
                        }}
                      />
                    )
                  )}
                </div>
                <div className="products-subcategory-title">
                  {
                    categories[categoryIndex].subCategories[subCategoryIndex]
                      .title
                  }
                </div>
                <div className="products-buttons">
                  <NextBackButton
                    type={NextButtonType.BACK}
                    handle={() =>
                      setSubCategoryIndex(
                        (subCategoryIndex -
                          1 +
                          categories[categoryIndex].subCategories.length) %
                          categories[categoryIndex].subCategories.length
                      )
                    }
                  />
                  <NextBackButton
                    type={NextButtonType.NEXT}
                    handle={() =>
                      setSubCategoryIndex(
                        (subCategoryIndex + 1) %
                          categories[categoryIndex].subCategories.length
                      )
                    }
                  />
                </div>
              </div>
              <div className="products">
                {
                  categories[categoryIndex].subCategories[subCategoryIndex].products.map(product => (
                    <ProductCard key={product.id} product={product} />
                    
                  ))

                }
              </div>
            </>
          ) : null}
        </section>
      </div>
    </div>
  );
}
