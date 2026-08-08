// FUNZIONE HELPER CN NATIVA PER SUPPORTARE IL COMPONENTE 21ST.DEV
export function cn(...inputs: any[]): string {
  return inputs
    .flat(Infinity)
    .filter(Boolean)
    .map((input) => {
      if (typeof input === "string" || typeof input === "number") return input;
      if (typeof input === "object" && input !== null) {
        return Object.keys(input)
          .filter((key) => Boolean(input[key]))
          .join(" ");
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
}

export default cn;
