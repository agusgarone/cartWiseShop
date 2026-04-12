/**
 * El reconocimiento nativo es una sola sesión; todos los listeners de JS reciben los mismos eventos.
 * Solo la instancia que llamó a start() debe actualizar transcript / listening.
 */
let activeOwnerId: string | null = null;

export function claimVoiceSession(ownerId: string): void {
  activeOwnerId = ownerId;
}

export function releaseVoiceSession(ownerId: string): void {
  if (activeOwnerId === ownerId) {
    activeOwnerId = null;
  }
}

export function isVoiceSessionOwner(ownerId: string): boolean {
  return activeOwnerId === ownerId;
}
