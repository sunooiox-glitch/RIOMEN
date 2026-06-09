export function isOwner(number) {
    const num = number.replace(/[^0-9]/g, '');
    return global.owner.some(([n]) => n === num);
}

export function isAdmin(participants, number) {
    const num = `${number}@c.us`;
    const participant = participants.find(p => p.id._serialized === num);
    return participant?.isAdmin || participant?.isSuperAdmin || false;
}

export function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatDate(date = new Date()) {
    return date.toLocaleString('ar-SA', { timeZone: 'Africa/Casablanca' });
}
