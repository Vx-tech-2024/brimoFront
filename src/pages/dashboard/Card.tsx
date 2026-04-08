export default function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className=" border rounded-lg p-4 shadow-md transition duration-300 hover:scale-110 bg-linear-to-b from-blue-700 via-cyan-900 to-blue-300 ">
      <div className="text-xs text-white mb-1">{title}</div>
      <div className="text-xl text-white font-semibold">
        {value ?? 0}
      </div>
    </div>
  );
}



