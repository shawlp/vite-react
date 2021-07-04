import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const Routes = (routes: IRoute[] = []) => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          {routes.map((r: any) => {
            const { path, exact } = r
            return (
              <Route
                key={`${path}`}
                exact={exact}
                path={path}
                render={(props: any) => {
                  const { meta } = r
                  document.title = meta?.title ?? '首页'
                  return <r.component {...props} route={r} />
                }}
              />
            )
          })}
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Routes
