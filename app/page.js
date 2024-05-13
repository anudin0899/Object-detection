import ObjectDetection from "@/components/object-detection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen gradient text-white flex-col items-center justify-between p-24">
      <h1 className="gradient-title font-extrabold text-2xl md:text-4xl lg:text-6xl tracking-tighter
      md:px-6 text-center">
        Fraud Detection System</h1>
      <ObjectDetection />
    </main>
  );
}
