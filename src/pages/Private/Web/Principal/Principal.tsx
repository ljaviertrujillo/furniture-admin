import { useContext } from "react";
import ConfigAside from "../components/ConfigAside/ConfigAside";
import "./principal.scss";
import { classNames } from "../../../../utilities";
import { BsArrowUpRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import PrincipalForm from "../../../../components/forms/PrincipalForm";
import { Card, ComplementaryButton } from "../../../../components";
import { VscAdd, VscClose } from "react-icons/vsc";
import { WebContext } from "../../../../context/Web/WebContext";
import { PrincipalContext } from "../../../../context/Web/PrincipalContext";

export default function Principal() {
  const { isOpen, setIsOpen, isFormVisible, setIsFormVisible } =
    useContext(WebContext);
  const principal = useSelector((state: AppStore) => state.principal);

  const handleClick = () => {
    // console.log(isOpen);
  };

  const PrincipalMain = () => {
    const { removePrincipal } = useContext(PrincipalContext);
    return (
      <>
        {principal.title === "NOMBRE DE TU EMPRESA" ||
        principal.title === "" ? (
          <p>Configura el inicio de tu Pagina</p>
        ) : (
          <div className="items">
            <Card
              title={principal.title}
              description={principal.slogan}
              image={principal.image}
              handleRemove={() => removePrincipal()}
            />
          </div>
        )}
        <ComplementaryButton
          title={isFormVisible ? "Cerrar" : "Nuevo"}
          icon={isFormVisible ? <VscClose /> : <VscAdd />}
          handle={() => setIsFormVisible(!isFormVisible)}
        />
        {isFormVisible ? (
          <PrincipalForm onClose={() => setIsFormVisible(false)} />
        ) : null}
      </>
    );
  };

  return (
    <div className={classNames("web-container", isOpen ? "collapsed" : "")}>
      <ConfigAside
        headerTitle="Inicio"
        main={<PrincipalMain />}
        handle={handleClick}
      />

      <div className="preview-container" onClick={() => setIsOpen(false)}>
        <section className="preview preview-home">
          <div className="info">
            <h1 className="company-title">{principal.title}</h1>
            <h2 className="company-slogan">{principal.slogan}</h2>
          </div>
          <div className="background">
            <div
              className="background-item"
              style={{ backgroundImage: `url(${principal.image})` }}
            />
            <div
              className="background-item"
              style={{ backgroundImage: `url(${principal.image})` }}
            />
            <div
              className="background-item"
              style={{ backgroundImage: `url(${principal.image})` }}
            />
            <div
              className="background-item"
              style={{ backgroundImage: `url(${principal.image})` }}
            >
              <div className="contact-link">
                <BsArrowUpRight className="icon" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
