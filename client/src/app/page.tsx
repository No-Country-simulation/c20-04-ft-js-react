import Image from "next/image";

export default function Home() {
  return (
    <main >
      <div >
        <p>counter</p>
        <button 
        className="bg-red-500 rounded hover:bg-red-700"
        >increment</button>
      </div>
    </main>
  );
}
