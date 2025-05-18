export function hoursSinceCreation(created_at: string): number {
  const criado = new Date(created_at);
  const agora = new Date();
  const diffMs = agora.getTime() - criado.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60)); // horas inteiras
}