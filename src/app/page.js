import SplineComponent from "@/components/SplineComponent";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="spline__container">
      <SplineComponent />

      <div>
        <Header />
      </div>
    </div>
  );
}
