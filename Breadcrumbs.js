import React, {useMemo} from 'react';
import {Link, matchPath, useLocation} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import {Breadcrumb} from "antd";
import {useRoutes} from "../routes";

const Breadcrumbs = () => {
  const routes = useRoutes();
  const {t} = useTranslation()
  let location = useLocation();

  let path = useMemo(() => {
    let routeIdx = routes.findIndex(route => matchPath(location.pathname, route));
    if (routeIdx !== -1) {
      let route = routes[routeIdx];

      if (route.parent) {
				if (route.parent instanceof Array) {
					for (let path of route.parent) {
						let parent = routes.find(r => r.path === path);
						if (parent) {
							return [parent, route]
						}
					}
	      } else {
					let parent = routes.find(r => r.path === route.parent);
					if (parent) {
						return [parent, route]
					}
				}

      }

      return [route]
    }

    return []
  }, [location.pathname, routes])

  return location.pathname === "/home" ? null : (
    <Breadcrumb separator="&raquo;" className="breadcrumb">
      <Breadcrumb.Item>
        <Link to="/home" className="breadcrumb-text">
          {t('Главная')}
        </Link>
      </Breadcrumb.Item>

      {path?.map((route, i) =>
        <Breadcrumb.Item key={i}>
          {(i < path.length - 1) ?
            <Link to={route.path} className="breadcrumb-text">{t(route.title)}</Link> :
            t(route.title)
          }
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  )
}

export default Breadcrumbs
