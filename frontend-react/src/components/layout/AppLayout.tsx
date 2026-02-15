import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <>
      <nav>Navbar</nav>
      <Outlet />
      <footer>Footer</footer>
    </>
  )
}

export default AppLayout
