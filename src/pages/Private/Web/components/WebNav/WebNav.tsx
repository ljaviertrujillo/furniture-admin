import './webnav.scss'
import { webRoutes } from "../../../../../models";
import WebSidebarItem from './WebSidebarItem';
import { ArrowButton } from '../../../../../components';

export default function WebNav() {
  return (
    <aside className="web-nav">
      <header className='web-header'>
        <ArrowButton />
      </header>
      {webRoutes.map(route => (
        <WebSidebarItem key={route.id} route={route} />
      ))}
    </aside>
  )
}