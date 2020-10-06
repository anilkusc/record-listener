export default [

  {
    _tag: 'CSidebarNavTitle',
    _children: ['Kayıtlar']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Kayıt Arama',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Ara',
        to: '/search',
      }
    ]
  }
  
  
]

