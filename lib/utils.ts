type ClassValue = string | false | null | undefined | { [key: string]: boolean };

function cx(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  for (const input of inputs) {
    if (typeof input === "string" && input.trim() !== "") {
      classes.push(input.trim());
    } else if (input && typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }
  return classes.join(" ");
}

export function cn(...inputs: ClassValue[]): string {
  return cx(...inputs);
}
