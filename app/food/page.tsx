import type { Metadata } from "next";
import FoodLanding from "./FoodLanding";
import "./food.css";
import "./food-editorial.css";
import "./food-motion.css";

export const metadata: Metadata = {
  title: "NoPonto Food — Gestão para operações de alimentação",
  description: "Financeiro, CMV, DRE, fichas técnicas, estoque, multiunidade, indicadores e integrações. Conheça o NoPonto Food.",
};

export default function FoodPage() {
  return <FoodLanding />;
}
