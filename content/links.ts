import { assetPath } from "@/lib/asset-path";
// Contatos deixados sem configuração por orientação do cliente.
// Preencha apenas com os endereços oficiais aprovados.
export const siteLinks: {
  consultation?: string;
  food?: string;
  instagram?: string;
  linkedin?: string;
  whatsapp?: string;
} = { food: assetPath("/food/") };
