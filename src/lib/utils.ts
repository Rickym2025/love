// FUNZIONE helper CN IN PURO TYPESCRIPT NATIVO (SENZA CLSX O TAILWIND-MERGE)
export function cn(...classes: (string | undefined | null | false | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default cn;
