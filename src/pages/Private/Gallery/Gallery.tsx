import { useState, useContext } from 'react';
import { BsFolder } from 'react-icons/bs';
// import { GalleryContext } from './GalleryContext';

interface GalleryRoute {
  id: number;
  url: string;
  label: string;
  subRoute?: GalleryRoute[];
}

function RouteButton({ url, label, onClick }: { url: string, label: string, onClick: () => void }) {
  return (
    <button type='button' className='gallery-item' onClick={onClick}>
      <BsFolder className='gallery-icon' />
      {label}
    </button>
  );
}

export default function Gallery() {
  const [currentRoute, setCurrentRoute] = useState<GalleryRoute | null>(null);
  const [currentSubRoute, setCurrentSubRoute] = useState<GalleryRoute | null>(null)

  const galleryRoutes: GalleryRoute[] = [
    {
      id: 0,
      url: "user",
      label: "Usuarios",
    },
    {
      id: 1,
      url: "home",
      label: "Inicio",
    },
    {
      id: 2,
      url: "products",
      label: "Productos",
      subRoute:[
        {
          id: 21,
          url: 'interiors',
          label: 'Interiores',
          subRoute: [
            {
              id: 211,
              url: 'bedroom',
              label: 'Recamara',
              subRoute: [
                {
                  id: 2111,
                  url: 'HFD-0000-001',
                  label: 'HFD-000-001'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      url: 'projects',
      label: 'Proyectos'
    }
  ];

  const handleRouteClick = (route: GalleryRoute) => {
    setCurrentRoute(route);
  };

  return (
    <>
      <div className='menu'>
        <span>Galeria</span>
        {currentRoute && (
          <>
            <span>&nbsp;&gt;&nbsp;</span>
            <span>{currentRoute.label}</span>
          </>
        )}
      </div>
      <div className="gallery">
        {galleryRoutes.map(route => (
          <RouteButton
            key={route.id}
            url={route.url}
            label={route.label}
            onClick={() => handleRouteClick(route)}
          />
        ))}
        {currentRoute && currentRoute.subRoute && (
          <div className="sub-gallery">
            {currentRoute.subRoute.map(route => (
              <RouteButton
                key={route.id}
                url={route.url}
                label={route.label}
                onClick={() => handleRouteClick(route)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
