export function getPrettyDate (due:string) {
  if(due === '-') return "Select"
  const date = new Date(due);
  return date.toLocaleDateString();
};

export function getVerbalStatus (status: string) {
  if (status === "in_progress") return "In progress";
  if (status === "completed") return "Completed";
  if (status === "pending") return "Pending";
  else return 'All'
};

export function getTagBg(id:number ) {
  // gove colors based on condition
  let color = "bg-amber-500"
  if (id%4 === 0) color = "bg-yellow-500";
  if (id%4 === 1) color="bg-green-500";
  if (id%4 === 2) color="bg-red-500";
  if (id%4 === 3) color="bg-gray-500";
  else color='bg-gray-500'
  console.log('%csrc/utils/functions/formatter.ts:22 color', 'color: #26bfa5;', color);
  return color;
};

const colors = [
  "accent",
];


export const backgroundColor = () => {
  const bg = colors[Math.floor(Math.random() * colors.length)];
  return `bg-${bg}`;
};

export const textColor = () => {
  const text = colors[Math.floor(Math.random() * colors.length)];
  return `text-${text}`;
}

export const borderColor = () => {
  const border = colors[Math.floor(Math.random() * colors.length)];
  return `border-${border}`;
}

export const getColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}