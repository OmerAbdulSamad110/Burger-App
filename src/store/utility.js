export function updateObject(oldObject, updateProperties) {
    return {
        ...oldObject,
        ...updateProperties
    }
}