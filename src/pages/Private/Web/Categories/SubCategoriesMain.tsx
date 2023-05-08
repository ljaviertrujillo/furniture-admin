import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import {
  Card,
  ComplementaryButton,
  Select,
  SubCategoryForm,
} from "../../../../components";
import { ICategory, ISubCategory } from "../../../../models";
import { useContext, useState } from "react";
import { CategoriesContext } from "../../../../context/Web/CategoriesContext";
import { VscAdd, VscClose } from "react-icons/vsc";

export default function SubCategoriesMain() {
  const categories = useSelector((state: AppStore) => state.category.data);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const { deleteSubcategory, categoryIndex, setCategoryIndex } =
    useContext(CategoriesContext);

  const handleCategoryIndex = (value: number) => {
    setCategoryIndex(value);
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
          <ComplementaryButton
            icon={formVisible ? <VscClose /> : <VscAdd />}
            title={formVisible ? "Cerrar" : "Nueva SubCategoria"}
            handle={() => setFormVisible(!formVisible)}
          />
        </>
      ) : (
        <p>Agrega una categoria</p>
      )}
      {formVisible && (
        <SubCategoryForm
          category={categories[categoryIndex]}
          onClose={() => setFormVisible(false)}
        />
      )}
      {categories.length > 0 && categories[categoryIndex].subCategories.length > 0 ? (
        <div className="cards">
          {categories[categoryIndex].subCategories.map((subCategory) => (
            <Card
              key={subCategory.id}
              title={subCategory.title}
              description={subCategory.description}
              image={subCategory.image}
              handleRemove={() => deleteSubcategory(subCategory)}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
