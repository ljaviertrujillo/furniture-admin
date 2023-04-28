import "./products.scss";
import { useContext, useState } from "react";
import { ComplementaryButton, Select } from "../../../../../components";
import ProductsForm from "../../../../../components/forms/ProductsForm";
import { ICategory, ISubCategory } from "../../../../../models";
import ConfigAside from "../ConfigAside/ConfigAside";
import { CategoriesContext } from "../../../../../context/Web/CategoriesContext";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../../redux/store";
import { VscAdd, VscClose } from "react-icons/vsc";
import { Card } from "../Categories";
import { classNames } from "../../../../../utilities";
import { WebContext } from "../../../../../context/Web/WebContext";

export default function Products() {
  const categories = useSelector((state: AppStore) => state.category.data);
  const { deleteProduct } = useContext(CategoriesContext);
  const { isOpen, setIsOpen, setIsFormVisible, isFormVisible } =
    useContext(WebContext);

  const ProductMain = () => {
    const [category, setCategory] = useState<ICategory>(categories[0]);
    const [subCategory, setSubCategory] = useState<ISubCategory>(
      categories?.[0]?.subCategories?.[0]
    );

    const handleCategoryChange = (value: ICategory) => {
      setCategory(value);
      setIsFormVisible(false);
    };

    const handleSubCategoryChange = (value: ISubCategory) => {
      setSubCategory(value);
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
            {category.subCategories.length > 0 && subCategory !== undefined ? (
              <>
                <Select<ISubCategory>
                  name="subCategories"
                  label="SubCategorias"
                  options={category.subCategories}
                  onChange={handleSubCategoryChange}
                />
                <ComplementaryButton
                  icon={isFormVisible ? <VscClose /> : <VscAdd />}
                  title={isFormVisible ? "Cerrar" : "Nuevo Producto"}
                  handle={() => setIsFormVisible(!isFormVisible)}
                />
                {isFormVisible ? (
                  <ProductsForm
                    subCategory={subCategory}
                    onClose={() => setIsFormVisible(false)}
                  />
                ) : null}
              </>
            ) : (
              <p>Agrega una subcategoria</p>
            )}
            <div className="cards">
              {category !== undefined && category.subCategories.length > 0 && subCategory !== undefined && subCategory.products.map((product) => (
                <Card
                  key={product.id}
                  title={product.title}
                  description={product.description}
                  image={product.images[0]}
                  handleRemove={() => deleteProduct(product)}
                />
              ))}
            </div>
          </>
        ) : (
          <p>Agrega una categoria</p>
        )}
      </>
    );
  };

  return (
    <div className={classNames("web-container", isOpen ? "collapsed" : "")}>
      <ConfigAside headerTitle="Productos" main={<ProductMain />} />
      <div className="preview-container" onClick={() => setIsOpen(false)}>
        <section className="preview"></section>
      </div>
    </div>
  );
}
