import { useContext, useState } from "react";
import {
  Card,
  ComplementaryButton,
  ProductsForm,
  Select,
} from "../../../../components";
import { Category, SubCategory } from "../../../../models";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { VscAdd, VscClose } from "react-icons/vsc";
import { ProductContext } from "../../../../context/Web/ProductsContext";

export default function ProductsMain() {
  const {
    categoryIndex,
    subCategoryIndex,
    setCategoryIndex,
    setSubCategoryIndex,
    deleteProduct,
  } = useContext(ProductContext);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const categories = useSelector((state: AppStore) => state.category.data);
  const subCategories = useSelector(
    (state: AppStore) => state.subCategory.data
  );
  const products = useSelector((state: AppStore) => state.product.data);

  const handleCategoryIndex = (value: number) => {
    setCategoryIndex(value);
    setFormVisible(false);
    setSubCategoryIndex(0);
  };

  const handleSubCategoryIndex = (value: number) => {
    setSubCategoryIndex(value);
    setFormVisible(false);
  };

  return (
    <>
      {categories.length > 0 ? (
        <>
          <Select<Category>
            name="categories"
            label="Categorias"
            index={categoryIndex}
            options={categories}
            onChange={handleCategoryIndex}
          />
          {subCategories.length > 0 ? (
            <>
              <Select<SubCategory>
                name="subCategories"
                label="SubCategorias"
                index={subCategoryIndex}
                options={subCategories.filter(subCategory => subCategory.categoryId === categories[categoryIndex].id)}
                onChange={handleSubCategoryIndex}
              />
              <ComplementaryButton
                icon={formVisible ? <VscClose /> : <VscAdd />}
                title={formVisible ? "Cerrar" : "Nuevo Producto"}
                handle={() => setFormVisible(!formVisible)}
              />
              {formVisible ? (
                <ProductsForm
                  subCategory={subCategories[subCategoryIndex]}
                  onClose={() => setFormVisible(false)}
                />
              ) : null}
            </>
          ) : (
            <p>Agrega una subcategoria</p>
          )}
          {categories.length > 0 &&
          subCategories.length > 0 &&
          products.length > 0 ? (
            <div className="cards">
              {products
                .filter((product) => product.subCategoryId === subCategories[subCategoryIndex].id)
                .map((product) => (
                  <Card
                    key={product.id}
                    title={product.title}
                    description={product.description}
                    image={product.images[0]}
                    handleRemove={() => deleteProduct(product)}
                  />
                ))}
            </div>
          ) : null}
        </>
      ) : (
        <p>Agrega una categoria</p>
      )}
    </>
  );
}
