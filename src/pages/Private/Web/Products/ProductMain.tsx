import { useContext, useState } from "react";
import {
  ComplementaryButton,
  ProductsForm,
  Select,
} from "../../../../../components";
import { ICategory, ISubCategory } from "../../../../../models";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../../redux/store";
import { VscAdd, VscClose } from "react-icons/vsc";
import { Card } from "../Card";
import { ProductContext } from "../../../../../context/Web/ProductsContext";

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

  const handleCategoryIndex = (value: number) => {
    setCategoryIndex(value);
    setFormVisible(false);
    setSubCategoryIndex(0)
  };

  const handleSubCategoryIndex = (value: number) => {
    setSubCategoryIndex(value);
    setFormVisible(false);
  };

  return (
    <>
      {categories.length > 0 ? (
        <>
          <Select<ICategory>
            name="categories"
            label="Categorias"
            index={categoryIndex}
            options={categories}
            onChange={handleCategoryIndex}
          />
          {categories[categoryIndex].subCategories.length > 0 ? (
            <>
              <Select<ISubCategory>
                name="subCategories"
                label="SubCategorias"
                index={subCategoryIndex}
                options={categories[categoryIndex].subCategories}
                onChange={handleSubCategoryIndex}
              />
              <ComplementaryButton
                icon={formVisible ? <VscClose /> : <VscAdd />}
                title={formVisible ? "Cerrar" : "Nuevo Producto"}
                handle={() => setFormVisible(!formVisible)}
              />
              {formVisible ? (
                <ProductsForm
                  subCategory={
                    categories[categoryIndex].subCategories[subCategoryIndex]
                  }
                  onClose={() => setFormVisible(false)}
                />
              ) : null}
            </>
          ) : (
            <p>Agrega una subcategoria</p>
          )}
          {categories.length > 0 &&
          categories[categoryIndex].subCategories.length > 0 &&
          categories[categoryIndex].subCategories[subCategoryIndex].products
            .length > 0 ? (
            <div className="cards">
              {categories[categoryIndex].subCategories[
                subCategoryIndex
              ].products.map((product) => (
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
