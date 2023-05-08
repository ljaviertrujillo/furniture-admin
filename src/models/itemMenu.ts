import {
  MdSpaceDashboard,
  MdSettings,
  MdOutlineAddShoppingCart,
} from "react-icons/md";
import { TbWorldWww, TbLayoutGridAdd } from "react-icons/tb";
import { RiTeamLine } from "react-icons/ri";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { BsTrophyFill } from "react-icons/bs";

export const PublicRoutes = {
  LOGIN: "login",
};

export const PrivateRoutes = {
  HOME: "/",
  WEB: "/web/",
  TEAM: "/team/",
  GALLERY: "/gallery/",
  PROFILE: "/profile/",
  SETTINGS: "/settings/",
};

export const WebRoutes = {
  HOME: "",
  BENEFITS: "benefits",
  CATEGORIES: "categories",
  SUBCATEGORIES: "subcategories",
  PRODUCTS: "products",
  PROJECTS: "projects",
};

export interface ItemMenu {
  id: number;
  icon: React.ElementType;
  label: string;
  url: string;
}

export const features: ItemMenu[] = [
  {
    id: 1,
    icon: MdSpaceDashboard,
    label: "Inicio",
    url: PrivateRoutes.HOME,
  },
  {
    id: 2,
    icon: TbWorldWww,
    label: "Pagina Web",
    url: PrivateRoutes.WEB,
  },
  {
    id: 3,
    icon: RiTeamLine,
    label: "Equipo",
    url: PrivateRoutes.TEAM,
  },
  {
    id: 4,
    icon: TfiGallery,
    label: "Galeria",
    url: PrivateRoutes.GALLERY,
  },
];

export const settings: ItemMenu[] = [
  {
    id: 4,
    icon: MdSettings,
    label: "Configuracion",
    url: PrivateRoutes.SETTINGS,
  },
];

export const webRoutes: ItemMenu[] = [
  {
    id: 1,
    icon: MdSpaceDashboard,
    label: "Inicio",
    url: WebRoutes.HOME,
  },
  {
    id: 2,
    icon: BsTrophyFill,
    label: "Beneficios",
    url: WebRoutes.BENEFITS,
  },
  {
    id: 3,
    icon: TbLayoutGridAdd,
    label: "Categorias",
    url: WebRoutes.CATEGORIES,
  },
  {
    id: 4,
    icon: MdOutlineAddShoppingCart,
    label: "Productos",
    url: WebRoutes.PRODUCTS,
  },
  {
    id: 5,
    icon: AiOutlineFolderAdd,
    label: "Proyectos",
    url: WebRoutes.PROJECTS,
  },
];
