import "./products.scss";
import { useContext } from "react";

import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { classNames } from "../../../../utilities";
import { WebContext } from "../../../../context/Web/WebContext";
import NextBackButton, {
  NextButtonType,
} from "../../../../components/Button/NextBackButton";
import ProductsMain from "./ProductMain";
import { ProductContext } from "../../../../context/Web/ProductsContext";
import ProductCard from "./ProductCard";
import { ConfigAside } from "../components";

export default function Products() {
  const categories = useSelector((state: AppStore) => state.category.data);
  const subCategories = useSelector(
    (state: AppStore) => state.subCategory.data
  );
  const products = useSelector((state: AppStore) => state.product.data);
  const { categoryIndex, subCategoryIndex, setSubCategoryIndex } =
    useContext(ProductContext);
  const { isOpen, setIsOpen } = useContext(WebContext);

  return (
    <div className={classNames("web-container", isOpen ? "collapsed" : "")}>
      <ConfigAside headerTitle="Productos" main={<ProductsMain />} />
      <div className="preview-container" onClick={() => setIsOpen(false)}>
        <section className="preview">
          {categories[categoryIndex] && subCategories[subCategoryIndex] ? (
            <>
              <div className="products-subcategories">
                <div className="products-category-title">
                  {categories[categoryIndex].title}
                </div>
                <div className="products-subcategories-container">
                  {subCategories
                    .filter(
                      (subCategory) =>
                        subCategory.categoryId === categories[categoryIndex].id
                    )
                    .map((subcategory, i) => (
                      <div
                        key={subcategory.id}
                        className={classNames(
                          "products-subcategory",
                          i === subCategoryIndex
                            ? "selected"
                            : i ===
                              (subCategoryIndex + 1) %
                                subCategories.filter(
                                  (subCategory) =>
                                    subCategory.categoryId ===
                                    categories[categoryIndex].id
                                ).length
                            ? "selected-next"
                            : ""
                        )}
                        style={{
                          backgroundImage: `url(${subcategory.image})`,
                        }}
                      />
                    ))}
                </div>
                <div className="products-subcategory-title">
                  {subCategories[subCategoryIndex].title}
                </div>
                <div className="products-buttons">
                  <NextBackButton
                    type={NextButtonType.BACK}
                    handle={() =>
                      setSubCategoryIndex(
                        (subCategoryIndex -
                          1 +
                          subCategories.filter(
                            (subCategory) =>
                              subCategory.categoryId ===
                              categories[categoryIndex].id
                          ).length) %
                          subCategories.filter(
                            (subCategory) =>
                              subCategory.categoryId ===
                              categories[categoryIndex].id
                          ).length
                      )
                    }
                  />
                  <NextBackButton
                    type={NextButtonType.NEXT}
                    handle={() =>
                      setSubCategoryIndex(
                        (subCategoryIndex + 1) %
                          subCategories.filter(
                            (subCategory) =>
                              subCategory.categoryId ===
                              categories[categoryIndex].id
                          ).length
                      )
                    }
                  />
                </div>
              </div>
              <div className="products">
                {products
                  .filter(
                    (product) =>
                      product.subCategoryId ===
                      subCategories[subCategoryIndex].id
                  )
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </>
          ) : null}
        </section>
      </div>
    </div>
  );
}
