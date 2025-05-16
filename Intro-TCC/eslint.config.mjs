// Importações necessárias para o funcionamento do ESLint
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Obtém o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);
// Obtém o diretório do arquivo atual
const __dirname = dirname(__filename);

// Cria uma instância de FlatCompat para gerenciar as configurações do ESLint
const compat = new FlatCompat({
  // Define o diretório base para as configurações do ESLint
  baseDirectory: __dirname,
});

// Define a configuração do ESLint extendendo a configuração "next/core-web-vitals"
const eslintConfig = [...compat.extends("next/core-web-vitals")];

// Exporta a configuração do ESLint como padrão
export default eslintConfig;