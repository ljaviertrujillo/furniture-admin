import "./benefits.scss";
import { useContext } from "react";
import { classNames } from "../../../../utilities";
import { WebContext } from "../../../../context/Web/WebContext";
import ConfigAside from "../components/ConfigAside/ConfigAside";
import BenefitsMain from "./BenefitsMain";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { icons } from "../../../../components/Icons/IconsLibrary";

export default function Benefits() {
  const { isOpen, setIsOpen } = useContext(WebContext);
  const benefits = useSelector((state: AppStore) => state.benefit.data);

  return (
    <div className={classNames("web-container", isOpen ? "collapsed" : "")}>
      <ConfigAside headerTitle="Beneficios" main={<BenefitsMain />} />
      <div className="preview-container" onClick={() => setIsOpen(false)}>
        <section className="preview preview-benefits">
          {benefits.length > 0 ? (
            <div className="benefits">
              {benefits.map((benefit) => {
                const selectedIcon = icons.find(
                  (icon) => icon.id === benefit.iconIndex
                )?.icon;
                return (
                  <div key={benefit.id} className="benefit">
                    <div className="benefit-icon">{selectedIcon}</div>
                    <div className="benefit-info">
                      <div className="benefit-title">{benefit.title}</div>
                      <div className="benefit-descripcion">
                        {benefit.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
