// Make sure that an entity exists (is number, string or whatever, except undefined and null)
export function entityExists(entity) {
    return entity !== null && entity !== undefined;
}