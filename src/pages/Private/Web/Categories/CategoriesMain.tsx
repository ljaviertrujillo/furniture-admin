import { useContext, useState } from "react";
import { VscAdd, VscClose } from "react-icons/vsc";
import { Card, CategoryForm, ComplementaryButton } from "../../../../components";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { CategoriesContext } from "../../../../context/Web/CategoriesContext";

export default function CategoriesMain() {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const categories = useSelector((state: AppStore) => state.category.data);
  const { deleteCategory } = useContext(CategoriesContext);
  return (
    <>
      <ComplementaryButton
        icon={formVisible ? <VscClose /> : <VscAdd />}
        title={formVisible ? "Cerrar" : "Nueva Categoria"}
        handle={() => setFormVisible(!formVisible)}
      />

      {formVisible && <CategoryForm onClose={() => setFormVisible(false)} />}
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
}
