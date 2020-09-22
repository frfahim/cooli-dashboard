const Menu = [
  {header: 'Apps'},
  // {
  //   title: 'Dashboard',
  //   group: 'apps',
  //   icon: 'dashboard',
  //   name: 'Dashboard',
  //   href: '/dashboard'
  // },
  {
    title: 'Parcel',
    group: 'parcel',
    component: 'parcel',
    icon: 'card_travel',
    items: [
      { name: 'addParcel', title: 'Add Parcel', href: '/parcel/add-parcel'},
      {name: 'parcelList', title: 'Parcel List', href: '/parcel/list'},

    ]
  },
  {
    title: 'Prices',
    group: 'price',
    icon: 'fa-align-justify',
    name: 'Prices',
    href: '/prices'
  },
  {
    title: 'Price Calculator',
    group: 'price',
    icon: 'fa-calculator',
    name: 'Price Calculator',
    href: '/price-calculator'
  },
  {
    title: 'Profile',
    group: 'apps',
    icon: 'account_circle',
    name: 'Profile',
    href: '/profile'
  },
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
