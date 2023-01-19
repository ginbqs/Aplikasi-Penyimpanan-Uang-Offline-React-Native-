import { SprintF } from "./Number";

export const listMonth = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
var start_year = new Date().getFullYear();
var tempYear = []
for (var i = start_year; i > start_year - 3; i--) {
  tempYear.push(i)
}
export const listYear = tempYear
export const listType = ['Semua', 'Pemasukan', 'Pengeluaran']

export const listThisDate = () => {
  var date = new Date();
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  var numberDate = []
  for (i = 1; i <= lastDay.getDate(); i++) {
    numberDate.push(i)
  }
  return numberDate;
}
export function isValidDate(d) {
  try {
    d.toISOString();
    return true;
  }
  catch (ex) {
    return false;
  }
}
export const dataChart = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100
      ],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Rainy Days"] // optional
};

export const formatDate = (date, format) => {
  let year = date.getFullYear();
  let month = SprintF((date.getMonth() + 1), 2)
  let day = date.getDate()
  if (format === 'dd-MM-yyyy') {
    return day + '-' + month + '-' + year
  } else if (format === 'dd/mm/yyyy') {
    return day + '/' + month + '/' + year
  }
}

export const urlImage = 'https://img.freepik.com/free-vector/abstract-3d-background-with-black-paper-layers_87202-1106.jpg?t=st=1651519187~exp=1651519787~hmac=d0d41de44e605a3c4a6a557ef4c474a7c66557ad6ceb461225812efd0d9297a8&w=1380'


export const listData = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    title: "4 Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d75",
    title: "5 Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d78",
    title: "6 Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d34",
    title: "7 Item",
  },
];

export const listColors = ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"];