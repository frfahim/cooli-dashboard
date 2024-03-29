const pricesChartHeader = [
  {
    text: " Packages",
    align: "start",
    sortable: false,
    value: "package",
  },
  {
    text: "Time Preiod",
    value: "time_preiod",
    sortable: false,
  },
  {
    text: "Charges (Up-to 1kg)",
    "value": "charges",
    sortable: false,
  },
  {
    text: "Next Per KG",
    value: "extras",
    sortable: false,
  },
  {
    text: "Cut-off Time",
    "value": "cut_of_time",
    sortable: false,
  },
]


const pricesChartData = [
  {
    package: "Delivery Charge (Standard)",
    time_preiod: "24-72 Hours",
    charges: 50.00,
    extras: 12.00,
    cut_of_time: "10:00 PM",
  },
  {
    package: "Delivery Charge (Regular)",
    time_preiod: "24 Hours",
    charges: 60.00,
    extras: 12.00,
    cut_of_time: "03:00 PM",
  },
  {
    package: "Delivery Charge (Same Day)",
    time_preiod: "8 Hours",
    charges: 80.00,
    extras: 12.00,
    cut_of_time: "05:00 PM",
  },
  {
    package: "On Demand Emergency Delivery",
    time_preiod: "4 Hour",
    charges: 150.00,
    extras: 20.00,
    cut_of_time: "05:00 PM",
  },
  {
    package: "Individual",
    time_preiod: "24 Hour",
    charges: 100.00,
    extras: 12.00,
    cut_of_time: "-",
  },
  {
    package: "Grocery [Up-to 2 Kg]",
    time_preiod: "24 Hours",
    charges: 80.00,
    extras: 12.00,
    cut_of_time: "03:00 PM",
  },
  {
    package: "Fish [Up-to 2 Kg]",
    time_preiod: "Immediate",
    charges: 80.00,
    extras: 12.00,
    cut_of_time: "-",
  },
  {
    package: "",
    time_preiod: "",
    charges: '',
    extras: '',
    cut_of_time: "",
  },
  {
    package: "Food Item",
    time_preiod: "",
    charges: "[1 - 3 Small / Medium Box]",
    extras: "Next per Box",
    cut_of_time: "",
  },
  {
    package: "Food",
    time_preiod: "Immediate",
    charges: 100.00,
    extras: 25.00,
    cut_of_time: "-",
  },
  {
    package: "Islami Book and Other Books",
    time_preiod: "",
    charges: "[1-2 Books]",
    extras: "Next per Book",
    cut_of_time: "-",
  },
  {
    package: "Islami Books",
    time_preiod: "24 Hours",
    charges: 150.00,
    extras: 25.00,
    cut_of_time: "-",
  },
  {
    package: "Other Books",
    time_preiod: "24 Hours",
    charges: 80.00,
    extras: 20.00,
    cut_of_time: "-",
  },
]

const packageServices = [
  {
    'id': 1,
    'name': 'Standard',
    'base_unit': 1,
    'unit_price': 12,
    'base_price': 50,
    'group': 'regular'
  },
  {
    'id': 2,
    'name': 'Regular',
    'base_unit': 1,
    'unit_price': 12,
    'base_price': 60,
    'group': 'regular'
  },
  {
    'id': 3,
    'name': 'Same Day',
    'base_unit': 1,
    'unit_price': 12,
    'base_price': 80,
    'group': 'regular'
  },
  {
    'id': 4,
    'name': 'Emergency',
    'base_unit': 1,
    'unit_price': 20,
    'base_price': 150,
    'group': 'regular'
  },
  {
    'id': 5,
    'name': 'Individual',
    'base_unit': 1,
    'unit_price': 12,
    'base_price': 100,
    'group': 'regular'
  },
  {
    'id': 6,
    'name': 'Grocery (Up-to 2 Kg)',
    'base_unit': 1,
    'unit_price': 12,
    'base_price': 80,
    'group': 'regular'
  },
  {
    'id': 7,
    'name': 'Fish (Up-to 2 Kg)',
    'base_unit': 1,
    'unit_price': 12,
    'base_price': 80,
    'group': 'regular'
  },
  {
    'id': 8,
    'name': 'Food',
    'base_unit': 3,
    'unit_price': 25,
    'base_price': 100,
    'group': 'food'
  },
  {
    'id': 9,
    'name': 'Islami Books',
    'base_unit': 2,
    'unit_price': 25,
    'base_price': 150,
    'group': 'book'
  },
  {
    'id': 10,
    'name': 'Other Books',
    'base_unit': 2,
    'unit_price': 20,
    'base_price': 80,
    'group': 'regular'
  },
]

export {
  pricesChartData,
  pricesChartHeader,
  packageServices,
}
